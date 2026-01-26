import { HashRouter, Routes, Route } from 'react-router'
import ProjectView from './pages/ProjectView.jsx'
import './App.css'
import WarpingJobView from './pages/WarpingJobView.jsx'

function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ProjectView />} />
        <Route path="/warping" element={<WarpingJobView />} />
      </Routes>
    </HashRouter>
  )
}

export default App
