import type React from 'react';
import { useState } from 'react';

interface SearchCriteria {
  city: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  propertyType: string;
}

interface ListingSearchProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const ListingSearch: React.FC<ListingSearchProps> = ({ onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    city: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    propertyType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Search criteria submitted:', criteria);
    onSearch(criteria);
  };

  const handleReset = (): void => {
    const resetCriteria = {
      city: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      propertyType: ''
    };
    setCriteria(resetCriteria);
    onSearch(resetCriteria);
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Search Properties</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* City */}
          <div className="form-control">
            <label className="label" htmlFor="city-input">
              <span className="label-text">City</span>
            </label>
            <input
              id="city-input"
              type="text"
              name="city"
              value={criteria.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="input input-bordered w-full"
            />
          </div>

          {/* Min Price */}
          <div className="form-control">
            <label className="label" htmlFor="min-price-select">
              <span className="label-text">Min Price</span>
            </label>
            <select
              id="min-price-select"
              name="minPrice"
              value={criteria.minPrice}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>

          {/* Max Price */}
          <div className="form-control">
            <label className="label" htmlFor="max-price-select">
              <span className="label-text">Max Price</span>
            </label>
            <select
              id="max-price-select"
              name="maxPrice"
              value={criteria.maxPrice}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
              <option value="750000">$750,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="1500000">$1,500,000</option>
              <option value="2000000">$2,000,000+</option>
            </select>
          </div>

          {/* Min Bedrooms */}
          <div className="form-control">
            <label className="label" htmlFor="bedrooms-select">
              <span className="label-text">Bedrooms</span>
            </label>
            <select
              id="bedrooms-select"
              name="minBedrooms"
              value={criteria.minBedrooms}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="form-control">
            <label className="label" htmlFor="property-type-select">
              <span className="label-text">Property Type</span>
            </label>
            <select
              id="property-type-select"
              name="propertyType"
              value={criteria.propertyType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Any</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline"
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingSearch;
