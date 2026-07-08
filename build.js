/* ============================================================
   Мандруй static site generator.
   Data + templates -> pure static HTML in /dist. Bilingual (uk/en).
   ============================================================ */
import { mkdir, writeFile, rm, cp, readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site, locales, defaultLocale } from "./src/data/site.js";
import { t, pick, localizePath } from "./src/lib/i18n.js";
import { services, serviceBySlug } from "./src/data/services.js";
import { articles, articleBySlug } from "./src/data/blog.js";
import { homeFaq } from "./src/data/faq.js";

import { layout } from "./src/templates/layout.js";
import { header, footer } from "./src/templates/components.js";
import { homePage } from "./src/templates/home.js";
import { servicesIndexPage, servicePage } from "./src/templates/service.js";
import { blogIndexPage, articlePage } from "./src/templates/blog.js";
import { aboutPage, contactsPage, faqPage, privacyPage, sitemapPage, notFoundPage } from "./src/templates/pages.js";
import {
  breadcrumbSchema, faqSchema, serviceSchema, articleSchema,
} from "./src/lib/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

const BASE = (process.env.BASE_PATH || "").replace(/\/+$/, "");
if (process.env.SITE_URL) site.domain = process.env.SITE_URL.replace(/\/+$/, "");

function applyBase(html) {
  return BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html;
}

const sitemapUrls = [];

/* alternates for a base route across all locales */
function altsFor(route) {
  return locales.map((l) => ({ locale: l, href: localizePath(route, l) }));
}

/* Write one localized page. `route` is the base (uk) route, e.g. "/services/". */
async function writePage(locale, route, opts, content, { priority = "0.6", changefreq = "monthly", index = true, lastmod } = {}) {
  const canonical = localizePath(route, locale);
  const html = layout({
    ...opts,
    locale,
    canonical,
    alternates: altsFor(route),
    content,
    header: header({ locale, currentPath: canonical, alternates: altsFor(route) }),
    footer: footer({ locale }),
  });
  const rel = canonical.replace(/^\//, "");
  const dir = rel === "" ? DIST : path.join(DIST, rel);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), applyBase(html), "utf8");
  if (index) {
    sitemapUrls.push({
      loc: site.domain + (canonical === "/" ? "/" : canonical),
      alternates: altsFor(route),
      lastmod, priority, changefreq,
    });
  }
}

