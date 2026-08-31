import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage        from './components/MainPage'
import AboutPage       from './components/AboutPage'
import CornerstonePage from './components/CornerstonePage'
import ScrollToTop     from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                              element={<MainPage />}        />
        <Route path="/about"                         element={<AboutPage />}       />
        <Route path="/projects/cornerstone"  element={<CornerstonePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
