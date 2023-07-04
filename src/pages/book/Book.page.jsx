import "./book.css";
import axios from "axios";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading.component";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customerActions } from "../../store/customer";
import GoBackButton from "../../components/goBackButoon/GoBackButton.component";

const Book = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.customer.customerData);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [fav, setFav] = useState("");
  useEffect(() => {
    axios
      .get(`/books/${params.id}`)
      .then(({ data }) => {
        setData(data[0]);
      })
      .catch((e) => {
        navigate("/404");
      });
  }, []);

  useEffect(() => {
    if (data !== null && favorites[0]) {
      if (favorites.find((fav) => fav.idbook === data.idbooks)) {
        setFav("text-warning");
      } else {
        setFav("text-secondary");
      }
    }
  }, [data]);

  const handleFavClick = () => {
    if (!location.pathname.includes("admin")) {
      if (loggedIn) {
        if (favorites.find((fav) => fav.idbook === data.idbooks)) {
          setFav("text-secondary");
          let favor = favorites.filter((fav) => fav.idbook !== data.idbooks);
          dispatch(customerActions.updateCustomerData(favor));

          axios
            .delete(`/favorites/${data.idbooks}`)
            .then(() => {})
            .catch(() => {
              setFav("text-secondary");
            });
        } else {
          setFav("text-warning");
          let favor = [...favorites, { idbook: data.idbooks }];
          dispatch(customerActions.updateCustomerData(favor));
          axios
            .post("/favorites", { idBook: data.idbooks })
            .then(() => {})
            .catch(() => {
              setFav("text-warning");
            });
        }
      } else {
        toast.error("Unregistered user");
      }
    }
  };
  return (
    <Fragment>
      {data ? (
        <Fragment>
          <PageTitle title={data.name} />
          <div className="container text-light product-container rounded my-3 p-5">
            <GoBackButton />
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col text-light">
                <div className="custom-product">
                  <div>
                    <div>{data.description}</div>
                  </div>
                  <div className="fw-bold"> Price: {data.price}$</div>
                </div>
              </div>
              <div className="col">
                <img
                  src={`${process.env.REACT_APP_DOMAIN}/imgs/book/${data.image_link}`}
                  alt=""
                  className="w-75"
                />
              </div>
            </div>
            {!location.pathname.includes("admin") && (
              <button
                onClick={handleFavClick}
                className="btn btn-outline-warning"
              >
                Favorites
                <FontAwesomeIcon icon={faStar} className={`me-1 ${fav}`} />
              </button>
            )}
          </div>
        </Fragment>
      ) : (
        <div className="center-all">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

export default Book;
