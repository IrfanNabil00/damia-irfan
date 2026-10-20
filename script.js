(function () {
  const C = window.CONFIG;
  const $ = (s) => document.querySelector(s);
  const DAYS = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
  const DAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  const en = (t) => (t ? `<span class="en">${esc(t)}</span>` : "");
  const MONTHS = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai",
    "Ogos", "September", "Oktober", "November", "Disember"];

  // Malaysia is UTC+8 all year, so build dates with a fixed offset.
  const eventStart = new Date(`${C.date}T${C.startTime}:00+08:00`);
  const eventEnd = new Date(`${C.date}T${C.endTime}:00+08:00`);
  const d = new Date(`${C.date}T12:00:00+08:00`);
  const pad = (n) => String(n).padStart(2, "0");
  const fmtLong = (iso) => {
    const x = new Date(`${iso}T12:00:00+08:00`);
    return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Show only the first `shown` items of a list box; the rest are reached by
  // dragging (scrolling) inside the box. Used for wishes and the wishlist.
  function limitScroll(box, itemSel, shown, hint, hintText) {
    const fit = () => {
      const items = box.querySelectorAll(itemSel);
      const scrolling = items.length > shown;
      box.classList.toggle("scrolling", scrolling);
      box.style.maxHeight = "";
      if (hint) { hint.hidden = !scrolling; hint.textContent = hintText; }
      if (!scrolling) return;
      const last = items[shown - 1];
      // Height up to the bottom of the last shown item, plus a peek of the next one.
      box.style.maxHeight = `${last.offsetTop - box.offsetTop + last.offsetHeight + 28}px`;
      box.scrollTop = 0;
      fade();
    };
    const fade = () => box.classList.toggle("at-end", box.scrollTop + box.clientHeight >= box.scrollHeight - 4);
    if (!box.dataset.limited) {
      box.dataset.limited = "1";
      box.addEventListener("scroll", fade, { passive: true });
      window.addEventListener("resize", fit);
      if (document.fonts) document.fonts.ready.then(fit);
    }
    fit();
  }

  // ---------- Fill in details from config ----------
  document.querySelectorAll("[data-f]").forEach((el) => { el.textContent = C[el.dataset.f]; });
  document.title = `${C.brideShort} & ${C.groomShort} | Walimatul Urus`;

  const day = DAYS[d.getUTCDay()];
  $("#coverDay").innerHTML = esc(day) + en(DAYS_EN[d.getUTCDay()]);
  $("#coverDate").textContent = `${pad(d.getUTCDate())} | ${pad(d.getUTCMonth() + 1)} | ${d.getUTCFullYear()}`;
  $("#invDay").innerHTML = esc(day) + en(DAYS_EN[d.getUTCDay()]);
  $("#invDate").textContent = fmtLong(C.date);
  try {
    // Hijri date computed automatically (Umm al-Qura calendar).
    $("#invHijri").textContent = new Intl.DateTimeFormat("ms-MY-u-ca-islamic-umalqura",
      { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kuala_Lumpur" }).format(d);
  } catch (e) { /* older browsers: leave blank */ }

  // Each entry is a family: an array of names (or a single name string).
  $("#hosts").innerHTML = C.hosts.map((fam) =>
    `<span class="family">${[].concat(fam).map(esc).join("<br>&amp;<br>")}</span>`).join("");
  $("#venueAddress").innerHTML = C.venueAddress.map(esc).join("<br>");
  $("#gmaps").href = C.googleMaps || `https://www.google.com/maps/search/?api=1&query=${C.lat},${C.lng}`;
  $("#waze").href = `https://waze.com/ul?ll=${C.lat},${C.lng}&q=${encodeURIComponent(C.venueName)}&navigate=yes`;

  $("#schedule").innerHTML = C.schedule.map((s) =>
    `<div class="sched-item reveal"><b>${esc(s.label)}${en(s.labelEn)}</b>${esc(s.time)}${en(s.timeEn)}</div>`).join("");

  const gcal = (dt) => dt.toISOString().replace(/[-:]|\.\d{3}/g, "");
  $("#calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(`Walimatul Urus ${C.brideShort} & ${C.groomShort}`)}` +
    `&dates=${gcal(eventStart)}/${gcal(eventEnd)}` +
    `&location=${encodeURIComponent(`${C.venueName}, ${C.venueAddress.join(" ")}`)}`;

  // iPhone/iPad: Safari often just downloads a .ics file, but a webcal:// link is
  // always handed to the Calendar app (it asks to "Subscribe" to this one event).
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIOS) {
    const ics = new URL("walimatul-urus.ics", location.href);
    $("#icsBtn").href = `webcal://${ics.host}${ics.pathname}`;
    $("#icsHint").hidden = false;
  }

  $("#rsvpDeadline").textContent = fmtLong(C.rsvpDeadline);
  const dl = new Date(`${C.rsvpDeadline}T12:00:00+08:00`);
  $("#rsvpDeadlineEn").textContent = `${dl.getUTCDate()} ${MONTHS_EN[dl.getUTCMonth()]} ${dl.getUTCFullYear()}`;

  // ---------- RSVP form ----------
  const rsvpForm = $("#rsvpForm");
  const attendBox = rsvpForm.querySelector(".if-attending");
  const pax = $("#pax");
  pax.max = C.maxPax;

  const slots = C.slots || [];
  if (slots.length) {
    $("#slotDate").textContent = fmtLong(C.date);
    $("#slots").innerHTML = slots.map((sl) =>
      `<label><input type="radio" name="slot" value="${esc(sl)}" required><span>${esc(sl)}</span></label>`).join("");
  } else { $("#slotQ").remove(); }

  rsvpForm.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => {
    pax.value = Math.min(C.maxPax, Math.max(1, Number(pax.value) + Number(b.dataset.step)));
  }));

  // Hide (and disable, so they're not required or sent) the pax & slot
  // questions when the guest answers "No".
  const syncAttending = () => {
    const no = rsvpForm.attending.value === "Tidak Hadir";
    attendBox.hidden = no;
    attendBox.querySelectorAll("input").forEach((i) => { i.disabled = no; });
  };
  rsvpForm.querySelectorAll('[name="attending"]').forEach((r) => r.addEventListener("change", syncAttending));
  rsvpForm.addEventListener("reset", () => setTimeout(syncAttending));

  // RSVP opens as a popup from the RSVP section button and the bottom menu.
  const dlg = $("#rsvpDialog");
  $("#rsvpTitle").textContent = `RSVP untuk ${C.brideShort} & ${C.groomShort}`;
  const closeRsvp = () => dlg.close();
  document.querySelectorAll("[data-open-rsvp]").forEach((b) => b.addEventListener("click", () => {
    $("#rsvpMsg").textContent = "";
    dlg.showModal();
    document.body.classList.add("locked");
  }));
  dlg.querySelector("[data-close-rsvp]").addEventListener("click", closeRsvp);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeRsvp(); }); // tap outside
  dlg.addEventListener("close", () => document.body.classList.remove("locked"));

  $("#contacts").innerHTML = C.contacts.map((c) => {
    const num = String(c.phone).replace(/\D/g, "");
    return `<div class="contact reveal">
      <p class="script contact-name">${esc(c.name)}</p>
      <p class="contact-role">${esc(c.role || "")}${en(c.roleEn)}</p>
      <div class="contact-actions">
        <a href="tel:+${num}" aria-label="Telefon ${esc(c.name)}"><svg><use href="#i-call"/></svg></a>
        <a href="https://wa.me/${num}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(c.name)}"><svg><use href="#i-wa"/></svg></a>
      </div>
    </div>`;
  }).join("");

  // ---------- Gallery ----------
  const photos = C.gallery || [];
  if (!photos.length) {
    $("#galeri").remove();
    document.querySelector('.bottom-nav a[href="#galeri"]').remove();
  } else {
    const grid = $("#gallery");
    const viewer = $("#viewer");
    const vImg = viewer.querySelector(".viewer-img");
    let shown = []; // photos that actually loaded
    let current = 0;

    // The 9 frame windows in assets/gallery-frame.webp (pixels in the 1333 x 2000 image).
    const COLS = [[222, 488], [525, 790], [830, 1095]];
    const ROWS = [[470, 807], [840, 1172], [1207, 1537]];
    const pct = (v, total) => `${(v / total * 100).toFixed(2)}%`;
    grid.innerHTML = photos.slice(0, 9).map((src, i) => {
      const [x0, x1] = COLS[i % 3], [y0, y1] = ROWS[Math.floor(i / 3)];
      const pos = `left:${pct(x0, 1333)};top:${pct(y0, 2000)};width:${pct(x1 - x0, 1333)};height:${pct(y1 - y0, 2000)}`;
      return `<button type="button" data-i="${i}" style="${pos}" aria-label="Lihat foto ${i + 1}"><img src="${esc(src)}" alt="Foto ${i + 1}" loading="lazy"></button>`;
    }).join("");
    grid.querySelectorAll("img").forEach((img, i) => {
      img.addEventListener("error", () => {
        const b = img.parentElement;
        b.classList.add("missing");
        b.disabled = true;
        b.textContent = `Foto ${i + 1}`;
      });
    });

    const show = (n) => {
      current = (n + shown.length) % shown.length;
      vImg.src = shown[current];
      vImg.alt = `Foto ${current + 1}`;
      viewer.querySelector(".viewer-count").textContent = `${current + 1} / ${shown.length}`;
    };
    const open = (src) => {
      shown = [...grid.querySelectorAll("button:not(.missing) img")].map((im) => im.getAttribute("src"));
      viewer.hidden = false;
      document.body.classList.add("locked");
      show(shown.indexOf(src));
    };
    const close = () => { viewer.hidden = true; document.body.classList.remove("locked"); };

    grid.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b && !b.classList.contains("missing")) open(b.querySelector("img").getAttribute("src"));
    });
    viewer.querySelector(".viewer-close").addEventListener("click", close);
    viewer.querySelector(".prev").addEventListener("click", () => show(current - 1));
    viewer.querySelector(".next").addEventListener("click", () => show(current + 1));
    viewer.addEventListener("click", (e) => { if (e.target === viewer) close(); });
    document.addEventListener("keydown", (e) => {
      if (viewer.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    // Swipe left / right on phones
    let x0 = null;
    viewer.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // ---------- Gifts ----------
  const G = C.gift;
  if (!G || C.showGifts === false) {
    $("#hadiah").remove();
    document.querySelector('.bottom-nav a[href="#hadiah"]').remove();
  } else {
    const giftMsg = $("#giftMsg");
    const copy = async (text, label) => {
      try { await navigator.clipboard.writeText(text); giftMsg.textContent = `${label} disalin.`; }
      catch (e) { giftMsg.textContent = text; }
      setTimeout(() => { giftMsg.textContent = ""; }, 2500);
    };


    const list = G.wishlist || [];
    $("#wishlist").innerHTML = list.map((w) =>
      `<div class="wl-item" data-id="${esc(w.name)}">
        <label class="wl-check" aria-label="Tandakan ${esc(w.name)}"><input type="checkbox"><span>✓</span></label>
        <span class="wl-text"><b>${esc(w.name)}</b>${w.note ? `<small>${esc(w.note)}</small>` : ""}<em class="wl-status"></em></span>
        ${w.link ? `<a class="wl-go" href="${esc(w.link)}" target="_blank" rel="noopener">Lihat</a>` : ""}
      </div>`).join("");
    limitScroll($("#wishlist"), ".wl-item", 3, $("#wlHint"), `↓ Tatal untuk lihat semua ${list.length} barang`);
    if (G.deliveryAddress) {
      const addr = [G.deliveryName, G.deliveryPhone, G.deliveryAddress].filter(Boolean);
      $("#deliveryText").innerHTML = addr.map(esc).join("<br>");
      $("#copyAddr").addEventListener("click", () => copy(addr.join("\n"), "Alamat"));
    } else { $("#delivery").remove(); }
    if (!list.length) $("#wishlistBox").remove();
  }

  // ---------- Envelope ----------
  const env = $("#envelope");
  const audio = $("#bgm");
  const musicBtn = $("#musicBtn");
  if (C.music) audio.src = C.music; else musicBtn.classList.add("hidden");
  audio.addEventListener("error", () => musicBtn.classList.add("hidden"));

  const playMusic = () => audio.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
  $("#openBtn").addEventListener("click", () => {
    env.classList.add("open");
    document.body.classList.remove("locked");
    if (C.music) playMusic();
    setTimeout(() => env.classList.add("gone"), 1300);
  });
  musicBtn.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else { audio.pause(); musicBtn.classList.remove("playing"); }
  });

  // ---------- Countdown ----------
  const tick = () => {
    let ms = Math.max(0, eventStart - Date.now());
    const s = Math.floor(ms / 1000);
    $("#cd-d").textContent = Math.floor(s / 86400);
    $("#cd-h").textContent = Math.floor((s % 86400) / 3600);
    $("#cd-m").textContent = Math.floor((s % 3600) / 60);
    $("#cd-s").textContent = s % 60;
  };
  tick();
  setInterval(tick, 1000);

  // ---------- Scroll reveal ----------
  // Sections fade in the first time they scroll into view. The cover (main page)
  // replays its fade-in every time the guest scrolls back up to it.
  const replays = (el) => !!el.closest(".cover");
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.intersectionRatio >= 0.15) {
      e.target.classList.add("in");
      if (!replays(e.target)) io.unobserve(e.target);
    } else if (!e.isIntersecting && replays(e.target)) {
      e.target.classList.remove("in");  // fully off screen: ready to play again
    }
  }), { threshold: [0, 0.15] });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---------- Backend (Google Apps Script, or demo mode) ----------
  const demo = !C.scriptUrl;
  const demoKey = "kad-demo";
  const demoLoad = () => { try { return JSON.parse(localStorage.getItem(demoKey)) || { rsvp: [], wish: [] }; } catch (e) { return { rsvp: [], wish: [] }; } };
  const demoSave = (db) => { try { localStorage.setItem(demoKey, JSON.stringify(db)); } catch (e) {} };

  async function send(type, data) {
    if (demo) {
      const db = demoLoad();
      db[type].push({ ...data, time: new Date().toISOString() });
      demoSave(db);
      return { ok: true };
    }
    // text/plain avoids a CORS preflight, which Apps Script does not support.
    const res = await fetch(C.scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ type, ...data }),
    });
    return res.json();
  }

  async function loadWishes() {
    let list = [];
    try {
      if (demo) list = demoLoad().wish.slice().reverse();
      else list = (await (await fetch(`${C.scriptUrl}?action=wishes`)).json()).wishes || [];
    } catch (e) {
      $("#wishList").innerHTML = '<p class="muted">Ucapan tidak dapat dimuatkan.</p>';
      return;
    }
    $("#wishList").innerHTML = list.length
      ? list.map((w) => `<div class="wish"><p>"${esc(w.message)}"</p><p class="who">${esc(w.name)}</p></div>`).join("")
      : '<p class="muted">Jadilah yang pertama menghantar ucapan.</p>';
    limitScroll(wishBox, ".wish", WISHES_SHOWN, $("#wishHint"), `↓ Tatal untuk lihat semua ${list.length} ucapan`);
  }

  const WISHES_SHOWN = 3;
  const wishBox = $("#wishList");

  function wire(formSel, msgSel, type, okText, onOk) {
    const form = $(formSel);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const msg = $(msgSel);
      btn.disabled = true;
      msg.textContent = "Menghantar…";
      try {
        const data = Object.fromEntries(new FormData(form));
        const res = await send(type, data);
        if (!res.ok) throw new Error(res.error || "failed");
        form.reset();
        msg.textContent = okText;
        if (type === "wish" && demo) loadWishes();
        if (onOk) onOk(data);
      } catch (err) {
        msg.textContent = "Maaf, ada masalah. Sila cuba lagi.";
      }
      btn.disabled = false;
    });
  }

  // ---------- One RSVP per device ----------
  // After a guest sends their RSVP, this phone remembers it. Next time they open
  // the card they see what they sent instead of the form, so they can't send twice.
  const RSVP_KEY = "kad-rsvp";
  const savedRsvp = () => { try { return JSON.parse(localStorage.getItem(RSVP_KEY)); } catch (e) { return null; } };
  function showRsvpDone() {
    const r = savedRsvp();
    if (!r) return;
    const coming = r.attending !== "Tidak Hadir";
    const pax = Number(r.pax) || 1;
    $("#rsvpDoneText").innerHTML = coming
      ? `<b>${esc(r.name)}</b> — Hadir, ${pax} orang${r.slot ? `<br>${esc(r.slot)}` : ""}` +
        en(`Attending, ${pax} ${pax > 1 ? "people" : "person"}${r.slot ? " · " + r.slot : ""}`)
      : `<b>${esc(r.name)}</b> — Tidak hadir${en("Not attending")}`;
    $("#rsvpDone").hidden = false;
    $("#rsvpForm").hidden = true;
    $("#rsvpStatus").hidden = false;
    document.querySelector('#rsvp [data-open-rsvp]').textContent = "Lihat RSVP Anda";
  }

  // Each device gets its own ID, sent with the RSVP. Sending again with the same
  // ID updates that guest's row in the Sheet instead of adding a new one.
  const rsvpIdBox = $("#rsvpId");
  rsvpIdBox.defaultValue = (savedRsvp() && savedRsvp().id) ||
    (window.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

  // "Change RSVP": reopen the form filled in with their previous answer.
  $("#rsvpChange").addEventListener("click", () => {
    const r = savedRsvp() || {};
    rsvpForm.reset();
    setTimeout(() => {
      rsvpForm.elements.namedItem("name").value = r.name || "";
      rsvpForm.elements.namedItem("phone").value = r.phone || "";
      const att = rsvpForm.querySelector(`[name="attending"][value="${r.attending === "Tidak Hadir" ? "Tidak Hadir" : "Hadir"}"]`);
      att.checked = true;
      syncAttending();
      if (r.pax) pax.value = Math.min(C.maxPax, Number(r.pax) || 1);
      const slot = [...rsvpForm.querySelectorAll('[name="slot"]')].find((x) => x.value === r.slot);
      if (slot) slot.checked = true;
      $("#rsvpSubmit").textContent = "Kemas Kini RSVP / Update";
      $("#rsvpMsg").textContent = "";
      $("#rsvpDone").hidden = true;
      rsvpForm.hidden = false;
    });
  });

  wire("#rsvpForm", "#rsvpMsg", "rsvp", "Terima kasih! Maklum balas anda telah diterima.", (data) => {
    $("#rsvpSubmit").textContent = "Sahkan RSVP / Confirm";
    try { localStorage.setItem(RSVP_KEY, JSON.stringify({ ...data, at: new Date().toISOString() })); } catch (e) {}
    showRsvpDone();
    setTimeout(() => $("#rsvpDialog").close(), 3000);
  });
  showRsvpDone();
  wire("#wishForm", "#wishMsg", "wish", demo
    ? "Terima kasih atas ucapan anda!"
    : "Terima kasih! Ucapan anda akan dipaparkan selepas disemak.");
  loadWishes();

  // ---------- Wishlist checklist (anonymous) ----------
  // A tick means "someone is buying this". No names are stored. This browser
  // remembers its own ticks so the same guest can untick if they change their mind.
  const wl = $("#wishlist");
  if (wl) {
    const store = (key, val) => {
      try {
        if (val === undefined) return JSON.parse(localStorage.getItem(key)) || [];
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) { return []; }
    };
    const MINE = "kad-hajat-saya";
    const DEMO_CLAIMS = "kad-demo-hajat";
    const giftMsg = $("#giftMsg");
    const say = (t) => { giftMsg.textContent = t; setTimeout(() => { if (giftMsg.textContent === t) giftMsg.textContent = ""; }, 3500); };

    async function claimed() {
      if (demo) return store(DEMO_CLAIMS);
      return (await (await fetch(`${C.scriptUrl}?action=claimed`)).json()).claimed || [];
    }
    async function setClaim(item, on) {
      if (demo) {
        const list = store(DEMO_CLAIMS).filter((x) => x !== item);
        if (on) list.push(item);
        store(DEMO_CLAIMS, list);
        return { ok: true };
      }
      const res = await fetch(C.scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ type: on ? "claim" : "unclaim", item }),
      });
      return res.json();
    }

    function paint(taken) {
      const mine = store(MINE);
      wl.querySelectorAll(".wl-item").forEach((row) => {
        const id = row.dataset.id;
        const box = row.querySelector("input");
        const isMine = mine.includes(id) && taken.includes(id);
        const isTaken = taken.includes(id) && !isMine;
        box.checked = isMine || isTaken;
        box.disabled = isTaken;
        row.classList.toggle("taken", isTaken);
        row.querySelector(".wl-status").textContent =
          isMine ? "Anda akan hadiahkan ini (tekan untuk batal)" : isTaken ? "Sudah ada yang akan hadiahkan" : "";
      });
    }

    async function refresh() {
      try { paint(await claimed()); } catch (e) { /* leave unticked if offline */ }
    }

    wl.addEventListener("change", async (e) => {
      const box = e.target;
      const row = box.closest(".wl-item");
      const id = row.dataset.id;
      const on = box.checked;
      if (on && !confirm(`Tandakan "${id}" sebagai hadiah anda?\nNama anda tidak akan dipaparkan.`)) { box.checked = false; return; }
      box.disabled = true;
      try {
        const res = await setClaim(id, on);
        if (!res.ok) {
          say(res.error === "taken" ? "Maaf, barang ini baru sahaja ditandakan oleh orang lain." : "Maaf, ada masalah. Sila cuba lagi.");
        } else {
          const mine = store(MINE).filter((x) => x !== id);
          if (on) mine.push(id);
          store(MINE, mine);
          say(on ? "Terima kasih! Barang ini telah ditandakan." : "Tanda telah dibatalkan.");
        }
      } catch (err) {
        say("Maaf, ada masalah. Sila cuba lagi.");
      }
      box.disabled = false;
      refresh();
    });

    refresh();
  }
})();
