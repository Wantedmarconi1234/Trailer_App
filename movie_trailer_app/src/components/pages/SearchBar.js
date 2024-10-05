import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchMovies', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return;
      
      // Debugging - Log the API call
      console.log('Fetching movies for search term:', searchTerm);
      
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      // Debugging - Log the response data
      console.log('Fetched data:', data);
      
      return data;
    },
    enabled: !!searchTerm, // Runs query only when searchTerm is not empty
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    
    // Debugging - Log the search term
    console.log('Setting search term:', query);
    
    setSearchTerm(query);
  };

  const handleCloseSearch = () => {
    setSearchTerm('');
    setQuery(''); // Reset search term
  };

  return (
    <div className="search-component p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center">
        <input
          type="text"
          className="p-2 border rounded-t-md sm:rounded-l-md sm:rounded-t-none flex-grow text-black font-bold"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none mt-2 sm:mt-0"
        >
          Search
        </button>
      </form>

      {/* Loading and Error States */}
      {isLoading && <div className="text-center text-white mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500 mt-4">Error fetching data: {error.message}</div>} {/* Show actual error */}

      {/* Search Results */}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {data.results.length === 0 ? (
            <div className="text-center text-white col-span-full">
              No results found.
            </div>
          ) : (
            data.results.map((movie) => (
              <Link
                onClick={handleCloseSearch}
                to={`/movies-app/${movie.id}`}
                key={movie.id}
                className="movie-item p-2 bg-slate-700 rounded-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-md"
                />
                <h3 className="text-white mt-2 text-center font-bold"><h1>{movie.title}</h1></h3>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
