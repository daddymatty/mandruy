/* Home page — foreigners visiting & legally staying in Ukraine. Kinetic. */
import { site } from "../data/site.js";
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, serviceIcon, leadForm, ctaBand } from "./components.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const copy = {
  en: {
    kicker: "For foreigners visiting Ukraine",
    h1a: "Visit Ukraine",
    h1b: "and stay legally",
    sub: "Visas, entry documents and residence permits for foreigners. We guide you from your first visa to a legal, long-term stay — online and in English.",
    trust: ["foreigners helped", "nationalities", "immigration experts"],
    kinetic: ["Visa", "Entry", "Residence", "Ukraine", "Stay legal"],
    servicesTitle: "What we handle",
    servicesSub: "From your visa to your residence permit — every step in one place.",
    journeyTag: "Your journey",
    journeyTitle: "From arrival to a legal stay",
    journeySub: "Four steps take you from your entry document to a residence permit. Scroll to see how.",
    steps: [
      { t: "Get your entry document", d: "We confirm whether you need a visa, an e-Visa or can enter visa-free — and help you obtain it." },
      { t: "Enter Ukraine", d: "Cross the border with a valid passport, medical insurance and proof of your purpose of stay." },
      { t: "Establish your grounds", d: "A job, studies, family or investment becomes the legal basis for staying long term." },
      { t: "Get your residence permit", d: "We file your temporary residence permit and register your stay — no refusals over details." },
    ],
    whyTitle: "Why Mandruy",
    why: [
      { t: "One place for everything", d: "Visa, insurance, documents and residence — no juggling separate agencies." },
      { t: "Support in English, 24/7", d: "Reach a real person in any time zone — Telegram, WhatsApp, phone." },
      { t: "Fair, upfront prices", d: "Transparent fees with no hidden costs. You see the final sum before you start." },
      { t: "Start before you arrive", d: "Most steps are handled remotely, so your paperwork is ready when you land." },
    ],
    blogTitle: "Guides for your stay",
    ctaTitle: "Planning your move to Ukraine?",
    ctaText: "Tell us your goal — we’ll map your visa, entry and residence into one clear plan.",
  },
  uk: {
    kicker: "Для іноземців, що відвідують Україну",
    h1a: "Відвідайте Україну",
    h1b: "і залишайтесь легально",
    sub: "Візи, документи для в’їзду та посвідки на проживання для іноземців. Проведемо від першої візи до законного тривалого перебування — онлайн.",
    trust: ["іноземцям допомогли", "громадянств", "імміграційних експертів"],
    kinetic: ["Віза", "В’їзд", "ВНЖ", "Україна", "Легально"],
    servicesTitle: "Що ми беремо на себе",
    servicesSub: "Від візи до посвідки на проживання — кожен крок в одному місці.",
    journeyTag: "Ваш шлях",
    journeyTitle: "Від приїзду до законного перебування",
    journeySub: "Чотири кроки ведуть вас від документа на в’їзд до посвідки. Прокрутіть, щоб побачити.",
    steps: [
      { t: "Отримайте документ для в’їзду", d: "Підтвердимо, чи потрібна віза, e-Visa, чи можна безвізово — і допоможемо оформити." },
      { t: "В’їдьте в Україну", d: "Перетніть кордон з дійсним паспортом, медичним страхуванням і підтвердженням мети перебування." },
      { t: "Встановіть підставу", d: "Робота, навчання, сім’я чи інвестиції стають законною підставою для тривалого перебування." },
      { t: "Отримайте посвідку", d: "Оформимо посвідку на тимчасове проживання й зареєструємо перебування — без відмов через дрібниці." },
    ],
    whyTitle: "Чому Мандруй",
    why: [
      { t: "Усе в одному місці", d: "Віза, страхування, документи й посвідка — без десятків окремих агенцій." },
      { t: "Підтримка англійською, 24/7", d: "Реальна людина на зв’язку в будь-якому часовому поясі — Telegram, WhatsApp, телефон." },
      { t: "Чесні ціни наперед", d: "Прозора вартість без прихованих платежів. Ви бачите фінальну суму до старту." },
      { t: "Почніть до приїзду", d: "Більшість кроків — дистанційно, тож документи готові ще до вашого приземлення." },
    ],
    blogTitle: "Гайди для вашого перебування",
    ctaTitle: "Плануєте переїзд до України?",
    ctaText: "Розкажіть про вашу мету — складемо візу, в’їзд і посвідку в один зрозумілий план.",
  },
};

