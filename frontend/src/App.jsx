import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import WorkoutForm from './components/WorkoutForm'
import WorkoutTable from './components/WorkoutTable'
import Filter from './components/Filter'

const SPORTS = ['Juoksu', 'Kuntosali', 'Pyöräily', 'Uinti', 'Hiihto', 'Muu']

const App = () => {
  const [workouts, setWorkouts] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    workoutService.getAll().then(data => {
      setWorkouts(data)
    })
  }, [])

  const addWorkout = (workoutObject) => {
    return workoutService.create(workoutObject).then(returnedWorkout => {
      setWorkouts(workouts.concat(returnedWorkout))
    })
  }

  const deleteWorkout = (id) => {
    if (window.confirm('Poistetaanko treeni?')) {
      workoutService.remove(id).then(() => {
        setWorkouts(workouts.filter(w => w.id !== id))
      })
    }
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const workoutsToShow = workouts.filter(w =>
    w.sport.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Treenipäiväkirja</h1>

      <h2>Lisää treeni</h2>
      <WorkoutForm sports={SPORTS} addWorkout={addWorkout} />

      <h2>Treenit</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <WorkoutTable workouts={workoutsToShow} deleteWorkout={deleteWorkout} />
    </div>
  )
}

export default App
