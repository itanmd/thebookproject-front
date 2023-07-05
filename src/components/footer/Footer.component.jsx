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
        <footer className="container-fluid mt-4 py-5 bg-black text-light custom-footer">
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
                  <NavLink className="nav-link" to={encodeURI("/Our Books")}>
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
              <div className="h3">שעות פתיחה</div>
              <ul>
                <li>
                  <span className="ms-2 fw-bold">ראשון - חמישי:</span>{" "}
                  10:00-22:00
                </li>
                <li>
                  <span className="ms-2 fw-bold">שישי:</span> 10:00-15:00
                </li>
                <li>
                  <span className="ms-2 fw-bold">שבת:</span> 20:00-24:00
                </li>
              </ul>
              <div className="mt-1">
                <div className="h3">דרכים ליצירת קשר</div>
                <ul>
                  <li>
                    <a href="tel:+972586889499" target="_blank">
                      באמצעות הטלפון 058-6889499
                    </a>
                  </li>
                  <li>
                    <a href="mailto:mosheduek.dev@gmail.com" target="_blank">
                      במייל mosheduek.dev@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-1">
                <div className="h3">נווט אלינו</div>
                <a href="https://goo.gl/maps/rU2ATcfGTf152o2V7" target="_blank">
                  <FontAwesomeIcon icon={faLocationArrow} /> אשתאול 14 חולון
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
