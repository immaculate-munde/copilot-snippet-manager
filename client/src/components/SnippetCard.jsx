import { Link } from 'react-router-dom'
import '../styles/SnippetCard.css'

function SnippetCard({ snippet, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="snippet-card">
      <div className="snippet-card-header">
        <div className="snippet-title-section">
          <Link to={`/snippet/${snippet.id}`} className="snippet-title">
            {snippet.title}
          </Link>
          <span className="snippet-language">{snippet.language}</span>
        </div>
        <button 
          onClick={() => onDelete(snippet.id)} 
          className="delete-btn"
          aria-label="Delete snippet"
        >
          🗑️
        </button>
      </div>
      
      {snippet.description && (
        <p className="snippet-description">{snippet.description}</p>
      )}
      
      <div className="snippet-code-preview">
        <code>{snippet.code.substring(0, 150)}{snippet.code.length > 150 ? '...' : ''}</code>
      </div>
      
      <div className="snippet-footer">
        <div className="snippet-tags">
          {snippet.tags && snippet.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        <span className="snippet-date">{formatDate(snippet.created_at)}</span>
      </div>
    </div>
  )
}

export default SnippetCard
