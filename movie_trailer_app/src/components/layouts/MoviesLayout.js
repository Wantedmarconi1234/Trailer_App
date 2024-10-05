import React from 'react'
import Navbar from '../pages/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'

function MoviesLayout() {
  return (
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default MoviesLayout