import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom" id="main-navbar">
      <div className="container">
        <NavLink className="navbar-brand text-white text-decoration-none" to="/">
          <span className="brand-icon">
            <i className="bi bi-people-fill"></i>
          </span>
          Employee Dashboard
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? 'active' : ''}`
                }
                to="/"
                end
                id="nav-home"
              >
                <i className="bi bi-house-door-fill me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? 'active' : ''}`
                }
                to="/employee"
                id="nav-employee-form"
              >
                <i className="bi bi-person-plus-fill me-1"></i> Employee Form
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
