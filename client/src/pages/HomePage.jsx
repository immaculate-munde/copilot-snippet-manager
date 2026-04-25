import { useState, useEffect } from 'react'
import { api } from '../services/api'
import SnippetCard from '../components/SnippetCard'
import SnippetForm from '../components/SnippetForm'
import SearchBar from '../components/SearchBar'
import '../styles/HomePage.css'

function HomePage() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadSnippets()
  }, [])

  const loadSnippets = async () => {
    try {
      setLoading(true)
      const data = await api.getSnippets()
      setSnippets(data)
    } catch (error) {
      console.error('Error loading snippets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSnippet = async (snippetData) => {
    try {
      await api.createSnippet(snippetData)
      setShowForm(false)
      loadSnippets()
    } catch (error) {
      console.error('Error creating snippet:', error)
      alert('Failed to create snippet')
    }
  }

  const handleDeleteSnippet = async (id) => {
    if (!confirm('Are you sure you want to delete this snippet?')) {
      return
    }
    
    try {
      await api.deleteSnippet(id)
      loadSnippets()
    } catch (error) {
      console.error('Error deleting snippet:', error)
      alert('Failed to delete snippet')
    }
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      loadSnippets()
      return
    }

    try {
      setLoading(true)
      const results = await api.searchSnippets(query)
      setSnippets(results)
    } catch (error) {
      console.error('Error searching snippets:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <header className="page-header">
        <div className="header-content">
          <h1>🚀 CodeVault AI</h1>
          <p className="subtitle">Your AI-Powered Code Snippet Manager</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="new-snippet-btn"
        >
          {showForm ? '✕ Cancel' : '+ New Snippet'}
        </button>
      </header>

      {showForm && (
        <SnippetForm 
          onSubmit={handleCreateSnippet}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SearchBar onSearch={handleSearch} />

      <div className="snippets-section">
        <div className="snippets-header">
          <h2>
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : 'All Snippets'
            }
          </h2>
          <span className="snippet-count">{snippets.length} snippets</span>
        </div>

        {loading ? (
          <div className="loading">Loading snippets...</div>
        ) : snippets.length === 0 ? (
          <div className="empty-state">
            <p>📝 No snippets found</p>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Create your first snippet
              </button>
            )}
          </div>
        ) : (
          <div className="snippets-grid">
            {snippets.map(snippet => (
              <SnippetCard 
                key={snippet.id} 
                snippet={snippet}
                onDelete={handleDeleteSnippet}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
