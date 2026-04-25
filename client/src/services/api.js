import axios from 'axios'

const API_BASE = '/api'

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  // Snippets
  getSnippets: async () => {
    const response = await axiosInstance.get('/snippets')
    return response.data
  },

  getSnippet: async (id) => {
    const response = await axiosInstance.get(`/snippets/${id}`)
    return response.data
  },

  createSnippet: async (snippet) => {
    const response = await axiosInstance.post('/snippets', snippet)
    return response.data
  },

  updateSnippet: async (id, snippet) => {
    const response = await axiosInstance.put(`/snippets/${id}`, snippet)
    return response.data
  },

  deleteSnippet: async (id) => {
    const response = await axiosInstance.delete(`/snippets/${id}`)
    return response.data
  },

  searchSnippets: async (query) => {
    const response = await axiosInstance.post('/snippets/search', { query })
    return response.data
  },

  // Collections
  getCollections: async () => {
    const response = await axiosInstance.get('/collections')
    return response.data
  },

  getCollection: async (id) => {
    const response = await axiosInstance.get(`/collections/${id}`)
    return response.data
  },

  createCollection: async (collection) => {
    const response = await axiosInstance.post('/collections', collection)
    return response.data
  },

  updateCollection: async (id, collection) => {
    const response = await axiosInstance.put(`/collections/${id}`, collection)
    return response.data
  },

  deleteCollection: async (id) => {
    const response = await axiosInstance.delete(`/collections/${id}`)
    return response.data
  },

  addSnippetToCollection: async (collectionId, snippetId) => {
    const response = await axiosInstance.post(`/collections/${collectionId}/snippets/${snippetId}`)
    return response.data
  },

  removeSnippetFromCollection: async (collectionId, snippetId) => {
    const response = await axiosInstance.delete(`/collections/${collectionId}/snippets/${snippetId}`)
    return response.data
  },

  // AI Features
  explainSnippet: async (id) => {
    const response = await axiosInstance.post(`/snippets/${id}/ai/explain`)
    return response.data
  },

  generateTags: async (code, language, title) => {
    const response = await axiosInstance.post('/snippets/ai/generate-tags', { code, language, title })
    return response.data
  },

  semanticSearch: async (query) => {
    const response = await axiosInstance.post('/snippets/ai/semantic-search', { query })
    return response.data
  },

  suggestImprovements: async (id) => {
    const response = await axiosInstance.post(`/snippets/${id}/ai/improve`)
    return response.data
  },

  findSimilarSnippets: async (id) => {
    const response = await axiosInstance.get(`/snippets/${id}/ai/similar`)
    return response.data
  },
}
