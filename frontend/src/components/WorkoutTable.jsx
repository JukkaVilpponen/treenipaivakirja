const formatDate = (date) => new Date(date).toLocaleDateString('fi-FI')

const WorkoutRow = ({ workout, deleteWorkout }) => {
  return (
    <tr>
      <td>{formatDate(workout.date)}</td>
      <td>{workout.sport}</td>
      <td>{workout.duration} min</td>
      <td>
        <button onClick={() => deleteWorkout(workout.id)}>poista</button>
      </td>
    </tr>
  )
}

const WorkoutTable = ({ workouts, deleteWorkout }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Päivä</th>
          <th>Laji</th>
          <th>Kesto</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workouts.map(w =>
          <WorkoutRow key={w.id} workout={w} deleteWorkout={deleteWorkout} />
        )}
      </tbody>
    </table>
  )
}

export default WorkoutTable
