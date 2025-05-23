import { publicRoutes } from './routes'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'

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
      </Routes>
    </>
  )
}

export default App
