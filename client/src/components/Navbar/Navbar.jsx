import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"


function Navbar () {
  const [active, setActive] = useState("navMenu");
  const [icon, setIcon] = useState("navToggler");
  const navToggle = () => {
    if (active === "navMenu") {
      setActive("navMenu navActive");
    } else setActive("navMenu");

    // Icon Toggler
    if (icon === "navToggler") {
      setIcon("navToggler toggle");
    } else setIcon("navToggler");
  };
  return (
    <nav className="nav">
      <a href="#" className="navBrand">
        <Link to="/">RefreshR</Link>
      </a>
      <ul className={active}>
        <li className="navItem">
          <a href="#" className="navLink">
            <Link to="/login">Log in</Link>
          </a>
        </li>
        <li className="navItem">
          <a href="#" className="navLink">
            <Link to="/register">Register</Link>
          </a>
        </li>
        <li className="navItem">
          <a href="#" className="navLink">
            Cart
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
