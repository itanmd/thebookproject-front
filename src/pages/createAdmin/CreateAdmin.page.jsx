import axios from "axios";
import Joi from "joi-browser";
import { useLayoutEffect } from "react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading.component";
import createAdminSchema from "../../validation/createAdmin.validation";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    axios
      .get("/admin/check-admin")
      .then(({ data }) => {
        if (data.admin) {
          navigate("/");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  const [data, setData] = useState({});

  const handleNameChange = (ev) => {
    setData({ ...data, name: ev.target.value });
  };
  const handleEmailchange = (ev) => {
    setData({ ...data, email: ev.target.value });
  };
  const handlePhoneNumberchange = (ev) => {
    setData({ ...data, phoneNumber: ev.target.value });
  };
  const handlePasswordChange = (ev) => {
    setData({ ...data, password: ev.target.value });
  };
  const handleConfirmPasswordChange = (ev) => {
    setData({ ...data, confirmPassword: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
      const validateValue = Joi.validate(data, createAdminSchema, {
        abortEarly: false,
      });
      if (validateValue.error) {
        toast("Invalid email or password");
      } else {
        axios
          .post("/admin/sign-up", data)
          .then(() => {
            toast.success("Registration was successful");
            navigate("/admin");
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      }
    } else {
      toast.error("Please verify your password again");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="my-3 text-center">Admin Registration Form</h1>
          <form onSubmit={handleSubmit} className="container">
            <div className="row row-cols-1 row-cols-md-2 text-dark">
              <div className="col">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="First Name"
                    value={data.hasOwnProperty("name") ? data.name : ""}
                    onChange={handleNameChange}
                    required
                  />
                  <label htmlFor="floatingInput">First Name</label>
                  {data.hasOwnProperty("name") && data.name.length < 2 && (
                    <div className="text-danger">
                      Name must contain at least 2 characters{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={data.hasOwnProperty("email") ? data.email : ""}
                    onChange={handleEmailchange}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  {data.hasOwnProperty("email") &&
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      data.email
                    ) === false && (
                      <div className="text-danger">Invalid email address</div>
                    )}
                </div>
              </div>
              <div className="col">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="0523456789"
                    value={
                      data.hasOwnProperty("phoneNumber") ? data.phoneNumber : ""
                    }
                    onChange={handlePhoneNumberchange}
                    required
                  />
                  <label htmlFor="floatingInput">Phone number</label>
                  {data.hasOwnProperty("phoneNumber") &&
                    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(
                      data.phoneNumber
                    ) === false && (
                      <div className="text-danger">Invalid phone number</div>
                    )}
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 text-dark">
              <div className="col">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    placeholder="password"
                    onChange={handlePasswordChange}
                    value={data.password}
                    required
                  />
                  <label htmlFor="floatingInput">Password</label>
                  {data.hasOwnProperty("password") &&
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$/.test(
                      data.password
                    ) === false && (
                      <div className="text-danger">
                        The password should be at least 8 characters long and
                        contain at least one uppercase letter and one character
                      </div>
                    )}
                </div>
              </div>
              <div className="col">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm password"
                    value={data.confirmPassword}
                    required
                  />
                  <label htmlFor="floatingInput">Confirm password</label>
                  {data.hasOwnProperty("confirmPassword") &&
                    data.password !== data.confirmPassword && (
                      <div className="text-danger">
                        The passwords you entered do not match{" "}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-warning d-block m-auto my-3 w-50"
            >
              Register
            </button>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateAdmin;
