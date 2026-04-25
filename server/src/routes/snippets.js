const express = require('express')
const router = express.Router()
const snippetController = require('../controllers/snippetController')

// Basic CRUD
router.get('/', snippetController.getAllSnippets)
router.get('/:id', snippetController.getSnippetById)
router.post('/', snippetController.createSnippet)
router.put('/:id', snippetController.updateSnippet)
router.delete('/:id', snippetController.deleteSnippet)

// Search
router.post('/search', snippetController.searchSnippets)

// AI Features
router.post('/ai/semantic-search', snippetController.semanticSearch)
router.post('/ai/generate-tags', snippetController.generateTags)
router.post('/:id/ai/explain', snippetController.explainSnippet)
router.post('/:id/ai/improve', snippetController.suggestImprovements)
router.get('/:id/ai/similar', snippetController.findSimilarSnippets)

module.exports = router
