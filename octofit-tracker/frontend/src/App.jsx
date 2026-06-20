import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <nav className="nav nav-pills flex-wrap">
          {navItems.map((item) => (
            <NavLink key={item.to} className="nav-link" to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section>
              <div className="row g-3">
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
