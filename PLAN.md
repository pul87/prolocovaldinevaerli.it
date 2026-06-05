# Piano di upgrade tecnico

Questo documento raccoglie le fasi consigliate per aggiornare gradualmente il progetto, riducendo il rischio di rompere il sito in produzione.

## Stato attuale

Stack aggiornato sul branch `chore/upgrade-dependencies-audit`:

- Gatsby 3
- React 16
- Netlify CMS
- Markdown come sorgente contenuti
- Bulma + Sass (`sass`, non `node-sass`)
- Gatsby Image / Sharp legacy
- Netlify deploy con `netlify.toml`
- Node indicato in `.nvmrc`: `v16.20.2`
- package manager scelto: npm

Verifiche locali già eseguite:

```bash
nvm use
npm ci
npm run build
npm run start
```

I comandi risultano funzionanti. `npm run start` usa `gatsby develop` dopo aver ricreato `.cache`, necessaria con Gatsby 3.

Problemi/debito tecnico ancora presenti:

- React è ancora 16.
- `gatsby-image` è legacy; la sostituzione moderna è `gatsby-plugin-image`.
- Netlify CMS è vecchio; oggi il successore è Decap CMS.
- L'audit npm segnala ancora vulnerabilità residue: 128 totali (`7 low`, `54 moderate`, `56 high`, `11 critical`).
- Alcune dipendenze transitive installate dichiarano engine Node `>=18`, anche se la build Node 16 passa.
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

Stato: **non iniziata**.

Obiettivo: aggiornare il progetto allo stack moderno Gatsby.

Attività previste:

1. Valutare upgrade a Gatsby 5.
2. Aggiornare React a 18 o 19, secondo compatibilità effettiva.
3. Migrare da `gatsby-image` a `gatsby-plugin-image`.
4. Aggiornare le query immagini e i componenti che usano immagini responsive.
5. Sostituire Netlify CMS con Decap CMS, se necessario/opportuno.
6. Valutare se mantenere o rimuovere i media library package:
   - `netlify-cms-media-library-cloudinary`;
   - `netlify-cms-media-library-uploadcare`.
7. Valutare ripristino feed Instagram via API ufficiale + Netlify Function.
8. Aggiornare Node a una LTS moderna, ad esempio Node 20 o 22, se compatibile con Netlify e dipendenze finali.

Output atteso:

- stack moderno;
- supporto a Node LTS recente;
- dipendenze principali aggiornate;
- minori rischi futuri in fase di build.

---

## Fase 5 — Pulizia finale e hardening

Stato: **non iniziata**.

Obiettivo: rendere il progetto più mantenibile nel tempo.

Attività previste:

1. Rimuovere dipendenze inutilizzate.
2. Aggiornare `renovate.json`, se si vuole automatizzare il controllo aggiornamenti.
3. Aggiungere script utili, ad esempio:

   ```json
   {
     "serve": "gatsby serve"
   }
   ```

4. Eventualmente aggiungere controlli minimi:
   - lint;
   - format;
   - smoke test build;
   - controllo link principali.
5. Aggiornare definitivamente il README.
6. Fare un deploy preview Netlify e verificare manualmente:
   - rendering homepage;
   - navigazione;
   - immagini;
   - blog;
   - eventi;
   - sentieri;
   - admin CMS;
   - form o funzioni Netlify, se usate.

Output atteso:

- progetto documentato;
- upgrade completato;
- deploy preview validato;
- pronto per merge su `master`.

---

## Strategia consigliata commit

Non aggiornare tutto in un unico commit se possibile.

Per lo stato attuale del branch, un commit coerente potrebbe essere:

```text
chore: upgrade Gatsby baseline to Node 16
```

Contenuto del commit:

- upgrade Gatsby 3 e plugin correlati;
- passaggio Node 16;
- pulizia package manager npm;
- rimozione plugin Instagram rotto;
- aggiornamento documentazione;
- fix script develop.

Prima del merge finale, fare smoke test manuale delle pagine principali e del pannello admin CMS in deploy preview Netlify.
