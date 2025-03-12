import type React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ListingCard from '../components/ListingCard';
import ListingDetailModal from '../components/ListingDetailModal';
import ListingSearch from '../components/ListingSearch';
import ListingForm from '../components/ListingForm';
import type { Listing } from '../types/Listing';
import { getListings, searchListings, createListing } from '../services/listingService';

interface SearchCriteriaType {
  city: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  propertyType: string;
}

const ListingsPage: React.FC = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteriaType>({
    city: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    propertyType: ''
  });

  // Fetch listings with react-query
  const { data: listings, isLoading, isError, refetch } = useQuery<Listing[]>(
    ['listings', searchCriteria],
    async () => {
      // If no search criteria are set, fetch all listings
      if (
        searchCriteria.city === '' &&
        searchCriteria.minPrice === '' &&
        searchCriteria.maxPrice === '' &&
        searchCriteria.minBedrooms === '' &&
        searchCriteria.propertyType === ''
      ) {
        return await getListings();
      }

      // Otherwise, search with criteria
      return await searchListings({
        city: searchCriteria.city !== '' ? searchCriteria.city : undefined,
        minPrice: searchCriteria.minPrice !== '' ? parseInt(searchCriteria.minPrice) : undefined,
        maxPrice: searchCriteria.maxPrice !== '' ? parseInt(searchCriteria.maxPrice) : undefined,
        minBedrooms: searchCriteria.minBedrooms !== '' ? parseInt(searchCriteria.minBedrooms) : undefined,
        propertyType: searchCriteria.propertyType !== '' ? searchCriteria.propertyType : undefined
      });
    },
    {
      // Add error handling
      onError: (error) => {
        console.error('Error fetching listings:', error);
      },
      // Retry failed requests
      retry: 1,
      // Keep previous data while fetching new data
      keepPreviousData: true
    }
  );

  const handleSearch = (criteria: SearchCriteriaType): void => {
    setSearchCriteria(criteria);
  };

  const handleCardClick = (listing: Listing): void => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleAddListingClick = (): void => {
    setIsFormOpen(true);
  };

  const handleFormCancel = (): void => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (listingData: Omit<Listing, 'id'>): Promise<void> => {
    try {
      await createListing(listingData);
      setIsFormOpen(false);
      // Refetch listings to show the new one
      refetch();
    } catch (error) {
      console.error('Error creating listing:', error);
      // You could add error handling UI here
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Property Listings</h1>
        <button 
          className="btn btn-primary"
          onClick={handleAddListingClick}
        >
          Add Listing
        </button>
      </div>

      {/* Search Component */}
      <ListingSearch onSearch={handleSearch} />

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {isError && (
        <div className="alert alert-error my-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading listings. Please try again later.</span>
        </div>
      )}

      {/* No Results */}
      {!isLoading && listings !== undefined && listings.length === 0 && (
        <div className="alert alert-info my-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No listings found matching your criteria. Try adjusting your search filters.</span>
        </div>
      )}

      {/* Listings Grid */}
      {!isLoading && !isError && listings !== undefined && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id || Math.random().toString()}
              listing={listing}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Add/Edit Listing Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-base-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-1">
              <ListingForm
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
