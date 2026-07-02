import ElectricBorder from './components/ElectricBorder';
import AnimatedContent from './components/AnimatedContent';
import ScrollVelocity from './components/ScrollVelocity';
import ShapeBlur from './components/ShapeBlur';
import ShinyText from './components/ShinyText';
import LogoLoop from './components/LogoLoop';
import TargetCursor from './components/TargetCursor';
import MetallicPaint from './components/MetallicPaint';
import aureonMask from './assets/aureon-mask.svg';

const partnerLogos = [
  { node: 'NEXA', ariaLabel: 'Nexa' },
  { node: 'VOLT', ariaLabel: 'Volt' },
  { node: 'ORBIT', ariaLabel: 'Orbit' },
  { node: 'KRYPTON', ariaLabel: 'Krypton' },
  { node: 'LUMEN', ariaLabel: 'Lumen' },
  { node: 'AERIS', ariaLabel: 'Aeris' }
];

const services = [
  {
    title: 'Premium web experience',
    text: 'Landing page alebo firemný web s jasnou hierarchiou, silným prvým dojmom a animáciami, ktoré podporujú dôveru — nie chaos.',
    stat: '01'
  },
  {
    title: 'Conversion architecture',
    text: 'Sekcie sú postavené tak, aby návštevník rýchlo pochopil hodnotu, videl dôkaz a mal kam kliknúť bez hľadania.',
    stat: '02'
  },
  {
    title: 'Motion identity',
    text: 'Elektrické hrany, shiny text, scroll velocity, 3D blur a custom cursor tvoria jeden vizuálny jazyk. Nie náhodnú zbierku efektov.',
    stat: '03'
  }
];

const cases = [
  ['Luxury SaaS launch', 'Hero systém, pricing, FAQ, CTA funnel', '+38 % viac demo requestov'],
  ['Premium event brand', 'Mikrointerakcie, galéria, partner band', '2.4× vyšší čas na stránke'],
  ['High-ticket service', 'Dôkazové bloky, proces, lead form', 'nižší bounce po hero sekcii']
];

const process = [
  ['Audit', 'Vyhodnotíme, čo má stránka reálne predať. Bez toho sú efekty len drahá tapeta.'],
  ['System', 'Navrhneme obsah, sekcie, CTA a vizuálny rytmus. Najprv logika, potom wow efekt.'],
  ['Build', 'Dizajn sa premení na responzívny React web s animáciami a čistou štruktúrou.'],
  ['Polish', 'Doladíme rýchlosť, mobil, kontrast, hover stavy a pocit z používania.']
];

const pricing = [
  {
    name: 'Pulse',
    price: 'od 790 €',
    desc: 'Prémiová jednostránka pre službu, produkt alebo osobnú značku.',
    items: ['1 landing page', 'animovaný hero', 'CTA systém', 'responzívny dizajn']
  },
  {
    name: 'Signature',
    price: 'od 1 490 €',
    desc: 'Najlepší pomer cena/výkon pre značku, ktorá potrebuje vyzerať drahšie a dôveryhodnejšie.',
    items: ['viac sekcií', 'custom motion systém', 'case studies', 'SEO základ', 'lead flow']
  },
  {
    name: 'Orbit',
    price: 'od 2 900 €',
    desc: 'Pre high-ticket značky, ktoré potrebujú výrazný web ako predajný asset.',
    items: ['multi-page štruktúra', 'pokročilé efekty', 'copy systém', 'analytics-ready', 'launch podpora']
  }
];

function SectionTitle({ eyebrow, title, text }) {
  return (
    <AnimatedContent className="section-title" distance={56} threshold={0.22}>
      <span className="eyebrow"><ShinyText text={eyebrow} speed={3.2} color="#918aa9" shineColor="#ffffff" /></span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </AnimatedContent>
  );
}

