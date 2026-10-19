# Treenipäiväkirja

Selainohjelmoinnin harjoitustyö (TITE24). Sovelluksella kirjataan treenejä ja seurataan, paljonko on treenattu.

## Ominaisuudet

- Treenin lisäys lomakkeella: päivämäärä, laji (alasvetovalikko), kesto, teho (radio buttonit), ulkona/sisällä (checkbox) ja muistiinpanot
- Treenit näkyvät taulukossa uusimmasta vanhimpaan
- Suodatus lajin mukaan ja tekstihaku muistiinpanoista
- Yhteenveto: treenien määrä ja yhteiskesto
- Treenin poisto
- Ilmoitukset onnistuneista toiminnoista ja virheistä (esim. puuttuva kesto)

## Tekniikat

- **Frontend:** React (Vite), axios, CSS
- **Backend:** Node.js, Express, morgan, cors
- Data on tallessa palvelimen muistissa. Se palautuu alkutilaan, kun palvelin käynnistetään uudelleen.

## Kansiorakenne

```
treenipaivakirja/
├── backend/
│   ├── index.js              Express-palvelin ja REST-rajapinta
│   └── package.json
└── frontend/
    ├── vite.config.js        proxy: /api -> http://localhost:3001
    ├── db.json               testidata json-serverille
    └── src/
        ├── main.jsx
        ├── App.jsx           sovelluksen tila ja toiminnot
        ├── index.css         tyylit
        ├── services/
        │   └── workouts.js   axios-kutsut backendiin
        └── components/
            ├── WorkoutForm.jsx    lisäyslomake
            ├── WorkoutTable.jsx   treenitaulukko ja poistonappi
            ├── Filter.jsx         lajisuodatin ja haku
            ├── Summary.jsx        treenien määrä ja yhteiskesto
            └── Notification.jsx   ilmoitukset
```

## REST-rajapinta

| Metodi | Osoite | Toiminto | Vastaus |
|---|---|---|---|
| GET | /api/workouts | kaikki treenit | 200 |
| GET | /api/workouts/:id | yksi treeni | 200 tai 404 |
| POST | /api/workouts | lisää treeni | 201, tai 400 jos laji, kesto tai päivämäärä puuttuu |
| DELETE | /api/workouts/:id | poista treeni | 204 |
| GET | /info | treenien määrä ja kellonaika | 200 |

## Käynnistys

Asenna ja käynnistä backend:

```
cd backend
npm install
npm run dev
```

Backend toimii osoitteessa http://localhost:3001.

Asenna ja käynnistä frontend toisessa terminaalissa:

```
cd frontend
npm install
npm run dev
```

Avaa sovellus osoitteessa http://localhost:5173. Viten proxy ohjaa `/api`-pyynnöt backendille.

### Tuotantoversio

Tee frontendin build ja kopioi `frontend/dist`-kansio `backend`-kansioon. Sen jälkeen koko sovellus toimii osoitteessa http://localhost:3001, koska backend tarjoilee frontendin (`express.static('dist')`).
