import { useState } from "react";
import { Fragment } from "react";
import Joi from "joi-browser";
import contuctUsSchema from "../../validation/contuctUs.validation";
import axios from "axios";
import { toast } from "react-toastify";

const ContuctUsForm = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const handleNameChange = (ev) => {
    setData({ ...data, name: ev.target.value });
  };
  const handleEmailchange = (ev) => {
    setData({ ...data, email: ev.target.value });
  };
  const handlePhoneNumberchange = (ev) => {
    setData({ ...data, phoneNumber: ev.target.value });
  };
  const handleSubjectChange = (ev) => {
    setData({ ...data, subject: ev.target.value });
  };
  const handleMessageChange = (ev) => {
    setData({ ...data, message: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError(false);

    const validatedValue = Joi.validate(data, contuctUsSchema, {
      abortEarly: false,
    });

    if (!validatedValue.error) {
      axios
        .post("/messages", data)
        .then(() => {
          toast.success("The message was sent successfully");
          setData({});
        })
        .catch(() => {
          toast.error("Something went wrong :(");
        });
    } else {
      setError(true);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                First name:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="First name"
                value={data.hasOwnProperty("name") ? data.name : ""}
                onChange={handleNameChange}
              />
              {data.hasOwnProperty("name") && data.name.length < 2 && (
                <div className="text-danger">
                  Name must contain at least 2 characters
                </div>
              )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="name@example.com"
                value={data.hasOwnProperty("email") ? data.email : ""}
                onChange={handleEmailchange}
              />
              {data.hasOwnProperty("email") &&
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  data.email
                ) === false && (
                  <div className="text-danger">Invalid email address</div>
                )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Phone Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="052-345-6789"
                value={
                  data.hasOwnProperty("phoneNumber") ? data.phoneNumber : ""
                }
                onChange={handlePhoneNumberchange}
              />
              {data.hasOwnProperty("phoneNumber") &&
                /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(
                  data.phoneNumber
                ) === false && (
                  <div className="text-danger">Invalid phone number</div>
                )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Subject:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput4"
                placeholder='Enter topic, like "Books recommendations"'
                value={data.hasOwnProperty("subject") ? data.subject : ""}
                onChange={handleSubjectChange}
              />
              {data.hasOwnProperty("subject") && data.subject.length < 2 && (
                <div className="text-danger">
                  Your Subject must contain at least 2 characters
                </div>
              )}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={data.hasOwnProperty("message") ? data.message : ""}
                onChange={handleMessageChange}
              ></textarea>
              {data.hasOwnProperty("message") && data.message.length > 1000 && (
                <div className="text-danger">Max 1000 characters</div>
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-warning m-auto d-block w-20">Send</button>
      </form>

      {error && (
        <div className="text-danger">
          One of the values you entered are wrong
        </div>
      )}
    </Fragment>
  );
};

export default ContuctUsForm;
