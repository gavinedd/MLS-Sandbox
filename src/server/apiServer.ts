// This file contains a mock implementation of the API server
// It's not used directly but serves as a reference for the actual implementation in startApiServer.js

// Note: The 'express' module is not installed, this is just for type definitions
// @ts-expect-error - Ignore the missing module error
import type { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { handleExternalApiRequest } from '../api/listingApi';

// Define Express app interface
interface ExpressApp {
  use: (middleware: any) => void;
  get: (path: string, ...handlers: any[]) => void;
  post: (path: string, ...handlers: any[]) => void;
  put: (path: string, ...handlers: any[]) => void;
  delete: (path: string, ...handlers: any[]) => void;
  listen: (port: number, callback: () => void) => void;
}

// Mock Express and CORS since we can't install the actual packages
// In a real implementation, you would use the actual packages
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const express = {
  json: () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Router: (): any => ({})
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cors = () => ({});

// Create Express app
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: ExpressApp = {} as any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PORT = process.env.API_PORT ?? 3001;

// Middleware setup (mock implementation)
app.use = () => {};

// Simple API key authentication middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  // Check if API key is provided and valid
  // In a production environment, you would store API keys securely and validate them properly
  if (apiKey === undefined || apiKey === null || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  next();
};

// Mock API Routes implementation
app.get = () => {};
app.post = () => {};
app.put = () => {};
app.delete = () => {};
app.listen = () => {};

/*
 * The following code would be used in a real implementation with Express installed:
 *
 * // API Routes
 * // GET all listings
 * app.get('/api/listings', apiKeyAuth, async (req: Request, res: Response) => {
 *   try {
 *     const listings = await handleExternalApiRequest('GET', 'listings');
 *     res.json(listings);
 *   } catch (error) {
 *     console.error('Error fetching listings:', error);
 *     res.status(500).json({ error: 'Failed to fetch listings' });
 *   }
 * });
 *
 * // GET a specific listing
 * app.get('/api/listings/:id', apiKeyAuth, async (req: Request, res: Response) => {
 *   try {
 *     const listing = await handleExternalApiRequest('GET', `listings/${req.params.id}`);
 *
 *     if (!listing) {
 *       return res.status(404).json({ error: 'Listing not found' });
 *     }
 *
 *     res.json(listing);
 *   } catch (error) {
 *     console.error(`Error fetching listing with ID ${req.params.id}:`, error);
 *     res.status(500).json({ error: 'Failed to fetch listing' });
 *   }
 * });
 *
 * // POST a new listing
 * app.post('/api/listings', apiKeyAuth, async (req: Request, res: Response) => {
 *   try {
 *     const newListing = await handleExternalApiRequest('POST', 'listings', req.body);
 *     res.status(201).json(newListing);
 *   } catch (error) {
 *     console.error('Error creating listing:', error);
 *     res.status(500).json({ error: 'Failed to create listing' });
 *   }
 * });
 *
 * // PUT (update) a listing
 * app.put('/api/listings/:id', apiKeyAuth, async (req: Request, res: Response) => {
 *   try {
 *     const result = await handleExternalApiRequest('PUT', `listings/${req.params.id}`, req.body);
 *     res.json(result);
 *   } catch (error) {
 *     console.error(`Error updating listing with ID ${req.params.id}:`, error);
 *     res.status(500).json({ error: 'Failed to update listing' });
 *   }
 * });
 *
 * // DELETE a listing
 * app.delete('/api/listings/:id', apiKeyAuth, async (req: Request, res: Response) => {
 *   try {
 *     const result = await handleExternalApiRequest('DELETE', `listings/${req.params.id}`);
 *     res.json(result);
 *   } catch (error) {
 *     console.error(`Error deleting listing with ID ${req.params.id}:`, error);
 *     res.status(500).json({ error: 'Failed to delete listing' });
 *   }
 * });
 *
 * // Start the server
 * if (process.env.NODE_ENV !== 'test') {
 *   app.listen(PORT, () => {
 *     console.log(`API Server running on port ${PORT}`);
 *   });
 * }
 */

export default app;
