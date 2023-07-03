import "./dashboard.css";
import { Fragment } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const DashboardNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("admin-token");
    dispatch(authActions.logout());
    navigate("/Home");
  };

  return (
    <Fragment>
      <div className="pt-4">
        <ul className="nav nav-tabs">
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
             
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard/private-details">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              HomePage
            </NavLink>
          </li>
          <button
            onClick={handleLogOut}
            className="btn btn-outline-danger me-auto ms-1 mb-1"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
          </button>
        </ul>
      </div>
      <div className="py-4">
       
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
