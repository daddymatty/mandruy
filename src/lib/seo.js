/* Structured-data (JSON-LD) builders — Schema.org. Locale-aware. */
import { site } from "../data/site.js";

const abs = (p) => (p && p.startsWith("http") ? p : site.domain + (p || "/"));

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": site.domain + "/#organization",
    name: site.legalName,
    alternateName: site.nameLatin,
    url: site.domain + "/",
    logo: abs("/assets/img/logo.svg"),
    image: abs("/assets/img/og-default.svg"),
    description:
      "Сервісний портал 24/7: страхування, ВНЖ та документи, квитки, тури, готелі, eSIM і трансфери для подорожей до та з України.",
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "€",
    foundingDate: String(site.founded),
    areaServed: ["Україна", "Europe", "World"],
    sameAs: Object.values(site.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    },
  };
}

export function websiteSchema(locale = "uk") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": site.domain + "/#website",
    url: site.domain + "/",
    name: site.name,
    inLanguage: locale === "en" ? "en-US" : "uk-UA",
    publisher: { "@id": site.domain + "/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: site.domain + "/blog/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema({ name, description, url, price }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: abs(url),
    provider: { "@id": site.domain + "/#organization" },
    areaServed: { "@type": "Country", name: "Ukraine" },
    ...(price
      ? { offers: { "@type": "Offer", price: String(price).replace(/[^\d.,]/g, "") || undefined, priceCurrency: "EUR" } }
      : {}),
  };
}

export function articleSchema(article, locale = "uk") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: locale === "en" ? "en-US" : "uk-UA",
    datePublished: article.date,
    dateModified: article.modified || article.date,
    author: { "@type": "Organization", name: site.legalName, "@id": site.domain + "/#organization" },
    publisher: { "@id": site.domain + "/#organization" },
    mainEntityOfPage: abs(article.url),
    image: abs("/assets/img/og-default.svg"),
  };
}
