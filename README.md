# Treenipäiväkirja

Selainohjelmoinnin harjoitustyö. Sovelluksella voi kirjata treenejä (päivämäärä, laji, kesto, teho, ulkona/sisällä, muistiinpanot), suodattaa niitä lajin ja tekstihaun mukaan sekä poistaa niitä. Treenien yhteiskesto lasketaan automaattisesti.

**Tekniikat:** React (Vite), axios, Node.js + Express, MongoDB Atlas + Mongoose, Render

## Rakenne

```
treenipaivakirja/
├── backend/
│   ├── index.js            Express-palvelin, reitit ja virheidenkäsittely
│   ├── models/workout.js   Mongoose-skeema ja validointi
│   ├── .env.example        mallitiedosto ympäristömuuttujille
│   └── dist/               frontendin tuotantoversio (npm run build:ui)
└── frontend/
    ├── src/App.jsx         sovelluksen tila ja logiikka
    ├── src/components/     WorkoutForm, WorkoutTable, Filter, Summary, Notification
    ├── src/services/workouts.js   axios-kutsut backendiin
    └── db.json             testidata json-serverille
```

## REST-rajapinta

| Metodi | Osoite | Toiminto |
|---|---|---|
| GET | /api/workouts | kaikki treenit |
| GET | /api/workouts/:id | yksi treeni (404, jos ei löydy) |
| POST | /api/workouts | uusi treeni (400, jos validointi epäonnistuu) |
| DELETE | /api/workouts/:id | poista treeni |
| GET | /info | treenien määrä ja kellonaika |

## Käynnistys omalla koneella

1. **MongoDB Atlas:** luo ilmainen klusteri ja tietokantakäyttäjä, ja salli yhteydet osoitteesta 0.0.0.0/0 (kurssimateriaali osa 3c).
2. **Backend:**
   ```
   cd backend
   cp .env.example .env      # lisää .env-tiedostoon oma MONGODB_URI
   npm install
   npm run dev               # http://localhost:3001
   ```
3. **Frontend** (toisessa terminaalissa):
   ```
   cd frontend
   npm install
   npm run dev               # http://localhost:5173
   ```
   Vite ohjaa `/api`-pyynnöt backendiin (vite.config.js:n proxy).

### Pelkkä json-server (jos backend ei ole vielä valmis)
Käynnistä `npm run server` frontend-kansiossa ja vaihda `src/services/workouts.js`-tiedostoon `baseUrl = 'http://localhost:3001/workouts'`.

## Julkaisu Renderiin (osa 3b)

1. Tee frontendin tuotantoversio backend-kansioon: `cd backend && npm run build:ui`
   (Windowsissa `rm`/`cp` eivät toimi. Aja silloin `npm run build` frontend-kansiossa ja kopioi `dist`-kansio käsin backend-kansioon.)
2. Commitoi ja pushaa GitHubiin. `backend/dist` kuuluu viedä mukaan.
3. Valitse Renderissä **New → Web Service** ja valitse repositorio. Asetukset:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `MONGODB_URI` = oma Atlas-osoite
