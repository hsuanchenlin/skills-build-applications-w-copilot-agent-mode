import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <nav className="nav nav-pills flex-wrap">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" to="/teams">Teams</NavLink>
          <NavLink className="nav-link" to="/activities">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-3">
              <div className="col-md-6 col-xl-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">Track member profiles and goals.</p>
                    <NavLink className="btn btn-primary" to="/users">View users</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Teams</h5>
                    <p className="card-text">See group activity and collaboration.</p>
                    <NavLink className="btn btn-outline-primary" to="/teams">View teams</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Activities</h5>
                    <p className="card-text">Review recent workouts and movement data.</p>
                    <NavLink className="btn btn-outline-primary" to="/activities">View activities</NavLink>
                  </div>
                </div>
              </div>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
