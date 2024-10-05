import React from 'react'

function Footer() {
  return (
  <footer className="bg-secondary-dark p-4">
    <div className="container mx-auto text-center">
      <p className="text-text-light">© 2024 Movie Trailer App. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="/about" className="text-text-light">About Us</a>
        <a href="/contact" className="text-text-light">Contact</a>
        <a href="/privacy" className="text-text-light">Privacy Policy</a>
      </div>
    </div>
</footer>

  )
}

export default Footer