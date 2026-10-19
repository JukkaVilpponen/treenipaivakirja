const initialWorkouts = [
  { id: '1', date: '2026-10-12', sport: 'Juoksu', duration: 45, intensity: 'kova', outdoors: true, notes: 'Intervallit 6x400m' },
  { id: '2', date: '2026-10-14', sport: 'Kuntosali', duration: 60, intensity: 'keskitaso', outdoors: false, notes: 'Jalkapäivä' },
  { id: '3', date: '2026-10-16', sport: 'Pyöräily', duration: 90, intensity: 'kevyt', outdoors: true, notes: '' }
]

const App = () => {
  return (
    <div>
      <h1>Treenipäiväkirja</h1>
      <ul>
        {initialWorkouts.map(w =>
          <li key={w.id}>
            {w.date} {w.sport} {w.duration} min
          </li>
        )}
      </ul>
    </div>
  )
}

export default App