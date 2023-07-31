import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // Get the current pathname from useLocation hook
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <nav>
        <a className="logo" href="/">
          {/* <img src="./images/lgo.svg" />x */}
        </a>

        <div>
          <ul id="navbar" className="navbar">
            <li>
              <Link className={currentPath === "/" ? "active" : ""} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={currentPath === "/try" ? "active" : ""} to="/try">
                Stories
              </Link>
            </li>
            <li>
              <Link className={currentPath === "/abt" ? "active" : ""} to="/abt">
                About
              </Link>
            </li>
            <Link className="log" to="/land">
              Login
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
