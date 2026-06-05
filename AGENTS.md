# AGENTS.md

Linee guida per coding agent che lavorano su questo progetto.

## Descrizione progetto

Questo repository contiene il sito statico `prolocovaldinevaerli.it`.

Stack principale:

- Gatsby 3
- React 16
- Netlify CMS
- contenuti Markdown in `src/pages`
- asset statici in `static`
- deploy Netlify configurato tramite `netlify.toml`

Il sito viene normalmente aggiornato tramite CMS e ricostruito su Netlify.

## Regola fondamentale: piano prima delle modifiche

Prima di applicare modifiche al codice, alle dipendenze, alla configurazione o ai contenuti strutturali, il coding agent deve:

1. analizzare brevemente i file coinvolti;
2. proporre un piano sintetico delle modifiche previste;
3. indicare eventuali rischi o punti da verificare;
4. attendere approvazione esplicita dell'utente.

Sono ammesse senza approvazione solo operazioni di sola lettura, ad esempio:

- leggere file;
- eseguire `git status`;
- ispezionare configurazioni;
- cercare riferimenti nel codice.

## Package manager

Il package manager da usare è **npm**.

Non usare Yarn per nuove installazioni o aggiornamenti.

Se il progetto contiene lockfile multipli, non eliminarli o rigenerarli senza piano e approvazione.

## Versione Node

Se una modifica o un comando richiede una versione Node diversa da quella di default del sistema, usare `nvm`, già installato.

Esempio:

```bash
nvm use
```

oppure:

```bash
nvm install 16.20.2
nvm use 16.20.2
```

Non modificare `.nvmrc` senza approvazione.

## Dipendenze: no fix forzosi

Evitare fix forzosi o scorciatoie sulle dipendenze.

Non usare salvo approvazione esplicita:

```bash
npm audit fix --force
npm install --force
npm install --legacy-peer-deps
```

Non aggiornare pacchetti a caso o tutti insieme senza una strategia chiara.

Gli upgrade devono essere:

- graduali;
- motivati;
- compatibili con Gatsby e plugin installati;
- accompagnati da verifica build;
- documentati nel piano o nel commit.

## Struttura e pulizia

Mantenere il progetto pulito e leggibile.

Best practice:

- preferire modifiche piccole e verificabili;
- evitare cambiamenti non correlati;
- non riscrivere file generati o lockfile se non necessario;
- non introdurre nuove dipendenze se una soluzione semplice è sufficiente;
- mantenere separati fix, upgrade e refactor;
- aggiornare la documentazione quando cambiano comandi o requisiti;
- verificare sempre l'impatto su Netlify CMS e deploy Netlify.

## Comandi utili

Prima di eseguire build o installazioni, usare la versione Node corretta:

```bash
nvm use
```

Comandi principali:

```bash
npm install
npm run develop
npm run build
npm run clean
```

## Verifiche consigliate

Dopo modifiche tecniche rilevanti verificare almeno:

```bash
npm run build
```

Quando possibile controllare manualmente:

- homepage;
- blog;
- eventi;
- sentieri;
- pagine tag;
- pannello admin CMS;
- immagini e gallerie;
- deploy preview Netlify.

## Note su contenuti e CMS

I contenuti sono principalmente Markdown sotto `src/pages`.

La configurazione CMS si trova in:

```bash
static/admin/config.yml
```

Modifiche alla struttura dei contenuti o ai campi CMS possono impattare sia il pannello admin sia le query Gatsby: vanno quindi pianificate e approvate prima.
