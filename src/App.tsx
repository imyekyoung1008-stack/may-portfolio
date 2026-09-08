import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPageRouter  from './components/MainPageRouter'
import AboutPageRouter from './components/AboutPageRouter'
import CornerstonePageRouter from './components/CornerstonePageRouter'
import AIAvatarPage    from './components/AIAvatarPage'
import ScrollToTop     from './components/ScrollToTop'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                         element={<MainPageRouter />}  />
        <Route path="/about"                    element={<AboutPageRouter />} />
        <Route path="/projects/cornerstone"     element={<CornerstonePageRouter />} />
        <Route path="/projects/ai-avatar"       element={<AIAvatarPage />} />
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
