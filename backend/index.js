const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

let workouts = [
  { id: '1', date: '12.10.2026', sport: 'juoksu', duration: 45 },
  { id: '2', date: '14.10.2026', sport: 'kuntosali', duration: 60 },
  { id: '3', date: '16.10.2026', sport: 'pyöräily', duration: 90 }
]

app.get('/api/workouts', (request, response) => {
  response.json(workouts)
})

app.get('/info', (request, response) => {
  response.send(`<p>Treenejä on ${workouts.length}</p><p>${new Date()}</p>`)
})

app.get('/api/workouts/:id', (request, response) => {
  const id = request.params.id
  const workout = workouts.find(w => w.id === id)
  if (workout) {
    response.json(workout)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/workouts/:id', (request, response) => {
  const id = request.params.id
  workouts = workouts.filter(w => w.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return String(Math.floor(Math.random() * 100000))
}

app.post('/api/workouts', (request, response) => {
  const body = request.body

  if (!body.sport || !body.duration) {
    return response.status(400).json({ error: 'laji tai kesto puuttuu' })
  }

  const workout = {
    id: generateId(),
    date: body.date,
    sport: body.sport,
    duration: body.duration
  }

  workouts = workouts.concat(workout)
  response.json(workout)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
