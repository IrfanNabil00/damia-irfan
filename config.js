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
    { label: "Jamuan Makan", time: "11.00 pagi - 4.00 petang" },
    { label: "Ketibaan Pengantin", time: "12.30 tengah hari" },
  ],

  // RSVP
  rsvpDeadline: "2026-12-01",
  maxPax: 2, // max guests per RSVP
  // Time slots guests choose from. Use [] to skip the slot question.
  slots: ["11:00 AM - 2:00 PM", "2:00 PM - 4:00 PM"],

  // Contacts — phone in international format, no + or spaces (6012... not 012...).
  // Each contact gets a Call button and a WhatsApp button. Use \n in role for a line break.
  contacts: [
    { name: "Linda Aris", role: "Ibu Pengantin\nLelaki", phone: "60192676282" },
    { name: "Zazlina", role: "Kakak Pengantin\nPerempuan", phone: "60192775508" },
  ],

  // Photo gallery — 9 photos shown in the painted frames, saved as
  // site/assets/gallery/1.jpg ... 9.jpg (order: left to right, top to bottom).
  // The frames are 4:5, so 1080 x 1350 px fits best; taller photos (e.g.
  // 1080 x 1920) are cropped in the frame but shown whole when tapped.
  // Missing photos leave the frame empty.
  // Set to [] to hide the gallery.
  // HIDDEN for now — to show the gallery, delete "[], // " on the next line.
  gallery: [], // [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `assets/gallery/${n}.jpg`),

  // Gifts (Hadiah) — money gift via QR / bank transfer, plus a wishlist.
  gift: {
    // Your DuitNow / bank QR image. Save it as site/assets/qr.png
    // (screenshot it from your banking app). Set to "" to hide.
    qrImage: "assets/qr.png",
    bankName: "Maybank",
    accountName: "NUR KARTIKA DAMIA",
    accountNumber: "1234 5678 9012",
    // Wishlist items: name, optional note, and a Shopee (or any shop) link.
    wishlist: [
      { name: "Air Fryer", note: "Philips 4.1L", link: "https://shopee.com.my/" },
      { name: "Set Cadar King", note: "Warna krim / putih", link: "https://shopee.com.my/" },
      { name: "Periuk Nasi", note: "Toshiba 1.8L", link: "https://shopee.com.my/" },
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
