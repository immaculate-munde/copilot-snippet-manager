const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const snippetRoutes = require('./routes/snippets')
const collectionRoutes = require('./routes/collections')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/snippets', snippetRoutes)
app.use('/api/collections', collectionRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeVault API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
