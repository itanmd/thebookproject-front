import "./adminEditOrCreateBook.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../goBackButoon/GoBackButton.component";
import Joi from "joi-browser";
import productSchema from "../../validation/product.validation";
import { toast } from "react-toastify";

const AdminEditOrCreateBook = () => {
  const params = useParams();
  const [axiosData, setAxiosData] = useState({});
  const [data, setData] = useState({});
  useEffect(() => {
    if (params.id) {
      axios
        .get(`/books/${params.id}`)
        .then(({ data }) => {
          setAxiosData(data[0]);
          setData({
            name: data[0].name,
            description: data[0].description,
            price: data[0].price,
            uuid: data[0].uuid,
            pages: data[0].pages,
            categoryId: data[0].categoryId,
          });
        })
        .catch((e) => {
          toast.error("Something went wrong");
        });
    }
  }, []);

  const handleNameChange = (ev) => {
    let d = { ...data };
    setData({ ...d, name: ev.target.value });
  };
  const handleDescriptionChange = (ev) => {
    let d = { ...data };
    setData({ ...d, description: ev.target.value });
  };
  const handlePriceChange = (ev) => {
    let d = { ...data };
    setData({ ...d, price: ev.target.value });
  };
  const handleUuidChange = (ev) => {
    let d = { ...data };
    setData({ ...d, uuid: ev.target.value });
  };
  const handlePagesChange = (ev) => {
    let d = { ...data };
    setData({ ...d, pages: ev.target.value });
  };
  const handleCategoryIdChange = (ev) => {
    let d = { ...data };
    setData({ ...d, categoryId: ev.target.value });
  };
  const handleImageChange = (ev) => {
    setAxiosData({ image_link: ev.target.files[0] });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validatedValue = Joi.validate(data, productSchema, {
      abortEarly: false,
    });
    if (validatedValue.error) {
      toast.error("One of the values is invalid");
    } else {
      if (!params.hasOwnProperty("id") && !axiosData.image_link) {
        toast.error("Please add an image");
      } else {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("uuid", data.uuid);
        formData.append("pages", data.pages);
        formData.append("categoryId", data.categoryId);
        formData.append("price", data.price);
        formData.append("prudImg", axiosData.image_link);

        if (params.hasOwnProperty("id")) {
          axios
            .put(`/books/${params.id}`, formData)
            .then(() => {
              toast.success("Uploaded");
              window.history.back();
            })
            .catch(() => {
              toast.error("Something went wrong");
            });
        } else {
          axios
            .post("/books", formData)
            .then(() => {
              toast.success("Uploaded");
              window.history.back();
            })
            .catch(() => {
              toast.error("Something went wrong");
            });
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="container p-4">
        <GoBackButton />
        <h1 className="text-center">
          {params.hasOwnProperty("id") ? "Edit Book" : "Book upload"}
        </h1>
        {data && (
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Book's title"
                  value={data.name}
                  onChange={handleNameChange}
                ></input>
                {data.hasOwnProperty("name") && data.name.length < 2 && (
                  <span className="text-danger">
                    Book's title must contain at least 2 characters{" "}
                  </span>
                )}{" "}
                {data.hasOwnProperty("name") && data.name.length > 50 && (
                  <span className="text-danger">
                    Maximum characters for the title is 50 characters
                  </span>
                )}
              </div>

              <div className="col">
                <label
                  htmlFor="exampleFormControlTextarea2"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea2"
                  rows="6"
                  value={data.description}
                  onChange={handleDescriptionChange}
                ></textarea>
                {data.hasOwnProperty("description") &&
                  data.description.length < 50 && (
                    <span className="text-danger">
                      Description should contain at least 50 characters
                    </span>
                  )}{" "}
                {data.hasOwnProperty("description") &&
                  data.description.length > 5000 && (
                    <span className="text-danger">
                      Maximum characters for the description is 5000 characters{" "}
                    </span>
                  )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Price in dollars
                </label>
                <input
                  type="text"
                  className="form-control price"
                  id="exampleFormControlInput1"
                  placeholder="20"
                  value={data.price}
                  onChange={handlePriceChange}
                ></input>
                {data.hasOwnProperty("price") && data.price < 0 && (
                  <span className="text-danger">
                    Price should be greater than 0
                  </span>
                )}{" "}
                {data.hasOwnProperty("price") && data.price > 5000 && (
                  <span className="text-danger">Max price is 5000 dollars</span>
                )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Uuid
                </label>
                <input
                  type="text"
                  className="form-control price"
                  id="exampleFormControlInput1"
                  placeholder="588967"
                  value={data.uuid}
                  onChange={handleUuidChange}
                ></input>
                {data.hasOwnProperty("uuid") && data.uuid < 0 && (
                  <span className="text-danger">
                    UUID should contain positive numbers
                  </span>
                )}{" "}
                {data.hasOwnProperty("uuid") && data.uuid.length < 6 && (
                  <span className="text-danger">
                    uuid should contain at least 6 numbers
                  </span>
                )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Pages
                </label>
                <input
                  type="text"
                  className="form-control price"
                  id="exampleFormControlInput1"
                  placeholder="250"
                  value={data.pages}
                  onChange={handlePagesChange}
                ></input>
                {data.hasOwnProperty("pages") && data.pages < 0 && (
                  <span className="text-danger">
                    Number of pages should be greater than 0
                  </span>
                )}{" "}
                {data.hasOwnProperty("pages") && data.pages > 2000 && (
                  <span className="text-danger">Max pages is 2000</span>
                )}
              </div>
              <div className="col">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Category Id
                </label>
                <input
                  type="text"
                  className="form-control price"
                  id="exampleFormControlInput1"
                  placeholder="4"
                  value={data.categoryId}
                  onChange={handleCategoryIdChange}
                ></input>
                {data.hasOwnProperty("categoryId") && data.categoryId < 1 && (
                  <span className="text-danger">
                    Category Id should be greater than 0
                  </span>
                )}{" "}
                {data.hasOwnProperty("categoryId") && data.categoryId > 255 && (
                  <span className="text-danger">
                    Category Id is between 0 to 5000
                  </span>
                )}
              </div>
              <div className="col">
                <label htmlFor="formFile" className="form-label">
                  Images
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleImageChange}
                ></input>
              </div>
            </div>
            <button className="btn btn-warning mt-4 w-50 d-block m-auto">
              Send
            </button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default AdminEditOrCreateBook;
