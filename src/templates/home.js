/* Home page — clean editorial (Concept A, day) with imagery, FAQ & motion. */
import { site } from "../data/site.js";
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, serviceIcon, leadForm, ctaBand } from "./components.js";
import { homeFaq } from "../data/faq.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const copy = {
  en: {
    statement: "The bureaucracy is ours.<br>The journey is yours.",
    cards: [
      { n: "01", t: "Entry document", d: "We confirm whether you need a visa, an e-Visa or can enter visa-free — and obtain it.", href: "/services/visa/" },
      { n: "02", t: "Grounds to stay", d: "A job, studies, family or investment becomes your legal basis for staying.", href: "/services/residence/" },
      { n: "03", t: "Residence permit", d: "We file your temporary residence permit and register your stay.", href: "/services/residence/" },
    ],
    servicesTitle: "What we handle",
    servicesSub: "From your visa to your residence permit — every step in one place.",
    panoTitle: "Fall in love with Ukraine — we’ll handle the paperwork",
    stats: [[120000, "foreigners helped"], [90, "nationalities"], [7, "days average to a plan"]],
    whyTitle: "Why Mandruy",
    why: [
      { t: "One place for everything", d: "Visa, insurance, documents and residence — no juggling separate agencies." },
      { t: "Support in English, 24/7", d: "Reach a real person in any time zone — Telegram, WhatsApp, phone." },
      { t: "Fair, upfront prices", d: "Transparent fees with no hidden costs. You see the final sum before you start." },
      { t: "Start before you arrive", d: "Most steps are handled remotely, so your paperwork is ready when you land." },
    ],
    faqTitle: "Answers to your questions",
    blogTitle: "Guides for your stay",
    ctaTitle: "Planning your move to Ukraine?",
    ctaText: "Tell us your goal — we’ll map your visa, entry and residence into one clear plan.",
    leadTag: "Get started",
    leadTitle: "Tell us your goal — we’ll map the path",
    leadText: "Leave a request and a lawyer will confirm your visa, entry and residence options in one clear plan. Free consultation, answer within 15 minutes.",
    leadPts: ["In English, 24/7", "Start before you arrive", "Transparent, upfront pricing"],
  },
  uk: {
    statement: "Бюрократія — наша.<br>Подорож — ваша.",
    cards: [
      { n: "01", t: "Документ для в’їзду", d: "Підтвердимо, чи потрібна віза, e-Visa, чи можна безвізово — і допоможемо оформити.", href: "/services/visa/" },
      { n: "02", t: "Підстава для перебування", d: "Робота, навчання, сім’я чи інвестиції стають законною підставою для перебування.", href: "/services/residence/" },
      { n: "03", t: "Посвідка на проживання", d: "Оформимо посвідку на тимчасове проживання й зареєструємо ваше перебування.", href: "/services/residence/" },
    ],
    servicesTitle: "Що ми беремо на себе",
    servicesSub: "Від візи до посвідки на проживання — кожен крок в одному місці.",
    panoTitle: "Закохайтесь в Україну — паперами займемось ми",
    stats: [[120000, "іноземцям допомогли"], [90, "громадянств"], [7, "днів у середньому до плану"]],
    whyTitle: "Чому Мандруй",
    why: [
      { t: "Усе в одному місці", d: "Віза, страхування, документи й посвідка — без десятків окремих агенцій." },
      { t: "Підтримка англійською, 24/7", d: "Реальна людина на зв’язку в будь-якому часовому поясі — Telegram, WhatsApp, телефон." },
      { t: "Чесні ціни наперед", d: "Прозора вартість без прихованих платежів. Ви бачите фінальну суму до старту." },
      { t: "Почніть до приїзду", d: "Більшість кроків — дистанційно, тож документи готові ще до приземлення." },
    ],
    faqTitle: "Відповіді на ваші запитання",
    blogTitle: "Гайди для вашого перебування",
    ctaTitle: "Плануєте переїзд до України?",
    ctaText: "Розкажіть про вашу мету — складемо візу, в’їзд і посвідку в один зрозумілий план.",
    leadTag: "Почнімо",
    leadTitle: "Розкажіть про мету — складемо шлях",
    leadText: "Залиште заявку — юрист підтвердить варіанти візи, в’їзду та посвідки в одному плані. Безкоштовна консультація, відповідь за 15 хвилин.",
    leadPts: ["Англійською, 24/7", "Старт ще до приїзду", "Прозорі ціни наперед"],
  },
};

