const Filter = ({ sports, sportFilter, setSportFilter, search, setSearch }) => {
  return (
    <div>
      laji:{' '}
      <select value={sportFilter} onChange={e => setSportFilter(e.target.value)}>
        <option value="kaikki">kaikki</option>
        {sports.map(s =>
          <option key={s} value={s}>{s}</option>
        )}
      </select>
      {' '}hae muistiinpanoista:{' '}
      <input value={search} onChange={e => setSearch(e.target.value)} />
    </div>
  )
}

export default Filter
