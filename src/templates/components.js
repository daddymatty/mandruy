/* Shared UI: header, footer, lead form, CTA, messengers, icons, logo. Locale-aware. */
import { site, mainNav } from "../data/site.js";
import { services } from "../data/services.js";
import { t, pick, localizePath } from "../lib/i18n.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- Inline SVG icons (no extra requests) ---------- */
export const icons = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  passport: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.6"/><path d="M9 15.4c.8-1 1.9-1.5 3-1.5s2.2.5 3 1.5"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2 2 2 0 000 4 2 2 0 010 4H5a2 2 0 01-2-2 2 2 0 000-4 2 2 0 010-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M16 8l-2.5 5.5L8 16l2.5-5.5z"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18V7M3 12h13a4 4 0 014 4v2M3 18h18M7 12V9h5v3"/></svg>',
  signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 20v-4M10 20v-8M15 20V8M20 20V4"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 16l1-5a2 2 0 012-1.6h8A2 2 0 0116 11l1 5M4 16h16v3h-3v-2H7v2H4zM7 16a1.5 1.5 0 100-.01M17 16a1.5 1.5 0 100-.01"/></svg>',
  id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.6-1.3 1.8-2 3-2s2.4.7 3 2M14 9h5M14 12.5h5M14 16h3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-6 8 6M6 10v9h12v-9M10 19v-5h4v5"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18"/></svg>',
  stamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6a2 2 0 012 2v3a2 2 0 01-2 2h-1l1 5H8l1-5H8a2 2 0 01-2-2V5a2 2 0 012-2zM5 21h14"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 006 0L7 7zM17 7l-3 7a3 3 0 006 0l-3-7zM8 21h8"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 21l2-6 8-4a1.5 1.5 0 000-3l-14 5a1 1 0 00-.1 1.8L9 13l1 2z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18"><path d="M5 13l4 4L19 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 19.4 7.4 12.9l-5-4.3L9 8z"/></svg>',
};

export function serviceIcon(name) {
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${
    (icons[name] || icons.compass).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")
  }</svg>`;
}

/* ---------- Logo: animated paper-plane mark + wordmark ---------- */
export function logo(locale) {
  const word = locale === "en" ? site.nameLatin : site.name;
  return `<span class="logo__mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path class="logo__plane" d="M4 16L28 5l-6 22-6-9-8-2z" fill="currentColor"/><circle class="logo__dot" cx="16" cy="16" r="2.2"/></svg></span><span class="logo__word">${esc(word)}</span>`;
}

/* ---------- Header ---------- */
export function header({ locale, currentPath = "", alternates = [] }) {
  const home = localizePath("/", locale);
  const nav = mainNav
    .map((item) => {
      const href = localizePath(item.href, locale);
      const active = currentPath === href ? ' aria-current="page"' : "";
      if (item.dropdown === "services") {
        const links = services
          .map((s) => `<a href="${localizePath(`/services/${s.slug}/`, locale)}"><span class="dd__ic">${serviceIcon(s.icon)}</span>${esc(pick(s.name, locale))}</a>`)
          .join("");
        return `<li class="has-dd"><a class="nav__link" href="${href}"${active}>${esc(t(locale, item.key))}<i class="caret"></i></a><div class="dd">${links}</div></li>`;
      }
      return `<li><a class="nav__link" href="${href}"${active}>${esc(t(locale, item.key))}</a></li>`;
    })
    .join("");

  const other = alternates.find((a) => a.locale !== locale);
  const langSwitch = other
    ? `<a class="lang" href="${other.href}" hreflang="${other.locale}" aria-label="${other.locale === "en" ? "English" : "Українська"}">${other.locale === "en" ? "EN" : "UA"}</a>`
    : "";

  const mobileItems = mainNav
    .map((item) => {
      const href = localizePath(item.href, locale);
      if (item.dropdown === "services") {
        const links = services.map((s) => `<a href="${localizePath(`/services/${s.slug}/`, locale)}">${esc(pick(s.name, locale))}</a>`).join("");
        return `<details><summary>${esc(t(locale, item.key))}<span>+</span></summary>${links}</details>`;
      }
      return `<a href="${href}">${esc(t(locale, item.key))}</a>`;
    })
    .join("");

  return `<header class="site-header" data-header>
  <div class="container header__bar">
    <a class="logo" href="${home}" aria-label="${esc(site.name)}">${logo(locale)}</a>
    <nav class="nav" aria-label="Main"><ul class="nav__list">${nav}</ul></nav>
    <div class="header__cta">
      ${langSwitch}
      <a class="btn btn--ghost btn--sm" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.consult"))}</a>
    </div>
    <button class="burger" data-burger aria-label="Menu" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="mobile-nav" id="mnav" data-mobile-nav>
  ${mobileItems}
  <div class="mnav__foot">
    ${langSwitch}
    <a class="btn btn--primary btn--block" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.consult"))}</a>
  </div>
</div>`;
}

