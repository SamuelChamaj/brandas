(() => {
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
  const choiceButtons = [...root.querySelectorAll('[data-choice]')];
  const selectedLine = root.querySelector('[data-selected-line]');
  const summaryOutput = root.querySelector('[data-summary-output]');
  const completeOutput = root.querySelector('[data-complete-output]');

  let currentStep = 1;
  let selected = 'Jednoduchý firemný web';
  let locked = false;

  const checkIcon = `
    <svg class="check-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
    </svg>
  `;

  function setSelected(value) {
    selected = value;
    choiceButtons.forEach(button => {
      button.classList.toggle('selected', button.dataset.choice === selected);
    });
    selectedLine.textContent = selected;
    summaryOutput.textContent = selected;
    completeOutput.textContent = selected;
  }

  function renderIndicators() {
    indicators.forEach((indicator, index) => {
      const step = index + 1;
      const inner = indicator.querySelector('.step-indicator-inner');
      indicator.classList.toggle('active', step === currentStep);
      indicator.classList.toggle('complete', step < currentStep);

      if (step < currentStep) {
        inner.innerHTML = checkIcon;
      } else if (step === currentStep) {
        inner.innerHTML = '<span class="active-dot"></span>';
      } else {
        inner.innerHTML = `<span class="step-number">${step}</span>`;
      }
    });

    connectors.forEach((connector, index) => {
      connector.classList.toggle('complete', currentStep > index + 1);
    });
  }

  function renderNav() {
    const isFirst = currentStep === 1;
    const isLast = currentStep === panels.length;

    backButton.classList.toggle('visible', !isFirst);
    footerNav.classList.toggle('spread', !isFirst);
    footerNav.classList.toggle('end', isFirst);
    nextButton.textContent = isLast ? 'Dokončiť' : 'Ďalej';
  }

  function goToStep(nextStep) {
    if (locked || nextStep === currentStep || nextStep < 1 || nextStep > panels.length) return;
    locked = true;

    const direction = nextStep > currentStep ? 'forward' : 'back';
    const currentPanel = panels[currentStep - 1];
    const nextPanel = panels[nextStep - 1];

    currentPanel.classList.remove('active', 'backwards');
    currentPanel.classList.add(direction === 'forward' ? 'leaving-forward' : 'leaving-back');

    window.setTimeout(() => {
      currentPanel.classList.remove('leaving-forward', 'leaving-back');
      currentStep = nextStep;
      panels.forEach(panel => panel.classList.remove('active', 'backwards'));
      nextPanel.classList.add('active');
      if (direction === 'back') nextPanel.classList.add('backwards');
      renderIndicators();
      renderNav();
      locked = false;
    }, 180);
  }

  function complete() {
    panels.forEach(panel => panel.classList.remove('active', 'backwards'));
    completePanel.classList.add('active');
    footer.classList.add('hidden');
    indicators.forEach(indicator => indicator.classList.add('complete'));
    connectors.forEach(connector => connector.classList.add('complete'));
  }

  function reset() {
    completePanel.classList.remove('active');
    footer.classList.remove('hidden');
    currentStep = 1;
    panels.forEach(panel => panel.classList.remove('active', 'backwards'));
    panels[0].classList.add('active');
    renderIndicators();
    renderNav();
  }

  choiceButtons.forEach(button => {
    button.addEventListener('click', () => setSelected(button.dataset.choice));
  });

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => goToStep(Number(indicator.dataset.stepIndicator)));
  });

  backButton.addEventListener('click', () => goToStep(currentStep - 1));
  nextButton.addEventListener('click', () => {
    if (currentStep === panels.length) complete();
    else goToStep(currentStep + 1);
  });
  resetButton.addEventListener('click', reset);

  setSelected(selected);
  renderIndicators();
  renderNav();
})();