/* Small vector Ukraine thumbnail (varied hue per article). */
function thumb(i) {
  const hues = [212, 262, 190, 38];
  const h = hues[i % hues.length];
  const id = "tg" + i;
  return `<svg class="post__img" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h},86%,60%)"/><stop offset="1" stop-color="#ffe0a0"/></linearGradient></defs>
    <rect width="400" height="225" fill="url(#${id})"/>
    <circle cx="314" cy="70" r="42" fill="#fff5cf" opacity=".95"/>
    <path d="M0 152 L110 122 L230 154 L330 124 L400 150 V225 H0Z" fill="#ffffff" opacity=".2"/>
    <g fill="#243a7a" opacity=".82" transform="translate(40,152)"><rect x="0" y="-32" width="10" height="32"/><path d="M0 -32 l5 -11 l5 11Z" fill="#ffce3a"/><rect x="28" y="-22" width="34" height="22"/><path d="M28 -22 q17 -20 34 0Z"/><ellipse cx="45" cy="-24" rx="7" ry="9" fill="#ffce3a"/><rect x="84" y="-36" width="8" height="36"/><path d="M84 -36 l4 -8 l4 8Z" fill="#ffce3a"/><rect x="110" y="-18" width="48" height="18"/></g>
  </svg>`;
}

export function homePage({ locale, services, articles }) {
  const c = copy[locale];

  const heroCards = c.cards
    .map((cd, i) => `<a class="st-card reveal" style="--i:${i}" href="${localizePath(cd.href, locale)}">
      <span class="st-card__n">${cd.n}</span>
      <h3>${esc(cd.t)}</h3>
      <p>${esc(cd.d)}</p>
      <span class="st-card__go">${icons.arrow}</span>
    </a>`)
    .join("");

  const serviceCards = services
    .map((s, i) => `<a class="svc reveal svc--${s.accent}" style="--i:${i}" href="${localizePath(`/services/${s.slug}/`, locale)}">
      <span class="svc__ic">${serviceIcon(s.icon)}</span>
      <h3 class="svc__name">${esc(pick(s.name, locale))}</h3>
      <p class="svc__tag">${esc(pick(s.tagline, locale))}</p>
      <span class="svc__foot"><span class="svc__price">${esc(t(locale, "misc.from"))} ${esc(pick(s.priceFrom, locale))}</span><span class="svc__go">${icons.arrow}</span></span>
    </a>`)
    .join("");

  const panoStats = c.stats
    .map(([n, l]) => `<div class="stat reveal"><span><span class="stat__big" data-count="${n}">0</span>+</span><span class="stat__label">${esc(l)}</span></div>`)
    .join("");

  const whyCards = c.why
    .map((w, i) => `<div class="why reveal" style="--i:${i}"><span class="why__ic">${icons.check}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`)
    .join("");

  const faqItems = homeFaq
    .map((f) => `<details class="faq reveal"><summary>${esc(pick(f.q, locale))}<span class="faq__i"></span></summary><div class="faq__a"><p>${esc(pick(f.a, locale))}</p></div></details>`)
    .join("");

  const posts = articles
    .slice(0, 3)
    .map((a, i) => `<a class="post post--img reveal" href="${localizePath(`/blog/${a.slug}/`, locale)}">
      ${thumb(i)}
      <span class="post__cat">${esc(pick(a.category, locale))}</span>
      <h3>${esc(pick(a.title, locale))}</h3>
      <p>${esc(pick(a.description, locale))}</p>
      <span class="post__meta">${a.read} ${esc(t(locale, "misc.min_read"))} <span class="post__go">${icons.arrow}</span></span>
    </a>`)
    .join("");

  const leadPts = c.leadPts.map((p) => `<li><span class="bic">${icons.check}</span>${esc(p)}</li>`).join("");

  return `
<div class="day-bg" aria-hidden="true"></div>
<section class="hero hero--statement">
  <div class="container">
    <h1 class="st-title reveal">${c.statement}</h1>
    <div class="st-cards">${heroCards}</div>
  </div>
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

<section class="pano" aria-label="Ukraine">
  <div class="pano__img" data-parallax style="background-image:url(/assets/img/ukraine-pano.svg)"></div>
  <div class="pano__overlay"><div class="container">
    <h2 class="reveal">${esc(c.panoTitle)}</h2>
    <div class="pano__stats">${panoStats}</div>
  </div></div>
</section>

<section class="section">
  <div class="container">
    <header class="sec-head reveal"><span class="sec-tag">${esc(t(locale, "misc.why_us"))}</span><h2>${esc(c.whyTitle)}</h2></header>
    <div class="why-grid">${whyCards}</div>
  </div>
</section>

<section class="section section--tint" id="faq">
  <div class="container container--narrow">
    <header class="sec-head reveal"><span class="sec-tag">FAQ</span><h2>${esc(c.faqTitle)}</h2></header>
    <div class="faq-list">${faqItems}</div>
  </div>
</section>

<section class="section" id="start">
  <div class="container lead-sec">
    <div class="lead-sec__copy reveal">
      <span class="sec-tag">${esc(c.leadTag)}</span>
      <h2>${esc(c.leadTitle)}</h2>
      <p>${esc(c.leadText)}</p>
      <ul class="lead-sec__pts">${leadPts}</ul>
    </div>
    <div class="lead-sec__form reveal">
      <div class="hero__form-card">
        <span class="hero__badge">${icons.clock} ${esc(t(locale, "misc.online"))}</span>
        ${leadForm({ locale, id: "home-lead", source: "home", compact: false })}
      </div>
    </div>
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
