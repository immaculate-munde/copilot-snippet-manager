import { useState, useEffect } from 'react'
import { api } from '../services/api'

function HomePage() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSnippets()
  }, [])

  const loadSnippets = async () => {
    try {
      const data = await api.getSnippets()
      setSnippets(data)
    } catch (error) {
      console.error('Error loading snippets:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚀 CodeVault AI</h1>
      <p>Your AI-Powered Snippet Manager</p>
      
      {loading ? (
        <p>Loading snippets...</p>
      ) : (
        <div>
          <p>Found {snippets.length} snippets</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
