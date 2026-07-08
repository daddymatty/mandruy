/* Мандруй — interaction layer. Vanilla JS, no deps, loaded with defer. */
(function () {
  "use strict";
  var EN = (document.documentElement.lang || "uk").indexOf("en") === 0;
  var MSG = {
    name: EN ? "Please enter your name" : "Вкажіть ваше ім’я",
    phone: EN ? "Please enter a valid number" : "Вкажіть коректний номер",
    sending: EN ? "Sending…" : "Надсилаємо…",
    fail: EN ? "Couldn’t send automatically. Please call or message us." : "Не вдалося надіслати. Зателефонуйте або напишіть у месенджер.",
  };

  /* ---- GA4 init (kept here so no inline script) ---- */
  var gaTag = document.querySelector("script[data-ga]");
  if (gaTag) {
    var gaId = gaTag.getAttribute("data-ga");
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
  }

  /* ---- Mobile navigation ---- */
  var burger = document.querySelector("[data-burger]");
  var mnav = document.querySelector("[data-mobile-nav]");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mnav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mnav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mnav.classList.contains("open")) { burger.click(); burger.focus(); }
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    window.addEventListener("load", function () {
      setTimeout(function () {
        reveals.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
        });
      }, 300);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up for stat numbers ---- */
  var counters = document.querySelectorAll("[data-count]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var dur = 1400, start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = fmt(c.getAttribute("data-count")); });
  }

  /* ---- Lead forms: validation + POST + localStorage backup ---- */
  function setErr(input, msg) {
    var field = input.closest(".field"); if (!field) return;
    field.classList.add("field--invalid"); input.setAttribute("aria-invalid", "true");
    var err = field.querySelector(".field__err");
    if (!err) { err = document.createElement("div"); err.className = "field__err"; err.setAttribute("role", "alert"); field.appendChild(err); }
    err.textContent = msg;
  }
  function clearErr(input) {
    var field = input.closest(".field"); if (!field) return;
    field.classList.remove("field--invalid"); input.removeAttribute("aria-invalid");
    var err = field.querySelector(".field__err"); if (err) err.textContent = "";
  }
  function validate(form) {
    var first = null;
    var name = form.querySelector("[name=name]");
    var phone = form.querySelector("[name=phone]");
    if (name) { if (name.value.trim().length < 2) { setErr(name, MSG.name); first = first || name; } else clearErr(name); }
    if (phone) { if (phone.value.replace(/\D/g, "").length < 9) { setErr(phone, MSG.phone); first = first || phone; } else clearErr(phone); }
    if (first) first.focus();
    return !first;
  }
  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.querySelectorAll("input, textarea").forEach(function (inp) {
      inp.addEventListener("input", function () { clearErr(inp); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(form).entries());
      if (data.company) return; /* honeypot */
      if (!validate(form)) return;
      data.page = location.pathname; data.ts = new Date().toISOString();
      try {
        var store = JSON.parse(localStorage.getItem("mandruy_leads") || "[]");
        store.push(data); localStorage.setItem("mandruy_leads", JSON.stringify(store));
      } catch (err) {}
      if (window.gtag) window.gtag("event", "generate_lead", { form_id: form.id || "lead", source: data.source || "site" });

      var note = form.querySelector(".form-note");
      var btn = form.querySelector("button[type=submit]");
      var endpoint = form.getAttribute("data-endpoint");
      var ok = function () {
        if (note) { note.classList.remove("error"); note.classList.add("show"); }
        form.reset();
        setTimeout(function () { if (note) note.classList.remove("show"); }, 6000);
      };
      if (!endpoint) { ok(); return; }
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = MSG.sending; }
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error("bad"); return r; })
        .then(ok)
        .catch(function () { if (note) { note.textContent = MSG.fail; note.classList.add("error", "show"); } })
        .finally(function () { if (btn) { btn.disabled = false; if (btn.dataset.label) btn.textContent = btn.dataset.label; } });
    });
  });

  /* ---- Header shadow + scroll progress ---- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector("[data-scroll-progress]");
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (header) { header.style.borderBottomColor = y > 8 ? "var(--line)" : "transparent"; header.style.boxShadow = y > 8 ? "var(--shadow-sm)" : "none"; }
    if (progress) { var h = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%"; }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Back to top ---- */
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    toTop.hidden = false;
    var toggle = function () { toTop.classList.toggle("show", window.scrollY > 700); };
    window.addEventListener("scroll", toggle, { passive: true }); toggle();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---- Pinned showcase: scroll-scrub through the journey steps ---- */
  var showcase = document.querySelector("[data-showcase]");
  var wideMq = window.matchMedia("(min-width: 941px)");
  if (showcase && !reduce && wideMq.matches) {
    var scSteps = [].slice.call(showcase.querySelectorAll(".sc-step"));
    var scDots = [].slice.call(showcase.querySelectorAll(".showcase__dots b"));
    var scGhost = showcase.querySelector("[data-showcase-ghost]");
    var scRail = showcase.querySelector("[data-showcase-rail]");
    var scTrack = showcase.querySelector(".showcase__track");
    var scN = scSteps.length, scTick = false, scCur = -1;
    var scUpdate = function () {
      scTick = false;
      var rect = scTrack.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var prog = Math.min(1, Math.max(0, -rect.top / (total || 1)));
      var idx = Math.min(scN - 1, Math.floor(prog * scN));
      if (scRail) scRail.style.width = (prog * 100) + "%";
      if (idx !== scCur) {
        scCur = idx;
        scSteps.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
        scDots.forEach(function (d, i) { d.classList.toggle("on", i === idx); });
        if (scGhost) scGhost.textContent = "0" + (idx + 1);
      }
    };
    window.addEventListener("scroll", function () { if (!scTick) { scTick = true; requestAnimationFrame(scUpdate); } }, { passive: true });
    scUpdate();
  }

  /* ---- Magnetic buttons + card tilt (pointer-fine only) ---- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduce) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (mx * 0.25).toFixed(1) + "px," + (my * 0.4).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "translateY(-6px) perspective(900px) rotateX(" + (-py * 6).toFixed(2) + "deg) rotateY(" + (px * 8).toFixed(2) + "deg)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
