import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import SnippetPage from './pages/SnippetPage'
import CollectionPage from './pages/CollectionPage'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/snippet/:id" element={<SnippetPage />} />
            <Route path="/collection/:id" element={<CollectionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
