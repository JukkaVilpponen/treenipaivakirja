import { useState, useEffect } from 'react'
import workoutService from './services/workouts'

const App = () => {
  const [workouts, setWorkouts] = useState([])
  const [newDate, setNewDate] = useState('')
  const [newSport, setNewSport] = useState('')
  const [newDuration, setNewDuration] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    workoutService.getAll().then(data => {
      setWorkouts(data)
    })
  }, [])

  const addWorkout = (event) => {
    event.preventDefault()
    const workoutObject = {
      date: newDate,
      sport: newSport,
      duration: Number(newDuration)
    }
    workoutService.create(workoutObject).then(returnedWorkout => {
      setWorkouts(workouts.concat(returnedWorkout))
      setNewDate('')
      setNewSport('')
      setNewDuration('')
    })
  }

  const deleteWorkout = (id) => {
    if (window.confirm('Poistetaanko treeni?')) {
      workoutService.remove(id).then(() => {
        setWorkouts(workouts.filter(w => w.id !== id))
      })
    }
  }

  const workoutsToShow = workouts.filter(w =>
    w.sport.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Treenipäiväkirja</h1>

      <h2>Lisää treeni</h2>
      <form onSubmit={addWorkout}>
        <div>
          päivä: <input value={newDate} onChange={e => setNewDate(e.target.value)} />
        </div>
        <div>
          laji: <input value={newSport} onChange={e => setNewSport(e.target.value)} />
        </div>
        <div>
          kesto (min): <input value={newDuration} onChange={e => setNewDuration(e.target.value)} />
        </div>
        <button type="submit">lisää</button>
      </form>

      <h2>Treenit</h2>
      <div>
        hae lajilla: <input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <ul>
        {workoutsToShow.map(w =>
          <li key={w.id}>
            {w.date} {w.sport} {w.duration} min{' '}
            <button onClick={() => deleteWorkout(w.id)}>poista</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
