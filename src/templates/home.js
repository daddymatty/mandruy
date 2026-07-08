/* Home page — the animated flagship. */
import { site } from "../data/site.js";
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, serviceIcon, leadForm, ctaBand } from "./components.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const copy = {
  uk: {
    kicker: "Сервісний портал 24/7",
    h1a: "Подорожуй легко —",
    h1b: "усе в одному місці",
    sub: "Страхування, ВНЖ, квитки, тури, готелі, eSIM і трансфери. Оформлюйте онлайн за кілька хвилин, а підтримка поруч цілодобово.",
    trust: ["клієнтів", "країн", "партнерів"],
    servicesTitle: "Наші послуги",
    servicesSub: "Обирайте потрібне — решту зробимо ми.",
    howTitle: "Як це працює",
    how: [
      { t: "Оберіть послугу", d: "Знайдіть потрібне в каталозі або опишіть запит у формі." },
      { t: "Отримайте пропозицію", d: "Менеджер порахує вартість і підбере найкращий варіант." },
      { t: "Оплатіть онлайн", d: "Захищена оплата карткою — швидко й без черг." },
      { t: "Готово!", d: "Поліс, квиток чи документ приходить на пошту одразу." },
    ],
    whyTitle: "Чому Мандруй",
    why: [
      { t: "Усе в одному місці", d: "Не треба десятків сайтів — усі послуги для подорожі під однією дахом." },
      { t: "Підтримка 24/7", d: "Ми на зв’язку в будь-якому часовому поясі — Telegram, WhatsApp, телефон." },
      { t: "Чесні ціни", d: "Прозора вартість без прихованих комісій. Бачите фінальну суму одразу." },
      { t: "Онлайн за 5 хвилин", d: "Більшість послуг оформлюється повністю дистанційно." },
    ],
    blogTitle: "Корисне для мандрівників",
    faqTitle: "Часті запитання",
    ctaTitle: "Готові вирушати?",
    ctaText: "Залиште заявку — підберемо страхування, квитки й усе потрібне для вашої подорожі.",
    formLead: "Порахуємо вашу подорож",
  },
  en: {
    kicker: "A 24/7 service portal",
    h1a: "Travel easy —",
    h1b: "everything in one place",
    sub: "Insurance, residence permits, tickets, tours, hotels, eSIM and transfers. Arrange it online in minutes, with support by your side around the clock.",
    trust: ["clients", "countries", "partners"],
    servicesTitle: "Our services",
    servicesSub: "Pick what you need — we’ll handle the rest.",
    howTitle: "How it works",
    how: [
      { t: "Choose a service", d: "Find what you need in the catalogue or describe your request in the form." },
      { t: "Get an offer", d: "A manager calculates the price and picks the best option." },
      { t: "Pay online", d: "Secure card payment — fast and queue-free." },
      { t: "Done!", d: "The policy, ticket or document arrives by email right away." },
    ],
    whyTitle: "Why Mandruy",
    why: [
      { t: "All in one place", d: "No need for dozens of sites — every travel service under one roof." },
      { t: "24/7 support", d: "We’re reachable in any time zone — Telegram, WhatsApp, phone." },
      { t: "Fair prices", d: "Transparent pricing with no hidden fees. You see the final sum upfront." },
      { t: "Online in 5 minutes", d: "Most services are arranged fully remotely." },
    ],
    blogTitle: "Useful for travellers",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Ready to set off?",
    ctaText: "Leave a request — we’ll arrange insurance, tickets and everything your trip needs.",
    formLead: "Let’s price your trip",
  },
};

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function homePage({ locale, services, articles }) {
  const c = copy[locale];
  const stats = [
    { n: site.stats.clients, plus: "+", label: c.trust[0] },
    { n: site.stats.countries, plus: "+", label: c.trust[1] },
    { n: site.stats.partners, plus: "+", label: c.trust[2] },
  ];

  const serviceCards = services
    .map(
      (s, i) => `<a class="svc reveal svc--${s.accent}" style="--i:${i}" href="${localizePath(`/services/${s.slug}/`, locale)}" data-accent="${s.accent}">
      <span class="svc__ic">${serviceIcon(s.icon)}</span>
      <h3 class="svc__name">${esc(pick(s.name, locale))}</h3>
      <p class="svc__tag">${esc(pick(s.tagline, locale))}</p>
      <span class="svc__foot"><span class="svc__price">${esc(t(locale, "misc.from"))} ${esc(pick(s.priceFrom, locale))}</span><span class="svc__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");

  const howSteps = c.how
    .map(
      (s, i) => `<li class="step reveal" style="--i:${i}"><span class="step__n">${i + 1}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`
    )
    .join("");

  const whyCards = c.why
    .map(
      (w, i) => `<div class="why reveal" style="--i:${i}"><span class="why__ic">${icons.check}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`
    )
    .join("");

  const posts = articles
    .slice(0, 3)
    .map(
      (a) => `<a class="post reveal" href="${localizePath(`/blog/${a.slug}/`, locale)}">
      <span class="post__cat">${esc(pick(a.category, locale))}</span>
      <h3>${esc(pick(a.title, locale))}</h3>
      <p>${esc(pick(a.description, locale))}</p>
      <span class="post__meta">${a.read} ${esc(t(locale, "misc.min_read"))} <span class="post__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");

  const statTiles = stats
    .map((s) => `<div class="stat reveal"><span class="stat__big" data-count="${s.n}">0</span><span class="stat__plus">${s.plus}</span><span class="stat__label">${esc(s.label)}</span></div>`)
    .join("");

  const marquee = services.concat(services).map((s) => `<span>${esc(pick(s.name, locale))}</span><i>${icons.plane}</i>`).join("");

  return `
<section class="hero">
  <div class="hero__bg" aria-hidden="true">
    <span class="orb orb--1"></span><span class="orb orb--2"></span><span class="orb orb--3"></span>
    <span class="grid-lines"></span>
  </div>
  <div class="container hero__inner">
    <div class="hero__copy">
      <span class="kicker reveal"><span class="pulse"></span>${esc(c.kicker)}</span>
      <h1 class="hero__title"><span class="reveal-word">${esc(c.h1a)}</span> <span class="reveal-word grad">${esc(c.h1b)}</span></h1>
      <p class="hero__sub reveal">${esc(c.sub)}</p>
      <div class="hero__actions reveal">
        <a class="btn btn--primary btn--lg" href="${localizePath("/services/", locale)}">${esc(t(locale, "nav.services"))} ${icons.arrow}</a>
        <a class="btn btn--ghost btn--lg" href="#services">${esc(t(locale, "cta.details"))}</a>
      </div>
      <div class="hero__stats">${statTiles}</div>
    </div>
    <div class="hero__form reveal">
      <div class="hero__form-card">
        <span class="hero__badge">${icons.clock} ${esc(t(locale, "misc.online"))}</span>
        ${leadForm({ locale, id: "hero-lead", source: "home-hero", compact: false })}
      </div>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee__track">${marquee}</div></div>
</section>

<section class="section" id="services">
  <div class="container">
    <header class="sec-head reveal">
      <span class="sec-tag">${esc(t(locale, "nav.services"))}</span>
      <h2>${esc(c.servicesTitle)}</h2>
      <p>${esc(c.servicesSub)}</p>
    </header>
    <div class="svc-grid">${serviceCards}</div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <header class="sec-head reveal"><span class="sec-tag">${esc(t(locale, "misc.how"))}</span><h2>${esc(c.howTitle)}</h2></header>
    <ol class="steps">${howSteps}</ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <header class="sec-head reveal"><span class="sec-tag">${esc(t(locale, "misc.why_us"))}</span><h2>${esc(c.whyTitle)}</h2></header>
    <div class="why-grid">${whyCards}</div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <header class="sec-head sec-head--row reveal">
      <div><span class="sec-tag">${esc(t(locale, "nav.blog"))}</span><h2>${esc(c.blogTitle)}</h2></div>
      <a class="btn btn--ghost" href="${localizePath("/blog/", locale)}">${esc(t(locale, "cta.all"))} ${icons.arrow}</a>
    </header>
    <div class="post-grid">${posts}</div>
  </div>
</section>

${ctaBand({ locale, title: c.ctaTitle, text: c.ctaText })}
`;
}
