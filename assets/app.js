(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initBlurText() {
    document.querySelectorAll('[data-blur-text]').forEach((el) => {
      const words = el.textContent.trim().split(' ');
      el.textContent = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + (index < words.length - 1 ? '\u00A0' : '');
        span.style.animationDelay = `${index * 70}ms`;
        el.appendChild(span);
      });
    });
  }

  function initTrueFocus() {
    document.querySelectorAll('.true-focus').forEach((container) => {
      const words = (container.dataset.focus || '').split(' ').filter(Boolean);
      container.textContent = '';
      const spans = words.map((word) => {
        const span = document.createElement('span');
        span.className = 'focus-word';
        span.textContent = word;
        container.appendChild(span);
        return span;
      });
      const frame = document.createElement('span');
      frame.className = 'focus-frame';
      frame.innerHTML = '<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>';
      container.appendChild(frame);
      let index = 0;
      const update = () => {
        spans.forEach((span, i) => span.classList.toggle('active', i === index));
        const rect = spans[index].getBoundingClientRect();
        const parent = container.getBoundingClientRect();
        frame.style.width = `${rect.width}px`;
        frame.style.height = `${rect.height}px`;
        frame.style.transform = `translate(${rect.left - parent.left}px, ${rect.top - parent.top}px)`;
        frame.style.opacity = '1';
      };
      update();
      window.addEventListener('resize', update);
      if (!prefersReduced) {
        setInterval(() => {
          index = (index + 1) % spans.length;
          update();
        }, 1250);
      }
    });
  }

  function drawElectricBorder(canvas, container, ctx, state, time) {
    const rect = container.getBoundingClientRect();
    const pad = 58;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width + pad * 2;
    const height = rect.height + pad * 2;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#5227ff';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(82,39,255,0.75)';

    const left = pad;
    const top = pad;
    const bw = rect.width;
    const bh = rect.height;
    const radius = Math.min(32, bw / 2, bh / 2);
    const points = Math.max(130, Math.floor((bw + bh) * 1.15));
    const perimeter = 2 * (bw + bh - 4 * radius) + 2 * Math.PI * radius;

    function pointAt(distance) {
      let d = distance % perimeter;
      const topLen = bw - 2 * radius;
      const sideLen = bh - 2 * radius;
      const arc = Math.PI * radius / 2;
      if (d < topLen) return [left + radius + d, top];
      d -= topLen;
      if (d < arc) return [left + bw - radius + Math.cos(-Math.PI / 2 + d / arc * Math.PI / 2) * radius, top + radius + Math.sin(-Math.PI / 2 + d / arc * Math.PI / 2) * radius];
      d -= arc;
      if (d < sideLen) return [left + bw, top + radius + d];
      d -= sideLen;
      if (d < arc) return [left + bw - radius + Math.cos(d / arc * Math.PI / 2) * radius, top + bh - radius + Math.sin(d / arc * Math.PI / 2) * radius];
      d -= arc;
      if (d < topLen) return [left + bw - radius - d, top + bh];
      d -= topLen;
      if (d < arc) return [left + radius + Math.cos(Math.PI / 2 + d / arc * Math.PI / 2) * radius, top + bh - radius + Math.sin(Math.PI / 2 + d / arc * Math.PI / 2) * radius];
      d -= arc;
      if (d < sideLen) return [left, top + bh - radius - d];
      d -= sideLen;
      return [left + radius + Math.cos(Math.PI + d / arc * Math.PI / 2) * radius, top + radius + Math.sin(Math.PI + d / arc * Math.PI / 2) * radius];
    }

    ctx.beginPath();
    for (let i = 0; i <= points; i += 1) {
      const progress = i / points;
      const [x, y] = pointAt(progress * perimeter);
      const n = Math.sin(progress * 55 + time * 0.0022 + state.seed) * 5 + Math.sin(progress * 117 - time * 0.0017) * 3;
      const cx = rect.width / 2 + pad;
      const cy = rect.height / 2 + pad;
      const dx = x - cx;
      const dy = y - cy;
      const len = Math.hypot(dx, dy) || 1;
      const px = x + (dx / len) * n;
      const py = y + (dy / len) * n;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function initElectricBorders() {
    if (prefersReduced) return;
    const borders = [...document.querySelectorAll('.electric-border')].map((container, index) => {
      const canvas = document.createElement('canvas');
      canvas.className = 'electric-canvas';
      container.prepend(canvas);
      return { container, canvas, ctx: canvas.getContext('2d'), state: { seed: index * 7.7 } };
    });
    const tick = (time) => {
      borders.forEach((item) => item.ctx && drawElectricBorder(item.canvas, item.container, item.ctx, item.state, time));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initStrands() {
    const canvas = document.querySelector('.strands-canvas');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    const colors = ['#5227ff', '#4079ff', '#40ffaa', '#ff9ffc'];
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    function draw(time) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let s = 0; s < 4; s += 1) {
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 10) {
          const p = x / w;
          const y = h * (0.34 + s * 0.09) + Math.sin(p * 9 + time * 0.00055 + s * 1.8) * 48 + Math.sin(p * 21 - time * 0.00035) * 22;
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = colors[s % colors.length];
        ctx.globalAlpha = 0.26;
        ctx.lineWidth = 2.2 + s * 0.8;
        ctx.shadowBlur = 24;
        ctx.shadowColor = colors[s % colors.length];
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function initClickSpark() {
    const canvas = document.querySelector('.click-spark-canvas');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('click', (event) => {
      if (event.target.closest('a, button, .magic-bento-card, .electric-border')) {
        const count = 8;
        for (let i = 0; i < count; i += 1) {
          sparks.push({ x: event.clientX, y: event.clientY, angle: Math.PI * 2 * i / count, start: performance.now() });
        }
      }
    });
    function draw(now) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((spark) => {
        const progress = (now - spark.start) / 430;
        if (progress >= 1) return false;
        const eased = progress * (2 - progress);
        const dist = eased * 22;
        const len = 12 * (1 - eased);
        const x1 = spark.x + Math.cos(spark.angle) * dist;
        const y1 = spark.y + Math.sin(spark.angle) * dist;
        const x2 = spark.x + Math.cos(spark.angle) * (dist + len);
        const y2 = spark.y + Math.sin(spark.angle) * (dist + len);
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 1 - progress;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        return true;
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function initMagicBento() {
    const grid = document.querySelector('[data-bento-grid]');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.magic-bento-card')];
    const updateGlow = (event) => {
      const section = grid.getBoundingClientRect();
      const inside = event.clientX >= section.left && event.clientX <= section.right && event.clientY >= section.top && event.clientY <= section.bottom;
      cards.forEach((card) => {
        if (!inside) {
          card.style.setProperty('--glow-intensity', '0');
          return;
        }
        const rect = card.getBoundingClientRect();
        const rx = ((event.clientX - rect.left) / rect.width) * 100;
        const ry = ((event.clientY - rect.top) / rect.height) * 100;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
        const glow = Math.max(0, 1 - distance / 420);
        card.style.setProperty('--glow-x', `${rx}%`);
        card.style.setProperty('--glow-y', `${ry}%`);
        card.style.setProperty('--glow-intensity', glow.toFixed(2));
      });
    };
    document.addEventListener('mousemove', updateGlow);
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (prefersReduced) return;
        for (let i = 0; i < 9; i += 1) {
          const p = document.createElement('span');
          p.className = 'particle';
          p.style.left = `${Math.random() * 100}%`;
          p.style.top = `${Math.random() * 100}%`;
          p.style.setProperty('--tx', `${(Math.random() - 0.5) * 90}px`);
          p.style.setProperty('--ty', `${(Math.random() - 0.5) * 90}px`);
          card.appendChild(p);
          setTimeout(() => p.remove(), 1800);
        }
      });
      card.addEventListener('click', (event) => {
        if (prefersReduced) return;
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 850);
      });
    });
  }

  function initStepper() {
    const root = document.querySelector('[data-stepper]');
    if (!root) return;
    const panels = [...root.querySelectorAll('[data-step]')];
    const indicators = [...root.querySelectorAll('[data-step-indicator]')];
    const connectors = [...root.querySelectorAll('.step-connector')];
    const backButton = root.querySelector('[data-back]');
    const nextButton = root.querySelector('[data-next]');
    const footer = root.querySelector('[data-footer]');
    const footerNav = root.querySelector('[data-footer-nav]');
    const completePanel = root.querySelector('[data-complete]');
    const resetButton = root.querySelector('[data-reset]');
    const choiceButtons = [...root.querySelectorAll('[data-question]')];
    const resultTitle = root.querySelector('[data-result-title]');
    const resultSummary = root.querySelector('[data-result-summary]');
    const resultReason = root.querySelector('[data-result-reason]');
    const resultWarning = root.querySelector('[data-result-warning]');
    let currentStep = 1;
    let locked = false;
    const answers = { goal: 'presence', budget: 'low', need: 'simple', timing: 'fast' };
    const checkIcon = '<svg class="check-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>';

    const recommendations = {
      start: {
        title: 'Balík Štart',
        summary: 'Najlepší smer, ak potrebuješ dôveryhodnú online vizitku a nechceš riešiť veľkú stratégiu.',
        reason: 'Cieľ je základná prítomnosť, kontakt a vysvetlenie služieb. Väčší web by teraz mal slabé ROI.',
        warning: 'Neber ho, ak od webu čakáš pravidelné dopyty alebo predaj. Na to je príliš jednoduchý.'
      },
      growth: {
        title: 'Balík Rast',
        summary: 'Najlepší pomer cena/výkon pre malú firmu alebo službu, ktorá chce viac dopytov.',
        reason: 'Potrebuješ lepšiu štruktúru, presvedčivejšie texty, CTA, portfólio a dôveru.',
        warning: 'Neber ho, ak ešte nevieš jasne pomenovať ponuku. Najprv si ujasni, čo predávaš.'
      },
      sales: {
        title: 'Balík Predaj',
        summary: 'Najvhodnejší smer, ak web nemá byť len prezentácia, ale predajný alebo objednávkový systém.',
        reason: 'Košík, objednávka, predajné sekcie a konverzná logika vyžadujú viac práce než bežná vizitka.',
        warning: 'Neber ho len kvôli tomu, že znie prémiovo. Bez produktu a návštevnosti je to drahá dekorácia.'
      },
      demo: {
        title: 'Ukážkový / funkčný web',
        summary: 'Najlepší smer, ak chceš ukázať funkcie, animácie, portfólio alebo vlastný proces.',
        reason: 'Tu nejde iba o informácie. Web musí demonštrovať schopnosti a viesť návštevníka cez zážitok.',
        warning: 'Nepridávaj efekty bez účelu. Každá animácia má buď vysvetľovať, predávať, alebo zvyšovať dôveru.'
      }
    };

    function getRecommendation() {
      const score = { start: 0, growth: 0, sales: 0, demo: 0 };
      if (answers.goal === 'presence') score.start += 4;
      if (answers.goal === 'leads') score.growth += 4;
      if (answers.goal === 'sales') score.sales += 5;
      if (answers.goal === 'showcase') score.demo += 5;
      if (answers.budget === 'low') score.start += 3;
      if (answers.budget === 'mid') score.growth += 3;
      if (answers.budget === 'high') { score.sales += 2; score.demo += 2; score.growth += 1; }
      if (answers.budget === 'unclear') score.growth += 2;
      if (answers.need === 'simple') score.start += 3;
      if (answers.need === 'conversion') score.growth += 4;
      if (answers.need === 'shop') score.sales += 5;
      if (answers.need === 'custom') score.demo += 4;
      if (answers.timing === 'fast') score.start += 2;
      if (answers.timing === 'normal') score.growth += 1;
      if (answers.timing === 'prepared') { score.growth += 2; score.sales += 1; }
      if (answers.timing === 'strategy') score.growth += 2;
      const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      return recommendations[winner];
    }

    function renderIndicators() {
      indicators.forEach((indicator, index) => {
        const step = index + 1;
        const inner = indicator.querySelector('.step-indicator-inner');
        indicator.classList.toggle('active', step === currentStep);
        indicator.classList.toggle('complete', step < currentStep || completePanel.classList.contains('active'));
        if (step < currentStep || completePanel.classList.contains('active')) inner.innerHTML = checkIcon;
        else if (step === currentStep) inner.innerHTML = '<span class="active-dot"></span>';
        else inner.innerHTML = `<span class="step-number">${step}</span>`;
      });
      connectors.forEach((connector, index) => connector.classList.toggle('complete', currentStep > index + 1 || completePanel.classList.contains('active')));
    }

    function renderNav() {
      const isFirst = currentStep === 1;
      const isLast = currentStep === panels.length;
      backButton.classList.toggle('visible', !isFirst);
      footerNav.classList.toggle('spread', !isFirst);
      footerNav.classList.toggle('end', isFirst);
      nextButton.textContent = isLast ? 'Vyhodnotiť' : 'Ďalej';
    }

    function goToStep(nextStep) {
      if (locked || nextStep === currentStep || nextStep < 1 || nextStep > panels.length || completePanel.classList.contains('active')) return;
      locked = true;
      const direction = nextStep > currentStep ? 'forward' : 'back';
      const currentPanel = panels[currentStep - 1];
      const nextPanel = panels[nextStep - 1];
      currentPanel.classList.remove('active');
      currentPanel.classList.add(direction === 'forward' ? 'leaving-forward' : 'leaving-back');
      setTimeout(() => {
        currentPanel.classList.remove('leaving-forward', 'leaving-back');
        currentStep = nextStep;
        panels.forEach((panel) => panel.classList.remove('active'));
        nextPanel.classList.add('active');
        renderIndicators();
        renderNav();
        locked = false;
      }, 170);
    }

    function complete() {
      const result = getRecommendation();
      resultTitle.textContent = result.title;
      resultSummary.textContent = result.summary;
      resultReason.textContent = result.reason;
      resultWarning.textContent = result.warning;
      panels.forEach((panel) => panel.classList.remove('active'));
      completePanel.classList.add('active');
      footer.classList.add('hidden');
      renderIndicators();
    }

    function reset() {
      completePanel.classList.remove('active');
      footer.classList.remove('hidden');
      currentStep = 1;
      panels.forEach((panel) => panel.classList.remove('active', 'leaving-forward', 'leaving-back'));
      panels[0].classList.add('active');
      renderIndicators();
      renderNav();
    }

    choiceButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const q = button.dataset.question;
        answers[q] = button.dataset.value;
        root.querySelectorAll(`[data-question="${q}"]`).forEach((item) => item.classList.toggle('selected', item === button));
      });
    });
    indicators.forEach((indicator) => indicator.addEventListener('click', () => goToStep(Number(indicator.dataset.stepIndicator))));
    backButton.addEventListener('click', () => goToStep(currentStep - 1));
    nextButton.addEventListener('click', () => currentStep === panels.length ? complete() : goToStep(currentStep + 1));
    resetButton.addEventListener('click', reset);
    renderIndicators();
    renderNav();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBlurText();
    initTrueFocus();
    initElectricBorders();
    initStrands();
    initClickSpark();
    initMagicBento();
    initStepper();
  });
})();
