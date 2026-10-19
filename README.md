# Treenipäiväkirja

Selainohjelmoinnin harjoitustyö. Sovelluksella voi lisätä treenejä, hakea niitä lajin mukaan ja poistaa niitä.

## Tekniikat

- Frontend: React (Vite) ja axios
- Backend: Node.js ja Express

Data on palvelimen muistissa, joten se palautuu alkutilaan, kun palvelin käynnistetään uudelleen.

## Rajapinta

- GET /api/workouts – kaikki treenit
- GET /api/workouts/:id – yksi treeni
- POST /api/workouts – lisää treeni
- DELETE /api/workouts/:id – poista treeni
- GET /info – treenien määrä

## Käynnistys

Backend:

```
cd backend
npm install
npm run dev
```

Frontend toisessa terminaalissa:

```
cd frontend
npm install
npm run dev
```

Sovellus aukeaa osoitteessa http://localhost:5173.