export function homePage({ locale, services, articles }) {
  const c = copy[locale];

  const serviceCards = services
    .map(
      (s, i) => `<a class="svc reveal tilt svc--${s.accent}" style="--i:${i}" href="${localizePath(`/services/${s.slug}/`, locale)}">
      <span class="svc__ic">${serviceIcon(s.icon)}</span>
      <h3 class="svc__name">${esc(pick(s.name, locale))}</h3>
      <p class="svc__tag">${esc(pick(s.tagline, locale))}</p>
      <span class="svc__foot"><span class="svc__price">${esc(t(locale, "misc.from"))} ${esc(pick(s.priceFrom, locale))}</span><span class="svc__go">${icons.arrow}</span></span>
    </a>`
    )
    .join("");

  const whyCards = c.why
    .map((w, i) => `<div class="why reveal" style="--i:${i}"><span class="why__ic">${icons.check}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`)
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

  const marquee = services.concat(services).map((s) => `<span>${esc(pick(s.name, locale))}</span><i>${icons.plane}</i>`).join("");

  const passT = locale === "en"
    ? [["Entry", "Visa / e-Visa"], ["Basis", "Work · Study · Family"], ["Result", "Residence permit"]]
    : [["В’їзд", "Віза / e-Visa"], ["Підстава", "Робота · Навчання · Сім’я"], ["Результат", "Посвідка"]];
  const passHtml = passT.map(([a, b]) => `<div><small>${esc(a)}</small><b>${esc(b)}</b></div>`).join("");
  const trust = locale === "en"
    ? `<b>120,000+</b> foreigners helped · <b>90+</b> nationalities · support in English`
    : `<b>120 000+</b> іноземцям допомогли · <b>90+</b> громадянств · підтримка англійською`;

  const kw = c.kinetic;
  const kRow = (arr) => arr.concat(arr).map((w, i) => `<span class="${i % 2 ? "fill" : ""}">${esc(w)}</span><i>${icons.plane}</i>`).join("");

  const stepCards = c.steps
    .map((s, i) => `<article class="sc-step${i === 0 ? " is-active" : ""}" data-step="${i}"><span class="sc-step__n">0${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></article>`)
    .join("");
  const dots = c.steps.map((_, i) => `<b${i === 0 ? ' class="on"' : ""}></b>`).join("");

  return `
<div class="day-bg" aria-hidden="true"></div>
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__copy">
      <span class="kicker reveal"><span class="pulse"></span>${esc(c.kicker)}</span>
      <h1 class="hero__title"><span class="reveal-word">${esc(c.h1a)}</span><br><span class="reveal-word ital">${esc(c.h1b)}</span></h1>
      <p class="hero__sub reveal">${esc(c.sub)}</p>
      <div class="hero__actions reveal">
        <a class="btn btn--primary btn--lg magnetic" href="${localizePath("/services/", locale)}">${esc(t(locale, "nav.services"))} ${icons.arrow}</a>
        <a class="btn btn--ghost btn--lg" href="#journey">${esc(t(locale, "cta.details"))}</a>
      </div>
      <div class="pass reveal">${passHtml}</div>
      <p class="hero__trust reveal">${trust}</p>
    </div>
    <div class="hero__form reveal">
      <div class="hero__form-card">
        <span class="hero__badge">${icons.clock} ${esc(t(locale, "misc.online"))}</span>
        ${leadForm({ locale, id: "hero-lead", source: "home-hero", compact: true })}
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

<section class="kinetic kinetic--dark" aria-hidden="true">
  <div class="kinetic__row kinetic__row--a">${kRow(kw)}</div>
  <div class="kinetic__row kinetic__row--b">${kRow(kw.slice().reverse())}</div>
</section>

<section class="showcase" id="journey" data-showcase>
  <div class="showcase__track">
    <div class="showcase__stage">
      <span class="showcase__ghost" data-showcase-ghost aria-hidden="true">01</span>
      <div class="container showcase__inner">
        <div class="showcase__head">
          <span class="sec-tag">${esc(c.journeyTag)}</span>
          <h2>${esc(c.journeyTitle)}</h2>
          <p>${esc(c.journeySub)}</p>
        </div>
        <div class="showcase__stepwrap">${stepCards}</div>
        <div class="showcase__rail"><span data-showcase-rail></span></div>
        <div class="showcase__dots">${dots}</div>
      </div>
    </div>
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