async function build() {
  process.env.ASSET_V = Date.now().toString(36);
  console.log("→ Clean dist/");
  if (existsSync(DIST)) await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  console.log("→ Copy assets");
  await cp(path.join(__dirname, "src/assets"), path.join(DIST, "assets"), { recursive: true });

  for (const locale of locales) {
    const crumb = (name) => [
      { name: locale === "en" ? "Home" : "Головна", href: localizePath("/", locale) },
      ...(Array.isArray(name) ? name : [name]),
    ];

    /* Home */
    await writePage(
      locale, "/",
      {
        title: locale === "en"
          ? "Mandruy — 24/7 travel service portal: insurance, visas, tickets, tours"
          : "Мандруй — сервісний портал 24/7: страхування, ВНЖ, квитки, тури",
        description: locale === "en"
          ? "Insurance with war-risk coverage, residence permits, bus/train/flight tickets, tours, hotels, eSIM and transfers — all in one place. Online in minutes, support 24/7."
          : "Страхування з покриттям воєнних ризиків, ВНЖ і документи, квитки на автобус/потяг/літак, тури, готелі, eSIM і трансфери — усе в одному місці. Онлайн за хвилини, підтримка 24/7.",
        schemas: [faqSchema(homeFaq.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })))],
      },
      homePage({ locale, services, articles }),
      { priority: "1.0", changefreq: "weekly" }
    );

    /* Services index */
    await writePage(
      locale, "/services/",
      {
        title: (locale === "en" ? "All services" : "Усі послуги") + " — " + site.name,
        description: locale === "en"
          ? "Every travel and document service in one place: insurance, residence permits, tickets, tours, hotels, eSIM and transfers."
          : "Усі послуги для подорожей та документів в одному місці: страхування, ВНЖ, квитки, тури, готелі, eSIM і трансфери.",
        schemas: [breadcrumbSchema(crumb({ name: t(locale, "nav.services"), href: localizePath("/services/", locale) }))],
      },
      servicesIndexPage({ locale, services }),
      { priority: "0.9" }
    );

    /* Each service */
    for (const s of services) {
      await writePage(
        locale, `/services/${s.slug}/`,
        {
          title: pick(s.metaTitle, locale),
          description: pick(s.metaDescription, locale),
          ogType: "article",
          schemas: [
            serviceSchema({
              name: pick(s.name, locale),
              description: pick(s.metaDescription, locale),
              url: localizePath(`/services/${s.slug}/`, locale),
              price: pick(s.priceFrom, locale),
            }),
            faqSchema([
              { q: pick(s.name, locale) + "?", a: pick(s.intro, locale) },
            ]),
            breadcrumbSchema(crumb([
              { name: t(locale, "nav.services"), href: localizePath("/services/", locale) },
              { name: pick(s.name, locale), href: localizePath(`/services/${s.slug}/`, locale) },
            ])),
          ],
        },
        servicePage({ locale, service: s, services }),
        { priority: "0.8" }
      );
    }

    /* Blog index */
    await writePage(
      locale, "/blog/",
      {
        title: (locale === "en" ? "Blog — travel guides & tips" : "Блог — гайди та поради для мандрівників") + " | " + site.name,
        description: locale === "en"
          ? "Guides, rules and tips about travel, insurance, residence permits and border crossing."
          : "Гайди, правила та поради про подорожі, страхування, ВНЖ і перетин кордону.",
        schemas: [breadcrumbSchema(crumb({ name: t(locale, "nav.blog"), href: localizePath("/blog/", locale) }))],
      },
      blogIndexPage({ locale, articles }),
      { priority: "0.8", changefreq: "weekly" }
    );

    /* Each article */
    for (const a of articles) {
      const url = localizePath(`/blog/${a.slug}/`, locale);
      await writePage(
        locale, `/blog/${a.slug}/`,
        {
          title: pick(a.title, locale) + " | " + site.name,
          description: pick(a.description, locale),
          ogType: "article",
          schemas: [
            articleSchema({ title: pick(a.title, locale), description: pick(a.description, locale), date: a.date, modified: a.modified, url }, locale),
            breadcrumbSchema(crumb([
              { name: t(locale, "nav.blog"), href: localizePath("/blog/", locale) },
              { name: pick(a.title, locale), href: url },
            ])),
          ],
        },
        articlePage({ locale, article: a, articles }),
        { priority: "0.7", lastmod: a.modified || a.date }
      );
    }

    /* About / Contacts / FAQ */
    await writePage(locale, "/about/", {
      title: (locale === "en" ? "About Mandruy" : "Про Мандруй") + " — " + t(locale, "misc.support_24_7"),
      description: locale === "en" ? "Mandruy gathers every travel and document service in one place. Our story, values and team." : "Мандруй зібрав усі послуги для подорожей та документів в одному місці. Наша історія, цінності та команда.",
      schemas: [breadcrumbSchema(crumb({ name: t(locale, "nav.about"), href: localizePath("/about/", locale) }))],
    }, aboutPage({ locale }), { priority: "0.6" });

    await writePage(locale, "/contacts/", {
      title: (locale === "en" ? "Contacts" : "Контакти") + " — " + site.name,
      description: locale === "en" ? "Reach Mandruy 24/7 by phone, email, Telegram or WhatsApp. We reply within 15 minutes." : "Зв’яжіться з Мандруй цілодобово: телефон, e-mail, Telegram або WhatsApp. Відповідаємо протягом 15 хвилин.",
      schemas: [breadcrumbSchema(crumb({ name: t(locale, "nav.contacts"), href: localizePath("/contacts/", locale) }))],
    }, contactsPage({ locale }), { priority: "0.6" });

    await writePage(locale, "/faq/", {
      title: t(locale, "misc.faq") + " — " + site.name,
      description: locale === "en" ? "Answers to common questions about Mandruy services, timelines and payment." : "Відповіді на часті запитання про послуги Мандруй, строки та оплату.",
      schemas: [
        faqSchema(homeFaq.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) }))),
        breadcrumbSchema(crumb({ name: "FAQ", href: localizePath("/faq/", locale) })),
      ],
    }, faqPage({ locale }), { priority: "0.5" });

    /* Privacy (noindex) + Sitemap */
    await writePage(locale, "/privacy/", {
      title: t(locale, "foot.privacy") + " | " + site.name,
      description: locale === "en" ? "How Mandruy processes personal data." : "Як Мандруй обробляє персональні дані.",
      noindex: true,
    }, privacyPage({ locale }), { index: false });

    await writePage(locale, "/sitemap/", {
      title: t(locale, "foot.sitemap") + " | " + site.name,
      description: locale === "en" ? "All pages of Mandruy in one list." : "Усі сторінки Мандруй в одному списку.",
      schemas: [breadcrumbSchema(crumb({ name: t(locale, "foot.sitemap"), href: localizePath("/sitemap/", locale) }))],
    }, sitemapPage({ locale }), { priority: "0.3" });

    /* 404 (per-locale content, written to file at end for default locale) */
    if (locale === defaultLocale) {
      const nf = layout({
        locale,
        title: t(locale, "404.title") + " | " + site.name,
        description: t(locale, "404.text"),
        canonical: "/404.html",
        alternates: [],
        noindex: true,
        content: notFoundPage({ locale }),
        header: header({ locale, alternates: [] }),
        footer: footer({ locale }),
      });
      await writeFile(path.join(DIST, "404.html"), applyBase(nf), "utf8");
    }
  }

  /* robots.txt */
  await writeFile(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /privacy/\nDisallow: /en/privacy/\n\nSitemap: ${site.domain}/sitemap.xml\n`,
    "utf8"
  );

  /* sitemap.xml with hreflang alternates */
  const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls
    .map((u) => {
      const alts = u.alternates
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.locale}" href="${site.domain}${a.href}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n${alts}\n  </url>`;
    })
    .join("\n")}
