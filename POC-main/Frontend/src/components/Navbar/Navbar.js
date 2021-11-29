import React, { Component } from "react";
import { Link } from "react-router-dom";
import logout from "../../api/logout";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark mb-3">
        <br />

        <Link to="/register">CREATE-USER </Link>
        {/* <button className="navbar-brand" >
            CREATE-USER{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </button> */}

        <button onClick={logout}>LOGOUT </button>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
