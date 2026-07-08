/* Static pages: about, contacts, FAQ, privacy, sitemap, 404. */
import { site } from "../data/site.js";
import { t, pick, localizePath } from "../lib/i18n.js";
import { icons, leadForm, ctaBand } from "./components.js";
import { services } from "../data/services.js";
import { homeFaq } from "../data/faq.js";
import { articles } from "../data/blog.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------------- About ---------------- */
const aboutCopy = {
  uk: {
    tag: "Про нас",
    title: "Ми спрощуємо в’їзд і перебування в Україні",
    sub: "Мандруй — сервіс для іноземців, що зібрав візи, страхування, документи та посвідки в одному місці, щоб ви легально в’їхали й залишилися в Україні без бюрократії.",
    values: [
      { t: "Турбота", d: "Ведемо кожен кейс так, ніби це наш власний переїзд." },
      { t: "Прозорість", d: "Чесні ціни й зрозумілі умови без дрібного шрифту." },
      { t: "Швидкість", d: "Старт онлайн ще до приїзду, підтримка 24/7." },
      { t: "Досвід", d: "Знаємо імміграційні правила й нюанси, тому ви уникаєте відмов." },
    ],
    story: [
      "Ми починали з простої ідеї: приїхати в Україну й легально тут залишитися має бути зрозуміло. Замість десятків інстанцій і посередників — один сервіс, де є все: від візи до посвідки.",
      "Сьогодні Мандруй допомагає іноземцям з десятків країн: оформлює візи та e-Visa, страхування, легалізацію документів і посвідки на проживання — з підтримкою англійською.",
    ],
  },
  en: {
    tag: "About",
    title: "We make entering and staying in Ukraine simple",
    sub: "Mandruy is a service for foreigners that gathers visas, insurance, documents and residence permits in one place, so you enter and stay in Ukraine legally without the bureaucracy.",
    values: [
      { t: "Care", d: "We run every case as if it were our own move abroad." },
      { t: "Transparency", d: "Fair prices and clear terms with no fine print." },
      { t: "Speed", d: "Start online before you arrive, support 24/7." },
      { t: "Experience", d: "We know immigration rules and nuances, so you avoid refusals." },
    ],
    story: [
      "We started with a simple idea: arriving in Ukraine and staying here legally should be clear. Instead of dozens of offices and middlemen — one service that covers everything from your visa to your residence permit.",
      "Today Mandruy helps foreigners from dozens of countries: visas and e-Visa, insurance, document legalization and residence permits — with support in English.",
    ],
  },
};

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function aboutPage({ locale }) {
  const c = aboutCopy[locale];
  const stats = [
    { n: fmt(site.stats.clients) + "+", label: locale === "en" ? "clients" : "клієнтів" },
    { n: site.stats.countries + "+", label: locale === "en" ? "countries" : "країн" },
    { n: site.stats.partners + "+", label: locale === "en" ? "partners" : "партнерів" },
    { n: "24/7", label: locale === "en" ? "support" : "підтримка" },
  ];
  const values = c.values.map((v, i) => `<div class="why reveal" style="--i:${i}"><span class="why__ic">${icons.check}</span><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></div>`).join("");
  const story = c.story.map((p) => `<p class="reveal">${esc(p)}</p>`).join("");
  const statTiles = stats.map((s) => `<div class="stat reveal"><span class="stat__big">${esc(s.n)}</span><span class="stat__label">${esc(s.label)}</span></div>`).join("");

  return `
<section class="page-hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span><span class="orb orb--3"></span></div>
  <div class="container">
    <span class="sec-tag reveal">${esc(c.tag)}</span>
    <h1 class="reveal">${esc(c.title)}</h1>
    <p class="page-hero__sub reveal">${esc(c.sub)}</p>
  </div>
</section>
<section class="section"><div class="container"><div class="hero__stats hero__stats--wide">${statTiles}</div></div></section>
<section class="section section--tint"><div class="container container--narrow prose">${story}</div></section>
<section class="section"><div class="container">
  <header class="sec-head reveal"><h2>${locale === "en" ? "Our values" : "Наші цінності"}</h2></header>
  <div class="why-grid">${values}</div>
</div></section>
${ctaBand({ locale, title: t(locale, "form.title"), text: c.sub })}
`;
}

/* ---------------- Contacts ---------------- */
export function contactsPage({ locale }) {
  const title = locale === "en" ? "Contacts" : "Контакти";
  const sub = locale === "en" ? "Reach us any time — we reply within 15 minutes." : "Пишіть будь-коли — відповідаємо протягом 15 хвилин.";
  const cards = [
    { ic: icons.phone, label: locale === "en" ? "Phone" : "Телефон", val: site.phoneDisplay, href: `tel:${site.phoneHref}` },
    { ic: icons.mail, label: "Email", val: site.email, href: `mailto:${site.email}` },
    { ic: icons.clock, label: locale === "en" ? "Working hours" : "Графік", val: t(locale, "misc.support_24_7"), href: "" },
  ]
    .map(
      (c) => `<div class="contact reveal"><span class="contact__ic">${c.ic}</span><div><span class="contact__label">${esc(c.label)}</span>${c.href ? `<a class="contact__val" href="${c.href}">${esc(c.val)}</a>` : `<span class="contact__val">${esc(c.val)}</span>`}</div></div>`
    )
    .join("");

  return `
<section class="page-hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span></div>
  <div class="container">
    <span class="sec-tag reveal">${esc(title)}</span>
    <h1 class="reveal">${esc(title)}</h1>
    <p class="page-hero__sub reveal">${esc(sub)}</p>
  </div>
</section>
<section class="section"><div class="container contact-grid">
  <div class="contact-grid__info">
    ${cards}
    <div class="contact__msgs reveal">
      <a class="btn btn--primary" href="${site.messengers.telegram}" target="_blank" rel="noopener">Telegram</a>
      <a class="btn btn--ghost" href="${site.messengers.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
  <div class="contact-grid__form reveal" id="lead">
    <div class="hero__form-card">${leadForm({ locale, id: "contact-lead", source: "contacts" })}</div>
  </div>
</div></section>
`;
}

