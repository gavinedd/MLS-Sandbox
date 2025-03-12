# Mock MLS (Multiple Listing Service)

A mock MLS system that allows external websites to push real estate listings via an API. Built with React, Vite, Tailwind CSS, DaisyUI, and Firebase.

## Features

- **Property Listings Display**: Modern UI with responsive DaisyUI cards
- **Search & Filter**: Find properties by price, bedrooms, location, etc.
- **Detailed Property View**: Comprehensive property information with image gallery
- **RESTful API**: External websites can push listings via API endpoints
- **Firebase Integration**: Real-time data storage with Firestore

## API Endpoints

The following RESTful API endpoints are available for external websites to push listings:

- `POST /api/listings` - Create a new listing
- `GET /api/listings` - Retrieve all listings
- `GET /api/listings/{id}` - Fetch a specific listing
- `PUT /api/listings/{id}` - Update an existing listing
- `DELETE /api/listings/{id}` - Remove a listing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mock-mls.git
   cd mock-mls
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
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
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Authentication (optional)
4. Add a web app to your Firebase project
5. Copy the Firebase configuration to your `.env` file

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Sign up for a Vercel account at [https://vercel.com/](https://vercel.com/)
3. Import your GitHub repository
4. Add your environment variables (Firebase configuration)
5. Deploy

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Sign up for a Netlify account at [https://www.netlify.com/](https://www.netlify.com/)
3. Import your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `dist`
5. Add your environment variables (Firebase configuration)
6. Deploy

## Project Structure

```
mock-mls/
├── src/
│   ├── api/                 # API handlers
│   ├── components/          # React components
│   ├── firebase/            # Firebase configuration
│   ├── pages/               # Page components
│   ├── services/            # Service layer for data access
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── router.tsx           # Routing configuration
├── public/                  # Static assets
├── .env                     # Environment variables
└── package.json             # Project dependencies
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Firebase](https://firebase.google.com/)
