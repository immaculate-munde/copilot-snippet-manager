import { useState } from 'react'
import '../styles/SnippetForm.css'

const LANGUAGES = [
  'javascript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust', 
  'typescript', 'php', 'ruby', 'swift', 'kotlin', 'sql', 'html', 
  'css', 'bash', 'json', 'yaml', 'markdown', 'other'
]

function SnippetForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    code: initialData.code || '',
    language: initialData.language || 'javascript',
    tags: initialData.tags ? initialData.tags.join(', ') : ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag)

    onSubmit({
      ...formData,
      tags: tagsArray
    })
  }

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Quick sort algorithm"
        />
      </div>

      <div className="form-group">
        <label htmlFor="language">Language *</label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        >
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of what this code does..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="code">Code *</label>
        <textarea
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          placeholder="Paste your code here..."
          rows="12"
          className="code-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="sorting, algorithm, optimization (comma-separated)"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData.id ? 'Update' : 'Create'} Snippet
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default SnippetForm
