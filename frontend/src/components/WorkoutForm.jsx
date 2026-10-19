const WorkoutForm = (props) => {
  return (
    <form onSubmit={props.addWorkout}>
      <div>
        päivä: <input value={props.newDate} onChange={props.handleDateChange} />
      </div>
      <div>
        laji: <input value={props.newSport} onChange={props.handleSportChange} />
      </div>
      <div>
        kesto (min): <input value={props.newDuration} onChange={props.handleDurationChange} />
      </div>
      <button type="submit">lisää</button>
    </form>
  )
}

export default WorkoutForm
