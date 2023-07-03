import axios from "axios";
import { useState } from "react";
import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import Joi from "joi-browser";
import loginSchema from "../../validation/signIn.validation";
import useAfterLogin from "../../hooks/useAfterLogin";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const Admin = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const adminLoggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  const afterLogin = useAfterLogin();
  useLayoutEffect(() => {
    axios
      .get("/admin/check-admin")
      .then(({ data }) => {
        if (!data.admin) {
          navigate("/create-admin");
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  useEffect(() => {
    if (adminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [adminLoggedIn]);

  const handleEmailChange = (e) => {
    setData({ ...data, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedValue = Joi.validate(data, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      setError("Invalid username or password");
    } else {
      axios
        .post("/admin/sign-in-admin", data)
        .then(({ data }) => {
          afterLogin(data.token);
        })
        .catch((e) => {
          setError("Invalid username or password");
        });
    }
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Fragment>
      <PageTitle title="Admin login" />

      <div className="container custom-body mt-3 m-auto col-12 col-md-6 col-xl-4">
        <div className="w-100">
          <form onSubmit={handleSubmit} className="text-dark">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={data.hasOwnProperty("email") ? data.email : ""}
                onChange={handleEmailChange}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
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
            <button type="submit" className="w-100 btn btn-warning">
              login
            </button>
            <button className="btn btn-link" onClick={forgotPassword}>
              Forgot your password ? 
            </button>
            {error && <span className="text-danger mb-3">{error}</span>}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