</urlset>\n`;
  await writeFile(path.join(DIST, "sitemap.xml"), sm, "utf8");

  /* manifest + .nojekyll */
  await writeFile(
    path.join(DIST, "site.webmanifest"),
    JSON.stringify({
      name: site.legalName, short_name: site.name, lang: "uk",
      start_url: BASE + "/", display: "standalone", background_color: "#ffffff", theme_color: "#0b1020",
      icons: [{ src: BASE + "/assets/img/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    }),
    "utf8"
  );
  await writeFile(path.join(DIST, ".nojekyll"), "", "utf8");

  const cnameHost = site.domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (cnameHost && !cnameHost.endsWith("github.io") && !cnameHost.endsWith(".example")) {
    await writeFile(path.join(DIST, "CNAME"), cnameHost + "\n", "utf8");
  }

  await minifyDist();

  console.log(`\n✓ Done. ${sitemapUrls.length + 1} pages in dist/ (${locales.join(", ")}).`);
  console.log(`  Services: ${services.length} × ${locales.length} | Articles: ${articles.length} × ${locales.length}`);
}

async function minifyDist() {
  let htmlMin, csso, terser;
  try {
    ({ minify: htmlMin } = await import("html-minifier-terser"));
    csso = (await import("csso")).default || (await import("csso"));
    terser = await import("terser");
  } catch {
    console.log("→ Minify skipped (dev deps absent)");
    return;
  }
  async function walk(dir) {
    const out = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(full)));
      else out.push(full);
    }
    return out;
  }
  const files = await walk(DIST);
  let before = 0, after = 0;
  for (const f of files) {
    const ext = path.extname(f);
    if (![".html", ".css", ".js"].includes(ext)) continue;
    const src = await readFile(f, "utf8");
    before += Buffer.byteLength(src);
    let res = src;
    try {
      if (ext === ".html") res = await htmlMin(src, { collapseWhitespace: true, conservativeCollapse: true, removeComments: true, minifyCSS: true, minifyJS: true, keepClosingSlash: true });
      else if (ext === ".css") res = csso.minify(src).css;
      else if (ext === ".js") res = (await terser.minify(src, { format: { comments: false } })).code || src;
    } catch (err) { console.warn(`  ! minify ${path.relative(DIST, f)}: ${err.message}`); res = src; }
    after += Buffer.byteLength(res);
    if (res !== src) await writeFile(f, res, "utf8");
  }
  const saved = before ? Math.round((1 - after / before) * 100) : 0;
  console.log(`→ Minify: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`);
}

build().catch((e) => { console.error("✗ Build failed:", e); process.exit(1); });
