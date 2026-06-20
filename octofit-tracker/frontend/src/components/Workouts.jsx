import { useEffect, useMemo, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/workouts`
  }

  return 'http://localhost:8000/api/workouts'
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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(getApiBaseUrl())
        if (!response.ok) {
          throw new Error('Failed to fetch workouts')
        }

        const data = await response.json()
        setWorkouts(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workouts')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  const totalWorkouts = useMemo(() => workouts.length, [workouts])

  if (loading) {
    return <p>Loading workouts...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="mb-3">Workouts</h2>
      <p className="text-muted">Total workouts: {totalWorkouts}</p>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.name}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">Type: {workout.type}</p>
                <p className="card-text">Duration: {workout.duration} min</p>
                <p className="card-text">Difficulty: {workout.difficulty}</p>
                <p className="card-text">Recommended for: {workout.recommendedFor?.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
