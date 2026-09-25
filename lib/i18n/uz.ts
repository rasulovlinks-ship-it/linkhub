export type Lang = "uz" | "ru";

export const uz = {
  meta: {
    title: "ownlink.uz: bir marta to'lang, sayt umrbod sizniki",
    description:
      "O'z .uz domeningizda, brendingizga mos link-in-bio sayt. Oylik obunasiz, platforma reklamasisiz.",
  },
  nav: {
    why: "Afzalliklar",
    work: "Ishlarimiz",
    reviews: "Fikrlar",
    faq: "Savollar",
    cta: "Sayt buyurtma qilish",
    switchLabel: "Русский",
    switchShort: "RU",
    switchHref: "/ru",
  },
  hero: {
    meterLabel: "Taplink / Linktree obunasi",
    meterMonths: "oy",
    meterPerMonth: "oyiga taxminan",
    meterBars: "Jami to'langan",
    introTitle: "Obuna hech qachon tugamaydi.",
    introText:
      "Har oy to'lov. To'xtatsangiz, imkoniyatlar o'chadi va hamma pul shunchaki ketgan bo'ladi.",
    domainFrom: "taplink.cc/nomingiz",
    domainTo: "nomingiz.uz",
    titleAccent: "Bir marta to'lang.",
    /** Second line, split so the key word gets a drawn underline */
    titleRest: ["Sayt ", "umrbod", " sizniki."],
    text: "O'z .uz domeningizda, brendingizga mos dizayn.",
    /** Shown as crossed-out pills under the text: what you no longer pay for */
    crossed: ["Oylik obuna", "Begona reklama"],
    ctaSecondary: "Ishlarimiz",
    skip: "O'tkazib yuborish",
    phoneAlt: "komolababyland.uz sayti telefonda",
  },
  compare: {
    title: "Uzun havola yoki o'z domeningiz",
    text: "Mijoz bioda ko'radigan birinchi narsa - manzil. U sizning biznesingiz haqida gapiradi.",
    theirs: "Obuna servislari",
    ours: "ownlink.uz",
    theirsUrl: "taplink.cc/thebestcakestashkent",
    oursUrl: "thebestcakestashkent.uz",
    rows: [
      { label: "To'lov", theirs: "Har oy", ours: "Bir marta" },
      { label: "Manzil", theirs: "servis.cc/nomingiz", ours: "nomingiz.uz" },
      { label: "Dizayn", theirs: "Tayyor shablon", ours: "Brendingiz uchun maxsus" },
      { label: "Platforma belgisi", theirs: "Bepul tarifda bor", ours: "Yo'q" },
      { label: "To'lov to'xtasa", theirs: "Pro imkoniyatlar o'chadi", ours: "Sayt ishlayveradi" },
      { label: "Google qidiruvi", theirs: "Servis domeni ostida", ours: "O'z nomingiz bilan" },
    ],
  },
  benefits: {
    title: "Nega o'z saytingiz yaxshiroq",
    pro: {
      title: "Professional ko'rinish",
      text: "Vizitka, qadoq va Instagram bioda qisqa, jiddiy manzil.",
    },
    once: {
      title: "Bir marta to'lov",
      text: "Oylik hisob yo'q. Sayt bir marta yaratiladi va yillar davomida ishlaydi.",
    },
    design: {
      title: "Maxsus dizayn",
      text: "Ranglar, rasmlar va tugmalar brendingiz asosida chiziladi.",
    },
    noAds: {
      title: "Begona reklama yo'q",
      text: "Sahifada faqat siz. Platforma logotipi va takliflari yo'q.",
    },
    fast: {
      title: "Bir zumda ochiladi",
      text: "Cloudflare tarmog'ida, sekin internetda ham tez yuklanadi.",
    },
    google: {
      title: "Google'da topiladi",
      text: "O'z domeningiz qidiruvda sizning nomingiz bilan chiqadi.",
    },
    owned: {
      title: "Sayt sizniki",
      text: "Servis qoidalari yoki narxlari o'zgarsa ham sahifangiz joyida.",
    },
    local: {
      title: "Mahalliy aloqa",
      text: "Telegram, Yandex xarita, bir bosishda qo'ng'iroq. O'zbek va rus tilida.",
    },
  },
  calc: {
    title: "Obunaga qancha ketadi?",
    text: "Slayderni suring va hisoblang.",
    monthsLabel: "Muddat",
    monthsUnit: "oy",
    spentLabel: "Obunaga to'lagan bo'lardingiz",
    oursLabel: "ownlink.uz bilan",
    oursValue: "Bir marta, keyin $0 / oy",
    footnote: "Obuna narxi taxminiy. .uz domen yiliga bir marta alohida yangilanadi.",
  },
  work: {
    title: "Mijozlarimiz saytlari",
    text: "Har biri o'z domenida, o'z dizaynida.",
    clients: "Mijozlar",
    templates: "Namuna dizaynlar",
    open: "Saytni ochish",
    instagram: "Instagram",
  },
  steps: {
    title: "Qanday ishlaymiz",
    items: [
      { title: "Yozing", text: "Telegramda biznesingiz va kerakli tugmalar haqida gaplashamiz." },
      { title: "Dizayn", text: "Brendingiz asosida dizayn tayyorlab, sizga ko'rsatamiz." },
      { title: "Domen", text: ".uz domenni rasmiylashtirib, saytga ulaymiz." },
      { title: "Ishga tushirish", text: "Sayt tayyor. Havolani bioga qo'yasiz." },
    ],
  },
  reviews: {
    title: "Mijozlar fikri",
    draft: "Qoralama",
  },
  faq: {
    title: "Ko'p beriladigan savollar",
    text: "Javob topmadingizmi? Telegramda yozing.",
    items: [
      {
        q: "Nega \"bir martalik\"? Domen-chi?",
        a: "Dizayn va sayt uchun bir marta to'laysiz. .uz domen esa registratorda yiliga bir marta yangilanadi: bu kichik to'lov va u domen uchun, bizga emas.",
      },
      {
        q: "Hosting uchun to'lash kerakmi?",
        a: "Yo'q. Saytlar Cloudflare tarmog'ida joylashadi, hosting uchun oylik to'lov yo'q.",
      },
      {
        q: "Qancha vaqt ketadi?",
        a: "Odatda bir necha kun. Rasmlar va kontaktlar tayyor bo'lsa, tezroq.",
      },
      {
        q: "Keyin o'zgartirish kiritsa bo'ladimi?",
        a: "Ha. Telefon, havola yoki narxlarni yangilash kerak bo'lsa, bizga yozing.",
      },
      {
        q: "Mendan nima kerak?",
        a: "Logotip yoki rasmlar, kontaktlar va qaysi tugmalar kerakligi. Qolganini biz qilamiz.",
      },
      {
        q: "Taplink'dan ko'chib o'tsa bo'ladimi?",
        a: "Ha. Mavjud sahifangizdagi havola va matnlarni yangi dizaynga o'tkazamiz.",
      },
    ],
  },
  cta: {
    title: "O'z saytingizga ega bo'ling",
    text: "Biznesingiz haqida yozing, qolganini biz qilamiz.",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    phone: "Qo'ng'iroq",
  },
  footer: {
    rights: "Barcha huquqlar himoyalangan.",
  },
};

export type Dict = typeof uz;