/* ---------------- FAQ page ---------------- */
export function faqPage({ locale }) {
  const title = t(locale, "misc.faq");
  const items = homeFaq
    .map((f) => `<details class="faq reveal"><summary>${esc(pick(f.q, locale))}<span class="faq__i"></span></summary><div class="faq__a"><p>${esc(pick(f.a, locale))}</p></div></details>`)
    .join("");
  return `
<section class="page-hero"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span></div>
  <div class="container"><span class="sec-tag reveal">FAQ</span><h1 class="reveal">${esc(title)}</h1></div>
</section>
<section class="section"><div class="container container--narrow"><div class="faq-list">${items}</div></div></section>
${ctaBand({ locale, title: t(locale, "form.title"), text: t(locale, "form.note") })}
`;
}

/* ---------------- Privacy ---------------- */
export function privacyPage({ locale }) {
  const title = t(locale, "foot.privacy");
  const body =
    locale === "en"
      ? [
          "This policy explains how Mandruy processes personal data submitted through the website’s forms.",
          "We collect only the data you provide (name, phone, email and your request) and use it solely to process your enquiry and provide the service.",
          "We do not sell or share your data with third parties except partners strictly necessary to deliver the ordered service.",
          "You may request access to, correction of, or deletion of your data at any time by contacting us at " + site.email + ".",
        ]
      : [
          "Ця політика пояснює, як Мандруй обробляє персональні дані, надіслані через форми сайту.",
          "Ми збираємо лише ті дані, які ви надаєте (ім’я, телефон, e-mail і зміст запиту), і використовуємо їх виключно для обробки звернення та надання послуги.",
          "Ми не продаємо й не передаємо ваші дані третім особам, окрім партнерів, безпосередньо необхідних для надання замовленої послуги.",
          "Ви можете будь-коли запросити доступ, виправлення або видалення ваших даних, написавши на " + site.email + ".",
        ];
  return `
<section class="page-hero page-hero--sm"><div class="container container--narrow"><h1 class="reveal">${esc(title)}</h1></div></section>
<section class="section"><div class="container container--narrow prose">${body.map((p) => `<p>${esc(p)}</p>`).join("")}</div></section>
`;
}

/* ---------------- HTML Sitemap ---------------- */
export function sitemapPage({ locale }) {
  const title = t(locale, "foot.sitemap");
  const group = (heading, links) =>
    `<div class="sm-col reveal"><h3>${esc(heading)}</h3><ul>${links.map((l) => `<li><a href="${l.href}">${esc(l.name)}</a></li>`).join("")}</ul></div>`;
  const main = group(locale === "en" ? "Pages" : "Сторінки", [
    { name: locale === "en" ? "Home" : "Головна", href: localizePath("/", locale) },
    { name: t(locale, "nav.services"), href: localizePath("/services/", locale) },
    { name: t(locale, "nav.blog"), href: localizePath("/blog/", locale) },
    { name: t(locale, "nav.about"), href: localizePath("/about/", locale) },
    { name: t(locale, "nav.contacts"), href: localizePath("/contacts/", locale) },
    { name: "FAQ", href: localizePath("/faq/", locale) },
  ]);
  const svc = group(t(locale, "nav.services"), services.map((s) => ({ name: pick(s.name, locale), href: localizePath(`/services/${s.slug}/`, locale) })));
  const blog = group(t(locale, "nav.blog"), articles.map((a) => ({ name: pick(a.title, locale), href: localizePath(`/blog/${a.slug}/`, locale) })));
  return `
<section class="page-hero page-hero--sm"><div class="container"><h1 class="reveal">${esc(title)}</h1></div></section>
<section class="section"><div class="container"><div class="sitemap">${main}${svc}${blog}</div></div></section>
`;
}

/* ---------------- 404 ---------------- */
export function notFoundPage({ locale }) {
  return `
<section class="notfound"><div class="page-hero__bg" aria-hidden="true"><span class="orb orb--1"></span><span class="orb orb--2"></span><span class="orb orb--3"></span></div>
  <div class="container">
    <span class="notfound__big">404</span>
    <h1>${esc(t(locale, "404.title"))}</h1>
    <p>${esc(t(locale, "404.text"))}</p>
    <a class="btn btn--primary btn--lg" href="${localizePath("/", locale)}">${icons.plane} ${esc(t(locale, "cta.back_home"))}</a>
  </div>
</section>
`;
}
