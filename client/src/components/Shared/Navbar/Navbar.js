import "./Navbar.css"
import logo from "../../../assets/Logo.svg"
import { NavLink } from 'react-router-dom'
import React from 'react';

function Navbar() {
  return <>
    <nav className="menu-container">
  {/* burger menu */}
  <input type="checkbox" aria-label="Toggle menu" data-cy="hamburger" />
  <span></span>
  <span></span>
  <span></span>

  {/* logo */}
  <NavLink to="/" data-cy="logo" className="menu-logo">
    <img src={logo} alt="Lost&Found"/>
  </NavLink>

  {/* menu items */}
  <div className="menu">
    <ul>
      <li>
        <NavLink to="/" data-cy="lostandfound" className="no-active-color">
          <b>LostAndFound</b>
        </NavLink>
      </li>
    </ul>
    <ul>
      <li>
        <NavLink to="/find" data-cy="find">
          Find
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts" data-cy="posts">
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" data-cy="login">
          Login
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

  </>
}

export default Navbar