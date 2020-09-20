import React from "react";
import { NavLink } from "react-router-dom";

import "./TopNavbar.css";

export default function TopNavbar(props) {
  function openMobileNavbar(e) {
    e.target.parentElement.parentElement.classList.add("opened");
    e.target.setAttribute("aria-label", "Close navigation menu");
    e.stopPropagation();
  }

  function closeMobileNavbar(e) {
    e.target.parentElement.parentElement.classList.remove("opened");
    e.target.setAttribute("aria-label", "Open navigation menu");
  }

  function handleClick(e) {
    console.log(typeof e.target);
    if (e.target.classList.contains("navbar-toggle")) {
      if (e.target.parentElement.parentElement.classList.contains("opened")) {
        closeMobileNavbar(e);
      } else {
        openMobileNavbar(e);
      }
    } else {
      if (
        e.target.parentElement.parentElement.parentElement.classList.contains(
          "opened"
        )
      ) {
        e.target.parentElement.parentElement.parentElement.classList.remove(
          "opened"
        );
        e.target.parentElement.setAttribute(
          "aria-label",
          "Open navigation menu"
        );
      } else {
        e.target.parentElement.parentElement.parentElement.classList.add(
          "opened"
        );
        e.target.parentElement.setAttribute(
          "aria-label",
          "Close navigation menu"
        );
        console.log(
          e.target.parentElement.parentElement.parentElement.className
        );
      }
    }
  }
  return (
    <header id="navbar">
      <nav className="navbar-container container">
        <NavLink className="icon-home" to="/">
          <span className="link-text">Home</span>
        </NavLink>
        <button
          type="button"
          className="navbar-toggle"
          aria-label="Open navigation menu"
          onClick={handleClick}
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li>
              <NavLink to="/Animals">
                <span className="link-text span-a">Animals</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Events">
                <span className="link-text span-e">Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Chat">
                <span className="link-text span-c">Chat</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Organizations">
                <span className="link-text span-o">Organizations</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
