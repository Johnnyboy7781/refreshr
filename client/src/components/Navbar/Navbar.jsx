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
        <Link to="/"><h2 className="navBrand">RefreshR</h2></Link>
      <ul className={active}>
        <li className="navItem">
            <Link to="/login"><h4 className="navLink">Log in</h4></Link>
        </li>
        <li className="navItem">
            <Link to="/register"><h4 className="navLink">Register</h4></Link>
        </li>
        <li className="navItem">
            <Link to="cart"><h4 className="navLink">Cart</h4></Link>
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
