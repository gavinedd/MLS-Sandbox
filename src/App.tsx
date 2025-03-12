import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen flex-col justify-center gap-2 p-6 text-center">
      <h5 className="sm:text-5xl">Welcome to Mock MLS</h5>
      <p className="sm:text-2xl">
        A Multiple Listing Service for real estate properties.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-5">
        <Link to="/listings">
          <button className="text-md btn-primary btn w-full">
            View Listings
          </button>
        </Link>
        <Link to="/theme">
          <button className="text-md btn-secondary btn w-full">
            Theme Settings
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
