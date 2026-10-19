import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import WorkoutForm from './components/WorkoutForm'
import WorkoutList from './components/WorkoutList'
import Filter from './components/Filter'

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
      <WorkoutList workouts={workoutsToShow} deleteWorkout={deleteWorkout} />
    </div>
  )
}

export default App
