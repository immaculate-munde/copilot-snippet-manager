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
