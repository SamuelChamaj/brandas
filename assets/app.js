/* ============================================================
   Clippio Web Finder — app.js
   Vanilla JS. No dependencies. Optimized.
============================================================ */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth anchor scrolling (native + focus safety) ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     WEB FINDER — data
  ============================================================ */
  var QUESTIONS = [
    {
      key: "goal",
      kicker: "Krok 1",
      question: "Čo má web hlavne vyriešiť?",
      desc: "Vyber najbližšiu možnosť. Nevyberaj podľa ega, ale podľa problému.",
      options: [
        { label: "Potrebujem dôveryhodne vyzerať online", value: "presence" },
        { label: "Chcem viac dopytov a klientov", value: "leads" },
        { label: "Chcem predávať produkt / službu", value: "sales" },
        { label: "Chcem ukázať funkcie, portfólio alebo demo", value: "showcase" }
      ]
    },
    {
      key: "budget",
      kicker: "Krok 2",
      question: "Aký máš rozpočet?",
      desc: "Rozpočet nie je len cena. Je to hranica, pri ktorej sa ešte investícia vie vrátiť.",
      options: [
        { label: "Do 250 €", value: "low" },
        { label: "300 – 700 €", value: "mid" },
        { label: "800 €+", value: "high" },
        { label: "Neviem, chcem najlepší pomer cena/výkon", value: "unclear" }
      ]
    },
    {
      key: "need",
      kicker: "Krok 3",
      question: "Čo od webu očakávaš?",
      desc: "Tu sa láme rozdiel medzi peknou vizitkou a webom, ktorý má obchodný účel.",
      options: [
        { label: "Len info, služby a kontakt", value: "simple" },
        { label: "Silné texty, CTA a získavanie dopytov", value: "conversion" },
        { label: "Košík, objednávka alebo predajná funkcionalita", value: "shop" },
        { label: "Ukážky, animácie, sekcie navyše alebo špeciálne funkcie", value: "custom" }
      ]
    },
    {
      key: "timing",
      kicker: "Krok 4",
      question: "Ako rýchlo to potrebuješ?",
      desc: "Keď tlačí čas, netreba vymýšľať komplikovaný systém. Keď chceš výkon, treba počítať s prípravou.",
      options: [
        { label: "Čo najskôr", value: "fast" },
        { label: "Mám pár dní až týždňov", value: "normal" },
        { label: "Mám texty/fotky a chcem to spraviť poriadne", value: "prepared" },
        { label: "Najprv potrebujem ujasniť ponuku", value: "strategy" }
      ]
    }
  ];

  var RESULTS = {
    start: {
      title: "Balík Štart",
      summary: "Najlepší smer, ak potrebuješ dôveryhodnú online vizitku a nechceš riešiť veľkú stratégiu.",
      reason: "Cieľ je základná prítomnosť, kontakt a vysvetlenie služieb. Väčší web by teraz mal slabé ROI.",
      warning: "Neber ho, ak od webu čakáš pravidelné dopyty alebo predaj. Na to je príliš jednoduchý."
    },
    growth: {
      title: "Balík Rast",
      summary: "Najlepší pomer cena/výkon pre malú firmu alebo službu, ktorá chce viac dopytov.",
      reason: "Potrebuješ lepšiu štruktúru, presvedčivejšie texty, CTA, portfólio a dôveru.",
      warning: "Neber ho, ak ešte nevieš jasne pomenovať ponuku. Najprv si ujasni, čo predávaš."
    },
    sales: {
      title: "Balík Predaj",
      summary: "Najvhodnejší smer, ak web nemá byť len prezentácia, ale predajný alebo objednávkový systém.",
      reason: "Košík, objednávka, predajné sekcie a konverzná logika vyžadujú viac práce než bežná vizitka.",
      warning: "Neber ho len kvôli tomu, že znie prémiovo. Bez produktu a návštevnosti je to drahá dekorácia."
    },
    demo: {
      title: "Ukážkový / funkčný web",
      summary: "Najlepší smer, ak chceš ukázať funkcie, animácie, portfólio alebo vlastný proces.",
      reason: "Tu nejde iba o informácie. Web musí demonštrovať schopnosti a viesť návštevníka cez zážitok.",
      warning: "Nepridávaj efekty bez účelu. Každá animácia má buď vysvetľovať, predávať, alebo zvyšovať dôveru."
    }
  };

  /* ---------- State ---------- */
  var answers = { goal: null, budget: null, need: null, timing: null };
  var current = 0;

  /* ---------- DOM refs ---------- */
  var stepsEl = document.getElementById("steps");
  var resultEl = document.getElementById("result");
  var controlsEl = document.getElementById("step-controls");
  var backBtn = document.getElementById("back-btn");
  var nextBtn = document.getElementById("next-btn");
  var resetBtn = document.getElementById("reset-btn");
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dot"));

  if (!stepsEl) return; // finder not present

  /* ---------- Build steps once ---------- */
  function buildSteps() {
    var html = "";
    QUESTIONS.forEach(function (q, i) {
      html += '<div class="step" data-step="' + i + '" role="group" aria-label="' + q.kicker + '">';
      html += '<span class="kicker">' + q.kicker + "</span>";
      html += '<h3 class="step-question">' + q.question + "</h3>";
      html += '<p class="step-desc">' + q.desc + "</p>";
      html += '<div class="options">';
      q.options.forEach(function (opt) {
        html +=
          '<button type="button" class="option" role="radio" aria-checked="false" ' +
          'data-key="' + q.key + '" data-value="' + opt.value + '">' +
          '<span class="mark" aria-hidden="true"></span>' +
          "<span>" + opt.label + "</span>" +
          "</button>";
      });
      html += "</div></div>";
    });
    stepsEl.innerHTML = html;
  }

  /* ---------- Render current step ---------- */
  function showStep(index) {
    var allSteps = stepsEl.querySelectorAll(".step");
    allSteps.forEach(function (s, i) {
      s.classList.toggle("current", i === index);
    });
    // progress dots
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === index);
      d.classList.toggle("done", i < index);
    });
    // sync selected marks
    var q = QUESTIONS[index];
    var chosen = answers[q.key];
    var opts = allSteps[index].querySelectorAll(".option");
    opts.forEach(function (o) {
      var sel = o.getAttribute("data-value") === chosen;
      o.classList.toggle("selected", sel);
      o.setAttribute("aria-checked", sel ? "true" : "false");
    });
    // controls
    backBtn.disabled = index === 0;
    nextBtn.disabled = !chosen;
    nextBtn.textContent = index === QUESTIONS.length - 1 ? "Zobraziť výsledok" : "Ďalej";
  }

  /* ---------- Option selection (event delegation) ---------- */
  stepsEl.addEventListener("click", function (e) {
    var opt = e.target.closest(".option");
    if (!opt) return;
    var key = opt.getAttribute("data-key");
    var value = opt.getAttribute("data-value");
    answers[key] = value;

    // update visuals within this step
    var siblings = opt.parentNode.querySelectorAll(".option");
    siblings.forEach(function (s) {
      var sel = s === opt;
      s.classList.toggle("selected", sel);
      s.setAttribute("aria-checked", sel ? "true" : "false");
    });
    nextBtn.disabled = false;
  });

  /* ---------- Navigation ---------- */
  nextBtn.addEventListener("click", function () {
    if (current < QUESTIONS.length - 1) {
      current++;
      showStep(current);
    } else {
      finish();
    }
  });

  backBtn.addEventListener("click", function () {
    if (resultEl.hidden === false) {
      // coming back from result
      resultEl.hidden = true;
      stepsEl.style.display = "";
      controlsEl.style.display = "";
      showStep(current);
      return;
    }
    if (current > 0) {
      current--;
      showStep(current);
    }
  });

  if (resetBtn) resetBtn.addEventListener("click", resetFinder);

  /* ---------- Scoring logic ---------- */
  function computeResult(a) {
    var score = { start: 0, growth: 0, sales: 0, demo: 0 };

    if (a.goal === "presence") score.start += 4;
    if (a.goal === "leads") score.growth += 4;
    if (a.goal === "sales") score.sales += 5;
    if (a.goal === "showcase") score.demo += 5;

    if (a.budget === "low") score.start += 3;
    if (a.budget === "mid") score.growth += 3;
    if (a.budget === "high") { score.sales += 2; score.demo += 2; score.growth += 1; }
    if (a.budget === "unclear") score.growth += 2;

    if (a.need === "simple") score.start += 3;
    if (a.need === "conversion") score.growth += 4;
    if (a.need === "shop") score.sales += 5;
    if (a.need === "custom") score.demo += 4;

    if (a.timing === "fast") score.start += 2;
    if (a.timing === "normal") score.growth += 1;
    if (a.timing === "prepared") { score.growth += 2; score.sales += 1; }
    if (a.timing === "strategy") score.growth += 2;

    // Tie-break priority: growth > start > sales > demo
    var priority = ["growth", "start", "sales", "demo"];
    var winner = priority[0];
    var best = -1;
    priority.forEach(function (k) {
      if (score[k] > best) { best = score[k]; winner = k; }
    });
    return winner;
  }

  /* ---------- Finish / show result ---------- */
  function finish() {
    var winner = computeResult(answers);
    var r = RESULTS[winner];

    document.getElementById("result-title").textContent = r.title;
    document.getElementById("result-summary").textContent = r.summary;
    document.getElementById("result-reason").textContent = r.reason;
    document.getElementById("result-warning").textContent = r.warning;

    // build a richer mailto body
    var subject = "Clippio Web Finder - môj výsledok";
    var body =
      "Ahoj Clippio,\n\n" +
      "Vo Web Finderi mi vyšiel smer: " + r.title + ".\n\n" +
      r.summary + "\n\n" +
      "Rád/rada by som riešil/a konkrétnu ponuku.\n";
    var mail = document.getElementById("result-mail");
    if (mail) {
      mail.setAttribute(
        "href",
        "mailto:info@clippio.sk?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body)
      );
    }

    stepsEl.style.display = "none";
    controlsEl.style.display = "none";
    resultEl.hidden = false;

    // mark all dots done
    dots.forEach(function (d) { d.classList.remove("active"); d.classList.add("done"); });

    resultEl.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }

  /* ---------- Reset ---------- */
  function resetFinder() {
    answers = { goal: null, budget: null, need: null, timing: null };
    current = 0;
    resultEl.hidden = true;
    stepsEl.style.display = "";
    controlsEl.style.display = "";
    // clear selections
    stepsEl.querySelectorAll(".option").forEach(function (o) {
      o.classList.remove("selected");
      o.setAttribute("aria-checked", "false");
    });
    showStep(0);
  }

  /* ---------- Init ---------- */
  buildSteps();
  showStep(0);

})();