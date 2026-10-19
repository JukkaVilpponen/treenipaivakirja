const WorkoutForm = (props) => {
  return (
    <form onSubmit={props.addWorkout}>
      <div>
        päivä: <input type="date" value={props.newDate} onChange={props.handleDateChange} />
      </div>
      <div>
        laji:{' '}
        <select value={props.newSport} onChange={props.handleSportChange}>
          {props.sports.map(s =>
            <option key={s} value={s}>{s}</option>
          )}
        </select>
      </div>
      <div>
        kesto (min): <input type="number" value={props.newDuration} onChange={props.handleDurationChange} />
      </div>
      <button type="submit">lisää</button>
    </form>
  )
}

export default WorkoutForm
