import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'

import './App.css'
import ProjectView from './pages/ProjectView.jsx'

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
