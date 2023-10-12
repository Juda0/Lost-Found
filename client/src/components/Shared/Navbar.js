import "../../css/Navbar.css"
import logo from "../../assets/logo.svg"
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';

function Navbar() {
  return <>
    <nav className="menu-container">
  {/* burger menu */}
  <input type="checkbox" aria-label="Toggle menu" />
  <span></span>
  <span></span>
  <span></span>

  {/* logo */}
  <NavLink to="/" className="menu-logo">
    <img src={logo} alt="Lost&Found"/>
  </NavLink>

  {/* menu items */}
  <div className="menu">
    <ul>
      <li>
        <NavLink to="/" className="no-active-color">
          <b>LostAndFound</b>
        </NavLink>
      </li>
    </ul>
    <ul>
      <li>
        <NavLink to="/find">
          Find
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts">
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

  </>
}

export default Navbar