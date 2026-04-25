import axios from 'axios'

const API_BASE = '/api'

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
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

  explainSnippet: async (id) => {
    const response = await axiosInstance.post(`/snippets/${id}/explain`)
    return response.data
  },

  semanticSearch: async (query) => {
    const response = await axiosInstance.post('/snippets/semantic', { query })
    return response.data
  },
}
