// This script is used to start the API server
// Run with: node src/server/startApiServer.js

// Import required modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
// These modules are not currently used but may be needed in the future
// eslint-disable-next-line no-unused-vars
const path = require('path')
// eslint-disable-next-line no-unused-vars
const fs = require('fs')

// Create Express app
const app = express()
const PORT = process.env.API_PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Hardcoded test API key - can be used for testing without setting up .env
const TEST_API_KEY = 'test-api-key-123'

// Simple API key authentication middleware
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key']

  // Check if API key is provided and valid
  // Accept either the environment variable API key or the hardcoded test key
  if (!apiKey || (apiKey !== process.env.API_KEY && apiKey !== TEST_API_KEY)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' })
  }

  next()
}

// Mock database for listings (in a real app, this would use Firebase)
const listings = [
  {
    id: 'abc123',
    listingId: 'L12345',
    mlsId: 'MLS12345',
    listingStatus: 'Active',
    listPrice: 450000,
    listingDate: '2023-05-15',
    propertyType: 'Single Family',
    description: 'Beautiful home with modern amenities',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2000,
    lotSize: 0.25,
    yearBuilt: 2010,
    streetAddress: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    country: 'USA',
    photos: ['https://example.com/photo1.jpg'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// API Routes
// GET all listings
app.get('/api/listings', apiKeyAuth, (req, res) => {
  res.json(listings)
})

// GET a specific listing
app.get('/api/listings/:id', apiKeyAuth, (req, res) => {
  const listing = listings.find(l => l.id === req.params.id)

  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' })
  }

  res.json(listing)
})

// POST a new listing
app.post('/api/listings', apiKeyAuth, (req, res) => {
  const newListing = {
    id: `id-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  listings.push(newListing)
  res.status(201).json(newListing)
})

// PUT (update) a listing
app.put('/api/listings/:id', apiKeyAuth, (req, res) => {
  const index = listings.findIndex(l => l.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' })
  }

  listings[index] = {
    ...listings[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  }

  res.json({
    success: true,
    message: `Listing ${req.params.id} updated successfully`
  })
})

// DELETE a listing
app.delete('/api/listings/:id', apiKeyAuth, (req, res) => {
  const index = listings.findIndex(l => l.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' })
  }

  listings.splice(index, 1)

  res.json({
    success: true,
    message: `Listing ${req.params.id} deleted successfully`
  })
})

// Start the server
const server = createServer(app)

server.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`)
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`)
  console.log('')
  console.log('=== API KEY INFORMATION ===')
  console.log(`Use this test API key for testing: ${TEST_API_KEY}`)
  console.log('Include this key in your requests with the X-API-Key header')
  console.log('')
  console.log('Example curl command:')
  console.log(`curl -H "X-API-Key: ${TEST_API_KEY}" http://localhost:${PORT}/api/listings`)
})
