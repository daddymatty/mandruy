/* Base HTML document with full technical SEO head. Locale-aware. */
import { readFileSync } from "node:fs";
import { site } from "../data/site.js";
import { t } from "../lib/i18n.js";
import { websiteSchema, organizationSchema } from "../lib/seo.js";

/* Inline the site CSS to drop the render-blocking stylesheet request. */
let INLINE_CSS = null;
try {
  INLINE_CSS = readFileSync(new URL("../assets/css/styles.css", import.meta.url), "utf8");
} catch {
  INLINE_CSS = null;
}

const abs = (p) => (p && p.startsWith("http") ? p : site.domain + (p || "/"));
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function clampDesc(s = "", max = 158) {
  s = String(s).trim().replace(/\s+/g, " ");
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (end > max * 0.6) return cut.slice(0, end + 1).trim();
  const sp = cut.lastIndexOf(" ");
  return (sp > 0 ? cut.slice(0, sp) : cut).trim() + "…";
}

export function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

/**
 * layout({ locale, title, description, canonical, alternates[], ogType, ogImage,
 *          schemas[], bodyClass, content, header, footer, noindex })
 */
export function layout(opts) {
  const {
    locale = "uk",
    title,
    description,
    canonical,
    alternates = [],
    ogType = "website",
    ogImage = "/assets/img/og-default.svg",
    schemas = [],
    bodyClass = "",
    content = "",
    header = "",
    footer = "",
    noindex = false,
  } = opts;

  const allSchemas = [websiteSchema(locale), organizationSchema(), ...schemas];
  const desc = clampDesc(description);
  const v = process.env.ASSET_V || "1";
  const htmlLang = t(locale, "locale.htmlLang");
  const ogLocale = t(locale, "locale.ogLocale");
  const ga = (site.analytics && site.analytics.ga4) || "";

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `img-src 'self' data:${ga ? " https://*.google-analytics.com https://*.googletagmanager.com" : ""}`,
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self'${ga ? " https://www.googletagmanager.com" : ""}`,
    `connect-src 'self'${ga ? " https://*.google-analytics.com https://*.googletagmanager.com" : ""}`,
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  const gaTag = ga
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga)}" data-ga="${esc(ga)}"></script>`
    : "";
  const gscTag =
    site.analytics && site.analytics.gscVerification
      ? `<meta name="google-site-verification" content="${esc(site.analytics.gscVerification)}">`
      : "";

  const hreflang = alternates
    .map((a) => `<link rel="alternate" hreflang="${a.locale === "uk" ? "uk" : a.locale}" href="${abs(a.href)}">`)
    .join("\n");
  const xdefault = alternates.find((a) => a.locale === "uk");

  return `<!doctype html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
<link rel="canonical" href="${abs(canonical)}">
${hreflang}
${xdefault ? `<link rel="alternate" hreflang="x-default" href="${abs(xdefault.href)}">` : ""}
<meta name="author" content="${esc(site.legalName)}">

<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(canonical)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${abs(ogImage)}">

<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="apple-touch-icon" href="/assets/img/favicon.svg">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0b1020">
${INLINE_CSS ? `<style>${INLINE_CSS}</style>` : `<link rel="stylesheet" href="/assets/css/styles.css?v=${v}">`}
<noscript><style>.reveal{opacity:1 !important;transform:none !important}.reveal-word{opacity:1 !important;animation:none !important}</style></noscript>
${gscTag}
${gaTag}
${allSchemas.map(jsonLd).join("\n")}
</head>
<body class="${bodyClass}">
<div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<a href="#main" class="visually-hidden">${htmlLang === "en" ? "Skip to main content" : "Перейти до основного змісту"}</a>
${header}
<main id="main">
${content}
</main>
${footer}
<button class="to-top" data-to-top aria-label="${htmlLang === "en" ? "Back to top" : "Нагору"}" hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
<script src="/assets/js/main.js?v=${v}" defer></script>
</body>
</html>`;
}
