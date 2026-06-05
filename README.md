# prolocovaldinevaerli.it

Sito statico della Pro Loco Val di Neva Erli.

Il progetto usa Gatsby e Decap CMS: i contenuti vengono modificati dal pannello CMS, salvati come Markdown nel repository e ricostruiti automaticamente da Netlify.

## Stack

- Gatsby 5
- React 18
- Decap CMS
- contenuti Markdown in `src/pages`
- asset statici in `static`
- Bulma + Sass
- Gatsby Plugin Image / Sharp
- deploy Netlify tramite `netlify.toml`

## Requisiti

La baseline runtime attuale è Node 22.

La versione indicata in `.nvmrc` è:

```bash
v22.22.3
```

Usare `nvm`:

```bash
nvm install 22.22.3
nvm use
```

## Package manager

Usare **npm**.

Non usare Yarn per installazioni o aggiornamenti.

## Installazione locale

```bash
nvm use
npm install
```

## Sviluppo locale

```bash
npm run develop
```

Alias equivalente:

```bash
npm start
```

Il sito Gatsby viene normalmente esposto su:

```text
http://localhost:8000
```

## Build produzione

```bash
npm run build
```

La build genera la cartella:

```text
public
```

## Pulizia cache Gatsby

```bash
npm run clean
```

## Preview locale della build

Dopo una build produzione è possibile servire localmente la cartella `public`:

```bash
npm run build
npm run serve
```

Il sito viene normalmente esposto su:

```text
http://localhost:9000
```

## Script disponibili

```bash
npm run develop
npm start
npm run build
npm run serve
npm run clean
npm run format
```

## Netlify

La configurazione Netlify è in:

```text
netlify.toml
```

Impostazioni principali:

- comando build: `npm run build`
- cartella pubblicata: `public`
- funzioni Netlify: `lambda`
- Node build: `22.22.3`

## CMS

La configurazione Decap CMS è in:

```text
static/admin/config.yml
```

I contenuti principali sono in:

```text
src/pages
```

Collection principali:

- blog: `src/pages/blog`
- eventi: `src/pages/events`
- sentieri: `src/pages/sentieri`
- pagine statiche: `src/pages/index.md`, `src/pages/about/index.md`

Il pannello admin è disponibile in produzione su:

```text
/admin
```

## Note tecniche

Questo progetto nasce da uno stack legacy, ma ora usa Gatsby 5, React 18, Decap CMS e `gatsby-plugin-image`. I metadati HTML sono gestiti tramite Gatsby Head API.

Restano alcuni debiti tecnici, in particolare warning transitive del CMS e della toolchain Sass/Gatsby.

Warning noti:

- Sass/Bulma: Bulma è aggiornato a `1.0.4` e `src/components/all.sass` usa `@use` invece di `@import`. La build usa la variante `bulma/versions/bulma-no-dark-mode` per evitare CSS dark-mode non necessario.
- Sass toolchain: può restare il warning `legacy-js-api`, proveniente dalla catena Sass/Gatsby; è non bloccante con la versione attuale.
- Decap CMS: Gatsby può mostrare un warning `Critical dependency: the request of a dependency is an expression` proveniente da `gatsby-plugin-decap-cms`. È un warning noto del plugin; build e pannello `/admin` sono stati verificati.
- Decap CMS è fissato a `decap-cms-app@3.6.4`, con override `decap-cms-core@3.6.3`. Le versioni `decap-cms-app@3.7+` richiedono React 19, mentre il progetto resta su React 18 per compatibilità con Gatsby e plugin installati.
- `npm audit` segnala ancora vulnerabilità transitive nella toolchain Gatsby/Decap. Non usare `npm audit fix --force`: diversi fix proposti comportano downgrade o breaking change non compatibili.

Il piano di aggiornamento graduale è documentato in:

```text
PLAN.md
```

Evitare aggiornamenti massivi o fix forzosi delle dipendenze senza un piano e una build di verifica.
