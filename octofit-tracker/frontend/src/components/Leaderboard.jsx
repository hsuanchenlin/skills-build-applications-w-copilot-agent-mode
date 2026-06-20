import { useEffect, useMemo, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  }

  return 'http://localhost:8000/api/leaderboard'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(getApiBaseUrl())
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }

        const data = await response.json()
        setEntries(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard')
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  const topEntry = useMemo(() => entries[0], [entries])

  if (loading) {
    return <p>Loading leaderboard...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="mb-3">Leaderboard</h2>
      {topEntry && (
        <div className="alert alert-success">
          Current leader: <strong>{topEntry.username}</strong> with {topEntry.score} points
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || entry.username}>
                <td>{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
