# Projekt - Vejboden.dk

I en tid hvor det bliver mere og mere aktuelt at købe frugt og grønt lokalt, har "vejboden.dk", et nyopstartet firma bedt jer om at udvikle en webbaseret løsning, der gør det lettere både at lokalisere vejboder, men også at bedømme kvaliteten af produkterne der bliver solgt i vejboden.

Derfor er det nu jeres opgave at udvikle en PWA som lever op til følgende kravspecifkationer.

Projektet skal løses i grupper hvor hver gruppe skal have en:

- **Projekt manager** (holder styr på Github issues og kanban board)
- **Lead Developer** (har overblikket over hvem der arbejder på backend og frontend samt hvilken rækkefølge delene af opgaven skal laves i)
- **Lead Designer** (har overblikket over design aspekterne og sørger for at alle komponenter og dele af frontenden lever op til design guiden)
- **Dev Ops Engineer** (har overblikket over hvordan hele deployment pipelinen virker, at tests bliver udført automatisk og hosting delen af både backend og frontend fungerer)

Derudover har alle rollen som både udvikler og designer. Det vil sige at alle skal i spil, med både kodningen af projektet og udvikling af ideer til UI delen.

I skal arbejde ud fra et mono repository. Der er allerede sat et template repository op som i kan hente her: [Link til template repo](https://github.com/TCAA-Web/vejboden-template)

Der er udleveret en design guide som beskriver former, farver og størrelser. Det er vigtigt at i overholder design guiden og derfor skal alle på holdet gøre sig bekendt med denne. Design guiden finder I inde i template repositoriet under /Design.

---

# Kravspecifikation

### Formål

Formålet med Vejboden.dk er at udvikle en webbaseret platform, hvor brugere kan:

- Se vejboder på et interaktivt kort
- Filtrere boder baseret på produkter (frugt/grønt)
- Oprette sig som sælger og registrere en vejbod
- Bedømme boder med et rating system

### Målgruppe

- Privatpersoner, der ønsker at købe lokale råvarer
- Sælgere (landmænd/privatpersoner), der vil sælge via vejboder

---

## Systemoversigt

Systemet skal bestå af:

- **Frontend** (web app / PWA)
- **Backend (API + database)**
- **Autentifikation (OAuth)**
- **Hosting (online deployment)**

---

## Funktionelle krav

### Brugerfunktioner

#### Kortvisning

- Brugeren skal kunne se et interaktivt kort
- Kortet skal vise alle vejboder som markers
- Klik på marker viser:
  - Navn på bod
  - Lokation
  - Produkter
  - Åbningstider

#### Søgning og filtrering

- Brugere skal kunne filtrere boder efter:
  - Frugt (fx æbler, jordbær)
  - Grøntsager (fx kartofler, gulerødder)
- Filtrering skal opdatere kortet dynamisk

#### Geolokation

- Brugeren kan finde boder nær sin lokation

#### Bedømmelse

- Bedømmelser af boder med rating 1 til 5 stjerner
- Kræver at brugeren er logget ind

### Sælgerfunktioner

#### Oprettelse som sælger

- Brugere skal kunne registrere sig via OAuth (fx Google, Microsoft)
- Konto skal gemmes i databasen

#### Oprette vejbod

- Sælger kan:
  - Angive navn
  - Placere bod via kort eller adresse
  - Tilføje produkter (liste)
  - Tilføje beskrivelse og evt. billede

#### Redigering

- Sælger skal kunne opdatere eller slette sin bod

### Admin (valgfri udvidelse)

- Godkende/afvise boder
- Moderere indhold

---

## Ikke-funktionelle krav

### Performance

- På PageSpeed insight skal siden score over 50 i performance
- Kort skal loade inden for 2 sekunder

### Sikkerhed

- OAuth 2.0 login
- HTTPS skal anvendes
- Input-validering på alle endpoints
- Beskyttelse mod:
  - XSS
  - CSRF
  - SQL Injection

---

## Teknisk arkitektur

### Frontend

- Framework: React / Next.js / Vue
- Kort: Google Maps API eller Leaflet anbefales
- PWA:
  - Service worker
  - Offline caching
  - Add-to-home-screen

### Backend

- API: REST
- Teknologi:
  - Node.js (Express/NestJS) eller .NET
- Database:
  - SQLite, MySql eller MongoDB
- Postman Dokumentation der beskriver APIet og alle endpoints. Herunder også hvilke værdier der kan sendes med i de forskellige requests

### Hosting

- Cloud (fx Azure, Vercel, AWS, Netlify)
- CI/CD pipeline anbefales

---

## Autentifikation

### OAuth krav

- Brugere logger ind via:
  - Google / Microsoft / Apple
- Backend håndterer:
  - Token validering
  - Brugeroprettelse ved første login

---

## Cookies og GDPR

### Cookies

Systemet skal anvende:

- **Sessionscookies** (login)
- **Preference cookies** (fx filtrering)

### Cookie banner

- Skal vises ved første besøg
- Brugeren kan:
  - Acceptere/afvise cookies
- Skal overholde GDPR

### Privatlivspolitik

- Skal informere om:
  - Dataindsamling
  - Opbevaring
  - Brug af cookies
  - Tredjeparter (OAuth)

---

## Progressive Web App (PWA)

Systemet skal:

- Kunne installeres på mobil og desktop
- Understøtte offline tilgang (begrænset funktionalitet)
- Have:
  - Manifest.json
  - Service worker

---

## Test krav (typer af tests)

- **Unit tests**
  - Backend funktioner
- **Frontend tests**
  - UI og komponenter

### Testværktøjer

- Jest / Vitest anbefales
- Cypress / Playwright

---

## API Krav - Endpoints (eksempler)

```http
GET /vejboder
POST /vejboder
PUT /vejboder/{id}
DELETE /vejboder/{id}
GET /vejboder?produkt=æbler
```

---

## 11. Datamodel (eksempel)

### User

- id
- navn
- email
- oauth_provider

### Vejbod

- id
- navn
- lokation (lat/lng)
- produkter (array)
- ejer_id
- rating

---

## Godkendelses kriterier

- Brugere kan se boder på kort
- Brugere kan filtrere efter produkter
- Brugere kan rate boder
- Sælgere kan oprette og redigere boder
- OAuth login virker. Brugere kan logge ind med Google, Microsoft, Apple eller lign
- Cookies benyttes til sessions og udlobstiden er forsvarligt sat
- App fungerer som PWA
- Systemet er hostet online

---

## Mulige udvidelser

- Chat mellem køber og sælger
- Betalingsintegration
- Notifikationer
