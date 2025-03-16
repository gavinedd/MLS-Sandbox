import type React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ListingCard from '../components/ListingCard';
import ListingDetailModal from '../components/ListingDetailModal';
import ListingSearch from '../components/ListingSearch';
import ListingForm from '../components/ListingForm';
import type { Listing } from '../types/Listing';
import { getListings, searchListings, createListing, updateListing, deleteListing } from '../services/listingService';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [listingToEdit, setListingToEdit] = useState<Listing | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
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
      console.log('Executing query with search criteria:', searchCriteria);
      // If no search criteria are set, fetch all listings
      if (
        searchCriteria.city === '' &&
        searchCriteria.minPrice === '' &&
        searchCriteria.maxPrice === '' &&
        searchCriteria.minBedrooms === '' &&
        searchCriteria.propertyType === ''
      ) {
        console.log('Fetching all listings');
        return await getListings();
      }

      // Otherwise, search with criteria
      console.log('Searching with criteria');
      try {
        const results = await searchListings({
          city: searchCriteria.city !== '' ? searchCriteria.city : undefined,
          minPrice: searchCriteria.minPrice !== '' ? parseInt(searchCriteria.minPrice) : undefined,
          maxPrice: searchCriteria.maxPrice !== '' ? parseInt(searchCriteria.maxPrice) : undefined,
          minBedrooms: searchCriteria.minBedrooms !== '' ? parseInt(searchCriteria.minBedrooms) : undefined,
          propertyType: searchCriteria.propertyType !== '' ? searchCriteria.propertyType : undefined
        });
        console.log('Search results:', results);
        return results;
      } catch (error) {
        console.error('Search error:', error);
        // Return empty array instead of throwing to show "no results" message
        return [];
      }
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
    console.log('Search criteria received in ListingsPage:', criteria);
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
    setIsEditMode(false);
    setListingToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditListing = (listing: Listing): void => {
    setIsEditMode(true);
    setListingToEdit(listing);
    setIsFormOpen(true);
  };

  const handleDeleteListing = (listing: Listing): void => {
    setListingToDelete(listing);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (listingToDelete?.id !== undefined && listingToDelete?.id !== '') {
      try {
        await deleteListing(listingToDelete.id);
        setIsDeleteConfirmOpen(false);
        setListingToDelete(null);
        // Refetch listings to update the UI
        await refetch();
      } catch (error) {
        console.error('Error deleting listing:', error);
        // You could add error handling UI here
      }
    }
  };

  const cancelDelete = (): void => {
    setIsDeleteConfirmOpen(false);
    setListingToDelete(null);
  };

  const handleFormCancel = (): void => {
    setIsFormOpen(false);
    setIsEditMode(false);
    setListingToEdit(null);
  };

  const handleFormSubmit = async (listingData: Omit<Listing, 'id'>): Promise<void> => {
    try {
      if (isEditMode && listingToEdit !== null && listingToEdit.id !== undefined && listingToEdit.id !== '') {
        // Update existing listing
        await updateListing(listingToEdit.id, listingData);
      } else {
        // Create new listing
        await createListing(listingData);
      }
      setIsFormOpen(false);
      setIsEditMode(false);
      setListingToEdit(null);
      // Refetch listings to show the changes
      await refetch();
    } catch (error) {
      console.error('Error saving listing:', error);
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
              key={listing.id !== undefined && listing.id !== '' ? listing.id : Math.random().toString()}
              listing={listing}
              onClick={handleCardClick}
              onEdit={handleEditListing}
              onDelete={handleDeleteListing}
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
                initialData={isEditMode && listingToEdit !== null ? listingToEdit : {}}
                onSubmit={(data) => {
                  void handleFormSubmit(data);
                }}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete the listing at{' '}
              <span className="font-semibold">
                {listingToDelete?.streetAddress ?? ''},{listingToDelete?.city ?? ''}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  void confirmDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
