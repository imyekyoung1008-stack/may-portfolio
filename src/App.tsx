import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage  from './components/MainPage'
import AboutPage from './components/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<MainPage />}  />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
