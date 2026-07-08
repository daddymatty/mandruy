/* Blog articles (bilingual). Body is an array of blocks:
   { h2 } heading · { p } paragraph · { list:[...] } bullet list · { tip } callout. */

export const articles = [
  {
    slug: "travel-insurance-war-risks-2026",
    date: "2026-06-18",
    modified: "2026-07-01",
    category: { uk: "Страхування", en: "Insurance" },
    read: 6,
    title: {
      uk: "Страхування з покриттям воєнних ризиків у 2026: що треба знати",
      en: "Insurance with war-risk coverage in 2026: what you need to know",
    },
    description: {
      uk: "Розбираємо, які поліси покривають воєнні ризики, для чого це потрібно при в’їзді в Україну та оформленні ВНЖ, і на що дивитися перед покупкою.",
      en: "We explain which policies cover war risks, why this matters for entering Ukraine and applying for a residence permit, and what to check before buying.",
    },
    body: {
      uk: [
        { p: "Полісами з покриттям воєнних ризиків цікавляться і туристи, і ті, хто оформлює тривале перебування. Розповідаємо, як це працює й навіщо потрібно." },
        { h2: "Чому це важливо" },
        { p: "Стандартні тревел-поліси часто виключають події, пов’язані з воєнними діями. Поліс із відповідним покриттям гарантує, що медичні витрати компенсують навіть у складних обставинах." },
        { h2: "Коли потрібен такий поліс" },
        { list: ["Перетин кордону та в’їзд в Україну", "Оформлення посвідки на тимчасове проживання", "Тривалі відрядження та волонтерство"] },
        { tip: "Перед покупкою перевірте ліміт покриття (рекомендовано від 30 000 €) і чи вказано воєнні ризики прямо в умовах, а не лише в рекламі." },
        { h2: "Як оформити онлайн" },
        { p: "Оберіть строк і програму, введіть дані та оплатіть карткою — поліс прийде на пошту за кілька хвилин і буде готовий до пред’явлення." },
      ],
      en: [
        { p: "Both tourists and those arranging long stays ask about policies with war-risk coverage. Here’s how it works and why it matters." },
        { h2: "Why it matters" },
        { p: "Standard travel policies often exclude events related to hostilities. A policy with the right coverage ensures medical costs are reimbursed even in difficult circumstances." },
        { h2: "When you need such a policy" },
        { list: ["Crossing the border and entering Ukraine", "Applying for a temporary residence permit", "Long assignments and volunteering"] },
        { tip: "Before buying, check the coverage limit (€30,000+ recommended) and that war risks are stated in the terms, not just in the marketing." },
        { h2: "How to buy online" },
        { p: "Pick a term and plan, enter your details and pay by card — the policy arrives by email within minutes, ready to present." },
      ],
    },
  },
  {
    slug: "residence-permit-ukraine-guide",
    date: "2026-05-30",
    modified: "2026-06-20",
    category: { uk: "Документи", en: "Documents" },
    read: 8,
    title: {
      uk: "Як іноземцю отримати посвідку на проживання в Україні",
      en: "How a foreigner can obtain a residence permit in Ukraine",
    },
    description: {
      uk: "Покроковий гайд: підстави для ВНЖ, перелік документів, строки та типові помилки, через які найчастіше відмовляють.",
      en: "A step-by-step guide: grounds for a residence permit, required documents, timelines and the typical mistakes that cause refusals.",
    },
    body: {
      uk: [
        { p: "Посвідка на проживання дозволяє легально перебувати в Україні тривалий час. Розглянемо, з чого почати." },
        { h2: "Підстави для отримання" },
        { list: ["Працевлаштування", "Навчання", "Возз’єднання сім’ї", "Інвестиції та бізнес"] },
        { h2: "Базовий пакет документів" },
        { list: ["Закордонний паспорт і його переклад", "Підстава (контракт, запрошення тощо)", "Медичне страхування", "Підтвердження проживання"] },
        { tip: "Найчастіша причина відмов — прострочені чи неправильно перекладені документи. Складіть чек-лист і перевіряйте строки дії кожного паперу." },
        { h2: "Скільки це триває" },
        { p: "Строки залежать від підстави та регіону. Юридичний супровід допомагає уникнути повторних подач і зекономити тижні очікування." },
      ],
      en: [
        { p: "A residence permit lets you stay in Ukraine legally for a long time. Let’s look at where to start." },
        { h2: "Grounds for obtaining one" },
        { list: ["Employment", "Studies", "Family reunification", "Investment and business"] },
        { h2: "The basic document package" },
        { list: ["Foreign passport and its translation", "Grounds (contract, invitation, etc.)", "Medical insurance", "Proof of accommodation"] },
        { tip: "The most common reason for refusal is expired or incorrectly translated documents. Build a checklist and verify the validity of every paper." },
        { h2: "How long it takes" },
        { p: "Timelines depend on the grounds and the region. Legal support helps avoid resubmissions and saves weeks of waiting." },
      ],
    },
  },
  {
    slug: "esim-for-travel-how-it-works",
    date: "2026-06-05",
    modified: "2026-06-05",
    category: { uk: "Зв’язок", en: "Connectivity" },
    read: 5,
    title: {
      uk: "eSIM для подорожей: як бути онлайн одразу після приземлення",
      en: "eSIM for travel: how to be online right after you land",
    },
    description: {
      uk: "Що таке eSIM, чим вона краща за роумінг і місцеві SIM-картки, і як активувати інтернет за дві хвилини за QR-кодом.",
      en: "What an eSIM is, why it beats roaming and local SIM cards, and how to activate internet in two minutes via a QR code.",
    },
    body: {
      uk: [
        { p: "eSIM — це вбудована SIM без пластику. Ви купуєте тариф онлайн і активуєте його ще вдома." },
        { h2: "Чому це зручно" },
        { list: ["Не треба шукати місцевий салон зв’язку", "Немає дорогого роумінгу", "Основна SIM залишається активною для дзвінків"] },
        { h2: "Як активувати" },
        { p: "Після оплати ви отримуєте QR-код. Наведіть камеру, підтвердьте встановлення профілю — і після приземлення інтернет запрацює автоматично." },
        { tip: "Перевірте, що ваш телефон підтримує eSIM, і зберігайте QR-код: він може знадобитися для повторної установки." },
      ],
      en: [
        { p: "An eSIM is a built-in SIM without any plastic. You buy a plan online and activate it while still at home." },
        { h2: "Why it’s convenient" },
        { list: ["No need to find a local mobile shop", "No expensive roaming", "Your main SIM stays active for calls"] },
        { h2: "How to activate" },
        { p: "After payment you get a QR code. Point your camera, confirm the profile installation — and once you land, the internet works automatically." },
        { tip: "Check that your phone supports eSIM and keep the QR code: you may need it to reinstall the profile." },
      ],
    },
  },
  {
    slug: "crossing-ukraine-border-2026",
    date: "2026-07-02",
    modified: "2026-07-02",
    category: { uk: "Кордон", en: "Border" },
    read: 7,
    title: {
      uk: "Перетин кордону України у 2026: документи та поради",
      en: "Crossing the Ukrainian border in 2026: documents and tips",
    },
    description: {
      uk: "Актуальні правила в’їзду та виїзду, перелік документів, які варто мати з собою, і як скоротити час на пункті пропуску.",
      en: "Current entry and exit rules, the documents worth having with you, and how to cut time at the checkpoint.",
    },
    body: {
      uk: [
        { p: "Перетин кордону стане спокійнішим, якщо підготуватися заздалегідь. Ось базовий чек-лист." },
        { h2: "Що мати з собою" },
        { list: ["Дійсний документ для перетину", "Медичне страхування", "Підтвердження мети поїздки", "Бронювання житла чи квитки"] },
        { tip: "Тримайте копії ключових документів у телефоні та роздрукованими — це рятує, якщо сядуть гаджети." },
        { h2: "Як зекономити час" },
        { p: "Заздалегідь оформлені страховка й квитки, а також знання актуальних правил зменшують ризик затримок і додаткових запитань." },
      ],
      en: [
        { p: "Crossing the border is calmer if you prepare in advance. Here’s a basic checklist." },
        { h2: "What to have with you" },
        { list: ["A valid travel document", "Medical insurance", "Proof of the purpose of your trip", "Accommodation booking or tickets"] },
        { tip: "Keep copies of key documents on your phone and printed — it helps if your gadgets die." },
        { h2: "How to save time" },
        { p: "Insurance and tickets arranged in advance, plus knowing the current rules, reduce the risk of delays and extra questions." },
      ],
    },
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
