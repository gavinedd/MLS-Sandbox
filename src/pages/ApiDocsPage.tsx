import type React from 'react';

// Hardcoded test API key - must match the one in the Netlify function
const TEST_API_KEY = 'test-api-key-1234';

const ApiDocsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Listings API Documentation</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          This API allows external websites to manage listings on our platform. You can create, read, update, and delete listings through simple HTTP requests.
        </p>
        <p className="mb-4">
          The API is implemented as Netlify Serverless Functions and connects to our Firebase database, ensuring you&apos;re working with the same data as our main application.
        </p>
        <p className="mb-4">
          All API requests require authentication using an API key.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p className="mb-4">
          Include your API key in the request headers:
        </p>
        <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
          <pre><code className="text-white">X-API-Key: your_api_key_here</code></pre>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-md mb-4 shadow-md">
          <h3 className="text-lg font-semibold text-blue-800">Test API Key</h3>
          <p className="mb-2 text-blue-800">
            For testing purposes, you can use the following API key:
          </p>
          <div className="bg-gray-800 p-3 rounded-md mb-2 font-mono text-white">
            {TEST_API_KEY}
          </div>
          <p className="mb-2 text-blue-800">
            Example curl command:
          </p>
          <div className="bg-gray-800 p-3 rounded-md overflow-x-auto">
            <pre><code className="text-white">curl -H &quot;X-API-Key: {TEST_API_KEY}&quot; https://mls-sandbox.netlify.app/api/listings</code></pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
        <p className="mb-4">
          All API requests should be made to:
        </p>
        <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
          <pre><code className="text-white">https://mls-sandbox.netlify.app/api</code></pre>
        </div>
        <p className="mb-4">
          For local testing with Netlify CLI, use:
        </p>
        <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
          <pre><code className="text-white">http://localhost:8888/api</code></pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Get All Listings</h3>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block mb-2">GET /listings</div>
          <p className="mb-2">Returns a list of all listings.</p>
          <h4 className="font-semibold mt-4 mb-2">Example Response:</h4>
          <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify([
              {
                id: '1',
                listingId: 'L12345',
                mlsId: 'MLS67890',
                listingStatus: 'Active',
                listPrice: 450000,
                streetAddress: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '90210',
                bedrooms: 3,
                bathrooms: 2,
                squareFeet: 1800,
                yearBuilt: 2005,
                lotSize: 0.25,
                propertyType: 'Single Family',
                description: 'Beautiful home in a quiet neighborhood',
                photos: [
                  'https://example.com/photos/house1.jpg',
                  'https://example.com/photos/house2.jpg'
                ],
                createdAt: '2023-01-15T08:30:00Z',
                updatedAt: '2023-02-20T14:45:00Z'
              }
            ], null, 2)}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Get a Specific Listing</h3>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block mb-2">GET /listings/{'{id}'}</div>
          <p className="mb-2">Returns a specific listing by ID.</p>
          <h4 className="font-semibold mt-4 mb-2">Example Response:</h4>
          <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              id: '1',
              listingId: 'L12345',
              mlsId: 'MLS67890',
              listingStatus: 'Active',
              listPrice: 450000,
              streetAddress: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '90210',
              bedrooms: 3,
              bathrooms: 2,
              squareFeet: 1800,
              yearBuilt: 2005,
              lotSize: 0.25,
              propertyType: 'Single Family',
              description: 'Beautiful home in a quiet neighborhood',
              photos: [
                'https://example.com/photos/house1.jpg',
                'https://example.com/photos/house2.jpg'
              ],
              createdAt: '2023-01-15T08:30:00Z',
              updatedAt: '2023-02-20T14:45:00Z'
            }, null, 2)}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Create a New Listing</h3>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md inline-block mb-2">POST /listings</div>
          <p className="mb-2">Creates a new listing.</p>
          <h4 className="font-semibold mt-4 mb-2">Required Fields:</h4>
          <ul className="list-disc pl-6 mb-4">
            <li>listingId</li>
            <li>mlsId</li>
            <li>listingStatus</li>
            <li>listPrice</li>
            <li>propertyType</li>
            <li>description</li>
            <li>bedrooms</li>
            <li>bathrooms</li>
            <li>squareFeet</li>
            <li>streetAddress</li>
            <li>city</li>
            <li>state</li>
          </ul>
          <h4 className="font-semibold mt-4 mb-2">Request Body:</h4>
          <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              listingId: 'L67890',
              mlsId: 'MLS12345',
              listingStatus: 'Active',
              listPrice: 550000,
              propertyType: 'Single Family',
              description: 'Beautiful home with modern amenities',
              bedrooms: 4,
              bathrooms: 3,
              squareFeet: 2200,
              lotSize: 0.3,
              yearBuilt: 2015,
              streetAddress: '456 Oak St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '90210',
              photos: ['https://example.com/photos/house3.jpg']
            }, null, 2)}</code></pre>
          </div>
          <h4 className="font-semibold mt-4 mb-2">Example Response:</h4>
          <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              id: '2',
              listingId: 'L67890',
              mlsId: 'MLS12345',
              listingStatus: 'Active',
              listPrice: 550000,
              propertyType: 'Single Family',
              description: 'Beautiful home with modern amenities',
              bedrooms: 4,
              bathrooms: 3,
              squareFeet: 2200,
              lotSize: 0.3,
              yearBuilt: 2015,
              streetAddress: '456 Oak St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '90210',
              photos: ['https://example.com/photos/house3.jpg'],
              createdAt: '2023-06-10T14:30:00Z',
              updatedAt: '2023-06-10T14:30:00Z'
            }, null, 2)}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Update a Listing</h3>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md inline-block mb-2">PUT /listings/{'{id}'}</div>
          <p className="mb-2">Updates an existing listing.</p>
          <h4 className="font-semibold mt-4 mb-2">Request Body:</h4>
          <div className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              listPrice: 475000,
              description: 'Updated description with new features',
              listingStatus: 'Pending'
            }, null, 2)}</code></pre>
          </div>
          <h4 className="font-semibold mt-4 mb-2">Example Response:</h4>
          <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              id: '1',
              listingId: 'L12345',
              mlsId: 'MLS67890',
              listingStatus: 'Pending',
              listPrice: 475000,
              streetAddress: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zipCode: '90210',
              bedrooms: 3,
              bathrooms: 2,
              squareFeet: 1800,
              yearBuilt: 2005,
              lotSize: 0.25,
              propertyType: 'Single Family',
              description: 'Updated description with new features',
              photos: [
                'https://example.com/photos/house1.jpg',
                'https://example.com/photos/house2.jpg'
              ],
              createdAt: '2023-01-15T08:30:00Z',
              updatedAt: '2023-06-15T10:45:00Z'
            }, null, 2)}</code></pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Delete a Listing</h3>
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-md inline-block mb-2">DELETE /listings/{'{id}'}</div>
          <p className="mb-2">Deletes a listing.</p>
          <h4 className="font-semibold mt-4 mb-2">Example Response:</h4>
          <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <pre><code className="text-white">{JSON.stringify({
              message: 'Listing deleted successfully',
              listing: {
                id: '1',
                listingId: 'L12345',
                mlsId: 'MLS67890',
                listingStatus: 'Pending',
                listPrice: 475000
                // ... other listing properties
              }
            }, null, 2)}</code></pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
        <p className="mb-4">
          The API returns standard HTTP status codes to indicate success or failure:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>200 OK</strong> - The request was successful</li>
          <li><strong>201 Created</strong> - A new resource was created successfully</li>
          <li><strong>400 Bad Request</strong> - The request was invalid</li>
          <li><strong>401 Unauthorized</strong> - Authentication failed</li>
          <li><strong>404 Not Found</strong> - The requested resource was not found</li>
          <li><strong>500 Internal Server Error</strong> - An error occurred on the server</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-2">Example Error Response:</h4>
        <div className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <pre><code className="text-white">{JSON.stringify({
            error: 'Listing not found'
          }, null, 2)}</code></pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Netlify Serverless Functions</h2>
        <p className="mb-4">
          This API is implemented using Netlify Functions, which are serverless functions that run in the cloud and connect to our Firebase database.
        </p>
        <p className="mb-4">
          Important notes about Netlify Functions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The API connects to the same Firebase database as our main application</li>
          <li>All data is stored in Firestore and is persistent</li>
          <li>Execution is limited to 10 seconds on the free tier</li>
          <li>Request and response payloads are limited to 1MB</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
        <p className="mb-4">
          To ensure fair usage, API requests are limited to 100 requests per hour per API key. If you exceed this limit, you&apos;ll receive a 429 Too Many Requests response.
        </p>
      </section>
    </div>
  );
};

export default ApiDocsPage;
