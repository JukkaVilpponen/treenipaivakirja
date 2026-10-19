import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import WorkoutForm from './components/WorkoutForm'
import WorkoutTable from './components/WorkoutTable'
import Filter from './components/Filter'

const SPORTS = ['Juoksu', 'Kuntosali', 'Pyöräily', 'Uinti', 'Hiihto', 'Muu']

const today = () => new Date().toISOString().slice(0, 10)

const App = () => {
  const [workouts, setWorkouts] = useState([])
  const [newDate, setNewDate] = useState(today())
  const [newSport, setNewSport] = useState(SPORTS[0])
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

  const handleDateChange = (event) => setNewDate(event.target.value)
  const handleSportChange = (event) => setNewSport(event.target.value)
  const handleDurationChange = (event) => setNewDuration(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const workoutsToShow = workouts.filter(w =>
    w.sport.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Treenipäiväkirja</h1>

      <h2>Lisää treeni</h2>
      <WorkoutForm
        sports={SPORTS}
        addWorkout={addWorkout}
        newDate={newDate}
        newSport={newSport}
        newDuration={newDuration}
        handleDateChange={handleDateChange}
        handleSportChange={handleSportChange}
        handleDurationChange={handleDurationChange}
      />

      <h2>Treenit</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <WorkoutTable workouts={workoutsToShow} deleteWorkout={deleteWorkout} />
    </div>
  )
}

export default App
