/* ==========================================================================
   IBA-USA — shared behaviour
   1. Mobile navigation
   2. Site-wide English / 中文 toggle
   3. Sponsor logo fallback
   4. Gallery lightbox
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 2. Language toggle ---------- */
  var LANG_KEY = "iba-lang";
  var root = document.documentElement;

  function labelFor(lang) {
    return lang === "zh" ? "English" : "中文";
  }

  function applyLang(lang) {
    root.setAttribute("data-site-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-lang-btn]"),
      function (btn) {
        btn.querySelector("[data-lang-label]").textContent = labelFor(lang);
        btn.setAttribute(
          "aria-label",
          lang === "zh" ? "Switch to English" : "切换到中文"
        );
      }
    );
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) { /* private mode */ }
  }

  var stored = null;
  try { stored = localStorage.getItem(LANG_KEY); } catch (err) { /* ignore */ }
  applyLang(stored === "zh" ? "zh" : "en");

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-lang-btn]"),
    function (btn) {
      btn.addEventListener("click", function () {
        applyLang(root.getAttribute("data-site-lang") === "zh" ? "en" : "zh");
      });
    }
  );

  /* ---------- 3. Events: sort into upcoming and past ----------
     Each .event card carries data-date="YYYY-MM-DD". Cards are authored into the
     right section already, so the page is correct without JavaScript; this just
     keeps it correct as time passes, with no need to edit the HTML again. */
  (function () {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    /* An event detail page marks itself once its date has gone by. */
    var notice = document.querySelector("[data-event-past-notice]");
    if (notice) {
      var nd = notice.getAttribute("data-event-past-notice").split("-");
      notice.hidden = new Date(+nd[0], +nd[1] - 1, +nd[2]) >= today;
    }

    var lists = document.querySelectorAll("[data-event-list]");
    if (!lists.length) return;

    var all = [];
    Array.prototype.forEach.call(lists, function (list) {
      Array.prototype.forEach.call(list.querySelectorAll(".event[data-date]"), function (el) {
        var parts = el.getAttribute("data-date").split("-");
        var when = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        all.push({ el: el, when: when, past: when < today });
      });
    });
    if (!all.length) return;

    var upcoming = all.filter(function (e) { return !e.past; })
                      .sort(function (a, b) { return a.when - b.when; });
    var past     = all.filter(function (e) { return e.past; })
                      .sort(function (a, b) { return b.when - a.when; });

    past.forEach(function (e) { e.el.classList.add("is-past"); });

    function fill(name, items) {
      var list = document.querySelector('[data-event-list="' + name + '"]');
      if (!list) return;
      items.forEach(function (e) { list.appendChild(e.el); });
      var empty = document.querySelector('[data-empty-for="' + name + '"]');
      if (empty) empty.hidden = items.length > 0;
    }

    fill("upcoming", upcoming);
    fill("past", past);

    /* The homepage shows one list: the next events if there are any, otherwise
       the two most recent, with the heading relabelled to match. */
    var home = document.querySelector('[data-event-list="home"]');
    if (home) {
      var showing = upcoming.length ? upcoming.slice(0, 2) : past.slice(0, 2);
      var mode = upcoming.length ? "upcoming" : "past";
      all.forEach(function (e) {
        if (showing.indexOf(e) === -1 && e.el.parentNode === home) e.el.remove();
      });
      showing.forEach(function (e) { home.appendChild(e.el); });
      var head = document.querySelector("[data-home-events-head]");
      if (head) {
        Array.prototype.forEach.call(head.querySelectorAll("[data-label-" + mode + "]"),
          function (el) { el.textContent = el.getAttribute("data-label-" + mode); });
      }
    }

  })();

  /* ---------- 4. Optional media: drop the figure if the file isn't there yet ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-optional-media] img"),
    function (img) {
      img.addEventListener("error", function () {
        var fig = img.closest("[data-optional-media]");
        if (!fig) return;
        var split = fig.parentNode;
        fig.remove();
        /* with the figure gone the two-column split has one child; let it fill the row */
        if (split && split.classList.contains("split") && split.children.length === 1) {
          split.classList.add("split--single");
        }
      });
    }
  );

  /* ---------- 5. Sponsor logos: fall back to a wordmark ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll(".logo-card img[data-name]"),
    function (img) {
      img.addEventListener("error", function () {
        var span = document.createElement("span");
        span.className = "logo-card__name";
        var en = document.createElement("span");
        en.setAttribute("data-lang", "en");
        en.innerHTML = img.getAttribute("data-name");
        var zh = document.createElement("span");
        zh.setAttribute("data-lang", "zh");
        zh.innerHTML = img.getAttribute("data-name-zh") || img.getAttribute("data-name");
        span.appendChild(en);
        span.appendChild(zh);
        img.replaceWith(span);
      });
    }
  );

  /* ---------- 6. Lightbox ---------- */
  var gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  var sources = Array.prototype.map.call(
    gallery.querySelectorAll("img"),
    function (img) { return img.getAttribute("data-full") || img.src; }
  );
  var index = 0;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Image viewer");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
    '<img alt="">' +
    '<div class="lightbox__bar">' +
      '<button type="button" data-prev aria-label="Previous image">&#8592;</button>' +
      '<span data-count></span>' +
      '<button type="button" data-next aria-label="Next image">&#8594;</button>' +
    "</div>";
  document.body.appendChild(box);

  var picture = box.querySelector("img");
  var counter = box.querySelector("[data-count]");
  var lastFocus = null;

  function show(i) {
    index = (i + sources.length) % sources.length;
    picture.src = sources[index];
    picture.alt = "Slide " + (index + 1) + " of " + sources.length;
    counter.textContent = index + 1 + " / " + sources.length;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }
  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  gallery.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (btn) open(Number(btn.getAttribute("data-index")) || 0);
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) return close();
    if (e.target.closest(".lightbox__close")) return close();
    if (e.target.closest("[data-prev]")) return show(index - 1);
    if (e.target.closest("[data-next]")) return show(index + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
