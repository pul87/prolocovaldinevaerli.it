# Piano di upgrade tecnico

Questo documento raccoglie le fasi consigliate per aggiornare gradualmente il progetto, riducendo il rischio di rompere il sito in produzione.

## Stato attuale

Stack attuale in produzione:

- Gatsby 5
- React 18
- Decap CMS `3.6.4`
- override Decap allineato: `decap-cms-core@3.6.3`
- Markdown come sorgente contenuti
- Bulma + Sass (`sass`, non `node-sass`)
- Gatsby Plugin Image / Sharp
- Netlify deploy con `netlify.toml`
- Node indicato in `.nvmrc`: `v22.22.3`
- package manager scelto: npm

Verifiche locali già eseguite:

```bash
nvm use
npm ci
npm run build
```

I comandi risultano funzionanti localmente su Node 22. `npm run start` usa `gatsby develop` dopo aver ricreato `.cache`.

Problemi/debito tecnico ancora presenti:

- Decap CMS porta alcune dipendenze transitive vecchie e warning npm peer/deprecation, anche se installazione e build passano senza `--force` o `--legacy-peer-deps`.
- `decap-cms-app@3.6.4` è la massima versione adottata con React 18; `decap-cms-app@3.7+` richiede React 19 e va quindi valutato solo in una migrazione dedicata.
- L'audit npm segnala ancora vulnerabilità residue: 72 totali (`9 low`, `40 moderate`, `23 high`). Molti fix automatici propongono downgrade o breaking change, quindi non usare `npm audit fix --force`.
- Può restare il warning Sass `legacy-js-api` dalla toolchain Gatsby/Sass, non dal Sass del progetto.
- Può restare il warning Decap CMS `Critical dependency: the request of a dependency is an expression` da `gatsby-plugin-decap-cms`.
- I metadati HTML sono stati migrati alla Gatsby Head API.
- Bulma è stato aggiornato a `1.0.4` e il Sass del progetto usa `@use` invece di `@import`.
- Il vecchio plugin `gatsby-source-instagram` è stato rimosso perché basato su scraping fragile/non più affidabile.

---

## Fase 1 — Stabilizzazione baseline

Stato: **completata localmente**.

Obiettivo: avere una base locale riproducibile e documentata prima di qualsiasi upgrade importante.

Attività completate:

- scelta di npm come package manager;
- rimozione di `yarn.lock`;
- aggiornamento README con comandi reali di installazione, sviluppo e build;
- correzione del default CMS della collection `route` da `blog-post` a `route-post`;
- correzione contenuto evento con tag vuoto (`tags: []`);
- build locale verificata.

Da verificare fuori dal locale:

- deploy preview Netlify;
- controllo manuale CMS in ambiente deploy.

---

## Fase 2 — Aggiornamento minimo sicuro

Stato: **completata localmente**.

Obiettivo: rimuovere i punti più fragili mantenendo il più possibile lo stack esistente.

Attività completate:

- uso di `sass` al posto di eventuale `node-sass`;
- aggiornamento `gatsby-plugin-sass` a versione compatibile con Gatsby 3;
- verifica import Sass e configurazione `gatsby-config.js`;
- verifica:

  ```bash
  npm run build
  npm run start
  ```

Da verificare manualmente:

- homepage;
- blog;
- eventi;
- sentieri;
- pagine tag;
- pannello admin CMS.

---

## Fase 3 — Modernizzazione intermedia

Stato: **completata localmente per lo scope Gatsby 3 / Node 16**.

Obiettivo: portare il progetto su versioni più supportate, limitando ancora le modifiche architetturali.

Attività completate:

- upgrade Gatsby 2 → Gatsby 3;
- aggiornamento plugin Gatsby principali:
  - `gatsby-plugin-sharp`;
  - `gatsby-transformer-sharp`;
  - `gatsby-source-filesystem`;
  - `gatsby-transformer-remark`;
  - `gatsby-remark-images`;
  - `gatsby-plugin-sitemap`;
  - `gatsby-plugin-netlify`;
  - `gatsby-plugin-react-helmet`;
  - `gatsby-plugin-netlify-cms`;
- aggiornamento Node locale e Netlify a `16.20.2`;
- rimozione del vecchio `gatsby-source-instagram`;
- mantenimento link pubblico a Instagram in homepage/footer;
- verifica e rimozione di `html-webpack-plugin` come dipendenza diretta non necessaria;
- build e develop verificati localmente.

Attività ancora consigliate prima del merge/deploy:

1. Fare smoke test manuale delle pagine principali in deploy preview Netlify.
2. Verificare il pannello admin CMS in ambiente deploy.

Fuori scope per questa fase, salvo decisione diversa:

- upgrade React;
- migrazione completa immagini a `gatsby-plugin-image`;
- migrazione Netlify CMS → Decap CMS;
- ripristino feed automatico Instagram.

### Nota Instagram

