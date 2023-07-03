import { useState } from "react";
import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import Joi from "joi-browser";
import recoveryPasswordSchema from "../../validation/recoveryPassword.validation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RecoveryPassword = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (ev) => {
    setData({ ...data, confirmPassword: ev.target.value });
  };

  const handlePasswordChange = (ev) => {
    setData({ ...data, password: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (data.password === data.confirmPassword) {
      const { error } = Joi.validate(data, recoveryPasswordSchema, {
        abortEarly: false,
      });
      if (error) {
        toast.error(
          "A password must be valid (minimum of 8 characters, including at least one uppercase letter and numbers)"
        );
      } else {
        axios
          .post(`/admin/${location.pathname}`, { password: data.password })
          .then(() => {
            toast.success("The password has been changed successfully");
            setTimeout(() => {
              navigate("/admin");
            }, 2000);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      }
    } else {
      toast.error("Invalid new password. Please try again");
    }
  };
  return (
    <Fragment>
      <PageTitle title="Reset Password" />
      <div className="container custom-body mt-3 m-auto col-12 col-md-6 col-xl-4">
        <div className="w-100">
          <form onSubmit={handleSubmit} className="text-dark">
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={data.hasOwnProperty("password") ? data.password : ""}
                onChange={handlePasswordChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={
                  data.hasOwnProperty("confirmPassword")
                    ? data.confirmPassword
                    : ""
                }
                onChange={handleConfirmPasswordChange}
              />
              <label htmlFor="floatingPassword">Verify New Password</label>
            </div>
            <button className="btn btn-outline-warning m-auto d-block">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RecoveryPassword;
