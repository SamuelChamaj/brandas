# Clippio Web Finder

**Clippio Web Finder** je prémiová, plne statická jednostránková web aplikácia, ktorá slovenským klientom pomôže zistiť, aký typ webu má pre nich reálny zmysel.

Krátky interaktívny výber (4 kroky) odporučí jeden z týchto smerov:

- **Balík Štart** – dôvera a základná prítomnosť
- **Balík Rast** – lepší obchodný výkon a dopyty
- **Balík Predaj** – funkcionalita a konverzie
- **Ukážkový / funkčný web** – demo, portfólio a funkcie

## Vlastnosti

- Statická stránka – **žiadny build step**, žiadne frameworky, žiadne závislosti
- Čisté HTML5, CSS a vanilla JavaScript
- Prémiový tmavý dizajn (navy/čierna, modré a fialové akcenty)
- Optimalizované na výkon (bez ťažkých animácií a scroll janku)
- Rešpektuje `prefers-reduced-motion`
- Responzívne – funguje na mobiloch aj desktopoch
- Pripravené pre **GitHub Pages**

## Súbory v projekte

- `index.html` – štruktúra stránky
- `assets/styles.css` – štýly a responzivita
- `assets/app.js` – logika výberu a interakcie
- `README.md` – tento súbor
- `.nojekyll` – vypnutie Jekyll spracovania na GitHub Pages

## Spustenie

Nie je potrebný žiadny build. Stačí otvoriť `index.html` v prehliadači.

## Nasadenie na GitHub Pages

1. Nahraj všetky súbory do repozitára.
2. V nastaveniach repozitára zapni **GitHub Pages** (branch `main`, priečinok `/root`).
3. Súbor `.nojekyll` zabezpečí správne servovanie priečinka `assets/`.

Používajú sa relatívne cesty (`./assets/styles.css`, `./assets/app.js`), takže stránka funguje priamo na GitHub Pages.
