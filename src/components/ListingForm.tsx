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
  const [photoUrls, setPhotoUrls] = useState<string>(
    (formData.photos != null) ? formData.photos.join('\n') : ''
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handlePhotoUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoUrls(e.target.value);
    const urls = e.target.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url !== '');

    setFormData({
      ...formData,
      photos: urls
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.listingId) newErrors.listingId = 'Listing ID is required';
    if (!formData.mlsId) newErrors.mlsId = 'MLS ID is required';
    if (!formData.listPrice) newErrors.listPrice = 'List price is required';
    if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

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
        {initialData.id ? 'Edit Listing' : 'Add New Listing'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="divider">Basic Information</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Listing ID */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Listing ID*</span>
            </label>
            <input
              type="text"
              name="listingId"
              value={formData.listingId || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.listingId ? 'input-error' : ''}`}
            />
            {errors.listingId && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.listingId}</span>
              </label>
            )}
          </div>

          {/* MLS ID */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">MLS ID*</span>
            </label>
            <input
              type="text"
              name="mlsId"
              value={formData.mlsId || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.mlsId ? 'input-error' : ''}`}
            />
            {errors.mlsId && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.mlsId}</span>
              </label>
            )}
          </div>

          {/* Listing Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status*</span>
            </label>
            <select
              name="listingStatus"
              value={formData.listingStatus || 'Active'}
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
            <label className="label">
              <span className="label-text">List Price*</span>
            </label>
            <input
              type="number"
              name="listPrice"
              value={formData.listPrice || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.listPrice ? 'input-error' : ''}`}
            />
            {errors.listPrice && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.listPrice}</span>
              </label>
            )}
          </div>

          {/* Listing Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Listing Date*</span>
            </label>
            <input
              type="date"
              name="listingDate"
              value={formData.listingDate || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Property Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Type*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType || 'Single Family'}
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
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        <div className="divider">Property Details</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bedrooms */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bedrooms</span>
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Bathrooms */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bathrooms</span>
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              step="0.5"
            />
          </div>

          {/* Square Feet */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Square Feet</span>
            </label>
            <input
              type="number"
              name="squareFeet"
              value={formData.squareFeet || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Lot Size */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Lot Size (acres)</span>
            </label>
            <input
              type="number"
              name="lotSize"
              value={formData.lotSize || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              step="0.01"
            />
          </div>

          {/* Year Built */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Year Built</span>
            </label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Parking */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parking</span>
            </label>
            <input
              type="text"
              name="parking"
              value={formData.parking || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., 2-Car Garage"
            />
          </div>

          {/* Heating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Heating</span>
            </label>
            <input
              type="text"
              name="heating"
              value={formData.heating || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., Central"
            />
          </div>

          {/* Cooling */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cooling</span>
            </label>
            <input
              type="text"
              name="cooling"
              value={formData.cooling || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., Central AC"
            />
          </div>

          {/* HOA Fees */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">HOA Fees ($/month)</span>
            </label>
            <input
              type="number"
              name="hoaFees"
              value={formData.hoaFees || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="divider">Location</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Street Address*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.streetAddress ? 'input-error' : ''}`}
            />
            {errors.streetAddress && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.streetAddress}</span>
              </label>
            )}
          </div>

          {/* City */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">City*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.city ? 'input-error' : ''}`}
            />
            {errors.city && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.city}</span>
              </label>
            )}
          </div>

          {/* State */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">State*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.state ? 'input-error' : ''}`}
            />
            {errors.state && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.state}</span>
              </label>
            )}
          </div>

          {/* Postal Code */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Postal Code*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.postalCode ? 'input-error' : ''}`}
            />
            {errors.postalCode && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.postalCode}</span>
              </label>
            )}
          </div>

          {/* Country */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country || 'USA'}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Latitude</span>
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude || ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="0.0001"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Longitude</span>
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude || ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="0.0001"
              />
            </div>
          </div>
        </div>

        <div className="divider">Agent Information</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agent ID */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent ID</span>
            </label>
            <input
              type="text"
              name="agentId"
              value={formData.agentId || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Phone</span>
            </label>
            <input
              type="text"
              name="agentPhone"
              value={formData.agentPhone || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Agent Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="email"
              name="agentEmail"
              value={formData.agentEmail || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Brokerage Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Brokerage Name</span>
            </label>
            <input
              type="text"
              name="brokerageName"
              value={formData.brokerageName || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Brokerage Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Brokerage Phone</span>
            </label>
            <input
              type="text"
              name="brokeragePhone"
              value={formData.brokeragePhone || ''}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="divider">Media</div>

        {/* Photo URLs */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URLs (one per line)</span>
          </label>
          <textarea
            value={photoUrls}
            onChange={handlePhotoUrlsChange}
            className="textarea textarea-bordered h-24"
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          ></textarea>
        </div>

        {/* Virtual Tour URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Virtual Tour URL</span>
          </label>
          <input
            type="url"
            name="virtualTourURL"
            value={formData.virtualTourURL || ''}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData.id ? 'Update Listing' : 'Add Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