function App() {
  return (
    <main className="site-shell">
      <TargetCursor targetSelector=".cursor-target" cursorColor="#ffffff" cursorColorOnTarget="#9f7aff" spinDuration={3} />

      <div className="noise" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <nav className="nav glass-panel">
        <a href="#top" className="brand cursor-target" aria-label="AUREON home">
          <span className="brand-mark">A</span>
          <span>AUREON</span>
        </a>
        <div className="nav-links">
          <a className="cursor-target" href="#services">Systém</a>
          <a className="cursor-target" href="#work">Ukážky</a>
          <a className="cursor-target" href="#pricing">Balíky</a>
          <a className="cursor-target" href="#contact">Kontakt</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-blur"><ShapeBlur variation={0} shapeSize={1.05} roundness={0.28} borderSize={0.055} circleSize={0.26} circleEdge={0.44} /></div>

        <AnimatedContent className="hero-copy" distance={70} threshold={0.05}>
          <span className="availability"><span /> premium digital experience studio</span>
          <h1>
            Web, ktorý pôsobí draho ešte predtým, než začneš predávať.
          </h1>
          <p>
            AUREON je ukážkový prémiový web postavený na elektrických borderoch, kovovej typografii, scroll animáciách a interaktívnom kurzore. Efekty tu majú obchodnú funkciu: zvýšiť vnímanú hodnotu značky.
          </p>
          <div className="hero-actions">
            <a className="button primary cursor-target" href="#pricing">Pozrieť balíky</a>
            <a className="button ghost cursor-target" href="#work">Vidieť ukážky</a>
          </div>
          <div className="hero-metrics">
            <div><strong>01</strong><span>jasný offer</span></div>
            <div><strong>06</strong><span>motion vrstiev</span></div>
            <div><strong>100%</strong><span>responzívny layout</span></div>
          </div>
        </AnimatedContent>

        <AnimatedContent className="hero-visual" direction="horizontal" reverse distance={80} threshold={0.05} delay={0.12}>
          <ElectricBorder color="#8f5cff" speed={0.7} chaos={0.08} borderRadius={34} className="hero-card-border">
            <div className="hero-card glass-panel">
              <div className="metal-wrap">
                <MetallicPaint
                  imageSrc={aureonMask}
                  seed={17}
                  scale={4.6}
                  refraction={0.018}
                  blur={0.014}
                  liquid={0.72}
                  speed={0.22}
                  brightness={2.2}
                  contrast={0.72}
                  angle={-16}
                  lightColor="#ffffff"
                  darkColor="#17102c"
                  tintColor="#c8b6ff"
                  chromaticSpread={1.8}
                  mouseAnimation
                />
              </div>
              <div className="panel-caption">
                <span>Signature visual system</span>
                <strong><ShinyText text="Electric / Metallic / Motion" speed={2.4} /></strong>
              </div>
            </div>
          </ElectricBorder>
        </AnimatedContent>
      </header>

      <section className="logo-band">
        <LogoLoop logos={partnerLogos} speed={70} gap={24} logoHeight={34} pauseOnHover scaleOnHover ariaLabel="Ukážkové značky" />
      </section>

      <ScrollVelocity
        texts={['PREMIUM WEB • MOTION SYSTEM • ELECTRIC INTERFACE • ', 'HIGH VALUE BRAND • DIGITAL PRESENCE • CONVERSION FLOW • ']}
        velocity={55}
        className="velocity-text"
      />

      <section className="section" id="services">
        <SectionTitle
          eyebrow="čo tento web predáva"
          title="Prémiový pocit nestačí. Musí viesť k akcii."
          text="Najväčšia chyba pri takýchto efektoch je FOMO: dať tam všetko, lebo to vyzerá cool. Tu sú efekty použité ako nosná identita, ale obsah stále vedie používateľa k rozhodnutiu."
        />
        <div className="service-grid">
          {services.map((service, index) => (
            <AnimatedContent key={service.title} distance={60} delay={index * 0.08} threshold={0.18}>
              <ElectricBorder color={index === 1 ? '#00e5ff' : '#8f5cff'} speed={0.55} chaos={0.055} borderRadius={28} className="service-border">
                <article className="service-card glass-panel cursor-target">
                  <span>{service.stat}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              </ElectricBorder>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="section split-section" id="work">
        <div>
          <SectionTitle
            eyebrow="ukážky použitia"
            title="Web má vyzerať ako asset, nie ako šablóna s efektmi."
            text="Toto je fiktívny obsah, ale štruktúra je reálna: hero, dôkaz, služby, proces, cenník a CTA. Presne to klient potrebuje pochopiť rýchlo."
          />
        </div>
        <div className="case-stack">
          {cases.map((item, index) => (
            <AnimatedContent key={item[0]} direction="horizontal" reverse={index % 2 === 0} distance={64} delay={index * 0.08} threshold={0.2}>
              <article className="case-card cursor-target">
                <span>0{index + 1}</span>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
                <strong>{item[2]}</strong>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <SectionTitle
          eyebrow="proces"
          title="Najprv dôvod, potom dizajn."
          text="Ak nevieš, čo má web priniesť, prémiový vizuál iba maskuje slabý offer. Preto je proces navrhnutý obchodne, nie len esteticky."
        />
        <div className="process-grid">
          {process.map((step, index) => (
            <AnimatedContent key={step[0]} distance={48} delay={index * 0.07} threshold={0.22}>
              <div className="process-card cursor-target">
                <b>{String(index + 1).padStart(2, '0')}</b>
                <h3>{step[0]}</h3>
                <p>{step[1]}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <SectionTitle
          eyebrow="balíky"
          title="Tri úrovne. Jedna jasná voľba."
          text="Najlepší variant je Signature. Pulse je dobrý na rýchly štart, Orbit má zmysel až keď už vieš, že web bude pracovať s drahším leadom alebo silnejšou značkou."
        />
        <div className="pricing-grid">
          {pricing.map((plan, index) => (
            <AnimatedContent key={plan.name} distance={60} delay={index * 0.08} threshold={0.2}>
              <ElectricBorder color={index === 1 ? '#ffffff' : '#7c3dff'} speed={0.5} chaos={index === 1 ? 0.075 : 0.045} borderRadius={30} className="price-border">
                <article className={`price-card glass-panel cursor-target ${index === 1 ? 'featured' : ''}`}>
                  {index === 1 && <span className="badge">najlepší pomer</span>}
                  <h3>{plan.name}</h3>
                  <strong>{plan.price}</strong>
                  <p>{plan.desc}</p>
                  <ul>
                    {plan.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              </ElectricBorder>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contact">
        <ElectricBorder color="#00e5ff" speed={0.8} chaos={0.065} borderRadius={36} className="cta-border">
          <div className="cta-card glass-panel">
            <AnimatedContent distance={44} threshold={0.25}>
              <span className="eyebrow"><ShinyText text="finálny blok" speed={3} /></span>
              <h2>Chceš prémiový dojem? Najprv si obháj cenu.</h2>
              <p>
                Tento dizajn má zmysel pre značku, ktorá potrebuje pôsobiť dôveryhodne, drahšie a technicky vyspelejšie. Ak predávaš lacnú službu bez jasnej hodnoty, takýto web ti problém nevyrieši — len ho krajšie zabalí.
              </p>
              <a className="button primary cursor-target" href="mailto:hello@aureon.studio">Začať projekt</a>
            </AnimatedContent>
          </div>
        </ElectricBorder>
      </section>

      <footer className="footer">
        <span>AUREON © 2026</span>
        <span>React / GSAP / Motion / Three.js</span>
      </footer>
    </main>
  );
}

export default App;
