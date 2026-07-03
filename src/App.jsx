import { useState } from 'react';
import Stepper, { Step } from './Stepper.jsx';
import './Stepper.css';

const choices = [
  'Jednoduchý firemný web',
  'Landing page na získavanie dopytov',
  'Ukážkový web s funkciami'
];

export default function App() {
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(choices[0]);

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Mini React demo</p>
          <h1>Ľahká stránka so stepperom</h1>
          <p className="hero-text">
            Jednoduchá ukážka animovaného procesu. Bez zbytočného balastu, pripravené ako základ
            pre onboarding, formulár alebo výber balíka.
          </p>
          <div className="hero-actions">
            <a href="#demo" className="primary-link">Pozrieť demo</a>
            <span className="meta-text">React · Vite · motion</span>
          </div>
        </div>

        <div className="stats-card" aria-label="Stručné výhody">
          <div>
            <strong>3</strong>
            <span>kroky</span>
          </div>
          <div>
            <strong>0</strong>
            <span>ťažký backend</span>
          </div>
          <div>
            <strong>1</strong>
            <span>čistý komponent</span>
          </div>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-heading">
          <p className="eyebrow">Použitý komponent</p>
          <h2>Výber projektu v troch krokoch</h2>
        </div>

        {!completed ? (
          <Stepper
            nextButtonText="Ďalej"
            backButtonText="Späť"
            onFinalStepCompleted={() => setCompleted(true)}
          >
            <Step>
              <div className="step-card-content">
                <span className="step-kicker">Krok 1</span>
                <h3>Čo chceš vytvoriť?</h3>
                <p>Vyber typ stránky. V reálnom webe by sa toto dalo napojiť na formulár.</p>
                <div className="choice-grid">
                  {choices.map(choice => (
                    <button
                      key={choice}
                      className={`choice-button ${selected === choice ? 'selected' : ''}`}
                      onClick={() => setSelected(choice)}
                      type="button"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            </Step>

            <Step>
              <div className="step-card-content">
                <span className="step-kicker">Krok 2</span>
                <h3>Vybraný smer</h3>
                <p className="selected-line">{selected}</p>
                <p>
                  Najlepšie využitie stepperu je tam, kde nechceš klienta zahltiť celým formulárom naraz.
                  Rozsekáš rozhodovanie na malé časti.
                </p>
              </div>
            </Step>

            <Step>
              <div className="step-card-content">
                <span className="step-kicker">Krok 3</span>
                <h3>Hotovo</h3>
                <p>
                  Tento základ môžeš použiť ako onboarding, konfigurátor služby alebo jednoduchý predajný
                  flow na webe.
                </p>
                <div className="summary-box">
                  <span>Výstup</span>
                  <strong>{selected}</strong>
                </div>
              </div>
            </Step>
          </Stepper>
        ) : (
          <div className="complete-card">
            <span className="step-kicker">Dokončené</span>
            <h3>Dopyt je pripravený</h3>
            <p>Vybraný typ: <strong>{selected}</strong></p>
            <button type="button" onClick={() => setCompleted(false)} className="primary-link reset-button">
              Spustiť znova
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
