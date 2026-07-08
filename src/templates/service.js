/* Services index + individual service page. */
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, serviceIcon, leadForm, ctaBand } from "./components.js";
import { serviceFaqCommon } from "../data/services.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const idxCopy = {
  uk: { tag: "Каталог", title: "Усі послуги", sub: "Все, що потрібно для подорожі та документів — в одному місці." },
  en: { tag: "Catalogue", title: "All services", sub: "Everything you need for travel and documents — in one place." },
};

export function servicesIndexPage({ locale, services }) {
  const c = idxCopy[locale];
  const cards = services
    .map(
      (s, i) => `<a class="svc reveal svc--${s.accent}" style="--i:${i}" href="${localizePath(`/services/${s.slug}/`, locale)}">
      <span class="svc__ic">${serviceIcon(s.icon)}</span>
      <h3 class="svc__name">${esc(pick(s.name, locale))}</h3>
      <p class="svc__tag">${esc(pick(s.tagline, locale))}</p>
      <span class="svc__foot"><span class="svc__price">${esc(t(locale, "misc.from"))} ${esc(pick(s.priceFrom, locale))}</span><span class="svc__go">${icons.arrow}</span></span>
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
<section class="section"><div class="container"><div class="svc-grid">${cards}</div></div></section>
${ctaBand({ locale, title: t(locale, "form.title"), text: idxCopy[locale].sub })}
`;
}

function faqBlock(locale, faqs, title) {
  const items = faqs
    .map(
      (f) => `<details class="faq reveal"><summary>${esc(pick(f.q, locale))}<span class="faq__i"></span></summary><div class="faq__a"><p>${esc(pick(f.a, locale))}</p></div></details>`
    )
    .join("");
  return `<section class="section section--tint"><div class="container container--narrow">
    <header class="sec-head reveal"><span class="sec-tag">FAQ</span><h2>${esc(title)}</h2></header>
    <div class="faq-list">${items}</div>
  </div></section>`;
}

export function servicePage({ locale, service, services }) {
  const s = service;
  const benefits = (s.benefits || [])
    .map((b, i) => `<li class="reveal" style="--i:${i}"><span class="bic">${icons.check}</span>${esc(pick(b, locale))}</li>`)
    .join("");

  const plans = (s.plans || [])
    .map(
      (p, i) => `<div class="plan reveal${p.best ? " plan--best" : ""}" style="--i:${i}">
      ${p.best ? `<span class="plan__badge">${esc(t(locale, "misc.plans"))}</span>` : ""}
      <h3 class="plan__name">${esc(pick(p.name, locale))}</h3>
      <div class="plan__price">${esc(pick(p.price, locale))}<small>${esc(pick(p.period, locale))}</small></div>
      <ul class="plan__list">${pick(p.features, locale).map((f) => `<li><span class="bic">${icons.check}</span>${esc(f)}</li>`).join("")}</ul>
      <a class="btn ${p.best ? "btn--primary" : "btn--ghost"} btn--block" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.order"))}</a>
    </div>`
    )
    .join("");

  const related = services
    .filter((x) => x.slug !== s.slug)
    .slice(0, 3)
    .map(
      (x) => `<a class="svc reveal svc--${x.accent}" href="${localizePath(`/services/${x.slug}/`, locale)}">
      <span class="svc__ic">${serviceIcon(x.icon)}</span>
      <h3 class="svc__name">${esc(pick(x.name, locale))}</h3>
      <p class="svc__tag">${esc(pick(x.tagline, locale))}</p>
      <span class="svc__foot"><span class="svc__price">${esc(t(locale, "misc.from"))} ${esc(pick(x.priceFrom, locale))}</span><span class="svc__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");

  const relatedTitle = locale === "en" ? "Other services" : "Інші послуги";

  return `
<section class="page-hero page-hero--svc"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span><span class="orb orb--3"></span></div>
  <div class="container svc-hero">
    <div class="svc-hero__copy">
      <span class="svc-hero__ic reveal">${serviceIcon(s.icon)}</span>
      <span class="sec-tag reveal">${esc(pick(s.name, locale))}</span>
      <h1 class="reveal">${esc(pick(s.hero, locale))}</h1>
      <p class="page-hero__sub reveal">${esc(pick(s.intro, locale))}</p>
      <div class="hero__actions reveal">
        <a class="btn btn--primary btn--lg" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.order"))} ${icons.arrow}</a>
        <a class="btn btn--ghost btn--lg" href="tel:+380440002407">${icons.phone} ${esc(t(locale, "cta.call"))}</a>
      </div>
    </div>
    <div class="svc-hero__form reveal">
      <div class="hero__form-card">${leadForm({ locale, id: "svc-lead", source: `service-${s.slug}`, compact: true })}</div>
    </div>
  </div>
</section>

<section class="section"><div class="container">
  <header class="sec-head reveal"><h2>${locale === "en" ? "What you get" : "Що ви отримуєте"}</h2></header>
  <ul class="benefits">${benefits}</ul>
</div></section>

${plans ? `<section class="section section--tint"><div class="container">
  <header class="sec-head reveal"><span class="sec-tag">${esc(t(locale, "misc.plans"))}</span><h2>${esc(t(locale, "misc.plans"))}</h2></header>
  <div class="plans">${plans}</div>
</div></section>` : ""}

${faqBlock(locale, serviceFaqCommon, t(locale, "misc.faq"))}

<section class="section"><div class="container">
  <header class="sec-head sec-head--row reveal"><div><h2>${esc(relatedTitle)}</h2></div><a class="btn btn--ghost" href="${localizePath("/services/", locale)}">${esc(t(locale, "nav.all_services"))} ${icons.arrow}</a></header>
  <div class="svc-grid svc-grid--3">${related}</div>
</div></section>

${ctaBand({ locale, title: pick(s.hero, locale), text: pick(s.tagline, locale) })}
`;
}
