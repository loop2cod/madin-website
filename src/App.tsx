import { publicRoutes } from './routes'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import NotFound from './Pages/NotFound'

function App() {
  return (
    <>
    <Routes>
        {publicRoutes?.map((route, idx) => (
          <Route
            path={route.path}
            element={<Layout>{route.component}</Layout>}
            key={idx}
          />
        ))}
        {/* Catch-all route for 404 - must be last */}
        <Route
          path="*"
          element={<Layout><NotFound /></Layout>}
        />
      </Routes>
    </>
  )
}

export default App
