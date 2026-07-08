/* Service catalogue. Each service is fully bilingual ({ uk, en }).
   Drives: home service grid, /services/ index, and each /services/<slug>/ page. */

export const services = [
  {
    slug: "insurance",
    icon: "shield",
    accent: "sky",
    featured: true,
    name: { uk: "Страхування", en: "Insurance" },
    tagline: {
      uk: "Тревел- і медичне страхування з покриттям воєнних ризиків.",
      en: "Travel & medical insurance with war-risk coverage.",
    },
    priceFrom: { uk: "0,80 €", en: "€0.80" },
    metaTitle: {
      uk: "Страхування для подорожей онлайн — оформити поліс за 5 хвилин | Мандруй",
      en: "Travel insurance online — get a policy in 5 minutes | Mandruy",
    },
    metaDescription: {
      uk: "Медичне та тревел-страхування онлайн від 0,80 €/день: покриття воєнних ризиків, Green Card на авто, поліси для ВНЖ. Оформлення за 5 хвилин, підтримка 24/7.",
      en: "Medical and travel insurance online from €0.80/day: war-risk coverage, car Green Card, residence-permit policies. Issued in 5 minutes, 24/7 support.",
    },
    hero: {
      uk: "Застрахуйте подорож за 5 хвилин",
      en: "Insure your trip in 5 minutes",
    },
    intro: {
      uk: "Оформлюйте медичне та туристичне страхування онлайн — без черг і паперів. Поліс приходить на пошту одразу після оплати й приймається консульствами, прикордонниками та міграційними службами.",
      en: "Buy medical and travel insurance online — no queues, no paperwork. The policy arrives by email right after payment and is accepted by consulates, border guards and migration services.",
    },
    benefits: [
      { uk: "Покриття воєнних ризиків у поліси", en: "War-risk coverage included in policies" },
      { uk: "Приймається для віз, ВНЖ і перетину кордону", en: "Accepted for visas, residence permits and border crossing" },
      { uk: "Ліміт покриття до 50 000 €", en: "Coverage limit up to €50,000" },
      { uk: "Оплата карткою онлайн, поліс — миттєво", en: "Pay online by card, policy issued instantly" },
    ],
    plans: [
      {
        name: { uk: "Тревел", en: "Travel" },
        price: { uk: "0,80 €", en: "€0.80" },
        period: { uk: "/ день", en: "/ day" },
        features: {
          uk: ["3–90 днів", "Медичні витрати до 30 000 €", "Ковід і нещасні випадки"],
          en: ["3–90 days", "Medical costs up to €30,000", "Covid & accidents"],
        },
      },
      {
        name: { uk: "Захист+", en: "Shield+" },
        price: { uk: "1,60 €", en: "€1.60" },
        period: { uk: "/ день", en: "/ day" },
        best: true,
        features: {
          uk: ["Воєнні ризики", "Покриття до 50 000 €", "Евакуація та репатріація"],
          en: ["War risks", "Coverage up to €50,000", "Evacuation & repatriation"],
        },
      },
      {
        name: { uk: "Рік захисту", en: "Year of Shield" },
        price: { uk: "від 89 €", en: "from €89" },
        period: { uk: "/ рік", en: "/ year" },
        features: {
          uk: ["Річний поліс для ВНЖ", "Відповідає вимогам міграційної служби", "Воєнні ризики включено"],
          en: ["Annual policy for residence permit", "Meets migration-service requirements", "War risks included"],
        },
      },
    ],
  },
  {
    slug: "documents",
    icon: "passport",
    accent: "violet",
    featured: true,
    name: { uk: "ВНЖ та документи", en: "Residence & documents" },
    tagline: {
      uk: "Візи, ВНЖ, легалізація та юридичний супровід під ключ.",
      en: "Visas, residence permits, legalization & full legal support.",
    },
    priceFrom: { uk: "25 €", en: "€25" },
    metaTitle: {
      uk: "ВНЖ, візи та документи — юридичний супровід іноземців і українців | Мандруй",
      en: "Residence permits, visas & documents — legal support | Mandruy",
    },
    metaDescription: {
      uk: "Оформлення ВНЖ, віз, легалізація документів і юридичні консультації для іноземців та українців. Супровід під ключ: збір документів, подача, контроль строків.",
      en: "Residence permits, visas, document legalization and legal consultations for foreigners and Ukrainians. Turnkey support: paperwork, submission, deadline control.",
    },
    hero: {
      uk: "ВНЖ та документи без черг",
      en: "Residence & documents without queues",
    },
    intro: {
      uk: "Проведемо через увесь шлях: від консультації до отримання документа. Наші юристи знають актуальні вимоги, тому ви не втрачаєте час на переробки й повторні подачі.",
      en: "We guide you through the whole path: from a consultation to the document in hand. Our lawyers know the current requirements, so you don’t waste time on redos and resubmissions.",
    },
    benefits: [
      { uk: "Персональний юрист на весь процес", en: "A dedicated lawyer for the whole process" },
      { uk: "Актуальні вимоги — без відмов через дрібниці", en: "Up-to-date requirements — no refusals over trifles" },
      { uk: "Контроль строків і нагадування", en: "Deadline tracking and reminders" },
      { uk: "Онлайн-консультації будь-де у світі", en: "Online consultations anywhere in the world" },
    ],
    plans: [
      {
        name: { uk: "Консультація", en: "Consultation" },
        price: { uk: "25 €", en: "€25" },
        period: { uk: "/ година", en: "/ hour" },
        features: {
          uk: ["Розбір вашої ситуації", "Перелік документів", "План дій"],
          en: ["Review of your case", "Document checklist", "Action plan"],
        },
      },
      {
        name: { uk: "Супровід ВНЖ", en: "Residence support" },
        price: { uk: "від 350 €", en: "from €350" },
        period: { uk: "", en: "" },
        best: true,
        features: {
          uk: ["Збір і підготовка пакета", "Подача та контроль", "Необмежені консультації"],
          en: ["Collecting & preparing the package", "Submission & control", "Unlimited consultations"],
        },
      },
      {
        name: { uk: "Легалізація", en: "Legalization" },
        price: { uk: "від 60 €", en: "from €60" },
        period: { uk: "", en: "" },
        features: {
          uk: ["Апостиль і переклади", "Нострифікація", "Кур’єрська доставка"],
          en: ["Apostille & translations", "Nostrification", "Courier delivery"],
        },
      },
    ],
  },
  {
    slug: "tickets",
    icon: "ticket",
    accent: "sky",
    featured: true,
    name: { uk: "Квитки", en: "Tickets" },
    tagline: {
      uk: "Автобуси, потяги й авіа до та з України — в одному місці.",
      en: "Buses, trains and flights to and from Ukraine — in one place.",
    },
    priceFrom: { uk: "12 €", en: "€12" },
    metaTitle: {
      uk: "Квитки на автобус, потяг та літак до і з України онлайн | Мандруй",
      en: "Bus, train and flight tickets to and from Ukraine online | Mandruy",
    },
    metaDescription: {
      uk: "Купуйте квитки на автобуси, потяги та авіарейси до та з України онлайн. Порівняння цін, зручні пересадки, електронні квитки на пошту.",
      en: "Buy bus, train and flight tickets to and from Ukraine online. Price comparison, convenient connections, e-tickets by email.",
    },
    hero: { uk: "Квитки в будь-який куточок", en: "Tickets to anywhere" },
    intro: {
      uk: "Порівнюйте маршрути й перевізників, обирайте зручний час і оплачуйте онлайн. Електронний квиток приходить одразу — залишається тільки вирушати.",
      en: "Compare routes and carriers, pick a convenient time and pay online. The e-ticket arrives instantly — all that’s left is to set off.",
    },
    benefits: [
      { uk: "Автобуси, потяги та авіа в одному пошуку", en: "Buses, trains and flights in one search" },
      { uk: "Прозорі ціни без прихованих комісій", en: "Transparent prices, no hidden fees" },
      { uk: "Електронні квитки на пошту", en: "E-tickets by email" },
      { uk: "Підтримка при змінах у розкладі", en: "Support if the schedule changes" },
    ],
  },
  {
    slug: "tours",
    icon: "compass",
    accent: "sun",
    name: { uk: "Тури", en: "Tours" },
    tagline: {
      uk: "Готові й авторські маршрути Україною та світом.",
      en: "Ready-made and bespoke routes across Ukraine and the world.",
    },
    priceFrom: { uk: "45 €", en: "€45" },
    metaTitle: {
      uk: "Тури Україною та за кордон — авторські маршрути й екскурсії | Мандруй",
      en: "Tours across Ukraine and abroad — bespoke routes & excursions | Mandruy",
    },
    metaDescription: {
      uk: "Найбільша база турів та екскурсій: гори, море, міста, гастрономія. Готові маршрути й індивідуальні подорожі під ваш запит і бюджет.",
      en: "The largest base of tours and excursions: mountains, sea, cities, gastronomy. Ready routes and tailor-made trips for your request and budget.",
    },
    hero: { uk: "Тури, які хочеться повторити", en: "Tours worth repeating" },
    intro: {
      uk: "Оберіть готовий маршрут або замовте індивідуальний — ми складемо програму під ваш стиль, темп і бюджет. Гіди, трансфери й проживання беремо на себе.",
      en: "Pick a ready route or order a bespoke one — we’ll build a program for your style, pace and budget. Guides, transfers and lodging are on us.",
    },
    benefits: [
      { uk: "Готові та індивідуальні маршрути", en: "Ready-made and individual routes" },
      { uk: "Перевірені гіди й перевізники", en: "Vetted guides and carriers" },
      { uk: "Уся логістика під ключ", en: "All logistics turnkey" },
      { uk: "Групові знижки", en: "Group discounts" },
    ],
  },
  {
    slug: "hotels",
    icon: "bed",
    accent: "violet",
    name: { uk: "Готелі", en: "Hotels" },
    tagline: {
      uk: "Житло для комфортного перебування — від хостелів до 5★.",
      en: "Places to stay for a comfortable trip — from hostels to 5★.",
    },
    priceFrom: { uk: "18 €", en: "€18" },
    metaTitle: {
      uk: "Готелі та житло онлайн — бронювання за найкращою ціною | Мандруй",
      en: "Hotels & stays online — book at the best price | Mandruy",
    },
    metaDescription: {
      uk: "Бронюйте готелі, апартаменти та хостели онлайн. Чесні відгуки, безкоштовне скасування, оплата на місці або карткою.",
      en: "Book hotels, apartments and hostels online. Honest reviews, free cancellation, pay on site or by card.",
    },
    hero: { uk: "Комфортне житло будь-де", en: "Comfortable stays anywhere" },
    intro: {
      uk: "Знаходьте перевірене житло за найкращою ціною — з чесними відгуками й безкоштовним скасуванням. Від бюджетних хостелів до готелів 5★.",
      en: "Find trusted places to stay at the best price — with honest reviews and free cancellation. From budget hostels to 5★ hotels.",
    },
    benefits: [
      { uk: "Безкоштовне скасування на більшість опцій", en: "Free cancellation on most options" },
      { uk: "Чесні відгуки реальних гостей", en: "Honest reviews from real guests" },
      { uk: "Найкраща ціна або повернемо різницю", en: "Best price or we refund the difference" },
      { uk: "Оплата на місці або онлайн", en: "Pay on site or online" },
    ],
  },
  {
    slug: "esim",
    icon: "signal",
    accent: "sky",
    name: { uk: "eSIM та зв’язок", en: "eSIM & connectivity" },
    tagline: {
      uk: "Інтернет у 90+ країнах одразу після приземлення.",
      en: "Internet in 90+ countries the moment you land.",
    },
    priceFrom: { uk: "4 €", en: "€4" },
    metaTitle: {
      uk: "eSIM для подорожей — мобільний інтернет у 90+ країнах | Мандруй",
      en: "Travel eSIM — mobile internet in 90+ countries | Mandruy",
    },
    metaDescription: {
      uk: "Віртуальна eSIM для подорожей: інтернет у 90+ країнах, активація за QR-кодом, без роумінгу й пластикових карток. Тарифи від 4 €.",
      en: "Virtual travel eSIM: internet in 90+ countries, QR-code activation, no roaming and no plastic cards. Plans from €4.",
    },
    hero: { uk: "Онлайн одразу після приземлення", en: "Online right after you land" },
    intro: {
      uk: "Купіть eSIM удома, активуйте QR-кодом і будьте на зв’язку одразу після приземлення — без пошуку місцевих SIM і без роумінгу.",
      en: "Buy an eSIM at home, activate it with a QR code and stay connected the moment you land — no hunting for local SIMs, no roaming.",
    },
    benefits: [
      { uk: "Покриття у 90+ країнах", en: "Coverage in 90+ countries" },
      { uk: "Активація за QR за 2 хвилини", en: "QR activation in 2 minutes" },
      { uk: "Без роумінгу й прихованих платежів", en: "No roaming, no hidden charges" },
      { uk: "Поповнення пакета онлайн", en: "Top up your package online" },
    ],
  },
  {
    slug: "transfers",
    icon: "car",
    accent: "sun",
    name: { uk: "Трансфери", en: "Transfers" },
    tagline: {
      uk: "Зустріч в аеропорту й поїздки містом без турбот.",
      en: "Airport pickup and city rides without the hassle.",
    },
    priceFrom: { uk: "15 €", en: "€15" },
    metaTitle: {
      uk: "Трансфери з аеропорту та містом — замовити авто онлайн | Мандруй",
      en: "Airport & city transfers — book a car online | Mandruy",
    },
    metaDescription: {
      uk: "Замовляйте трансфер з аеропорту, вокзалу чи готелю. Фіксована ціна наперед, зустріч із табличкою, авто під кількість пасажирів і багаж.",
      en: "Book a transfer from the airport, station or hotel. Fixed price upfront, meet & greet with a sign, a car matched to passengers and luggage.",
    },
    hero: { uk: "Вас зустрінуть і довезуть", en: "You’ll be met and driven" },
    intro: {
      uk: "Замовте трансфер наперед і не думайте про таксі після рейсу. Фіксована ціна, зустріч із табличкою й авто під ваш багаж і компанію.",
      en: "Order a transfer in advance and forget about hailing a taxi after your flight. Fixed price, meet & greet with a sign, and a car sized for your luggage and group.",
    },
    benefits: [
      { uk: "Фіксована ціна наперед", en: "Fixed price upfront" },
      { uk: "Зустріч із табличкою в аеропорту", en: "Meet & greet with a sign at the airport" },
      { uk: "Авто під пасажирів і багаж", en: "A car sized for passengers and luggage" },
      { uk: "Відстеження рейсу — не поспішайте", en: "Flight tracking — no need to rush" },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/* Shared FAQ shown on each service page (bilingual). */
export const serviceFaqCommon = [
  {
    q: { uk: "Скільки часу займає оформлення?", en: "How long does it take?" },
    a: {
      uk: "Більшість послуг оформлюється онлайн за кілька хвилин. Складніші кейси (ВНЖ, легалізація) — від кількох днів; конкретні строки скаже менеджер після короткої консультації.",
      en: "Most services are arranged online within minutes. More complex cases (residence permits, legalization) take a few days; the manager gives exact timelines after a short consultation.",
    },
  },
  {
    q: { uk: "Як відбувається оплата?", en: "How does payment work?" },
    a: {
      uk: "Оплата карткою онлайн у захищеному платіжному вікні. Для послуг із супроводом можлива оплата частинами — уточніть у менеджера.",
      en: "Payment is by card in a secure checkout. For services with support, installment payment is possible — ask the manager.",
    },
  },
  {
    q: { uk: "Ви працюєте цілодобово?", en: "Do you work around the clock?" },
    a: {
      uk: "Так. Підтримка працює 24/7 у Telegram, WhatsApp і за телефоном — навіть якщо ви в іншому часовому поясі.",
      en: "Yes. Support works 24/7 on Telegram, WhatsApp and by phone — even if you’re in another time zone.",
    },
  },
];
