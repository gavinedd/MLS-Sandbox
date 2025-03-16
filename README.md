# Mock MLS (Multiple Listing Service)

A mock MLS system that allows external websites to push real estate listings via an API. Built with React, TypeScript, Vite, Tailwind CSS, DaisyUI, Firebase, and Netlify Functions.

## Features

- **Property Listings Display**: Modern UI with responsive DaisyUI cards
- **Search & Filter**: Find properties by price, bedrooms, location, etc.
- **Detailed Property View**: Comprehensive property information with image gallery
- **RESTful API**: External websites can push listings via API endpoints
- **Firebase Integration**: Real-time data storage with Firestore
- **Netlify Functions**: Serverless API implementation for secure database access

## API Endpoints

The following RESTful API endpoints are available for external websites to manage listings:

- `GET /api/listings` - Retrieve all listings
- `GET /api/listings/{id}` - Fetch a specific listing
- `POST /api/listings` - Create a new listing
- `PUT /api/listings/{id}` - Update an existing listing
- `DELETE /api/listings/{id}` - Remove a listing

All API requests require authentication using an API key in the `X-API-Key` header.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Firebase account
- Netlify account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mock-mls.git
   cd mock-mls
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   API_KEY=your-custom-api-key (optional - for API authentication)
   ```

4. Start the development server with Netlify Functions:
   ```bash
   # Install Netlify CLI if you haven't already
   npm install -g netlify-cli
   
   # Start the development server
   netlify dev
   ```

5. Open your browser and navigate to `http://localhost:8888`

### Testing the API

You can test the API using cURL or Postman:

```bash
# Get all listings
curl -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings

# Get a specific listing
curl -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings/YOUR_LISTING_ID

# Create a new listing
curl -X POST \
  -H "X-API-Key: test-api-key-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "L67890",
    "mlsId": "MLS12345",
    "listingStatus": "Active",
    "listPrice": 550000,
    "propertyType": "Single Family",
    "description": "Beautiful home with modern amenities",
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFeet": 1800,
    "streetAddress": "123 Main St",
    "city": "Anytown",
    "state": "CA"
  }' \
  http://localhost:8888/api/listings

# Update a listing
curl -X PUT \
  -H "X-API-Key: test-api-key-1234" \
  -H "Content-Type: application/json" \
  -d '{"listPrice": 575000}' \
  http://localhost:8888/api/listings/YOUR_LISTING_ID

# Delete a listing
curl -X DELETE -H "X-API-Key: test-api-key-1234" http://localhost:8888/api/listings/YOUR_LISTING_ID
```

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Authentication (optional)
4. Add a web app to your Firebase project
5. Copy the Firebase configuration to your `.env` file

## Netlify Functions Setup

The project uses Netlify Functions to implement the API endpoints. The functions are located in the `netlify/functions` directory:

- `listings.js` - Handles all listing-related API endpoints
- `hello.js` - A simple test function to verify Netlify Functions are working

## Deployment

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Sign up for a Netlify account at [https://www.netlify.com/](https://www.netlify.com/)
3. Import your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
5. Add your environment variables (Firebase configuration and API_KEY)
6. Deploy

After deployment, your API will be available at:
```
https://your-site-name.netlify.app/api/listings
```

## Project Structure

```
mock-mls/
├── netlify/
│   └── functions/           # Netlify serverless functions
│       ├── listings.js      # Main API function
│       └── hello.js         # Test function
├── src/
│   ├── components/          # React components
│   ├── firebase/            # Firebase configuration
│   ├── pages/               # Page components
│   │   └── ApiDocsPage.tsx  # API documentation page
│   ├── services/            # Service layer for data access
│   ├── types/               # TypeScript type definitions
│   │   └── Listing.ts       # Listing interface
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── .env                     # Environment variables
├── netlify.toml             # Netlify configuration
└── package.json             # Project dependencies
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Firebase](https://firebase.google.com/)
- [Netlify Functions](https://www.netlify.com/products/functions/)
