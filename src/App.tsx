import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import createBrowser from './routes'

function App() {
  return (
    <StrictMode>
      <RouterProvider router={createBrowser}/>
    </StrictMode>
  )
}

export default App
