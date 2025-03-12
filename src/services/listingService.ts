import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  FirestoreError,
  Firestore,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Listing } from '../types/Listing';

// Type assertion for db to handle potential mock object
const firestore = db as Firestore;
const COLLECTION_NAME = 'listings';
const listingsCollection = collection(firestore, COLLECTION_NAME) as CollectionReference;

// Create a new listing
export const createListing = async (listing: Omit<Listing, 'id'>): Promise<string> => {
  try {
    const timestamp = Timestamp.now();
    const listingWithTimestamps = {
      ...listing,
      createdAt: timestamp.toDate().toISOString(),
      updatedAt: timestamp.toDate().toISOString()
    };
    
    const docRef = await addDoc(listingsCollection, listingWithTimestamps);
    return docRef.id;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

// Get all listings
export const getListings = async (): Promise<Listing[]> => {
  try {
    const querySnapshot = await getDocs(listingsCollection);
    return querySnapshot.docs.map((doc): Listing => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting listings:', error);
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
};

// Get a listing by ID
export const getListingById = async (id: string): Promise<Listing | null> => {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, id) as DocumentReference;
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Listing;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting listing with ID ${id}:`, error);
    return null;
  }
};

// Update a listing
export const updateListing = async (id: string, listing: Partial<Listing>): Promise<void> => {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, id) as DocumentReference;
    const timestamp = Timestamp.now();
    
    await updateDoc(docRef, {
      ...listing,
      updatedAt: timestamp.toDate().toISOString()
    });
  } catch (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }
};

// Delete a listing
export const deleteListing = async (id: string): Promise<void> => {
  try {
    const docRef = doc(firestore, COLLECTION_NAME, id) as DocumentReference;
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
};

// Search criteria type
interface SearchCriteria {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  propertyType?: string;
}

// Search listings by criteria
export const searchListings = async (
  criteria: SearchCriteria,
  sortBy: string = 'listingDate',
  sortDirection: 'asc' | 'desc' = 'desc',
  resultsLimit: number = 20
): Promise<Listing[]> => {
  try {
    // Start with a basic query
    let q = query(listingsCollection);
    
    // Track which fields we need to filter client-side
    const clientSideFilters: Array<(listing: Listing) => boolean> = [];
    
    // We need to be careful about how we combine filters due to Firestore limitations
    // First, handle equality filters which don't have the same restrictions
    if (criteria.city !== undefined && criteria.city !== '') {
      q = query(q, where('city', '==', criteria.city));
    }
    
    if (criteria.propertyType !== undefined && criteria.propertyType !== '') {
      q = query(q, where('propertyType', '==', criteria.propertyType));
    }
    
    // For range filters, we need to be more careful
    // We can only have range filters on the same field we're ordering by,
    // or we need to use client-side filtering
    
    // If we're sorting by listPrice, we can use range filters on listPrice
    if (sortBy === 'listPrice') {
      if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
        q = query(q, where('listPrice', '>=', criteria.minPrice));
      }
      
      if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
        q = query(q, where('listPrice', '<=', criteria.maxPrice));
      }
      
      // But we need to filter bedrooms client-side
      if (criteria.minBedrooms !== undefined && criteria.minBedrooms > 0) {
        clientSideFilters.push((listing: Listing) => 
          listing.bedrooms >= criteria.minBedrooms!
        );
      }
    } 
    // If we're sorting by any other field (default is listingDate)
    else {
      // We can use at most one range filter on a non-sorted field
      // Let's prioritize price filters since they're more commonly used
      
      // If we have both min and max price, use them both client-side
      // to avoid having two range filters on a non-sorted field
      if (criteria.minPrice !== undefined && criteria.minPrice > 0 && 
          criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
        clientSideFilters.push((listing: Listing) => 
          listing.listPrice >= criteria.minPrice! && 
          listing.listPrice <= criteria.maxPrice!
        );
      }
      // If we only have min price, use it server-side
      else if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
        q = query(q, where('listPrice', '>=', criteria.minPrice));
      }
      // If we only have max price, use it server-side
      else if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
        q = query(q, where('listPrice', '<=', criteria.maxPrice));
      }
      
      // For bedrooms, always filter client-side if we already have a price filter
      if (criteria.minBedrooms !== undefined && criteria.minBedrooms > 0) {
        clientSideFilters.push((listing: Listing) => 
          listing.bedrooms >= criteria.minBedrooms!
        );
      }
    }
    
    // Add sorting and limit
    q = query(q, orderBy(sortBy, sortDirection), limit(resultsLimit));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map((doc): Listing => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
    
    // Apply any client-side filters
    if (clientSideFilters.length > 0) {
      results = results.filter(listing => 
        clientSideFilters.every(filterFn => filterFn(listing))
      );
    }
    
    return results;
  } catch (error) {
    console.error('Error searching listings:', error);
    // If it's a Firestore error related to missing indexes, provide a helpful message
    if ((error as FirestoreError)?.code === 'failed-precondition') {
      console.error('This query requires a Firestore index. Please check the Firebase console for more information.');
    }
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
};
