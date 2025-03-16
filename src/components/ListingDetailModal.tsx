import type React from 'react';
import { type Listing } from '../types/Listing';

interface ListingDetailModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  if (listing == null) return null;

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

  // Format date
  const formatDate = (dateString?: string): string => {
    if (dateString === undefined || dateString === null || dateString === '') {
      return 'Date not available';
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-4xl">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image Gallery */}
        <div className="carousel w-full h-80 mb-4 rounded-lg overflow-hidden">
          {listing.photos !== undefined && listing.photos !== null && listing.photos.length > 0
            ? (
              listing.photos.map((photo, index) => (
                <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
                  <img src={photo} className="w-full h-full object-cover" alt={`Property ${index + 1}`} />

                  {listing.photos !== undefined && listing.photos !== null && listing.photos.length > 1 && (
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href={`#slide${index === 0 ? listing.photos.length - 1 : index - 1}`} className="btn btn-circle">❮</a>
                      <a href={`#slide${index === listing.photos.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
                    </div>
                  )}
                </div>
              ))
            )
            : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
        </div>

        {/* Listing Details */}
        <h2 className="text-3xl font-bold">{formatPrice(listing.listPrice)}</h2>
        <h3 className="text-xl mt-2">{listing.streetAddress !== '' && listing.streetAddress !== undefined ? listing.streetAddress : 'Address not available'}</h3>
        <p className="text-lg">
          {listing.city !== '' && listing.city !== undefined ? listing.city : ''}
          {listing.city !== '' && listing.city !== undefined && listing.state !== '' && listing.state !== undefined ? ', ' : ''}
          {listing.state !== '' && listing.state !== undefined ? listing.state : ''}
          {listing.postalCode !== '' && listing.postalCode !== undefined ? listing.postalCode : ''}
        </p>

        <div className="stats shadow mt-4 w-full">
          <div className="stat">
            <div className="stat-title">Beds</div>
            <div className="stat-value">{listing.bedrooms !== undefined && listing.bedrooms !== null ? listing.bedrooms : 0}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Baths</div>
            <div className="stat-value">{listing.bathrooms !== undefined && listing.bathrooms !== null ? listing.bathrooms : 0}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Sq Ft</div>
            <div className="stat-value">{formatNumber(listing.squareFeet)}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Year Built</div>
            <div className="stat-value">{listing.yearBuilt !== undefined && listing.yearBuilt !== null && listing.yearBuilt !== 0 ? listing.yearBuilt : 'N/A'}</div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xl font-semibold mb-2">Property Details</h4>
            <ul className="space-y-2">
              <li><span className="font-medium">Property Type:</span> {listing.propertyType !== '' && listing.propertyType !== undefined ? listing.propertyType : 'Not specified'}</li>
              <li><span className="font-medium">MLS ID:</span> {listing.mlsId !== '' && listing.mlsId !== undefined ? listing.mlsId : 'Not available'}</li>
              <li><span className="font-medium">Status:</span> {listing.listingStatus !== undefined ? listing.listingStatus : 'Not specified'}</li>
              <li><span className="font-medium">Listed:</span> {formatDate(listing.listingDate)}</li>
              <li><span className="font-medium">Lot Size:</span> {listing.lotSize !== undefined && listing.lotSize !== null && listing.lotSize !== 0 ? listing.lotSize : 0} acres</li>
              <li><span className="font-medium">Parking:</span> {listing.parking !== '' && listing.parking !== undefined ? listing.parking : 'Not specified'}</li>
              <li><span className="font-medium">Heating:</span> {listing.heating !== '' && listing.heating !== undefined ? listing.heating : 'Not specified'}</li>
              <li><span className="font-medium">Cooling:</span> {listing.cooling !== '' && listing.cooling !== undefined ? listing.cooling : 'Not specified'}</li>
              {(listing.hoaFees !== undefined && listing.hoaFees !== null && listing.hoaFees > 0) && (
                <li><span className="font-medium">HOA Fees:</span> ${listing.hoaFees}/month</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Contact Information</h4>
            <ul className="space-y-2">
              <li><span className="font-medium">Agent:</span> {listing.agentName !== '' && listing.agentName !== undefined ? listing.agentName : 'Not specified'}</li>
              <li><span className="font-medium">Phone:</span> {listing.agentPhone !== '' && listing.agentPhone !== undefined ? listing.agentPhone : 'Not available'}</li>
              <li><span className="font-medium">Email:</span> {listing.agentEmail !== '' && listing.agentEmail !== undefined ? listing.agentEmail : 'Not available'}</li>
              <li><span className="font-medium">Brokerage:</span> {listing.brokerageName !== '' && listing.brokerageName !== undefined ? listing.brokerageName : 'Not specified'}</li>
              <li><span className="font-medium">Brokerage Phone:</span> {listing.brokeragePhone !== '' && listing.brokeragePhone !== undefined ? listing.brokeragePhone : 'Not available'}</li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        {/* Description */}
        <h4 className="text-xl font-semibold mb-2">Description</h4>
        <p className="whitespace-pre-line">{listing.description !== '' && listing.description !== undefined ? listing.description : 'No description available'}</p>

        {/* Virtual Tour */}
        {listing.virtualTourURL !== undefined && listing.virtualTourURL !== null && listing.virtualTourURL !== '' && (
          <div className="mt-4">
            <h4 className="text-xl font-semibold mb-2">Virtual Tour</h4>
            <a
              href={listing.virtualTourURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Virtual Tour
            </a>
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailModal;
