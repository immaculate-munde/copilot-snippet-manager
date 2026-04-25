import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SnippetPage from './pages/SnippetPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/snippet/:id" element={<SnippetPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
