import type React from 'react';
import { useState } from 'react';
import { type Listing } from '../types/Listing';

interface ListingFormProps {
  initialData?: Partial<Listing>;
  onSubmit: (data: Omit<Listing, 'id'>) => void;
  onCancel: () => void;
}

const ListingForm: React.FC<ListingFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Listing>>({
    listingId: '',
    mlsId: '',
    listingStatus: 'Active',
    listPrice: 0,
    listingDate: new Date().toISOString().split('T')[0],
    propertyType: 'Single Family',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    lotSize: 0,
    yearBuilt: new Date().getFullYear(),
    parking: '',
    heating: '',
    cooling: '',
    hoaFees: 0,
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    latitude: 0,
    longitude: 0,
    agentId: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    brokerageName: '',
    brokeragePhone: '',
    photos: [],
    virtualTourURL: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    // Handle numeric fields
    if (
      [
        'listPrice',
        'bedrooms',
        'bathrooms',
        'squareFeet',
        'lotSize',
        'yearBuilt',
        'hoaFees',
        'latitude',
        'longitude'
      ].includes(name)
    ) {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePhotoUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    // Split by newline and filter out empty lines
    const urls = value.split('\n').filter(url => url.trim() !== '');
    setFormData({
      ...formData,
      photos: urls
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (formData.listingId === undefined || formData.listingId === null || formData.listingId === '') newErrors.listingId = 'Listing ID is required';
    if (formData.mlsId === undefined || formData.mlsId === null || formData.mlsId === '') newErrors.mlsId = 'MLS ID is required';
    if (formData.listPrice === undefined || formData.listPrice === null || formData.listPrice === 0) newErrors.listPrice = 'List price is required';
    if (formData.streetAddress === undefined || formData.streetAddress === null || formData.streetAddress === '') newErrors.streetAddress = 'Street address is required';
    if (formData.city === undefined || formData.city === null || formData.city === '') newErrors.city = 'City is required';
    if (formData.state === undefined || formData.state === null || formData.state === '') newErrors.state = 'State is required';
    if (formData.postalCode === undefined || formData.postalCode === null || formData.postalCode === '') newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData as Omit<Listing, 'id'>);
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {initialData.id !== undefined && initialData.id !== null && initialData.id !== '' ? 'Edit Listing' : 'Add New Listing'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="divider">Basic Information</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Listing ID */}
          <div className="form-control">
            <label htmlFor="listingId" className="label">
              <span className="label-text">Listing ID*</span>
            </label>
            <input
              id="listingId"
              type="text"
              name="listingId"
              value={formData.listingId !== undefined && formData.listingId !== null ? formData.listingId : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.listingId !== undefined && errors.listingId !== '' ? 'input-error' : ''}`}
            />
            {errors.listingId !== undefined && errors.listingId !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.listingId}</span>
              </label>
            )}
          </div>

          {/* MLS ID */}
          <div className="form-control">
            <label htmlFor="mlsId" className="label">
              <span className="label-text">MLS ID*</span>
            </label>
            <input
              id="mlsId"
              type="text"
              name="mlsId"
              value={formData.mlsId !== undefined && formData.mlsId !== null ? formData.mlsId : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.mlsId !== undefined && errors.mlsId !== '' ? 'input-error' : ''}`}
            />
            {errors.mlsId !== undefined && errors.mlsId !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.mlsId}</span>
              </label>
            )}
          </div>

          {/* Listing Status */}
          <div className="form-control">
            <label htmlFor="listingStatus" className="label">
              <span className="label-text">Status*</span>
            </label>
            <select
              id="listingStatus"
              name="listingStatus"
              value={formData.listingStatus ?? 'Active'}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>

          {/* List Price */}
          <div className="form-control">
            <label htmlFor="listPrice" className="label">
              <span className="label-text">List Price*</span>
            </label>
            <input
              id="listPrice"
              type="number"
              name="listPrice"
              value={formData.listPrice !== undefined && formData.listPrice !== null ? formData.listPrice : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.listPrice !== undefined && errors.listPrice !== '' ? 'input-error' : ''}`}
            />
            {errors.listPrice !== undefined && errors.listPrice !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.listPrice}</span>
              </label>
            )}
          </div>

          {/* Listing Date */}
          <div className="form-control">
            <label htmlFor="listingDate" className="label">
              <span className="label-text">Listing Date*</span>
            </label>
            <input
              type="date"
              name="listingDate"
              value={formData.listingDate !== undefined && formData.listingDate !== null ? formData.listingDate : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Property Type */}
          <div className="form-control">
            <label htmlFor="propertyType" className="label">
              <span className="label-text">Property Type*</span>
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType !== undefined && formData.propertyType !== null ? formData.propertyType : 'Single Family'}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description !== undefined && formData.description !== null ? formData.description : ''}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        <div className="divider">Property Details</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bedrooms */}
          <div className="form-control">
            <label htmlFor="bedrooms" className="label">
              <span className="label-text">Bedrooms</span>
            </label>
            <input
              id="bedrooms"
              type="number"
              name="bedrooms"
              value={formData.bedrooms !== undefined && formData.bedrooms !== null ? formData.bedrooms : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Bathrooms */}
          <div className="form-control">
            <label htmlFor="bathrooms" className="label">
              <span className="label-text">Bathrooms</span>
            </label>
            <input
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={formData.bathrooms !== undefined && formData.bathrooms !== null ? formData.bathrooms : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              step="0.5"
            />
          </div>

          {/* Square Feet */}
          <div className="form-control">
            <label htmlFor="squareFeet" className="label">
              <span className="label-text">Square Feet</span>
            </label>
            <input
              id="squareFeet"
              type="number"
              name="squareFeet"
              value={formData.squareFeet !== undefined && formData.squareFeet !== null ? formData.squareFeet : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Lot Size */}
          <div className="form-control">
            <label htmlFor="lotSize" className="label">
              <span className="label-text">Lot Size (acres)</span>
            </label>
            <input
              id="lotSize"
              type="number"
              name="lotSize"
              value={formData.lotSize !== undefined && formData.lotSize !== null ? formData.lotSize : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              step="0.01"
            />
          </div>

          {/* Year Built */}
          <div className="form-control">
            <label htmlFor="yearBuilt" className="label">
              <span className="label-text">Year Built</span>
            </label>
            <input
              id="yearBuilt"
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt !== undefined && formData.yearBuilt !== null ? formData.yearBuilt : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Parking */}
          <div className="form-control">
            <label htmlFor="parking" className="label">
              <span className="label-text">Parking</span>
            </label>
            <input
              id="parking"
              type="text"
              name="parking"
              value={formData.parking !== undefined && formData.parking !== null ? formData.parking : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., 2-Car Garage"
            />
          </div>

          {/* Heating */}
          <div className="form-control">
            <label htmlFor="heating" className="label">
              <span className="label-text">Heating</span>
            </label>
            <input
              id="heating"
              type="text"
              name="heating"
              value={formData.heating !== undefined && formData.heating !== null ? formData.heating : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Cooling */}
          <div className="form-control">
            <label htmlFor="cooling" className="label">
              <span className="label-text">Cooling</span>
            </label>
            <input
              id="cooling"
              type="text"
              name="cooling"
              value={formData.cooling !== undefined && formData.cooling !== null ? formData.cooling : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* HOA Fees */}
          <div className="form-control">
            <label htmlFor="hoaFees" className="label">
              <span className="label-text">HOA Fees ($/month)</span>
            </label>
            <input
              id="hoaFees"
              type="number"
              name="hoaFees"
              value={formData.hoaFees !== undefined && formData.hoaFees !== null ? formData.hoaFees : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="divider">Location</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street Address */}
          <div className="form-control">
            <label htmlFor="streetAddress" className="label">
              <span className="label-text">Street Address*</span>
            </label>
            <input
              id="streetAddress"
              type="text"
              name="streetAddress"
              value={formData.streetAddress !== undefined && formData.streetAddress !== null ? formData.streetAddress : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.streetAddress !== undefined && errors.streetAddress !== '' ? 'input-error' : ''}`}
            />
            {errors.streetAddress !== undefined && errors.streetAddress !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.streetAddress}</span>
              </label>
            )}
          </div>

          {/* City */}
          <div className="form-control">
            <label htmlFor="city" className="label">
              <span className="label-text">City*</span>
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city !== undefined && formData.city !== null ? formData.city : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.city !== undefined && errors.city !== '' ? 'input-error' : ''}`}
            />
            {errors.city !== undefined && errors.city !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.city}</span>
              </label>
            )}
          </div>

          {/* State */}
          <div className="form-control">
            <label htmlFor="state" className="label">
              <span className="label-text">State*</span>
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state !== undefined && formData.state !== null ? formData.state : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.state !== undefined && errors.state !== '' ? 'input-error' : ''}`}
            />
            {errors.state !== undefined && errors.state !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.state}</span>
              </label>
            )}
          </div>

          {/* Postal Code */}
          <div className="form-control">
            <label htmlFor="postalCode" className="label">
              <span className="label-text">Postal Code*</span>
            </label>
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode !== undefined && formData.postalCode !== null ? formData.postalCode : ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.postalCode !== undefined && errors.postalCode !== '' ? 'input-error' : ''}`}
            />
            {errors.postalCode !== undefined && errors.postalCode !== '' && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.postalCode}</span>
              </label>
            )}
          </div>

          {/* Country */}
          <div className="form-control">
            <label htmlFor="country" className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country !== undefined && formData.country !== null ? formData.country : 'USA'}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label htmlFor="latitude" className="label">
                <span className="label-text">Latitude</span>
              </label>
              <input
                id="latitude"
                type="number"
                name="latitude"
                value={formData.latitude !== undefined && formData.latitude !== null ? formData.latitude : ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="0.000001"
              />
            </div>
            <div className="form-control">
              <label htmlFor="longitude" className="label">
                <span className="label-text">Longitude</span>
              </label>
              <input
                id="longitude"
                type="number"
                name="longitude"
                value={formData.longitude !== undefined && formData.longitude !== null ? formData.longitude : ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="0.000001"
              />
            </div>
          </div>
        </div>

        <div className="divider">Agent Information</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Agent ID */}
          <div className="form-control">
            <label htmlFor="agentId" className="label">
              <span className="label-text">Agent ID</span>
            </label>
            <input
              id="agentId"
              type="text"
              name="agentId"
              value={formData.agentId !== undefined && formData.agentId !== null ? formData.agentId : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Name */}
          <div className="form-control">
            <label htmlFor="agentName" className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              id="agentName"
              type="text"
              name="agentName"
              value={formData.agentName !== undefined && formData.agentName !== null ? formData.agentName : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Phone */}
          <div className="form-control">
            <label htmlFor="agentPhone" className="label">
              <span className="label-text">Agent Phone</span>
            </label>
            <input
              id="agentPhone"
              type="text"
              name="agentPhone"
              value={formData.agentPhone !== undefined && formData.agentPhone !== null ? formData.agentPhone : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Email */}
          <div className="form-control">
            <label htmlFor="agentEmail" className="label">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              id="agentEmail"
              type="email"
              name="agentEmail"
              value={formData.agentEmail !== undefined && formData.agentEmail !== null ? formData.agentEmail : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Brokerage Name */}
          <div className="form-control">
            <label htmlFor="brokerageName" className="label">
              <span className="label-text">Brokerage Name</span>
            </label>
            <input
              id="brokerageName"
              type="text"
              name="brokerageName"
              value={formData.brokerageName !== undefined && formData.brokerageName !== null ? formData.brokerageName : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Brokerage Phone */}
          <div className="form-control">
            <label htmlFor="brokeragePhone" className="label">
              <span className="label-text">Brokerage Phone</span>
            </label>
            <input
              id="brokeragePhone"
              type="text"
              name="brokeragePhone"
              value={formData.brokeragePhone !== undefined && formData.brokeragePhone !== null ? formData.brokeragePhone : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="divider">Photos & Virtual Tour</div>

        <div className="grid grid-cols-1 gap-4">
          {/* Photo URLs */}
          <div className="form-control">
            <label htmlFor="photoUrls" className="label">
              <span className="label-text">Photo URLs (one per line)</span>
            </label>
            <textarea
              id="photoUrls"
              name="photoUrls"
              value={formData.photos !== undefined && formData.photos !== null ? formData.photos.join('\n') : ''}
              onChange={handlePhotoUrlsChange}
              className="textarea textarea-bordered h-24"
              placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
            />
          </div>

          {/* Virtual Tour URL */}
          <div className="form-control">
            <label htmlFor="virtualTourURL" className="label">
              <span className="label-text">Virtual Tour URL</span>
            </label>
            <input
              id="virtualTourURL"
              type="url"
              name="virtualTourURL"
              value={formData.virtualTourURL !== undefined && formData.virtualTourURL !== null ? formData.virtualTourURL : ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://example.com/virtual-tour"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialData.id !== undefined && initialData.id !== null && initialData.id !== '' ? 'Update Listing' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
