import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function MovieTrailer() {
    const {id} = useParams() //params to change movie id 
  const [trailerKey, setTrailerKey] = useState(null);

  // Fetching the trailer for the hero section
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
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
  }, [id]);

  return (
    <div className="hero-section h-screen w-full bg-black ">
    {trailerKey ? (
        <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerKey}?controls=1&loop=0&playlist=${trailerKey}`}
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
  );
}

export default MovieTrailer;
