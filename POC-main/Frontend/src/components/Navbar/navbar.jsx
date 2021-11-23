import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3">
          <br />

          <Link to="/register">
            CREATE-USER{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </Link>
          {/* <button className="navbar-brand" >
            CREATE-USER{" "}
            <span className="badge badge-secondary">
              {this.props.totalItems}
            </span>
          </button> */}
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
