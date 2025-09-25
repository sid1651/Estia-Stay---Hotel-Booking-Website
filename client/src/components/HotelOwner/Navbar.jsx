import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img src="./logo-no-bg.png" alt="Logo" />
      </Link>
      <div className="navbar-actions">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
