const pool = require('../config/database')

exports.getAllSnippets = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM snippets ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching snippets:', error)
    res.status(500).json({ error: 'Failed to fetch snippets' })
  }
}

exports.getSnippetById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM snippets WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching snippet:', error)
    res.status(500).json({ error: 'Failed to fetch snippet' })
  }
}

exports.createSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags } = req.body
    
    const result = await pool.query(
      'INSERT INTO snippets (title, description, code, language, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, code, language, tags || []]
    )
    
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating snippet:', error)
    res.status(500).json({ error: 'Failed to create snippet' })
  }
}

exports.updateSnippet = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, code, language, tags } = req.body
    
    const result = await pool.query(
      'UPDATE snippets SET title = $1, description = $2, code = $3, language = $4, tags = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, description, code, language, tags, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating snippet:', error)
    res.status(500).json({ error: 'Failed to update snippet' })
  }
}

exports.deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM snippets WHERE id = $1 RETURNING *', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    res.json({ message: 'Snippet deleted successfully' })
  } catch (error) {
    console.error('Error deleting snippet:', error)
    res.status(500).json({ error: 'Failed to delete snippet' })
  }
}

exports.searchSnippets = async (req, res) => {
  try {
    const { query } = req.body
    
    const result = await pool.query(
      `SELECT * FROM snippets 
       WHERE title ILIKE $1 
       OR description ILIKE $1 
       OR code ILIKE $1 
       OR language ILIKE $1
       ORDER BY created_at DESC`,
      [`%${query}%`]
    )
    
    res.json(result.rows)
  } catch (error) {
    console.error('Error searching snippets:', error)
    res.status(500).json({ error: 'Failed to search snippets' })
  }
}

const aiService = require('../services/aiService')

exports.explainSnippet = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM snippets WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    const snippet = result.rows[0]
    const explanation = await aiService.explainCode(snippet.code, snippet.language)
    
    res.json(explanation)
  } catch (error) {
    console.error('Error explaining snippet:', error)
    res.status(500).json({ error: 'Failed to generate explanation' })
  }
}

exports.generateTags = async (req, res) => {
  try {
    const { code, language, title } = req.body
    const tags = await aiService.generateTags(code, language, title)
    
    res.json({ tags })
  } catch (error) {
    console.error('Error generating tags:', error)
    res.status(500).json({ error: 'Failed to generate tags' })
  }
}

exports.semanticSearch = async (req, res) => {
  try {
    const { query } = req.body
    
    // Get all snippets
    const result = await pool.query('SELECT * FROM snippets')
    const snippets = result.rows
    
    // Perform semantic search
    const results = await aiService.semanticSearch(query, snippets)
    
    res.json(results)
  } catch (error) {
    console.error('Error in semantic search:', error)
    res.status(500).json({ error: 'Failed to perform semantic search' })
  }
}

exports.suggestImprovements = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM snippets WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    const snippet = result.rows[0]
    const improvements = await aiService.suggestImprovements(snippet.code, snippet.language)
    
    res.json(improvements)
  } catch (error) {
    console.error('Error suggesting improvements:', error)
    res.status(500).json({ error: 'Failed to suggest improvements' })
  }
}

exports.findSimilarSnippets = async (req, res) => {
  try {
    const { id } = req.params
    const targetResult = await pool.query('SELECT * FROM snippets WHERE id = $1', [id])
    
    if (targetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' })
    }
    
    const targetSnippet = targetResult.rows[0]
    
    // Get all other snippets
    const allResult = await pool.query('SELECT * FROM snippets WHERE id != $1', [id])
    const allSnippets = allResult.rows
    
    // Find similar snippets
    const similar = await aiService.findSimilarSnippets(targetSnippet.code, allSnippets)
    
    res.json(similar)
  } catch (error) {
    console.error('Error finding similar snippets:', error)
    res.status(500).json({ error: 'Failed to find similar snippets' })
  }
}
