/* Service catalogue — foreigners entering & legally staying in Ukraine.
   Journey: entry document -> enter -> grounds for stay -> residence.
   Fully bilingual ({ en, uk }). */

export const services = [
  {
    slug: "visa",
    icon: "passport",
    accent: "sky",
    featured: true,
    name: { en: "Visa & e-Visa", uk: "Віза та e-Visa" },
    tagline: {
      en: "Entry permits to Ukraine — e-Visa, tourist, business and long-term D visas.",
      uk: "Дозволи на в’їзд в Україну — e-Visa, туристична, бізнес і довгострокова D-віза.",
    },
    priceFrom: { en: "€45", uk: "45 €" },
    metaTitle: {
      en: "Visa & e-Visa to Ukraine — apply online, types, documents | Mandruy",
      uk: "Віза та e-Visa в Україну — оформлення онлайн, типи, документи | Мандруй",
    },
    metaDescription: {
      en: "Get your visa to Ukraine: e-Visa online, short-stay (C) and long-term (D) visas. We check your grounds, prepare documents and guide the application end to end.",
      uk: "Оформіть візу в Україну: e-Visa онлайн, короткострокова (C) і довгострокова (D) віза. Перевіримо підстави, підготуємо документи й проведемо через усю подачу.",
    },
    hero: { en: "Your entry to Ukraine starts here", uk: "Ваш в’їзд в Україну починається тут" },
    intro: {
      en: "Whether you need a quick e-Visa for a short trip or a long-term D visa that opens the door to a residence permit, we determine the right visa type, assemble the paperwork and walk you through the application.",
      uk: "Чи потрібна вам швидка e-Visa для короткої поїздки, чи довгострокова D-віза, що відкриває шлях до посвідки, — ми визначимо потрібний тип, зберемо документи й проведемо через подачу.",
    },
    benefits: [
      { en: "We confirm whether you need a visa or can enter visa-free", uk: "Підтвердимо, чи потрібна віза, чи можна в’їхати безвізово" },
      { en: "e-Visa applications handled fully online", uk: "Заявки на e-Visa — повністю онлайн" },
      { en: "Long-term D visa — the first step to residence", uk: "Довгострокова D-віза — перший крок до посвідки" },
      { en: "Document checklist tailored to your purpose", uk: "Перелік документів під вашу мету поїздки" },
    ],
    plans: [
      { name: { en: "e-Visa", uk: "e-Visa" }, price: { en: "€45", uk: "45 €" }, period: { en: "", uk: "" },
        features: { en: ["Online application", "Short stay / tourism / business", "Fast processing"], uk: ["Онлайн-подача", "Коротке перебування / туризм / бізнес", "Швидке опрацювання"] } },
      { name: { en: "Long-term D visa", uk: "Довгострокова D-віза" }, price: { en: "from €120", uk: "від 120 €" }, period: { en: "", uk: "" }, best: true,
        features: { en: ["Opens the residence-permit path", "Work / study / family / investment", "Full document support"], uk: ["Відкриває шлях до посвідки", "Робота / навчання / сім’я / інвестиції", "Повний супровід документів"] } },
      { name: { en: "Visa consultation", uk: "Візова консультація" }, price: { en: "€25", uk: "25 €" }, period: { en: "/ hour", uk: "/ година" },
        features: { en: ["Which visa you need", "Grounds & eligibility check", "Step-by-step plan"], uk: ["Яка віза потрібна", "Перевірка підстав", "Покроковий план"] } },
    ],
  },
  {
    slug: "insurance",
    icon: "shield",
    accent: "violet",
    featured: true,
    name: { en: "Entry & residence insurance", uk: "Страхування для в’їзду та ВНЖ" },
    tagline: {
      en: "Medical insurance that meets entry and migration-service requirements.",
      uk: "Медичне страхування, що відповідає вимогам в’їзду та міграційної служби.",
    },
    priceFrom: { en: "€0.80", uk: "0,80 €" },
    metaTitle: {
      en: "Insurance for entry to Ukraine & residence permit — with war-risk cover | Mandruy",
      uk: "Страхування для в’їзду в Україну та ВНЖ — з покриттям воєнних ризиків | Мандруй",
    },
    metaDescription: {
      en: "Medical insurance accepted at the Ukrainian border and by the migration service for a residence permit. War-risk coverage, issued online in minutes from €0.80/day.",
      uk: "Медичне страхування, яке приймають на кордоні України та міграційна служба для посвідки. Покриття воєнних ризиків, оформлення онлайн за хвилини від 0,80 €/день.",
    },
    hero: { en: "Insurance accepted at the border and for residence", uk: "Страхування, яке приймають на кордоні та для ВНЖ" },
    intro: {
      en: "Ukraine requires valid medical insurance both to cross the border and to apply for a residence permit. Our policies include war-risk coverage and meet migration-service requirements — issued online in minutes.",
      uk: "Україна вимагає чинне медичне страхування і для перетину кордону, і для оформлення посвідки. Наші поліси включають покриття воєнних ризиків і відповідають вимогам міграційної служби — оформлення онлайн за хвилини.",
    },
    benefits: [
      { en: "Accepted at the border and by the migration service", uk: "Приймається на кордоні та міграційною службою" },
      { en: "War-risk coverage included", uk: "Покриття воєнних ризиків включено" },
      { en: "Annual policy for residence-permit applications", uk: "Річний поліс для оформлення посвідки" },
      { en: "Issued online, on your email in minutes", uk: "Оформлення онлайн, поліс на пошту за хвилини" },
    ],
    plans: [
      { name: { en: "Short trip", uk: "Коротка поїздка" }, price: { en: "€0.80", uk: "0,80 €" }, period: { en: "/ day", uk: "/ день" },
        features: { en: ["3–90 days", "Medical costs up to €30,000", "Covid & accidents"], uk: ["3–90 днів", "Медичні витрати до 30 000 €", "Ковід і нещасні випадки"] } },
      { name: { en: "Shield+", uk: "Захист+" }, price: { en: "€1.60", uk: "1,60 €" }, period: { en: "/ day", uk: "/ день" }, best: true,
        features: { en: ["War risks", "Coverage up to €50,000", "Evacuation & repatriation"], uk: ["Воєнні ризики", "Покриття до 50 000 €", "Евакуація та репатріація"] } },
      { name: { en: "Residence year", uk: "Рік для ВНЖ" }, price: { en: "from €89", uk: "від 89 €" }, period: { en: "/ year", uk: "/ рік" },
        features: { en: ["Annual policy for the permit", "Meets migration requirements", "War risks included"], uk: ["Річний поліс для посвідки", "Відповідає вимогам міграційки", "Воєнні ризики включено"] } },
    ],
  },
  {
    slug: "residence",
    icon: "id",
    accent: "sky",
    featured: true,
    name: { en: "Temporary residence permit", uk: "Посвідка на тимчасове проживання" },
    tagline: {
      en: "Your legal basis to stay: work, study, family, investment and more.",
      uk: "Ваша підстава для перебування: робота, навчання, сім’я, інвестиції тощо.",
    },
    priceFrom: { en: "€350", uk: "350 €" },
    metaTitle: {
      en: "Temporary residence permit in Ukraine — grounds, documents, process | Mandruy",
      uk: "Посвідка на тимчасове проживання в Україні — підстави, документи, процес | Мандруй",
    },
    metaDescription: {
      en: "A temporary residence permit (TRP) is your legal basis to stay in Ukraine long term. Grounds: employment, study, family, investment. Full support from documents to the permit.",
      uk: "Посвідка на тимчасове проживання (ВНЖ) — ваша законна підстава для тривалого перебування в Україні. Підстави: робота, навчання, сім’я, інвестиції. Супровід від документів до посвідки.",
    },
    hero: { en: "Turn your visit into a legal stay", uk: "Перетворіть візит на законне перебування" },
    intro: {
      en: "A temporary residence permit lets you live in Ukraine legally for the term of your grounds. We identify the right basis — employment, study, family reunification or investment — and handle the full application so you avoid refusals and resubmissions.",
      uk: "Посвідка на тимчасове проживання дозволяє легально жити в Україні на строк дії підстави. Ми визначимо правильну підставу — робота, навчання, возз’єднання сім’ї чи інвестиції — і проведемо всю подачу, щоб уникнути відмов і повторних звернень.",
    },
    benefits: [
      { en: "We select the strongest legal grounds for you", uk: "Підберемо найсильнішу правову підставу для вас" },
      { en: "Employment, study, family, investment & more", uk: "Робота, навчання, сім’я, інвестиції та інше" },
      { en: "Document collection, submission and deadline control", uk: "Збір документів, подача та контроль строків" },
      { en: "Unlimited consultations during the process", uk: "Необмежені консультації протягом процесу" },
    ],
    plans: [
      { name: { en: "TRP consultation", uk: "Консультація щодо ВНЖ" }, price: { en: "€25", uk: "25 €" }, period: { en: "/ hour", uk: "/ година" },
        features: { en: ["Which grounds fit you", "Document checklist", "Realistic timeline"], uk: ["Які підстави вам підходять", "Перелік документів", "Реальні строки"] } },
      { name: { en: "Full TRP support", uk: "Повний супровід ВНЖ" }, price: { en: "from €350", uk: "від 350 €" }, period: { en: "", uk: "" }, best: true,
        features: { en: ["Grounds strategy", "Documents & submission", "Deadline & renewal control"], uk: ["Стратегія підстав", "Документи та подача", "Контроль строків і продовження"] } },
      { name: { en: "Renewal", uk: "Продовження" }, price: { en: "from €180", uk: "від 180 €" }, period: { en: "", uk: "" },
        features: { en: ["Timely renewal", "Updated document set", "No status gaps"], uk: ["Вчасне продовження", "Оновлений пакет документів", "Без розривів статусу"] } },
    ],
  },
  {
    slug: "permanent-residence",
    icon: "home",
    accent: "violet",
    name: { en: "Permanent residence", uk: "Постійне проживання" },
    tagline: {
      en: "Immigration permit for long-term settlement in Ukraine.",
      uk: "Дозвіл на імміграцію для тривалого осідання в Україні.",
    },
    priceFrom: { en: "€600", uk: "600 €" },
    metaTitle: {
      en: "Permanent residence in Ukraine — immigration permit & grounds | Mandruy",
      uk: "Постійне проживання в Україні — дозвіл на імміграцію та підстави | Мандруй",
    },
    metaDescription: {
      en: "Obtain a permanent residence permit in Ukraine via an immigration permit. We assess your grounds — family, investment, quota — and manage the full immigration process.",
      uk: "Отримайте посвідку на постійне проживання в Україні через дозвіл на імміграцію. Оцінимо підстави — сім’я, інвестиції, квота — і проведемо весь процес.",
    },
    hero: { en: "Settle in Ukraine permanently", uk: "Осідайте в Україні надовго" },
    intro: {
      en: "Permanent residence gives you the right to live in Ukraine without renewing a temporary permit. It requires an immigration permit on qualifying grounds — we assess eligibility and manage the process end to end.",
      uk: "Постійне проживання дає право жити в Україні без продовження тимчасової посвідки. Воно потребує дозволу на імміграцію на відповідних підставах — ми оцінимо право на нього й проведемо весь процес.",
    },
    benefits: [
      { en: "Eligibility assessment for an immigration permit", uk: "Оцінка права на дозвіл на імміграцію" },
      { en: "Grounds: family, investment, quota and more", uk: "Підстави: сім’я, інвестиції, квота та інше" },
      { en: "No annual permit renewals", uk: "Без щорічного продовження посвідки" },
      { en: "Full document preparation and submission", uk: "Повна підготовка документів і подача" },
    ],
  },
  {
    slug: "work-permit",
    icon: "briefcase",
    accent: "sky",
    name: { en: "Work permit", uk: "Дозвіл на працевлаштування" },
    tagline: {
      en: "Employment as your basis to live and work in Ukraine legally.",
      uk: "Працевлаштування як підстава легально жити та працювати в Україні.",
    },
    priceFrom: { en: "€250", uk: "250 €" },
    metaTitle: {
      en: "Work permit in Ukraine for foreigners — employment-based stay | Mandruy",
      uk: "Дозвіл на працевлаштування в Україні для іноземців — підстава для перебування | Мандруй",
    },
    metaDescription: {
      en: "A work permit lets a foreigner be employed in Ukraine and serves as grounds for a residence permit. We handle the employer paperwork, permit and residence application together.",
      uk: "Дозвіл на працевлаштування дозволяє іноземцю працювати в Україні та є підставою для посвідки. Оформимо документи роботодавця, дозвіл і посвідку разом.",
    },
    hero: { en: "Work in Ukraine — legally", uk: "Працюйте в Україні — легально" },
    intro: {
      en: "To work in Ukraine as a foreigner, your employer needs a work permit — which also becomes solid grounds for your residence permit. We coordinate the employer documents, the permit and your residence application.",
      uk: "Щоб працювати в Україні іноземцю, роботодавцю потрібен дозвіл на працевлаштування — який також стає надійною підставою для вашої посвідки. Ми узгодимо документи роботодавця, дозвіл і вашу посвідку.",
    },
    benefits: [
      { en: "Employer document preparation", uk: "Підготовка документів роботодавця" },
      { en: "Work permit as grounds for residence", uk: "Дозвіл на працю як підстава для посвідки" },
      { en: "Coordination with your employer", uk: "Координація з вашим роботодавцем" },
      { en: "Renewals handled on time", uk: "Своєчасні продовження" },
    ],
  },
  {
    slug: "legalization",
    icon: "stamp",
    accent: "sun",
    name: { en: "Document legalization", uk: "Легалізація документів" },
    tagline: {
      en: "Apostille, certified translation and recognition of your papers.",
      uk: "Апостиль, засвідчений переклад і визнання ваших документів.",
    },
    priceFrom: { en: "€40", uk: "40 €" },
    metaTitle: {
      en: "Document legalization in Ukraine — apostille, translation, nostrification | Mandruy",
      uk: "Легалізація документів в Україні — апостиль, переклад, нострифікація | Мандруй",
    },
    metaDescription: {
      en: "Make your foreign documents valid in Ukraine: apostille, certified translation and diploma nostrification — required for visas, residence permits and employment.",
      uk: "Зробіть ваші іноземні документи дійсними в Україні: апостиль, засвідчений переклад і нострифікація диплома — потрібні для віз, посвідок і працевлаштування.",
    },
    hero: { en: "Make your documents valid in Ukraine", uk: "Зробіть документи дійсними в Україні" },
    intro: {
      en: "Foreign documents must be legalized and translated before Ukrainian authorities accept them. We handle apostille, certified translation and diploma recognition so your visa, permit or job application isn’t delayed.",
      uk: "Іноземні документи мають бути легалізовані та перекладені, перш ніж їх приймуть українські органи. Ми зробимо апостиль, засвідчений переклад і визнання диплома, щоб ваша віза, посвідка чи працевлаштування не затрималися.",
    },
    benefits: [
      { en: "Apostille and consular legalization", uk: "Апостиль і консульська легалізація" },
      { en: "Certified translations into Ukrainian", uk: "Засвідчені переклади українською" },
      { en: "Diploma nostrification for work & study", uk: "Нострифікація диплома для роботи й навчання" },
      { en: "Courier delivery of ready documents", uk: "Кур’єрська доставка готових документів" },
    ],
  },
  {
    slug: "legal-support",
    icon: "scale",
    accent: "violet",
    name: { en: "Legal support", uk: "Юридичний супровід" },
    tagline: {
      en: "A dedicated lawyer for border crossing, registration and status.",
      uk: "Персональний юрист для кордону, реєстрації та статусу.",
    },
    priceFrom: { en: "€25", uk: "25 €" },
    metaTitle: {
      en: "Legal support for foreigners in Ukraine — border, registration, status | Mandruy",
      uk: "Юридичний супровід іноземців в Україні — кордон, реєстрація, статус | Мандруй",
    },
    metaDescription: {
      en: "A dedicated lawyer for foreigners in Ukraine: border-crossing rules, registration of stay, status changes and deadline control — everything in one hand, in English.",
      uk: "Персональний юрист для іноземців в Україні: правила перетину кордону, реєстрація перебування, зміна статусу й контроль строків — усе в одних руках.",
    },
    hero: { en: "One lawyer for your whole stay", uk: "Один юрист на весь ваш період перебування" },
    intro: {
      en: "From the border to your registration and status renewals, immigration rules change and mistakes are costly. Your dedicated lawyer keeps everything compliant, on time and clear — and answers in English.",
      uk: "Від кордону до реєстрації та продовження статусу — імміграційні правила змінюються, а помилки коштують дорого. Ваш персональний юрист тримає все в межах закону, вчасно і зрозуміло.",
    },
    benefits: [
      { en: "Border-crossing rules explained for your case", uk: "Правила перетину кордону саме для вашого випадку" },
      { en: "Registration of stay and address", uk: "Реєстрація перебування та місця проживання" },
      { en: "Status changes and deadline tracking", uk: "Зміна статусу й контроль строків" },
      { en: "Support in English, 24/7", uk: "Підтримка англійською, 24/7" },
    ],
    plans: [
      { name: { en: "Consultation", uk: "Консультація" }, price: { en: "€25", uk: "25 €" }, period: { en: "/ hour", uk: "/ година" },
        features: { en: ["Your case reviewed", "Clear action plan", "Answers in English"], uk: ["Розбір вашої ситуації", "Чіткий план дій", "Відповіді англійською"] } },
      { name: { en: "Full concierge", uk: "Повний супровід" }, price: { en: "from €450", uk: "від 450 €" }, period: { en: "", uk: "" }, best: true,
        features: { en: ["End-to-end immigration support", "All documents & deadlines", "Dedicated lawyer"], uk: ["Наскрізний імміграційний супровід", "Усі документи й строки", "Персональний юрист"] } },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/* Shared FAQ shown on each service page (bilingual). */
export const serviceFaqCommon = [
  {
    q: { en: "Do you work with foreigners of any nationality?", uk: "Ви працюєте з іноземцями будь-якого громадянства?" },
    a: {
      en: "Yes. We support foreigners from most countries. During a short consultation we confirm the requirements specific to your nationality and purpose of stay.",
      uk: "Так. Ми супроводжуємо іноземців з більшості країн. На короткій консультації підтвердимо вимоги саме для вашого громадянства та мети перебування.",
    },
  },
  {
    q: { en: "Can everything be done remotely, before I arrive?", uk: "Чи можна все зробити дистанційно, до приїзду?" },
    a: {
      en: "Many steps — consultations, e-Visa, insurance and document preparation — are handled online before you travel. Some residence steps require your presence in Ukraine; we tell you exactly which and when.",
      uk: "Багато кроків — консультації, e-Visa, страхування та підготовка документів — виконуються онлайн ще до поїздки. Деякі етапи посвідки потребують присутності в Україні; ми скажемо, які саме й коли.",
    },
  },
  {
    q: { en: "Is your support available in English?", uk: "Чи доступна підтримка англійською?" },
    a: {
      en: "Yes. Our lawyers and support team work in English and Ukrainian, 24/7 via Telegram, WhatsApp and phone.",
      uk: "Так. Наші юристи та підтримка працюють англійською та українською, 24/7 у Telegram, WhatsApp і за телефоном.",
    },
  },
];
