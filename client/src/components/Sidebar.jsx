import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../services/api'
import '../styles/Sidebar.css'

function Sidebar({ onCollectionSelect }) {
  const [collections, setCollections] = useState([])
  const [showNewForm, setShowNewForm] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const location = useLocation()

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const data = await api.getCollections()
      setCollections(data)
    } catch (error) {
      console.error('Error loading collections:', error)
    }
  }

  const handleCreateCollection = async (e) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    try {
      await api.createCollection({ name: newCollectionName, description: '' })
      setNewCollectionName('')
      setShowNewForm(false)
      loadCollections()
    } catch (error) {
      console.error('Error creating collection:', error)
    }
  }

  const handleDeleteCollection = async (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Delete this collection? Snippets will not be deleted.')) {
      return
    }

    try {
      await api.deleteCollection(id)
      loadCollections()
    } catch (error) {
      console.error('Error deleting collection:', error)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>📁 Collections</h3>
        <button 
          onClick={() => setShowNewForm(!showNewForm)}
          className="add-collection-btn"
          title="New Collection"
        >
          +
        </button>
      </div>

      {showNewForm && (
        <form onSubmit={handleCreateCollection} className="new-collection-form">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name..."
            autoFocus
          />
          <div className="form-actions">
            <button type="submit" className="btn-save">✓</button>
            <button 
              type="button" 
              onClick={() => {
                setShowNewForm(false)
                setNewCollectionName('')
              }}
              className="btn-cancel"
            >
              ✕
            </button>
          </div>
        </form>
      )}

      <nav className="collection-list">
        <Link 
          to="/" 
          className={`collection-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span>📚 All Snippets</span>
        </Link>

        {collections.map(collection => (
          <Link
            key={collection.id}
            to={`/collection/${collection.id}`}
            className={`collection-item ${location.pathname === `/collection/${collection.id}` ? 'active' : ''}`}
          >
            <span>
              📁 {collection.name}
              <span className="count">({collection.snippet_count || 0})</span>
            </span>
            <button
              onClick={(e) => handleDeleteCollection(collection.id, e)}
              className="delete-collection-btn"
              title="Delete collection"
            >
              🗑️
            </button>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
