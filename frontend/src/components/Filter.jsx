const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      hae lajilla: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
