# Piano di upgrade tecnico

Questo documento raccoglie le fasi consigliate per aggiornare gradualmente il progetto, riducendo il rischio di rompere il sito in produzione.

## Contesto attuale

Stack rilevato:

- Gatsby 2
- React 16
- Netlify CMS
- Markdown come sorgente contenuti
- Bulma + Sass
- Gatsby Image / Sharp
- Netlify deploy con `netlify.toml`
- Node indicato in `.nvmrc`: `v12.13.0`

Problemi principali:

- Node 12 è EOL.
- Gatsby 2 è obsoleto.
- `node-sass` è deprecato e fragile su versioni Node moderne.
- `gatsby-image` è stato sostituito da `gatsby-plugin-image` nelle versioni moderne di Gatsby.
- Netlify CMS è vecchio; oggi il successore è Decap CMS.
- Sono presenti sia `package-lock.json` sia `yarn.lock`.
- Alcuni plugin, in particolare `gatsby-source-instagram`, possono essere fragili o non più mantenuti.

---

## Fase 1 — Stabilizzazione baseline

Obiettivo: avere una base locale riproducibile e documentata prima di qualsiasi upgrade importante.

Attività:

1. Usare la versione Node indicata dal progetto:

   ```bash
   nvm install 12.13.0
   nvm use
   ```

2. Verificare installazione dipendenze e build locale.

   Con npm:

   ```bash
   npm install
   npm run build
   ```

   Oppure con Yarn:

   ```bash
   yarn install
   yarn build
   ```

3. Decidere un solo package manager:

   - npm: tenere `package-lock.json`, rimuovere `yarn.lock`;
   - oppure Yarn: tenere `yarn.lock`, rimuovere `package-lock.json`.

4. Aggiornare il README con:

   - versione Node richiesta;
   - comandi di installazione;
   - comandi di sviluppo;
   - comandi di build;
   - note Netlify CMS / Decap CMS.

5. Correggere piccole incongruenze note, ad esempio in `static/admin/config.yml`:

   ```yaml
   default: "blog-post"
   ```

   nella collection `route`, probabilmente da correggere in:

   ```yaml
   default: "route-post"
   ```

6. Confermare che il deploy Netlify continua a funzionare.

Output atteso:

- build locale funzionante;
- comandi documentati;
- repository più coerente;
- nessun upgrade invasivo ancora effettuato.

---

## Fase 2 — Aggiornamento minimo sicuro

Obiettivo: rimuovere i punti più fragili mantenendo il più possibile lo stack esistente.

Attività:

1. Sostituire `node-sass` con `sass`.

   `node-sass` è deprecato e incompatibile con molte versioni moderne di Node.

2. Aggiornare `gatsby-plugin-sass` a una versione compatibile.

3. Verificare che gli import Sass e la configurazione `gatsby-config.js` continuino a funzionare.

4. Aggiornare le dipendenze rimanendo inizialmente dentro Gatsby 2 o passando al massimo a Gatsby 3, se il salto è gestibile.

5. Testare:

   ```bash
   npm run clean
   npm run build
   npm run develop
   ```

6. Verificare pagine principali:

   - homepage;
   - blog;
   - eventi;
   - sentieri;
   - pagine tag;
   - pannello admin CMS.

Output atteso:

- rimozione di `node-sass`;
- build meno fragile;
- compatibilità migliorata senza riscrittura importante.

---

## Fase 3 — Modernizzazione intermedia

Obiettivo: portare il progetto su versioni più supportate, limitando ancora le modifiche architetturali.

Attività:

1. Valutare upgrade a Gatsby 3 o 4.

2. Aggiornare React a una versione compatibile con la versione Gatsby scelta.

3. Aggiornare plugin Gatsby coerentemente:

   - `gatsby-plugin-sharp`;
   - `gatsby-transformer-sharp`;
   - `gatsby-source-filesystem`;
   - `gatsby-transformer-remark`;
   - `gatsby-remark-images`;
   - `gatsby-plugin-sitemap`;
   - `gatsby-plugin-netlify`;
   - `gatsby-plugin-react-helmet`.

4. Controllare breaking changes in:

   - GraphQL queries;
   - gestione immagini;
   - configurazione sitemap;
   - gestione Markdown;
   - Netlify CMS preview templates.

5. Aggiornare la versione Node usata da Netlify, se possibile, verso una LTS più recente.

Output atteso:

- progetto più vicino allo stack moderno;
- minore debito tecnico;
- ancora nessuna migrazione completa a Gatsby 5 se troppo rischiosa.

---

## Fase 4 — Modernizzazione completa

Obiettivo: aggiornare il progetto allo stack moderno Gatsby.

Attività:

1. Aggiornare a Gatsby 5.

2. Aggiornare React a 18 o 19, a seconda della compatibilità effettiva.

3. Migrare da `gatsby-image` a `gatsby-plugin-image`.

4. Aggiornare le query immagini e i componenti che usano immagini responsive.

5. Sostituire Netlify CMS con Decap CMS, se necessario/opportuno.

6. Valutare se mantenere o rimuovere i media library package:

   - `netlify-cms-media-library-cloudinary`;
   - `netlify-cms-media-library-uploadcare`.

7. Rivedere o sostituire `gatsby-source-instagram`, perché potrebbe non essere più affidabile o mantenuto.

8. Aggiornare Node a una versione LTS moderna, ad esempio Node 20 o 22, se compatibile con Netlify e con le dipendenze finali.

Output atteso:

- stack moderno;
- supporto a Node LTS recente;
- dipendenze principali aggiornate;
- minori rischi futuri in fase di build.

---

## Fase 5 — Pulizia finale e hardening

Obiettivo: rendere il progetto più mantenibile nel tempo.

Attività:

1. Rimuovere dipendenze inutilizzate.

2. Rimuovere lockfile non scelto.

3. Aggiornare `renovate.json`, se si vuole automatizzare il controllo aggiornamenti.

4. Aggiungere script utili:

   ```json
   {
     "serve": "gatsby serve"
   }
   ```

5. Eventualmente aggiungere controlli minimi:

   - lint;
   - format;
   - smoke test build;
   - controllo link principali.

6. Aggiornare definitivamente il README.

7. Fare un deploy preview Netlify e verificare manualmente:

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

## Strategia consigliata

Non aggiornare tutto in un unico commit.

Sequenza consigliata di branch/commit:

1. `chore: document upgrade plan`
2. `chore: stabilize local setup`
3. `fix: correct cms route template`
4. `chore: choose package manager`
5. `chore: replace node-sass with sass`
6. `chore: upgrade gatsby dependencies step 1`
7. `chore: migrate image handling`
8. `chore: migrate cms to decap`
9. `chore: update netlify node version`
10. `docs: update project readme`

Ogni fase dovrebbe avere una build locale e, quando possibile, un deploy preview Netlify.
