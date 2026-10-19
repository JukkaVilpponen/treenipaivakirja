const Workout = ({ workout, deleteWorkout }) => {
  return (
    <li>
      {workout.date} {workout.sport} {workout.duration} min{' '}
      <button onClick={() => deleteWorkout(workout.id)}>poista</button>
    </li>
  )
}

const WorkoutList = ({ workouts, deleteWorkout }) => {
  return (
    <ul>
      {workouts.map(w =>
        <Workout key={w.id} workout={w} deleteWorkout={deleteWorkout} />
      )}
    </ul>
  )
}

export default WorkoutList
