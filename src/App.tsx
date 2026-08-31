import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage        from './components/MainPage'
import AboutPage       from './components/AboutPage'
import CornerstonePage from './components/CornerstonePage'
import ScrollToTop     from './components/ScrollToTop'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                         element={<MainPage />}        />
        <Route path="/about"                    element={<AboutPage />}       />
        <Route path="/projects/cornerstone"     element={<CornerstonePage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