Il vecchio feed Instagram usava `gatsby-source-instagram`, plugin non più affidabile perché basato su scraping della pagina pubblica Instagram. Instagram ha cambiato/limitato quelle strutture, causando errori tipo:

```text
Cannot read properties of undefined (reading 'ProfilePage')
```

La funzionalità è stata rimossa dalla build. Se si vuole ripristinare il feed automatico, la strada consigliata è una feature dedicata basata su:

- Instagram/Meta Graph API;
- account Instagram Business o Creator collegato a pagina Facebook;
- token gestito come variabile ambiente Netlify;
- Netlify Function server-side con fallback/cache, così la build Gatsby non dipende direttamente dalla disponibilità dell'API Instagram.

---

## Fase 4 — Modernizzazione completa

Stato: **completata e validata in deploy preview Netlify**.

Obiettivo: aggiornare il progetto allo stack moderno Gatsby.

Attività completate e validate:

1. Upgrade a Gatsby 5.
2. Aggiornamento React a 18.
3. Aggiornamento Node locale e Netlify a `22.22.3`.
4. Migrazione da `gatsby-image` a `gatsby-plugin-image`.
5. Aggiornamento query immagini e componenti che usano immagini responsive.
6. Migrazione Netlify CMS → Decap CMS, necessaria per evitare conflitti peer con React 18/Gatsby 5.
7. Sostituzione media library package Netlify CMS con equivalenti Decap CMS:
   - `decap-cms-media-library-cloudinary`;
   - `decap-cms-media-library-uploadcare`.
8. Aggiornamento sintassi GraphQL di sort/group legacy.
9. Verifica locale:

   ```bash
   nvm use
   npm ci
   npm run build
   ```

Verifiche completate:

- build locale con Node 22;
- deploy preview Netlify con Node 22;
- smoke test preview del sito;
- pannello `/admin` Decap CMS verificato in preview.

Da verificare dopo il merge:

- deploy produzione Netlify;
- smoke test rapido homepage produzione;
- controllo rapido pannello `/admin` in produzione.

Fuori scope per questa fase, salvo decisione diversa:

- ripristino feed Instagram via API ufficiale + Netlify Function;
- migrazione da `react-helmet` alla Gatsby Head API;
- aggiornamento/migrazione completa Bulma/Sass.

---

## Fase 5 — Pulizia finale e hardening

Stato: **completata e validata in deploy preview Netlify**.

Obiettivo: rendere il progetto più mantenibile nel tempo.

Attività completate localmente:

1. Aggiunto script `serve`:

   ```json
   {
     "serve": "gatsby serve"
   }
   ```

2. Migrazione da `react-helmet` alla Gatsby Head API.
3. Rimozione dipendenze non più necessarie:
   - `react-helmet`;
   - `gatsby-plugin-react-helmet`.
4. Aggiornamento `gatsby-config.js`.
5. Aggiornamento README con script `serve` e nota Head API.
6. Verifica locale:

   ```bash
   nvm use
   npm install
   npm run build
   ```

Verifiche completate:

- `npm run serve` e smoke test locale post-build;
- deploy preview Netlify;
- rendering homepage;
- titoli/meta principali;
- navigazione;
- immagini;
- blog;
- eventi;
- sentieri;
- admin CMS.

Da verificare dopo il merge:

- deploy produzione Netlify;
- smoke test rapido produzione.

Warning noti/gestiti:

- Sass/Bulma: configurato `quietDeps: true` per ridurre le deprecazioni provenienti da dipendenze in `node_modules` senza nascondere eventuali warning nel Sass del progetto. Le deprecazioni `@import` residue in `src/components/all.sass` sono note e richiedono una futura migrazione/aggiornamento Bulma.
- Sass toolchain: resta possibile il warning `legacy-js-api`, proveniente dalla catena Sass/Gatsby; è non bloccante con la versione attuale.
- Decap CMS: resta possibile il warning `Critical dependency: the request of a dependency is an expression` da `gatsby-plugin-decap-cms`; è documentato come warning noto del plugin, con build e admin verificati.

Rimandato/opzionale:

- aggiornamento `renovate.json`, se si vuole automatizzare il controllo aggiornamenti;
- aggiunta lint/format/check link strutturati;
- monitorare futuri aggiornamenti di `gatsby-plugin-sass`/`sass-loader` per rimuovere il warning `legacy-js-api` quando disponibile;
- valutare React 19 solo in una fase dedicata, perché necessario per Decap CMS `3.7+` ma potenzialmente impattante su Gatsby e plugin.

---

## Strategia consigliata commit

Non aggiornare tutto in un unico commit se possibile.

Per lo stato attuale del branch di Fase 5, un commit coerente potrebbe essere:

```text
chore: finalize Gatsby hardening
```

Contenuto del commit:

- script `serve`;
- migrazione Head API;
- rimozione `react-helmet` e plugin Gatsby correlato;
- aggiornamento documentazione.

Prima del merge finale, fare smoke test manuale delle pagine principali e del pannello admin CMS in deploy preview Netlify.
