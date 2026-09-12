const express = require('express')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const compression = require('compression')

dotenv.config()

const contactRoutes = require('./routes/contactRoutes')
const aiRoutes = require('./routes/ai')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 6000

// Middleware
app.use(compression())

const whitelist = [
  'https://waveinit.com',
  'https://www.waveinit.com',
  'https://official-wave-init-in.vercel.app',
  'http://localhost:4000',
  'http://127.0.0.1:4000'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    const isAllowed = whitelist.indexOf(origin) !== -1 ||
                      origin.endsWith('.vercel.app') ||
                      origin.startsWith('http://localhost:') ||
                      origin.startsWith('http://127.0.0.1:')
    if (isAllowed) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const connectDB = async () => {
  try {
    mongoose.set('bufferCommands', false)
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wave-init', {
      serverSelectionTimeoutMS: 5000
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB Atlas Connection Error: ${error.message}`)
    console.log('Falling back to in-memory MongoDB...')
    try {
      const memoryServer = await MongoMemoryServer.create()
      const memoryUri = memoryServer.getUri()
      const conn = await mongoose.connect(memoryUri)
      console.log(`MongoDB Connected (Memory): ${conn.connection.host}`)
    } catch (memoryError) {
      console.error(`MongoDB Memory Server also failed: ${memoryError.message}`)
      if (process.env.NODE_ENV === 'production') {
        process.exit(1)
      }
    }
  }
}

connectDB()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/ai', aiRoutes)

// Error handling
app.use(errorHandler)

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API: http://localhost:${PORT}/api`)
})
