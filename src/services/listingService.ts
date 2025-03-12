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
    let q = query(listingsCollection);
    
    // Add filters based on criteria
    if (criteria.city !== undefined && criteria.city !== '') {
      q = query(q, where('city', '==', criteria.city));
    }
    
    if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
      q = query(q, where('listPrice', '>=', criteria.minPrice));
    }
    
    if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
      q = query(q, where('listPrice', '<=', criteria.maxPrice));
    }
    
    if (criteria.minBedrooms !== undefined && criteria.minBedrooms > 0) {
      q = query(q, where('bedrooms', '>=', criteria.minBedrooms));
    }
    
    if (criteria.propertyType !== undefined && criteria.propertyType !== '') {
      q = query(q, where('propertyType', '==', criteria.propertyType));
    }
    
    // Add sorting and limit
    q = query(q, orderBy(sortBy, sortDirection), limit(resultsLimit));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc): Listing => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
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
