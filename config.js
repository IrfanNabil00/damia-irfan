// ============================================================
//  EDIT THIS FILE — all wedding details live here.
//  Everything below is placeholder text; replace with your own.
// ============================================================
window.CONFIG = {
  // Short names shown on the envelope & cover
  brideShort: "Damia",
  groomShort: "Irfan",

  // Full names shown inside the invitation
  brideFull: "Nur Kartika Damia",
  groomFull: "Muhammad Irfan Nabil",

  // Hosts — one [ ... ] group per family; names in a group are joined with "&"
  hosts: [
    ["Ahmad Hazwan bin Abd Halim", "Nur Zazlina binti Mohd Zawawi"],
    ["Siti Aslinda binti Aris", "Qayyum Aiman bin Nor Azman (Anak)"],
  ],

  // Event date & time (local Malaysia time, 24h format)
  date: "2026-12-20",
  startTime: "11:00",
  endTime: "16:00",

  // Venue
  venueName: "Rumah Abang Jamil KL",
  venueAddress: [
    "3rd Mile, 532A Jalan Murai 1,",
    "Jln Sultan Azlan Shah, Jalan Ipoh,",
    "51200 Kuala Lumpur",
  ],
  venueShort: "KUALA LUMPUR",
  // Coordinates used for Google Maps & Waze buttons
  lat: 2.9935,
  lng: 101.7874,

  // Programme (Atur Cara Majlis)
  schedule: [
    { label: "Jamuan Makan", labelEn: "Reception", time: "11.00 pagi - 4.00 petang", timeEn: "11.00 am – 4.00 pm" },
    { label: "Ketibaan Pengantin", labelEn: "Arrival of the Bride & Groom", time: "12.30 tengah hari", timeEn: "12.30 pm" },
  ],

  // RSVP
  rsvpDeadline: "2026-12-01",
  maxPax: 2, // max guests per RSVP
  // Time slots guests choose from. Use [] to skip the slot question.
  slots: ["11:00 AM - 2:00 PM", "2:00 PM - 4:00 PM"],

  // Contacts — phone in international format, no + or spaces (6012... not 012...).
  // Each contact gets a Call button and a WhatsApp button. Use \n in role for a line break.
  contacts: [
    { name: "Linda Aris", role: "Ibu Pengantin\nLelaki", roleEn: "Mother of the Groom", phone: "60192676282" },
    { name: "Zazlina", role: "Kakak Pengantin\nPerempuan", roleEn: "Sister of the Bride", phone: "60192775508" },
  ],

  // Photo gallery — 9 photos shown in the painted frames, saved as
  // site/assets/gallery/1.jpg ... 9.jpg (order: left to right, top to bottom).
  // The frames are 4:5, so 1080 x 1350 px fits best; taller photos (e.g.
  // 1080 x 1920) are cropped in the frame but shown whole when tapped.
  // Missing photos leave the frame empty.
  // Set to [] to hide the gallery.
  // HIDDEN for now — to show the gallery, delete "[], // " on the next line.
  gallery: [], // [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `assets/gallery/${n}.jpg`),

  // Gifts (Hadiah) — wishlist checklist and delivery address.
  gift: {
    // Wishlist checklist: guests tick an item they will buy (anonymously),
    // so nobody buys the same thing twice. Each item: name, optional note,
    // and a Shopee (or any shop) link. Don't rename an item after guests have
    // ticked it — the tick is saved against the name.
    wishlist: [
      { name: "Set Peralatan Bosch 108-in-1", note: "Bosch Household Tool Kit", link: "https://shopee.com.my/BOSCH-108-In-1-Multi-Function-Household-Tool-Kit-2607002788-i.12851682.772468267?extraParams=%7B%22display_model_id%22%3A40352982774%2C%22model_selection_logic%22%3A3%7D" },
      { name: "TV PRISM Q55 Ultra 55 inci", note: "QLED 4K Google TV", link: "https://shopee.com.my/PRISM-Q55-Ultra-2026-Q-Ultra-Series-QLED-4K-AI-Google-TV-55-inch-TV-i.524628742.12499456780?extraParams=%7B%22display_model_id%22%3A59307755001%2C%22model_selection_logic%22%3A3%7D" },
      { name: "Periuk Nasi", note: "Toshiba 5L Multi-Function", link: "https://shopee.com.my/TOSHIBA-5L-Multi-Function-Rice-Cooker-Easy-Cooking-Series-Non-Stick-Cooking-Pot-Mee-Pot-Cooker-Steamer-i.1177039009.45967833167?extraParams=%7B%22display_model_id%22%3A326508252084%2C%22model_selection_logic%22%3A3%7D" },
      { name: "Cerek Elektrik", note: "1.7L", link: "https://shopee.com.my/" },
      { name: "Pengisar (Blender)", note: "Panasonic", link: "https://shopee.com.my/" },
      { name: "Set Pinggan Mangkuk", note: "Untuk 6 orang", link: "https://shopee.com.my/" },
      { name: "Seterika Wap", note: "Philips", link: "https://shopee.com.my/" },
      { name: "Penyedut Habuk", note: "Tanpa wayar", link: "https://shopee.com.my/" },
      { name: "Set Tuala Mandi", note: "Warna krim", link: "https://shopee.com.my/" },
      { name: "Mesin Kopi", note: "Kapsul", link: "https://shopee.com.my/" },
    ],
    // Address for wishlist deliveries (shown so guests can ship gifts directly).
    // Set to "" to hide.
    deliveryAddress: "1, Jalan Meranti 7, Saujana Utama 2, 47000 Sg Buloh, Selangor",
    deliveryName: "Muhammad Irfan Nabil",
    deliveryPhone: "", // add a phone number for the courier, or leave "" to hide
  },

  // Google Apps Script Web App URL (see README.md, step 2).
  // Leave empty to run in demo mode (data saved only in this browser).
  scriptUrl: "https://script.google.com/macros/s/AKfycbzbZRZRyaf72jKJ1MdKcUdiR4sjUOnYShgghKeVP0r63Jih9XV8X3_SohwMeO02Z304/exec",

  // Optional background music — put an mp3 at this path, or set to "".
  music: "assets/music.mp3",
};
