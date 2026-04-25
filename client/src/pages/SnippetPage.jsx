import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import '../styles/SnippetPage.css'

function SnippetPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [snippet, setSnippet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadSnippet()
  }, [id])

  useEffect(() => {
    if (snippet) {
      Prism.highlightAll()
    }
  }, [snippet])

  const loadSnippet = async () => {
    try {
      const data = await api.getSnippet(id)
      setSnippet(data)
    } catch (error) {
      console.error('Error loading snippet:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this snippet?')) {
      return
    }

    try {
      await api.deleteSnippet(id)
      navigate('/')
    } catch (error) {
      console.error('Error deleting snippet:', error)
      alert('Failed to delete snippet')
    }
  }

  if (loading) {
    return <div className="loading">Loading snippet...</div>
  }

  if (!snippet) {
    return (
      <div className="error-page">
        <h2>Snippet not found</h2>
        <Link to="/">← Back to home</Link>
      </div>
    )
  }

  return (
    <div className="snippet-page">
      <div className="snippet-container">
        <div className="breadcrumb">
          <Link to="/">← Back to all snippets</Link>
        </div>

        <header className="snippet-header">
          <div>
            <h1>{snippet.title}</h1>
            {snippet.description && (
              <p className="snippet-description">{snippet.description}</p>
            )}
          </div>
          <div className="snippet-actions">
            <button onClick={handleCopy} className="btn-copy">
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button onClick={handleDelete} className="btn-delete">
              🗑️ Delete
            </button>
          </div>
        </header>

        <div className="snippet-meta">
          <span className="language-badge">{snippet.language}</span>
          {snippet.tags && snippet.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
          <span className="date">
            Created {new Date(snippet.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="code-container">
          <pre>
            <code className={`language-${snippet.language}`}>
              {snippet.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default SnippetPage
