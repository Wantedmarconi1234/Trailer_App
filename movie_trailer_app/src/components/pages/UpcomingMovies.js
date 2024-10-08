import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CiCircleMore } from "react-icons/ci";

function UpcomingMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.json();
    },
    staleTime: 60000,      // Data will be considered fresh for 1 minute
    cacheTime: 300000,     // Cache will be kept for 5 minutes after unused
  });

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; //base url for images

  if (isLoading) return <div>Loading Upcoming Movies...</div>; //checking for loading data
  if (error) return <div>Error fetching upcoming movies</div>; // checking for loading data

  return (
    <section className="min-h-[400px] my-5">
      {/* icon to view more upcoming movies */}
      <Link to="all-upcoming-movies" className="flex justify-end mx-[10px] sm:mx-24">
        <CiCircleMore className='hover:text-highlight-orange font-bold text-2xl  mb-4'/>
      </Link>
      <div className="flex items-center overflow-x-scroll sm:mx-20 mx-5">
        {data?.results.map((movie) => (
          <div 
          key={movie.id} 
          className="rounded-md m-2 min-w-[150px] sm:min-w-[200px] object-cover object-center min-h-[200px] bg-slate-500"
        >
          <Link to={`${movie.id}`}>
            <img
              src={`${imageBaseUrl}${movie.backdrop_path}`}
              className="h-[150px] sm:h-[250px] w-full object-cover rounded-md"
              alt={movie.title}
            />
          </Link>
          <p className="text-center text-gray-300 mt-2 font-bold text-sm sm:text-base">
            {movie.title}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingMovies;
