import { useState } from 'react'

const today = () => new Date().toISOString().slice(0, 10)

const WorkoutForm = ({ sports, addWorkout }) => {
  const [date, setDate] = useState(today())
  const [sport, setSport] = useState(sports[0])
  const [duration, setDuration] = useState('')
  const [intensity, setIntensity] = useState('keskitaso')
  const [outdoors, setOutdoors] = useState(false)
  const [notes, setNotes] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const workoutObject = {
      date: date,
      sport: sport,
      duration: Number(duration),
      intensity: intensity,
      outdoors: outdoors,
      notes: notes
    }
    addWorkout(workoutObject).then(() => {
      setDuration('')
      setNotes('')
      setOutdoors(false)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        päivä: <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        laji:{' '}
        <select value={sport} onChange={e => setSport(e.target.value)}>
          {sports.map(s =>
            <option key={s} value={s}>{s}</option>
          )}
        </select>
      </div>
      <div>
        kesto (min): <input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
      </div>
      <div>
        teho:
        <label>
          <input type="radio" name="intensity" value="kevyt"
            checked={intensity === 'kevyt'} onChange={e => setIntensity(e.target.value)} />
          kevyt
        </label>
        <label>
          <input type="radio" name="intensity" value="keskitaso"
            checked={intensity === 'keskitaso'} onChange={e => setIntensity(e.target.value)} />
          keskitaso
        </label>
        <label>
          <input type="radio" name="intensity" value="kova"
            checked={intensity === 'kova'} onChange={e => setIntensity(e.target.value)} />
          kova
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={outdoors} onChange={e => setOutdoors(e.target.checked)} />
          ulkona
        </label>
      </div>
      <div>
        muistiinpanot: <input value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <button type="submit">lisää</button>
    </form>
  )
}

export default WorkoutForm
