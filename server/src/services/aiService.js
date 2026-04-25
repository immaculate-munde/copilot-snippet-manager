const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key'
})

// Check if OpenAI is configured
const isConfigured = () => {
  return process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'demo-key'
}

// Generate code explanation
exports.explainCode = async (code, language) => {
  if (!isConfigured()) {
    return {
      explanation: 'AI features require OpenAI API key. Please configure OPENAI_API_KEY in your .env file.',
      demo: true
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful programming assistant. Explain code clearly and concisely.'
        },
        {
          role: 'user',
          content: `Explain what this ${language} code does:\n\n${code}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    return {
      explanation: response.choices[0].message.content,
      demo: false
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw new Error('Failed to generate explanation')
  }
}

// Generate tags for code
exports.generateTags = async (code, language, title) => {
  if (!isConfigured()) {
    // Return mock tags for demo
    return ['demo', language, 'code']
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a code analysis assistant. Generate relevant tags for code snippets. Return only a comma-separated list of 3-5 tags.'
        },
        {
          role: 'user',
          content: `Generate tags for this ${language} code titled "${title}":\n\n${code}`
        }
      ],
      max_tokens: 100,
      temperature: 0.5
    })

    const tagsText = response.choices[0].message.content
    return tagsText.split(',').map(tag => tag.trim().toLowerCase()).slice(0, 5)
  } catch (error) {
    console.error('Error generating tags:', error)
    return [language]
  }
}

// Semantic search using embeddings
exports.semanticSearch = async (query, snippets) => {
  if (!isConfigured() || snippets.length === 0) {
    // Fallback to simple text search
    return snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      snippet.description?.toLowerCase().includes(query.toLowerCase()) ||
      snippet.code.toLowerCase().includes(query.toLowerCase())
    )
  }

  try {
    // Get embedding for the query
    const queryEmbeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query
    })
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding

    // For now, use simple cosine similarity with code content
    // In production, you'd store embeddings in the database
    const results = []
    
    for (const snippet of snippets) {
      const content = `${snippet.title} ${snippet.description || ''} ${snippet.code}`
      const snippetEmbeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: content.substring(0, 8000) // Limit token count
      })
      const snippetEmbedding = snippetEmbeddingResponse.data[0].embedding
      
      // Calculate cosine similarity
      const similarity = cosineSimilarity(queryEmbedding, snippetEmbedding)
      
      if (similarity > 0.7) { // Threshold for relevance
        results.push({ ...snippet, similarity })
      }
    }

    // Sort by similarity
    results.sort((a, b) => b.similarity - a.similarity)
    return results

  } catch (error) {
    console.error('Error in semantic search:', error)
    // Fallback to text search
    return snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      snippet.description?.toLowerCase().includes(query.toLowerCase())
    )
  }
}

// Suggest improvements for code
exports.suggestImprovements = async (code, language) => {
  if (!isConfigured()) {
    return {
      suggestions: ['AI features require OpenAI API key configuration.'],
      demo: true
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a code review assistant. Suggest practical improvements for code quality, performance, and best practices. Be concise.'
        },
        {
          role: 'user',
          content: `Suggest improvements for this ${language} code:\n\n${code}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    const suggestionsText = response.choices[0].message.content
    const suggestions = suggestionsText.split('\n').filter(s => s.trim())

    return {
      suggestions,
      demo: false
    }
  } catch (error) {
    console.error('Error generating suggestions:', error)
    throw new Error('Failed to generate suggestions')
  }
}

// Helper function: Cosine similarity
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0)
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0))
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (mag1 * mag2)
}

// Find similar snippets
exports.findSimilarSnippets = async (snippetCode, allSnippets, limit = 5) => {
  if (!isConfigured() || allSnippets.length === 0) {
    // Simple fallback: find snippets with same language
    return allSnippets.slice(0, limit)
  }

  try {
    const targetEmbeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: snippetCode.substring(0, 8000)
    })
    const targetEmbedding = targetEmbeddingResponse.data[0].embedding

    const similarities = []
    
    for (const snippet of allSnippets) {
      const snippetEmbeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: snippet.code.substring(0, 8000)
      })
      const snippetEmbedding = snippetEmbeddingResponse.data[0].embedding
      
      const similarity = cosineSimilarity(targetEmbedding, snippetEmbedding)
      similarities.push({ ...snippet, similarity })
    }

    // Sort by similarity and return top N
    similarities.sort((a, b) => b.similarity - a.similarity)
    return similarities.slice(0, limit)

  } catch (error) {
    console.error('Error finding similar snippets:', error)
    return allSnippets.slice(0, limit)
  }
}
