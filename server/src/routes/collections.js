const express = require('express')
const router = express.Router()
const collectionController = require('../controllers/collectionController')

router.get('/', collectionController.getAllCollections)
router.get('/:id', collectionController.getCollectionById)
router.post('/', collectionController.createCollection)
router.put('/:id', collectionController.updateCollection)
router.delete('/:id', collectionController.deleteCollection)
router.post('/:collectionId/snippets/:snippetId', collectionController.addSnippetToCollection)
router.delete('/:collectionId/snippets/:snippetId', collectionController.removeSnippetFromCollection)

module.exports = router
