/* Global site configuration: brand, contacts, locales, navigation.
   Locale-specific UI strings live in src/lib/i18n.js. */
export const site = {
  name: "Мандруй",
  nameLatin: "Mandruy",
  legalName: "Сервіс «Мандруй»",
  domain: "https://mandruy.example",
  founded: 2025,

  phoneDisplay: "+38 (044) 000 24 07",
  phoneHref: "+380440002407",
  email: "hello@mandruy.example",

  /* Lead-form endpoint (proxy that forwards to Telegram/CRM).
     Empty = form falls back to localStorage only. */
  leadEndpoint: "",

  /* Analytics — empty = disabled (no GA scripts, no extra CSP domains). */
  analytics: { ga4: "", gscVerification: "" },

  messengers: {
    telegram: "https://t.me/mandruy",
    whatsapp: "https://wa.me/380440002407",
    viber: "viber://chat?number=%2B380440002407",
  },
  social: {
    instagram: "https://instagram.com/mandruy",
    facebook: "https://facebook.com/mandruy",
    telegram: "https://t.me/mandruy",
    youtube: "https://youtube.com/@mandruy",
  },
  rating: { value: "4.9", count: 1280 },
  stats: {
    clients: 120000,
    countries: 90,
    partners: 40,
  },
};

/* Supported locales. The default locale is the root ("/"); others are
   path-prefixed ("/uk/"). Audience is foreigners, so English is the default. */
export const locales = ["en", "uk"];
export const defaultLocale = "en";

/* Primary navigation — labels resolved per-locale from i18n; `key` maps to dict. */
export const mainNav = [
  { key: "nav.services", href: "/services/", dropdown: "services" },
  { key: "nav.residence", href: "/services/residence/" },
  { key: "nav.visa", href: "/services/visa/" },
  { key: "nav.blog", href: "/blog/" },
  { key: "nav.contacts", href: "/contacts/" },
];
