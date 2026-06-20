import { useEffect, useMemo, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/teams`
  }

  return 'http://localhost:8000/api/teams'
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

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(getApiBaseUrl())
        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }

        const data = await response.json()
        setTeams(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const totalTeams = useMemo(() => teams.length, [teams])

  if (loading) {
    return <p>Loading teams...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="mb-3">Teams</h2>
      <p className="text-muted">Total teams: {totalTeams}</p>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Goal: {team.goal}</p>
                <p className="card-text">Captain: {team.captain}</p>
                <p className="card-text">Members: {team.members?.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
