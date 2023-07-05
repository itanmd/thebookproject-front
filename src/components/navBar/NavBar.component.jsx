import "./navbar.css";
import { Fragment } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleLogIn from "../googleLogIn/GoogleLogIn.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const adminLoggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (
      window.innerWidth < 990 &&
      document.getElementById("navbarNav") &&
      document.getElementById("navbarNav").className.includes("show")
    ) {
      document.getElementById("navbar-button").click();
    }
  }, [location]);

  return (
    <Fragment>
      {!location.pathname.includes("admin") && (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid custom-nav-container">
            <Link className="navbar-brand" to="/home">
              <h3 className="m-0">THE BOOK PROJECT</h3>
            </Link>
            <button
              className="navbar-toggler py-2"
              id="navbar-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon nav-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/home")}>
                    home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/about-us")}>
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/our-books")}>
                    Our Books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/contact-us")}>
                    Contact Us
                  </NavLink>
                </li>
                {loggedIn ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={encodeURI("/favorites")}>
                      favorites
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <GoogleLogIn />
                  </li>
                )}
                {adminLoggedIn && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/admin"}>
                      <FontAwesomeIcon icon={faUser} /> admin
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default NavBar;
