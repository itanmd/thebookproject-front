import "./footer.css";
import { faLocationArrow, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import GoogleLogIn from "../googleLogIn/GoogleLogIn.component";
import ContactUsForm from "../contactUsForm/ContactUsForm.component";

const Footer = () => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const adminLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Fragment>
      {!location.pathname.includes("admin") && (
        <footer className="container-fluid mt-4 py-5 bg-light text-dark custom-footer">
          <div className="row row-cols-1 row-cols-lg-3 g-3">
            <div className="col">
              <ul className="nav flex-column pe-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/home")}>
                    home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/about-us")}>
                    about-us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/our-books")}>
                    our-books
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/contact-us")}>
                    contact-us
                  </NavLink>
                </li>
                {loggedIn ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={encodeURI("/Favorites")}>
                      Favorites
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <GoogleLogIn />
                  </li>
                )}
                {adminLoggedIn && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/admin/dashboard"}>
                      <FontAwesomeIcon icon={faUser} /> Admin
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="col">
              <div className="mt-1">
                <div className="h3">Contact Information</div>
                <ul>
                  <li>
                    <a href="tel:+972503322459" target="_blank">
                      <FontAwesomeIcon icon="fa-sharp fa-solid fa-location-dot" />
                      (+972)50-3322459{" "}
                    </a>
                  </li>
                  <li>
                    <a href="mailto:mosheduek.dev@gmail.com" target="_blank">
                      itan.dvir.eng@gmail.com{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-1">
                <div className="h3">Office</div>
                <FontAwesomeIcon icon={faLocationArrow} />
                <a href="https://goo.gl/maps/f1aTLfECtdWci8G39" target="_blank">
                  Ramat-Gan, Klausner
                </a>
              </div>
            </div>
            <div className="col">
              <div className="h3">Contact us</div>
              <ContactUsForm />
            </div>
          </div>
        </footer>
      )}
    </Fragment>
  );
};

export default Footer;
