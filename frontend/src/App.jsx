import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import WorkoutForm from './components/WorkoutForm'
import WorkoutTable from './components/WorkoutTable'
import Filter from './components/Filter'
import Summary from './components/Summary'
import Notification from './components/Notification'

const SPORTS = ['Juoksu', 'Kuntosali', 'Pyöräily', 'Uinti', 'Hiihto', 'Muu']

const App = () => {
  const [workouts, setWorkouts] = useState([])
  const [sportFilter, setSportFilter] = useState('kaikki')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    workoutService.getAll().then(data => {
      setWorkouts(data)
    })
  }, [])

  const notify = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  const addWorkout = (workoutObject) => {
    return workoutService
      .create(workoutObject)
      .then(returnedWorkout => {
        setWorkouts(workouts.concat(returnedWorkout))
        notify(`Lisättiin treeni: ${returnedWorkout.sport} ${returnedWorkout.duration} min`)
        return true
      })
      .catch(error => {
        const errorText = error.response?.data?.error || 'Tallennus epäonnistui'
        notify(errorText, 'error')
        return false
      })
  }

  const deleteWorkout = (id) => {
    if (window.confirm('Poistetaanko treeni?')) {
      workoutService
        .remove(id)
        .then(() => {
          setWorkouts(workouts.filter(w => w.id !== id))
          notify('Treeni poistettiin')
        })
        .catch(() => {
          notify('Treeni oli jo poistettu palvelimelta', 'error')
          setWorkouts(workouts.filter(w => w.id !== id))
        })
    }
  }

  const workoutsToShow = workouts
    .filter(w => sportFilter === 'kaikki' || w.sport === sportFilter)
    .filter(w => (w.notes || '').toLowerCase().includes(search.toLowerCase()))
    .toSorted((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div>
      <h1>Treenipäiväkirja</h1>
      <Notification message={message} />

      <h2>Lisää treeni</h2>
      <WorkoutForm sports={SPORTS} addWorkout={addWorkout} />

      <h2>Treenit</h2>
      <Filter
        sports={SPORTS}
        sportFilter={sportFilter}
        setSportFilter={setSportFilter}
        search={search}
        setSearch={setSearch}
      />
      <Summary workouts={workoutsToShow} />
      <WorkoutTable workouts={workoutsToShow} deleteWorkout={deleteWorkout} />
    </div>
  )
}

export default App
