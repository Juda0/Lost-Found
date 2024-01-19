import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../../assets/Logo.svg';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Effect to add click event listener when the component mounts
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the menu container
      if (menuOpen && !document.querySelector('.menu-container').contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    // Check if the user is logged in on component mount
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken); // Set to true if authToken exists, false otherwise
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Add any logout logic you need
    // For example, clear the authentication token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className={`menu-container ${menuOpen ? 'menu-open' : ''}`}>
        {/* burger menu */}
        <input
          type="checkbox"
          aria-label="Toggle menu"
          data-cy="hamburger"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <span></span>
        <span></span>
        <span></span>

        {/* logo */}
        <NavLink to="/" className="menu-logo">
          <img data-cy="logo" src={logo} alt="Lost&Found" />
        </NavLink>

        {/* menu items */}
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/" data-cy="lostandfound" className="no-active-color" onClick={closeMenu}>
                <b>LostAndFound</b>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/find" data-cy="find" onClick={closeMenu}>
                Find
              </NavLink>
            </li>
            <li>
              <NavLink to="/claims" data-cy="claims" onClick={closeMenu}>
                Claims
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts" data-cy="posts" onClick={closeMenu}>
                Posts
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/" data-cy="logout" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <NavLink to="/login" data-cy="login" onClick={closeMenu}>
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
