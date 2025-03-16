import { type Listing } from '../types/Listing';
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing
} from '../services/listingService';

// API endpoints
export const ListingApi = {
  // Create a new listing
  createListing: async (listing: Omit<Listing, 'id'>): Promise<Listing> => {
    try {
      const id = await createListing(listing);
      const newListing: Listing = { id, ...listing };
      return newListing;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },

  // Get all listings
  getListings: async (): Promise<Listing[]> => {
    try {
      return await getListings();
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  // Get a listing by ID
  getListingById: async (id: string): Promise<Listing | null> => {
    try {
      return await getListingById(id);
    } catch (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a listing
  updateListing: async (id: string, listing: Partial<Listing>): Promise<void> => {
    try {
      await updateListing(id, listing);
    } catch (error) {
      console.error(`Error updating listing with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a listing
  deleteListing: async (id: string): Promise<void> => {
    try {
      await deleteListing(id);
    } catch (error) {
      console.error(`Error deleting listing with ID ${id}:`, error);
      throw error;
    }
  }
};

// External API handler for other websites to push listings
export const handleExternalApiRequest = async (
  method: string,
  endpoint: string,
  data?: any
): Promise<any> => {
  const id = endpoint.split('/').pop();

  switch (method) {
    case 'GET':
      if (typeof id === 'string' && id !== '' && id !== 'listings') {
        return await ListingApi.getListingById(id);
      } else {
        return await ListingApi.getListings();
      }

    case 'POST':
      if (data !== undefined && data !== null) {
        return await ListingApi.createListing(data);
      }
      throw new Error('No data provided for POST request');

    case 'PUT':
      if (typeof id === 'string' && id !== '' && data !== undefined && data !== null) {
        await ListingApi.updateListing(id, data);
        return { success: true, message: `Listing ${id} updated successfully` };
      }
      throw new Error('Invalid PUT request: missing ID or data');

    case 'DELETE':
      if (typeof id === 'string' && id !== '') {
        await ListingApi.deleteListing(id);
        return { success: true, message: `Listing ${id} deleted successfully` };
      }
      throw new Error('Invalid DELETE request: missing ID');

    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};
