import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

function FeaturedMovies() {
const [data, setData] = useState()
const [pageCount, setPageCount] = useState(1)

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect( () => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${pageCount}`); 
            const responseData = await response.json()
            setData(responseData)
        } catch (error) {
            console.log("There was an error", error)
        }
    }
    fetchData()
  },[pageCount])

  const decreaseCount = () => {
    setPageCount( prevCount => prevCount - 1)
  }

  const addCount = () => {
    setPageCount( prevCount => prevCount + 1)
  }

  
  return (
    <section className="h-full my-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {data && data.results.map((movie) => (
          <div key={movie.id} className="rounded-md m-5 sm:max-w-[300px] min-h-[250px] bg-slate-500">
            <Link to={`/movies-app/${movie.id}`}>
              <img
                src={`${imageBaseUrl}${movie.backdrop_path}`}
                className="h-[250px] w-full rounded-md"
                alt={movie.title}
              />
            </Link>
            <p className="text-center text-gray-300 mt-2 font-bold">{movie.title}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center cursor-pointer'>
        <FaAnglesLeft  className={`${pageCount === 1 ? "hidden" : "block"} text-white hover:text-highlight-yellow mx-2 text-2xl`} onClick={decreaseCount}/>
        <h1 className='grid place-content-center font-bold bg-violet-950 rounded-full w-[40px] h-[40px] text-[#ffff]'>{pageCount}</h1>
        <FaAnglesRight className='mx-2 text-2xl text-white hover:text-highlight-yellow'onClick={addCount}/>
      </div>
    </section>
  );
}

export default FeaturedMovies;
