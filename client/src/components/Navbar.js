import "../css/Navbar.css"
import logo from "../assets/logo.svg"

function Navbar() {
  return <>
    <nav class="menu-container">
  {/* burger menu */}
  <input type="checkbox" aria-label="Toggle menu" />
  <span></span>
  <span></span>
  <span></span>

  {/* logo */}
  <a href="#/" class="menu-logo">
    <img src={logo} alt="Lost&Found"/>
  </a>

  {/* menu items */}
  <div class="menu">
    <ul>
      <li>
        <a href="#/">
          <b>LostAndFound</b>
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#find">
          Find
        </a>
      </li>
      <li>
        <a href="#posts">
          Posts
        </a>
      </li>
      <li>
        <a href="#posts">
          Account
        </a>
      </li>
    </ul>
  </div>
</nav>

  </>
}

export default Navbar