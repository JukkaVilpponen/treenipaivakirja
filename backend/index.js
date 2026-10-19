const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))   
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let workouts = [
  { id: '1', date: '2026-10-12', sport: 'Juoksu', duration: 45, intensity: 'kova', outdoors: true, notes: 'Intervallit 6x400m' },
  { id: '2', date: '2026-10-14', sport: 'Kuntosali', duration: 60, intensity: 'keskitaso', outdoors: false, notes: 'Jalkapäivä' },
  { id: '3', date: '2026-10-16', sport: 'Pyöräily', duration: 90, intensity: 'kevyt', outdoors: true, notes: '' }
]

app.get('/api/workouts', (request, response) => {
  response.json(workouts)
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Treenipäiväkirjassa on ${workouts.length} treeniä</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/workouts/:id', (request, response) => {
  const workout = workouts.find(w => w.id === request.params.id)
  if (workout) {
    response.json(workout)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/workouts/:id', (request, response) => {
  workouts = workouts.filter(w => w.id !== request.params.id)
  response.status(204).end()
})

const generateId = () => String(Math.floor(Math.random() * 1000000))

app.post('/api/workouts', (request, response) => {
  const body = request.body

  if (!body.sport) {
    return response.status(400).json({ error: 'laji puuttuu' })
  }
  if (!body.duration || body.duration < 1) {
    return response.status(400).json({ error: 'keston pitää olla vähintään 1 minuutti' })
  }
  if (!body.date) {
    return response.status(400).json({ error: 'päivämäärä puuttuu' })
  }

  const workout = {
    id: generateId(),
    date: body.date,
    sport: body.sport,
    duration: Number(body.duration),
    intensity: body.intensity || 'keskitaso',
    outdoors: body.outdoors || false,
    notes: body.notes || ''
  }

  workouts = workouts.concat(workout)
  response.status(201).json(workout)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})