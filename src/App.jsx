import { HashRouter, Routes, Route } from 'react-router'
import ProjectView from './pages/ProjectView.jsx'
import './App.css'

function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ProjectView />} />
      </Routes>
    </HashRouter>
  )
}

export default App
