import { useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search snippets by title, description, or code..."
        className="search-input"
      />
      {query && (
        <button type="button" onClick={handleClear} className="clear-btn">
          ✕
        </button>
      )}
      <button type="submit" className="search-btn">
        🔍 Search
      </button>
    </form>
  )
}

export default SearchBar
