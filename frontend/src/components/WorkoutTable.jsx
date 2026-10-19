const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fi-FI')

const WorkoutRow = ({ workout, deleteWorkout }) => (
  <tr>
    <td>{formatDate(workout.date)}</td>
    <td>{workout.sport}</td>
    <td>{workout.duration} min</td>
    <td className={`intensity ${workout.intensity}`}>{workout.intensity}</td>
    <td>{workout.outdoors ? 'ulkona' : 'sisällä'}</td>
    <td>{workout.notes}</td>
    <td>
      <button className="delete" onClick={() => deleteWorkout(workout)}>poista</button>
    </td>
  </tr>
)

const WorkoutTable = ({ workouts, deleteWorkout }) => {
  if (workouts.length === 0) {
    return <p>Ei treenejä.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Päivä</th>
          <th>Laji</th>
          <th>Kesto</th>
          <th>Teho</th>
          <th>Paikka</th>
          <th>Muistiinpanot</th>
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