/* ---------- Breadcrumbs ---------- */
export function breadcrumbs(items) {
  const lis = items
    .map((it, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(it.name)}</li>`
        : `<li><a href="${it.href}">${esc(it.name)}</a></li>`
    )
    .join("");
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="container"><ol>${lis}</ol></div></nav>`;
}

/* ---------- Lead form ---------- */
export function leadForm({ locale, id = "lead", source = "site", compact = false } = {}) {
  return `<form class="lead" id="${id}" data-lead-form${site.leadEndpoint ? ` data-endpoint="${esc(site.leadEndpoint)}"` : ""}>
    <input type="hidden" name="source" value="${esc(source)}">
    <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">
    <h3 class="lead__title">${esc(t(locale, "form.title"))}</h3>
    <p class="lead__note">${esc(t(locale, "form.note"))}</p>
    <div class="form-note" role="status" aria-live="polite">${esc(t(locale, "form.ok"))}</div>
    <div class="field"><label for="${id}-name">${esc(t(locale, "form.name"))}</label><input id="${id}-name" name="name" type="text" required autocomplete="name" placeholder="${esc(t(locale, "form.name"))}"></div>
    <div class="field"><label for="${id}-phone">${esc(t(locale, "form.phone"))}</label><input id="${id}-phone" name="phone" type="tel" required autocomplete="tel" placeholder="+38 (0__) ___-__-__"></div>
    ${compact ? "" : `<div class="field"><label for="${id}-msg">${esc(t(locale, "form.msg"))}</label><textarea id="${id}-msg" name="message" rows="2" placeholder="${esc(t(locale, "form.msg_ph"))}"></textarea></div>`}
    <button class="btn btn--primary btn--block" type="submit">${esc(t(locale, "form.submit"))}</button>
    <p class="lead__consent">${esc(t(locale, "form.consent_a"))} <a href="${localizePath("/privacy/", locale)}">${esc(t(locale, "form.consent_b"))}</a>.</p>
  </form>`;
}

/* ---------- CTA band ---------- */
export function ctaBand({ locale, title, text }) {
  return `<section class="section"><div class="container"><div class="cta reveal">
    <div class="cta__blob" aria-hidden="true"></div>
    <div class="cta__body">
      <h2>${esc(title)}</h2><p>${esc(text)}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--light" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.consult"))} ${icons.arrow}</a>
      <a class="btn btn--ghost-light" href="tel:${site.phoneHref}">${icons.phone} ${esc(site.phoneDisplay)}</a>
    </div>
  </div></div></section>`;
}

/* ---------- Floating messengers + sticky mobile CTA ---------- */
export function messengers(locale) {
  const tg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.8 15.6l-.4 4c.5 0 .8-.2 1-.5l2.4-2.3 5 3.6c.9.5 1.6.2 1.8-.8l3.3-15.4c.3-1.3-.5-1.8-1.4-1.5L2 9.2c-1.3.5-1.3 1.2-.2 1.5l5 1.6L18 5.4c.5-.4 1-.2.6.2"/></svg>';
  const wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.8-.9 1.7-.6 2.8.6 2 2 3.6 3.9 4.6 2.4 1.2 2.9.9 3.4.9.7-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1z"/></svg>';
  return `<div class="messengers" aria-label="Messengers">
    <a class="m m--tg" href="${site.messengers.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${tg}</a>
    <a class="m m--wa" href="${site.messengers.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${wa}</a>
  </div>
  <div class="sticky-cta" aria-label="Quick actions">
    <a class="s-call" href="tel:${site.phoneHref}">${icons.phone} ${esc(t(locale, "cta.call"))}</a>
    <a class="s-cta" href="${localizePath("/contacts/", locale)}#lead">${esc(t(locale, "cta.consult"))}</a>
  </div>`;
}

/* ---------- Footer ---------- */
export function footer({ locale }) {
  const serviceLinks = services
    .map((s) => `<li><a href="${localizePath(`/services/${s.slug}/`, locale)}">${esc(pick(s.name, locale))}</a></li>`)
    .join("");
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="logo logo--light" href="${localizePath("/", locale)}" aria-label="${esc(site.name)}">${logo(locale)}</a>
        <p>${esc(t(locale, "foot.tagline"))}</p>
        <div class="footer__social">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
          <a href="${site.social.telegram}" target="_blank" rel="noopener" aria-label="Telegram">TG</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
          <a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">YT</a>
        </div>
      </div>
      <div><h4>${esc(t(locale, "foot.services"))}</h4><ul>${serviceLinks}</ul></div>
      <div><h4>${esc(t(locale, "foot.company"))}</h4><ul>
        <li><a href="${localizePath("/about/", locale)}">${esc(t(locale, "nav.about"))}</a></li>
        <li><a href="${localizePath("/blog/", locale)}">${esc(t(locale, "nav.blog"))}</a></li>
        <li><a href="${localizePath("/contacts/", locale)}">${esc(t(locale, "nav.contacts"))}</a></li>
        <li><a href="${localizePath("/sitemap/", locale)}">${esc(t(locale, "foot.sitemap"))}</a></li>
      </ul></div>
      <div><h4>${esc(t(locale, "foot.contacts"))}</h4><ul>
        <li><a href="tel:${site.phoneHref}">${esc(site.phoneDisplay)}</a></li>
        <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
        <li>${esc(t(locale, "misc.support_24_7"))}</li>
      </ul></div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>2026</span> ${esc(site.legalName)}. ${esc(t(locale, "foot.rights"))}</span>
      <span><a href="${localizePath("/privacy/", locale)}">${esc(t(locale, "foot.privacy"))}</a></span>
    </div>
  </div>
</footer>${messengers(locale)}`;
}
