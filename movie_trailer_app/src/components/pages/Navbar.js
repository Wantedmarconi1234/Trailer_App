import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import movieLogo from "../images/play-button.png";

function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  // Close the menu when clicking outside of it (for mobile screens)
  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (openNav && !e.target.closest('.navbar')) {
        setOpenNav(false);
      }
    };
    document.addEventListener('click', closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, [openNav]);

  const handleNavToggle = () => {
    setOpenNav((prevToggle) => !prevToggle);
  };

  return (
    <div className="navbar bg-background-slate h-24 flex justify-between items-center px-4 sm:px-20 relative z-10">
      <Link to="/movies-app" className="font-bold text-xl sm:text-3xl text-accent-cyan">
        <img src={movieLogo} alt="Movie Logo" className="h-10 w-10" />
      </Link>

      {/* Navbar Links */}
      <div
        className={`
          ${openNav ? 'top-24' : '-top-[400px]'}
          absolute right-0 w-full bg-slate-800 text-white duration-700 text-center font-bold flex flex-col items-center space-y-4 py-4 
          sm:space-y-0 sm:flex-row sm:static sm:top-0 sm:bg-transparent sm:w-auto
        `}
      >
        {/* Close button for small screens */}
        <AiOutlineClose
          className="text-2xl sm:hidden absolute right-7 top-5 cursor-pointer"
          onClick={handleNavToggle}
          aria-label="Close navigation"
        />

        {/* Absolute route paths */}
        <NavLink
          to='.'
          end
          className={({ isActive }) =>
            isActive
              ? "underline decoration-4 text-highlight-yellow transition mx-4"
              : "text-text-white hover:underline hover:decoration-2 hover:text-highlight-orange transition mx-4"
          }
          onClick={handleNavToggle}
        >
          <h1>Home</h1>
        </NavLink>

        <NavLink
          to="all-featured-movies"
          className={({ isActive }) =>
            isActive
              ? "underline decoration-4 text-highlight-orange transition mx-4"
              : "text-text-white hover:underline hover:decoration-2 hover:text-highlight-orange transition mx-4"
          }
          onClick={handleNavToggle}
        >
          <h1>Featured</h1>
        </NavLink>

        <NavLink
          to="all-upcoming-movies"
          className={({ isActive }) =>
            isActive
              ? "underline decoration-4 text-highlight-orange transition mx-4"
              : "text-text-white hover:underline hover:decoration-2 hover:text-highlight-orange transition mx-4"
          }
          onClick={handleNavToggle}
        >
          <h1>Upcoming</h1>
        </NavLink>

        <NavLink
          to="all-top-rated-movies"
          className={({ isActive }) =>
            isActive
              ? "underline decoration-4 text-highlight-orange transition mx-4"
              : "text-text-white hover:underline hover:decoration-2 hover:text-highlight-orange transition mx-4"
          }
          onClick={handleNavToggle}
        >
          <h1>Top-rated</h1>
        </NavLink>
      </div>

      {/* Hamburger Menu Icon (visible on small screens) */}
      <FaBars
        className="text-2xl text-white sm:hidden cursor-pointer"
        onClick={handleNavToggle}
        aria-label="Open navigation"
      />
    </div>
  );
}

export default Navbar;
