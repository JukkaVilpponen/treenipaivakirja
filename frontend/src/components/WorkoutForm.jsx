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
      date,
      sport,
      duration: Number(duration),
      intensity,
      outdoors,
      notes
    }

    addWorkout(workoutObject).then(success => {
      if (success) {
        setDuration('')
        setNotes('')
        setOutdoors(false)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <div>
        <label>Päivämäärä
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>Laji
          <select value={sport} onChange={e => setSport(e.target.value)}>
            {sports.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <div>
        <label>Kesto (min)
          <input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} />
        </label>
      </div>
      <div className="radio-group">
        Teho:
        {['kevyt', 'keskitaso', 'kova'].map(level => (
          <label key={level}>
            <input
              type="radio"
              name="intensity"
              value={level}
              checked={intensity === level}
              onChange={e => setIntensity(e.target.value)}
            />
            {level}
          </label>
        ))}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={outdoors} onChange={e => setOutdoors(e.target.checked)} />
          Ulkona
        </label>
      </div>
      <div>
        <label>Muistiinpanot
          <input value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
      </div>
      <button type="submit">Lisää treeni</button>
    </form>
  )
}

export default WorkoutForm
