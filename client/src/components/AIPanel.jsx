import { useState } from 'react'
import { api } from '../services/api'
import '../styles/AIPanel.css'

function AIPanel({ snippetId, code, language, title }) {
  const [activeTab, setActiveTab] = useState('explain')
  const [loading, setLoading] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [improvements, setImprovements] = useState(null)
  const [tags, setTags] = useState(null)
  const [similarSnippets, setSimilarSnippets] = useState(null)

  const handleExplain = async () => {
    setLoading(true)
    try {
      const result = await api.explainSnippet(snippetId)
      setExplanation(result)
    } catch (error) {
      console.error('Error explaining code:', error)
      setExplanation({ explanation: 'Failed to generate explanation', demo: true })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateTags = async () => {
    setLoading(true)
    try {
      const result = await api.generateTags(code, language, title)
      setTags(result.tags)
    } catch (error) {
      console.error('Error generating tags:', error)
      setTags(['error'])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestImprovements = async () => {
    setLoading(true)
    try {
      const result = await api.suggestImprovements(snippetId)
      setImprovements(result)
    } catch (error) {
      console.error('Error suggesting improvements:', error)
      setImprovements({ suggestions: ['Failed to generate suggestions'], demo: true })
    } finally {
      setLoading(false)
    }
  }

  const handleFindSimilar = async () => {
    setLoading(true)
    try {
      const result = await api.findSimilarSnippets(snippetId)
      setSimilarSnippets(result)
    } catch (error) {
      console.error('Error finding similar snippets:', error)
      setSimilarSnippets([])
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'explain', label: '🤖 Explain', action: handleExplain },
    { id: 'improve', label: '💡 Improve', action: handleSuggestImprovements },
    { id: 'tags', label: '🏷️ Generate Tags', action: handleGenerateTags },
    { id: 'similar', label: '🔗 Similar', action: handleFindSimilar },
  ]

  const handleTabClick = (tab) => {
    setActiveTab(tab.id)
    tab.action()
  }

  return (
    <div className="ai-panel">
      <h3>✨ AI Assistant</h3>
      
      <div className="ai-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`ai-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ai-content">
        {loading ? (
          <div className="ai-loading">
            <div className="spinner"></div>
            <p>AI is thinking...</p>
          </div>
        ) : (
          <>
            {activeTab === 'explain' && explanation && (
              <div className="ai-result">
                {explanation.demo && <div className="demo-badge">Demo Mode</div>}
                <p>{explanation.explanation}</p>
              </div>
            )}

            {activeTab === 'improve' && improvements && (
              <div className="ai-result">
                {improvements.demo && <div className="demo-badge">Demo Mode</div>}
                <ul>
                  {improvements.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'tags' && tags && (
              <div className="ai-result">
                <div className="tags-result">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
                <p className="hint">Copy these tags to your snippet!</p>
              </div>
            )}

            {activeTab === 'similar' && similarSnippets && (
              <div className="ai-result">
                {similarSnippets.length === 0 ? (
                  <p>No similar snippets found.</p>
                ) : (
                  <ul className="similar-list">
                    {similarSnippets.map(snippet => (
                      <li key={snippet.id}>
                        <a href={`/snippet/${snippet.id}`}>{snippet.title}</a>
                        <span className="language-badge">{snippet.language}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!explanation && !improvements && !tags && !similarSnippets && (
              <div className="ai-empty">
                <p>Click a tab above to use AI features</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AIPanel
