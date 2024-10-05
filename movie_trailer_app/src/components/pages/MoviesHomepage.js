import React, { useEffect, useState } from 'react';
import FeaturedMovies from './FeaturedMovies';
import UpcomingMovies from './UpcomingMovies';
import TopRatedMovies from './TopRatedMovies';
import SearchMovies from './SearchBar';

function MoviesHomepage() {
  const [trailerKey, setTrailerKey] = useState(null);
  const movieId = 533535; // Change this to the movie ID you want the trailer for (e.g., "Fight Club" = 550)



  // Fetching the trailer for the hero section
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div className="movies-homepage  text-white">
      {/* search input */}
       <SearchMovies />
      {/* Hero Section */}
      <div className="hero-section h-screen w-full bg-black ">
        {trailerKey ? (
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&mute=1&loop=1&playlist=${trailerKey}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="text-white flex justify-center items-center h-full">
            Loading Trailer...
          </div>
        )}
      </div>

      {/* Featured Movies Section */}
      <div className="section-container my-10 px-6 md:px-20">
        <h2 className="section-title text-2xl font-bold mb-5 text-center"><h1>Featured Movies</h1></h2>
        <FeaturedMovies />
      </div>

      {/* Upcoming Movies Section */}
      <div className="section-container my-10 px-6 md:px-20">
        <h2 className="section-title text-2xl font-bold my-5 text-center"><h1>Upcoming Movies</h1></h2>
        <UpcomingMovies />
      </div>

      {/* Top Rated Movies Section */}
      <div className="section-container my-20 px-6 md:px-20">
        <h2 className="section-title text-2xl font-bold my-5 text-center"><h1>Top Rated Movies</h1></h2>
        <TopRatedMovies />
      </div>
    </div>
  );
}

export default MoviesHomepage;
