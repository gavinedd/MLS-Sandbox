// Netlify Function for handling listings API
require('dotenv').config()

// Firebase imports
const { initializeApp } = require('firebase/app')
const { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  Timestamp,
  serverTimestamp
} = require('firebase/firestore')

// Hardcoded test API key for testing
const TEST_API_KEY = 'test-api-key-1234'

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Helper function to parse path parameters
const getIdFromPath = (path) => {
  const parts = path.split('/')
  return parts[parts.length - 1]
}

// Helper function to format Firestore document
const formatListingDoc = (doc) => {
  const data = doc.data()
  
  // Convert Firestore timestamps to ISO strings if they exist
  const createdAt = data.createdAt instanceof Timestamp 
    ? data.createdAt.toDate().toISOString() 
    : data.createdAt
  
  const updatedAt = data.updatedAt instanceof Timestamp 
    ? data.updatedAt.toDate().toISOString() 
    : data.updatedAt

  return {
    id: doc.id,
    ...data,
    createdAt,
    updatedAt
  }
}

// Main handler function
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    }
  }

  // Check for API key
  const apiKey = event.headers['x-api-key'] || event.headers['X-API-Key']

  if (!apiKey || (apiKey !== TEST_API_KEY && apiKey !== process.env.API_KEY)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized: Invalid API key' })
    }
  }

  // Get ID from path if present
  const id = event.path.includes('/listings/') ? getIdFromPath(event.path) : null

  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        // Get all listings or a specific listing
        if (id) {
          // Get a specific listing by ID
          const docRef = doc(db, 'listings', id)
          const docSnap = await getDoc(docRef)
          
          if (!docSnap.exists()) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Listing not found' })
            }
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(formatListingDoc(docSnap))
          }
        } else {
          // Get all listings
          const listingsCollection = collection(db, 'listings')
          const querySnapshot = await getDocs(listingsCollection)
          
          const listings = []
          querySnapshot.forEach((doc) => {
            listings.push(formatListingDoc(doc))
          })
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(listings)
          }
        }

      case 'POST': {
        // Create a new listing
        try {
          const data = JSON.parse(event.body)
          
          // Validate required fields
          const requiredFields = [
            'listingId', 'mlsId', 'listingStatus', 'listPrice', 
            'propertyType', 'description', 'bedrooms', 'bathrooms', 
            'squareFeet', 'streetAddress', 'city', 'state'
          ]
          
          const missingFields = requiredFields.filter(field => !data[field])
          
          if (missingFields.length > 0) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ 
                error: 'Missing required fields', 
                missingFields 
              })
            }
          }
          
          // Add timestamps
          const newListing = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }
          
          // Add to Firestore
          const docRef = await addDoc(collection(db, 'listings'), newListing)
          
          // Get the newly created document to return
          const newDocSnap = await getDoc(docRef)
          
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify(formatListingDoc(newDocSnap))
          }
        } catch (error) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid request body', message: error.message })
          }
        }
      }

      case 'PUT': {
        // Update a listing
        if (!id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Listing ID is required' })
          }
        }

        // Check if listing exists
        const docRef = doc(db, 'listings', id)
        const docSnap = await getDoc(docRef)
        
        if (!docSnap.exists()) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Listing not found' })
          }
        }

        try {
          const data = JSON.parse(event.body)
          
          // Add updated timestamp
          const updateData = {
            ...data,
            updatedAt: serverTimestamp()
          }
          
          // Update in Firestore
          await updateDoc(docRef, updateData)
          
          // Get the updated document to return
          const updatedDocSnap = await getDoc(docRef)
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(formatListingDoc(updatedDocSnap))
          }
        } catch (error) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid request body', message: error.message })
          }
        }
      }

      case 'DELETE': {
        // Delete a listing
        if (!id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Listing ID is required' })
          }
        }

        // Check if listing exists
        const docRef = doc(db, 'listings', id)
        const docSnap = await getDoc(docRef)
        
        if (!docSnap.exists()) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Listing not found' })
          }
        }
        
        // Store listing data before deletion
        const deletedListing = formatListingDoc(docSnap)
        
        // Delete from Firestore
        await deleteDoc(docRef)
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Listing deleted successfully', 
            listing: deletedListing 
          })
        }
      }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        }
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error', message: error.message })
    }
  }
} 