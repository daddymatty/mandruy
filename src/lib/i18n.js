/* Internationalization: UI dictionary + locale path helpers.
   Content data carries { uk, en } fields; UI chrome strings live here. */
import { defaultLocale } from "../data/site.js";

export const dict = {
  uk: {
    "locale.htmlLang": "uk",
    "locale.ogLocale": "uk_UA",
    "locale.name": "Українська",

    "nav.services": "Послуги",
    "nav.residence": "ВНЖ",
    "nav.visa": "Віза",
    "nav.insurance": "Страхування",
    "nav.blog": "Блог",
    "nav.about": "Про нас",
    "nav.contacts": "Контакти",
    "nav.all_services": "Усі послуги",

    "cta.consult": "Отримати консультацію",
    "cta.order": "Замовити",
    "cta.details": "Детальніше",
    "cta.all": "Дивитись усі",
    "cta.call": "Подзвонити",
    "cta.write": "Написати",
    "cta.calc": "Розрахувати вартість",
    "cta.back_home": "На головну",

    "form.title": "Залишіть заявку",
    "form.note": "Відповідаємо протягом 15 хвилин. Консультація — безкоштовно.",
    "form.name": "Ваше ім’я",
    "form.phone": "Телефон",
    "form.msg": "Коротко про запит",
    "form.msg_ph": "Куди прямуєте та що потрібно?",
    "form.submit": "Надіслати заявку",
    "form.ok": "Дякуємо! Заявку надіслано — ми зв’яжемося з вами найближчим часом.",
    "form.consent_a": "Натискаючи кнопку, ви погоджуєтесь з",
    "form.consent_b": "політикою конфіденційності",
    "form.err_name": "Вкажіть ваше ім’я",
    "form.err_phone": "Вкажіть коректний номер",

    "foot.tagline": "Візи, в’їзд і легальне перебування іноземців в Україні. 24/7.",
    "foot.services": "Послуги",
    "foot.company": "Компанія",
    "foot.contacts": "Контакти",
    "foot.rights": "Усі права захищено.",
    "foot.privacy": "Політика конфіденційності",
    "foot.sitemap": "Карта сайту",
    "foot.by": "Проєкт юридичної компанії",

    "misc.support_24_7": "Підтримка 24/7",
    "misc.online": "Онлайн за 5 хвилин",
    "misc.read_more": "Читати",
    "misc.min_read": "хв читання",
    "misc.faq": "Часті запитання",
    "misc.how": "Як це працює",
    "misc.why_us": "Чому Мандруй",
    "misc.plans": "Тарифи",
    "misc.from": "від",
    "misc.per_day": "/ день",

    "404.title": "Сторінку не знайдено",
    "404.text": "Схоже, ця сторінка вирушила в подорож без нас. Повернімося на головну.",
  },
  en: {
    "locale.htmlLang": "en",
    "locale.ogLocale": "en_US",
    "locale.name": "English",

    "nav.services": "Services",
    "nav.residence": "Residence",
    "nav.visa": "Visa",
    "nav.insurance": "Insurance",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contacts": "Contacts",
    "nav.all_services": "All services",

    "cta.consult": "Get a consultation",
    "cta.order": "Order",
    "cta.details": "Learn more",
    "cta.all": "View all",
    "cta.call": "Call us",
    "cta.write": "Message",
    "cta.calc": "Calculate the price",
    "cta.back_home": "Back home",

    "form.title": "Leave a request",
    "form.note": "We reply within 15 minutes. Consultation is free.",
    "form.name": "Your name",
    "form.phone": "Phone",
    "form.msg": "Briefly about your request",
    "form.msg_ph": "Where are you heading and what do you need?",
    "form.submit": "Send request",
    "form.ok": "Thank you! Your request has been sent — we’ll contact you shortly.",
    "form.consent_a": "By clicking the button you agree to the",
    "form.consent_b": "privacy policy",
    "form.err_name": "Please enter your name",
    "form.err_phone": "Please enter a valid number",

    "foot.tagline": "Visas, entry and legal residence for foreigners in Ukraine. 24/7.",
    "foot.services": "Services",
    "foot.company": "Company",
    "foot.contacts": "Contacts",
    "foot.rights": "All rights reserved.",
    "foot.privacy": "Privacy policy",
    "foot.sitemap": "Sitemap",
    "foot.by": "A project of the law firm",

    "misc.support_24_7": "24/7 support",
    "misc.online": "Online in 5 minutes",
    "misc.read_more": "Read",
    "misc.min_read": "min read",
    "misc.faq": "Frequently asked questions",
    "misc.how": "How it works",
    "misc.why_us": "Why Mandruy",
    "misc.plans": "Plans",
    "misc.from": "from",
    "misc.per_day": "/ day",

    "404.title": "Page not found",
    "404.text": "Looks like this page took a trip without us. Let’s head back home.",
  },
};

/* Translate a dotted key for a locale (falls back to default locale, then key). */
export function t(locale, key) {
  return (dict[locale] && dict[locale][key]) || dict[defaultLocale][key] || key;
}

/* Pick a locale value from a { uk, en } content object (string passes through). */
export function pick(val, locale) {
  if (val == null) return "";
  if (typeof val === "string") return val;
  return val[locale] != null ? val[locale] : val[defaultLocale];
}

/* Prefix a root-absolute path with the locale segment (uk = root, en = /en). */
export function localizePath(path, locale) {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}/`;
  return `/${locale}${path}`;
}
