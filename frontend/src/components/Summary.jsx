const Summary = ({ workouts }) => {
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <p>
      {workouts.length} treeniä, yhteensä {hours} h {minutes} min
    </p>
  )
}

export default Summary
