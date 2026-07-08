/* Blog index + article page. */
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, ctaBand } from "./components.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const idxCopy = {
  uk: { tag: "Блог", title: "Гайди для іноземців в Україні", sub: "Візи, в’їзд, підстави для ВНЖ, документи, робота, навчання й побут — усе, що варто знати." },
  en: { tag: "Blog", title: "Guides for foreigners in Ukraine", sub: "Visas, entry, grounds for residence, documents, work, study and daily life — everything worth knowing." },
};

/* Small vector Ukraine thumbnail (varied hue per article). */
function thumb(i) {
  const hues = [212, 262, 190, 38, 150, 300];
  const h = hues[i % hues.length];
  const id = "bt" + i;
  return `<svg class="post__img" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h},86%,60%)"/><stop offset="1" stop-color="#ffe0a0"/></linearGradient></defs>
    <rect width="400" height="225" fill="url(#${id})"/>
    <circle cx="314" cy="70" r="42" fill="#fff5cf" opacity=".95"/>
    <path d="M0 152 L110 122 L230 154 L330 124 L400 150 V225 H0Z" fill="#ffffff" opacity=".2"/>
    <g fill="#243a7a" opacity=".82" transform="translate(40,152)"><rect x="0" y="-32" width="10" height="32"/><path d="M0 -32 l5 -11 l5 11Z" fill="#ffce3a"/><rect x="28" y="-22" width="34" height="22"/><path d="M28 -22 q17 -20 34 0Z"/><ellipse cx="45" cy="-24" rx="7" ry="9" fill="#ffce3a"/><rect x="84" y="-36" width="8" height="36"/><path d="M84 -36 l4 -8 l4 8Z" fill="#ffce3a"/><rect x="110" y="-18" width="48" height="18"/></g>
  </svg>`;
}

export function blogIndexPage({ locale, articles }) {
  const c = idxCopy[locale];

  /* Unique categories (stable English key + localized label). */
  const catMap = new Map();
  for (const a of articles) {
    const key = pick(a.category, "en").toLowerCase();
    if (!catMap.has(key)) catMap.set(key, pick(a.category, locale));
  }
  const allLabel = locale === "en" ? "All" : "Усі";
  const chips = `<button class="chip is-active" data-filter="all" aria-pressed="true">${esc(allLabel)}</button>` +
    [...catMap].map(([k, label]) => `<button class="chip" data-filter="${esc(k)}" aria-pressed="false">${esc(label)}</button>`).join("");

  const cards = articles
    .map((a, i) => {
      const key = pick(a.category, "en").toLowerCase();
      return `<a class="post post--img reveal" data-cat="${esc(key)}" style="--i:${i % 9}" href="${localizePath(`/blog/${a.slug}/`, locale)}">
      ${thumb(i)}
      <span class="post__cat">${esc(pick(a.category, locale))}</span>
      <h3>${esc(pick(a.title, locale))}</h3>
      <p>${esc(pick(a.description, locale))}</p>
      <span class="post__meta">${a.read} ${esc(t(locale, "misc.min_read"))} <span class="post__go">${icons.arrow}</span></span>
    </a>`;
    })
    .join("");

  const moreLabel = locale === "en" ? "Show more articles" : "Показати ще статті";

  return `
<section class="page-hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span></div>
  <div class="container">
    <span class="sec-tag reveal">${esc(c.tag)}</span>
    <h1 class="reveal">${esc(c.title)}</h1>
    <p class="page-hero__sub reveal">${esc(c.sub)}</p>
  </div>
</section>
<section class="section"><div class="container">
  <div class="filter-bar reveal" data-blog-filter>${chips}</div>
  <div class="post-grid" data-blog-grid>${cards}</div>
  <div class="blog-more" data-blog-more hidden><button class="btn btn--ghost btn--lg">${esc(moreLabel)}</button></div>
</div></section>
`;
}

function renderBody(blocks) {
  return blocks
    .map((b) => {
      if (b.h2) return `<h2 class="reveal">${esc(b.h2)}</h2>`;
      if (b.p) return `<p class="reveal">${esc(b.p)}</p>`;
      if (b.list) return `<ul class="art-list reveal">${b.list.map((li) => `<li><span class="bic">${icons.check}</span>${esc(li)}</li>`).join("")}</ul>`;
      if (b.tip) return `<aside class="tip reveal"><span class="tip__ic">${icons.star}</span><p>${esc(b.tip)}</p></aside>`;
      return "";
    })
    .join("\n");
}

export function articlePage({ locale, article, articles }) {
  const a = article;
  const dateStr = new Date(a.date).toLocaleDateString(locale === "en" ? "en-GB" : "uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const more = articles
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3)
    .map(
      (x) => `<a class="post reveal" href="${localizePath(`/blog/${x.slug}/`, locale)}">
      <span class="post__cat">${esc(pick(x.category, locale))}</span>
      <h3>${esc(pick(x.title, locale))}</h3>
      <span class="post__meta">${x.read} ${esc(t(locale, "misc.min_read"))} <span class="post__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");
  const moreTitle = locale === "en" ? "Read next" : "Читайте також";

  return `
<article class="article">
  <header class="article__hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span></div>
    <div class="container container--narrow">
      <span class="sec-tag reveal">${esc(pick(a.category, locale))}</span>
      <h1 class="reveal">${esc(pick(a.title, locale))}</h1>
      <div class="article__meta reveal"><span>${icons.clock} ${a.read} ${esc(t(locale, "misc.min_read"))}</span><span>${esc(dateStr)}</span></div>
    </div>
  </header>
  <div class="container container--narrow article__body">
    ${renderBody(pick(a.body, locale))}
  </div>
</article>

<section class="section section--tint"><div class="container">
  <header class="sec-head reveal"><h2>${esc(moreTitle)}</h2></header>
  <div class="post-grid post-grid--3">${more}</div>
</div></section>

${ctaBand({ locale, title: t(locale, "form.title"), text: t(locale, "form.note") })}
`;
}
