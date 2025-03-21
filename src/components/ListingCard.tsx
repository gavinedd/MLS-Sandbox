import type React from 'react';
import { type Listing } from '../types/Listing';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
  onEdit?: (listing: Listing) => void;
  onDelete?: (listing: Listing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onClick,
  onEdit,
  onDelete
}) => {
  // Format price with commas
  const formatPrice = (price?: number): string => {
    if (price === undefined || price === null) {
      return '$0';
    }
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  // Format number with commas
  const formatNumber = (num?: number): string => {
    if (num === undefined || num === null) {
      return '0';
    }
    return num.toLocaleString();
  };

  // Get the first photo or use a placeholder
  const primaryPhoto = listing?.photos !== undefined &&
                       listing.photos !== null &&
                       listing.photos.length > 0
    ? listing.photos[0]
    : 'https://via.placeholder.com/400x300?text=No+Image+Available';

  // If listing is undefined or null, show a loading state
  if (listing === null || listing === undefined) {
    return (
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-64">
        <img
          src={primaryPhoto}
          alt={`${listing.streetAddress !== '' ? listing.streetAddress : 'Property'} - ${listing.city !== '' ? listing.city : ''}, ${listing.state !== '' ? listing.state : ''}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 badge badge-primary">
          {listing.listingStatus !== undefined ? listing.listingStatus : 'Unknown'}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{formatPrice(listing.listPrice)}</h2>
        <div className="flex items-center gap-2 text-lg">
          <span className="font-semibold">{listing.bedrooms !== undefined && listing.bedrooms !== null ? listing.bedrooms : 0} <span className="text-sm">beds</span></span>
          <span className="text-gray-500">|</span>
          <span className="font-semibold">{listing.bathrooms !== undefined && listing.bathrooms !== null ? listing.bathrooms : 0} <span className="text-sm">baths</span></span>
          <span className="text-gray-500">|</span>
          <span className="font-semibold">{formatNumber(listing.squareFeet)} <span className="text-sm">sqft</span></span>
        </div>
        <p className="text-base mt-1">{listing.streetAddress !== '' ? listing.streetAddress : 'Address not available'}</p>
        <p className="text-base">
          {listing.city !== '' ? listing.city : ''}{listing.city !== '' && listing.state !== '' ? ', ' : ''}{listing.state !== '' ? listing.state : ''} {listing.postalCode !== '' ? listing.postalCode : ''}
        </p>
        <div className="mt-2">
          <span className="badge badge-outline mr-1">{listing.propertyType !== '' ? listing.propertyType : 'Unknown'}</span>
          {listing.yearBuilt !== undefined && listing.yearBuilt !== null && listing.yearBuilt !== 0 && (
            <span className="badge badge-outline">Built {listing.yearBuilt}</span>
          )}
        </div>
        <div className="card-actions justify-between mt-4">
          <div className="flex space-x-2">
            {onEdit !== undefined && onEdit !== null && (
              <button
                className="btn btn-sm btn-outline btn-info"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(listing);
                }}
              >
                Edit
              </button>
            )}
            {onDelete !== undefined && onDelete !== null && (
              <button
                className="btn btn-sm btn-outline btn-error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(listing);
                }}
              >
                Delete
              </button>
            )}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { onClick(listing); }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
