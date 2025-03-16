# Listings API Documentation

This document provides information on how to use the Listings API to integrate with our platform.

## Overview

The Listings API allows external websites to manage listings on our platform. You can create, read, update, and delete listings through simple HTTP requests.

## Getting Started

### Prerequisites

- An API key (contact our team to get one)
- Basic knowledge of HTTP requests

### Authentication

All API requests require authentication using an API key. Include your API key in the request headers:

```
X-API-Key: your_api_key_here
```

### Test API Key

For testing purposes, you can use the following API key:

```
test-api-key-1234
```

Example curl command:

```
curl -H "X-API-Key: test-api-key-1234" https://mls-sandbox.netlify.app/api/listings
```

### Base URL

All API requests should be made to:

```
https://mls-sandbox.netlify.app/api
```

For local testing with Netlify CLI, use:

```
http://localhost:8888/api
```

## API Endpoints

### Get All Listings

```
GET /api/listings
```

Returns a list of all listings.

### Get a Specific Listing

```
GET /api/listings/{id}
```

Returns a specific listing by ID.

### Create a New Listing

```
POST /api/listings
```

Creates a new listing. The request body should include all required listing fields.

### Update a Listing

```
PUT /api/listings/{id}
```

Updates an existing listing. The request body should include the fields you want to update.

### Delete a Listing

```
DELETE /api/listings/{id}
```

Deletes a listing.

## Request and Response Examples

For detailed examples of requests and responses, please visit our [API Documentation Page](/api-docs).

## Error Handling

The API returns standard HTTP status codes to indicate success or failure:

- **200 OK** - The request was successful
- **201 Created** - A new resource was created successfully
- **400 Bad Request** - The request was invalid
- **401 Unauthorized** - Authentication failed
- **404 Not Found** - The requested resource was not found
- **500 Internal Server Error** - An error occurred on the server

## Rate Limiting

To ensure fair usage, API requests are limited to 100 requests per hour per API key. If you exceed this limit, you'll receive a 429 Too Many Requests response.

## Setting Up the API Server

### Local Development

1. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Start the local development server:
   ```
   netlify dev
   ```

3. The API will be available at `http://localhost:8888/api/listings`

### Deployment

The API is deployed as Netlify Functions. When you push to your repository, Netlify will automatically build and deploy your API.

You can set environment variables in the Netlify dashboard:
1. Go to Site settings > Build & deploy > Environment
2. Add the variable `API_KEY` with your secret key

## Important Notes

- The API is implemented as serverless functions, which means they are stateless
- For production use, connect to a real database like Firebase, MongoDB Atlas, etc.
- Netlify Functions have execution limits (10 seconds for the free tier)
- They also have payload size limits (1MB for request/response)

## Support

If you have any questions or need assistance with the API, please contact our support team at api-support@example.com. 