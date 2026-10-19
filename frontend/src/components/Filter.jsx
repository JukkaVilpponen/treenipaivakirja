const Filter = ({ sports, sportFilter, setSportFilter, search, setSearch }) => {
  return (
    <div className="filter">
      <label>
        Laji:{' '}
        <select value={sportFilter} onChange={e => setSportFilter(e.target.value)}>
          <option value="kaikki">Kaikki</option>
          {sports.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>
        Hae muistiinpanoista:{' '}
        <input value={search} onChange={e => setSearch(e.target.value)} />
      </label>
    </div>
  )
}

export default Filter
