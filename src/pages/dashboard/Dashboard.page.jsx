import "./dashboard.css";
import { Fragment } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AdminBooks from "../../components/adminBooks/AdminBooks.component";
import AdminLeads from "../../components/adminLeads/AdminLeads.component";
import AdminMessages from "../../components/adminMessages/AdminMessages.component";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import UpdateAdminDetails from "../../components/updateAdmindetails/UpdateAdminDetails.component";

const DashboardNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("admin-token");
    dispatch(authActions.logout());
    navigate("/home");
  };
  useEffect(() => {
    axios
      .get("/messages/unread-amount")
      .then(({ data }) => {
        setAmount(data.amount);
      })
      .catch(() => {});
  }, []);
  const messageRead = () => {
    let num = amount;
    if (num !== 0) {
      setAmount(num - 1);
    }
  };

  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid custom-nav-container">
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
                <NavLink className="nav-link" to="/admin/dashboard/books">
                  Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard/leads">
                  Leads
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard/messages">
                  Messages{" "}
                  {amount && (
                    <span className="bg-secondary p-1 rounded me-1 text-light">
                      {amount}
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/admin/dashboard/private-details"
                >
                  Personal Information
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  HomePage
                </NavLink>
              </li>
            </ul>
            <button
              onClick={handleLogOut}
              className="btn btn-outline-danger"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="py-5">
        {location.pathname.includes("books") && <AdminBooks />}
        {location.pathname.includes("leads") && <AdminLeads />}
        {location.pathname.includes("messages") && (
          <AdminMessages onMessageRead={messageRead} />
        )}
        {location.pathname.includes("private-details") && (
          <UpdateAdminDetails />
        )}
        {location.pathname === "/admin/dashboard" && (
          <div className="container">
            <h1 className="text-center">Welcome to your admin dashboard</h1>
            <p>Here you can manage your website</p>
            <ul>
              <li>Add your books list and update books </li>
              <li>Manage your leads</li>
              <li>
                Viewing messages left by customers and responding to emails
              </li>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default DashboardNavBar;
