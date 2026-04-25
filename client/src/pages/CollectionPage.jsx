import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import SnippetCard from '../components/SnippetCard'
import '../styles/CollectionPage.css'

function CollectionPage() {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCollection()
  }, [id])

  const loadCollection = async () => {
    try {
      const data = await api.getCollection(id)
      setCollection(data)
    } catch (error) {
      console.error('Error loading collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSnippet = async (snippetId) => {
    if (!confirm('Are you sure you want to delete this snippet?')) {
      return
    }

    try {
      await api.deleteSnippet(snippetId)
      loadCollection()
    } catch (error) {
      console.error('Error deleting snippet:', error)
      alert('Failed to delete snippet')
    }
  }

  const handleRemoveFromCollection = async (snippetId) => {
    try {
      await api.removeSnippetFromCollection(id, snippetId)
      loadCollection()
    } catch (error) {
      console.error('Error removing from collection:', error)
      alert('Failed to remove from collection')
    }
  }

  if (loading) {
    return <div className="loading">Loading collection...</div>
  }

  if (!collection) {
    return (
      <div className="error-page">
        <h2>Collection not found</h2>
        <Link to="/">← Back to home</Link>
      </div>
    )
  }

  return (
    <div className="collection-page">
      <div className="breadcrumb">
        <Link to="/">← Back to all snippets</Link>
      </div>

      <header className="collection-header">
        <div>
          <h1>📁 {collection.name}</h1>
          {collection.description && (
            <p className="collection-description">{collection.description}</p>
          )}
        </div>
        <span className="snippet-count">
          {collection.snippets?.length || 0} snippets
        </span>
      </header>

      {collection.snippets && collection.snippets.length === 0 ? (
        <div className="empty-state">
          <p>This collection is empty</p>
          <Link to="/" className="btn-primary">Browse snippets</Link>
        </div>
      ) : (
        <div className="snippets-grid">
          {collection.snippets?.map(snippet => (
            <div key={snippet.id} className="snippet-wrapper">
              <SnippetCard 
                snippet={snippet}
                onDelete={handleDeleteSnippet}
              />
              <button
                onClick={() => handleRemoveFromCollection(snippet.id)}
                className="remove-from-collection-btn"
                title="Remove from collection"
              >
                Remove from collection
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CollectionPage
