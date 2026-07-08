/* Blog index + article page. */
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, ctaBand } from "./components.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const idxCopy = {
  uk: { tag: "Блог", title: "Корисне для мандрівників", sub: "Гайди, правила та поради про подорожі, страхування й документи." },
  en: { tag: "Blog", title: "Useful for travellers", sub: "Guides, rules and tips about travel, insurance and documents." },
};

export function blogIndexPage({ locale, articles }) {
  const c = idxCopy[locale];
  const cards = articles
    .map(
      (a, i) => `<a class="post reveal" style="--i:${i}" href="${localizePath(`/blog/${a.slug}/`, locale)}">
      <span class="post__cat">${esc(pick(a.category, locale))}</span>
      <h3>${esc(pick(a.title, locale))}</h3>
      <p>${esc(pick(a.description, locale))}</p>
      <span class="post__meta">${a.read} ${esc(t(locale, "misc.min_read"))} <span class="post__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");
  return `
<section class="page-hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span></div>
  <div class="container">
    <span class="sec-tag reveal">${esc(c.tag)}</span>
    <h1 class="reveal">${esc(c.title)}</h1>
    <p class="page-hero__sub reveal">${esc(c.sub)}</p>
  </div>
</section>
<section class="section"><div class="container"><div class="post-grid">${cards}</div></div></section>
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
