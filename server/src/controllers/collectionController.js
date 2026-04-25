const pool = require('../config/database')

exports.getAllCollections = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, 
        COUNT(sc.snippet_id) as snippet_count
      FROM collections c
      LEFT JOIN snippet_collections sc ON c.id = sc.collection_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching collections:', error)
    res.status(500).json({ error: 'Failed to fetch collections' })
  }
}

exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params
    
    const collectionResult = await pool.query(
      'SELECT * FROM collections WHERE id = $1',
      [id]
    )
    
    if (collectionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Collection not found' })
    }
    
    const snippetsResult = await pool.query(`
      SELECT s.* FROM snippets s
      JOIN snippet_collections sc ON s.id = sc.snippet_id
      WHERE sc.collection_id = $1
      ORDER BY s.created_at DESC
    `, [id])
    
    const collection = collectionResult.rows[0]
    collection.snippets = snippetsResult.rows
    
    res.json(collection)
  } catch (error) {
    console.error('Error fetching collection:', error)
    res.status(500).json({ error: 'Failed to fetch collection' })
  }
}

exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body
    
    const result = await pool.query(
      'INSERT INTO collections (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    )
    
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating collection:', error)
    res.status(500).json({ error: 'Failed to create collection' })
  }
}

exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    
    const result = await pool.query(
      'UPDATE collections SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Collection not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating collection:', error)
    res.status(500).json({ error: 'Failed to update collection' })
  }
}

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params
    
    const result = await pool.query(
      'DELETE FROM collections WHERE id = $1 RETURNING *',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Collection not found' })
    }
    
    res.json({ message: 'Collection deleted successfully' })
  } catch (error) {
    console.error('Error deleting collection:', error)
    res.status(500).json({ error: 'Failed to delete collection' })
  }
}

exports.addSnippetToCollection = async (req, res) => {
  try {
    const { collectionId, snippetId } = req.params
    
    await pool.query(
      'INSERT INTO snippet_collections (snippet_id, collection_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [snippetId, collectionId]
    )
    
    res.json({ message: 'Snippet added to collection' })
  } catch (error) {
    console.error('Error adding snippet to collection:', error)
    res.status(500).json({ error: 'Failed to add snippet to collection' })
  }
}

exports.removeSnippetFromCollection = async (req, res) => {
  try {
    const { collectionId, snippetId } = req.params
    
    await pool.query(
      'DELETE FROM snippet_collections WHERE snippet_id = $1 AND collection_id = $2',
      [snippetId, collectionId]
    )
    
    res.json({ message: 'Snippet removed from collection' })
  } catch (error) {
    console.error('Error removing snippet from collection:', error)
    res.status(500).json({ error: 'Failed to remove snippet from collection' })
  }
}
