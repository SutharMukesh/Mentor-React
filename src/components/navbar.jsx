import React from "react";
import { Link } from "react-router-dom";

// Stateless Functional component
const NavBar = props => {
  return (
    <React.Fragment>
      <nav className="navbar d-flex justify-content-between navbar-dark bg-dark">
        <Link to={"/"}>
          <a className="ml-3 navbar-brand">Admin Panel</a>
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
