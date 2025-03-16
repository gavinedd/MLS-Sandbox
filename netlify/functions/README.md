# Netlify Functions for Listings API

This directory contains serverless functions that power the Listings API. The functions connect to Firebase Firestore to provide real-time access to the same data displayed in the frontend application.

## Function Files

- `listings.js` - The main API function for managing listings
- `hello.js` - A simple test function to verify Netlify Functions are working

## Testing Locally

1. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
   
   Or use the dev dependency:
   ```
   npx netlify dev
   ```

2. Start the local development server:
   ```
   netlify dev
   ```

3. Test if functions are working:
   ```
   curl http://localhost:8888/.netlify/functions/hello
   ```
   
   You should see: `{"message":"Hello from Netlify Functions!"}`

4. Test the Listings API with cURL or Postman:
   ```
   # Get all listings
   curl -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings
   
   # Get a specific listing
   curl -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings/YOUR_LISTING_ID
   
   # Create a new listing
   curl -X POST -H "X-API-Key: test-api-key-1234" -H "Content-Type: application/json" \
     -d '{"listingId":"L67890","mlsId":"MLS12345","listingStatus":"Active","listPrice":550000,"propertyType":"Single Family","description":"Beautiful home","bedrooms":3,"bathrooms":2,"squareFeet":1800,"streetAddress":"123 Main St","city":"Anytown","state":"CA"}' \
     http://localhost:8888/api/listings
   
   # Update a listing
   curl -X PUT -H "X-API-Key: test-api-key-1234" -H "Content-Type: application/json" \
     -d '{"listPrice":575000}' \
     http://localhost:8888/api/listings/YOUR_LISTING_ID
   
   # Delete a listing
   curl -X DELETE -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings/YOUR_LISTING_ID
   ```

## Troubleshooting

If you encounter a "Function not found" error:

1. Make sure you're running `netlify dev` and it started without errors
2. Try accessing the test function directly: `curl http://localhost:8888/.netlify/functions/hello`
3. Check the Netlify CLI logs for any error messages
4. Verify that your `.env` file contains all the required Firebase configuration variables

## Firebase Integration

The function connects to Firebase using the same environment variables as your frontend application. Make sure these variables are set in your Netlify environment:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## API Key Authentication

The API uses key-based authentication. There are two ways to authenticate:

1. **Test API Key**: For testing, use the hardcoded key: `test-api-key-1234`

2. **Custom API Key**: Set a custom API key in your Netlify environment variables as `API_KEY`

Include the API key in your requests with the `X-API-Key` header.

## Deployment

When you deploy to Netlify, the functions will be automatically deployed. The redirects in `netlify.toml` ensure that API requests are routed to the correct function. 