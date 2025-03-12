export interface Listing {
  id?: string; // Firestore document ID
  listingId: string;
  mlsId: string;
  listingStatus: 'Active' | 'Pending' | 'Sold' | 'Withdrawn';
  listPrice: number;
  listingDate: string;
  propertyType: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  parking: string;
  heating: string;
  cooling: string;
  hoaFees: number;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  brokerageName: string;
  brokeragePhone: string;
  photos: string[];
  virtualTourURL?: string;
  createdAt?: string;
  updatedAt?: string;
}
