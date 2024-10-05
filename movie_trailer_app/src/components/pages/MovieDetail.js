import { useLoaderData } from 'react-router-dom';
import MovieTrailer from './MovieTrailer';
import { useState, useEffect } from 'react';

// loader function to fetch a single movie
export const fetchSingleMovie = async ({ params }) => {
  const { id } = params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching the movie:", error);
    throw error;
  }
};

function MovieDetail() {
  const singleMovie = useLoaderData();
  const [loading, setLoading] = useState(true);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (singleMovie) {
      setLoading(false);
    }
  }, [singleMovie]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  console.log(singleMovie)
  return (
    <div className="bg-black">
      {/* Movie Details Section */}
      <div className="lg:h-screen flex flex-col lg:flex-row items-center p-6 lg:p-10">
        {/* Poster */}
        <div className="lg:ml-20 w-full lg:w-auto flex justify-center lg:justify-start mb-6 lg:mb-0">
          {singleMovie && (
            <img  src={`${imageBaseUrl}${singleMovie.poster_path}`}
              alt={`Poster of ${singleMovie?.title}`}
              className="rounded-md h-[400px] max-w-[250px] lg:h-[500px] lg:max-w-[350px]"
            />
          )}
        </div>

        {/* Movie Details */}
        <div className="grid gap-8 lg:gap-[6rem] text-white mx-6 lg:mx-20 w-full">
          {/* Title and Genres */}
          <div>
            <h1 className='text-3xl font-bold py-5'>{singleMovie?.release_date}</h1>
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">{singleMovie?.title}</h1>
            {/* tagline */}
            <p className='pb-5 italic font-semibold text-highlight-orange'>{singleMovie?.tagline}</p>
            <div className="flex flex-wrap">
              {singleMovie?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="mr-2 mb-2 text-[12px] lg:text-sm font-semibold bg-blue-800 p-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          {/* Overview */}
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-sm lg:text-base leading-relaxed">{singleMovie?.overview}</p>
            {singleMovie?.homepage && (
              <a
                href={singleMovie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 mt-4 inline-block text-sm underline font-semibold"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Movie Trailer */}
      <div className="p-6">
        <MovieTrailer />
      </div>
    </div>
  );
}

export default MovieDetail;
