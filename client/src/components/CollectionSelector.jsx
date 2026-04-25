import { useState, useEffect } from 'react'
import { api } from '../services/api'
import '../styles/CollectionSelector.css'

function CollectionSelector({ snippetId, onClose }) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const data = await api.getCollections()
      setCollections(data)
    } catch (error) {
      console.error('Error loading collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCollection = async (collectionId) => {
    try {
      await api.addSnippetToCollection(collectionId, snippetId)
      alert('Snippet added to collection!')
      onClose()
    } catch (error) {
      console.error('Error adding to collection:', error)
      alert('Failed to add to collection')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add to Collection</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        {loading ? (
          <p className="loading-text">Loading collections...</p>
        ) : collections.length === 0 ? (
          <p className="empty-text">No collections yet. Create one first!</p>
        ) : (
          <div className="collection-list">
            {collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => handleAddToCollection(collection.id)}
                className="collection-option"
              >
                📁 {collection.name}
                <span className="count">({collection.snippet_count || 0})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionSelector
