import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import Book from "../../components/book/Book.component";
import { customerActions } from "../../store/customer";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.customer.customerData);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/favorites")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {});
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`/favorites/${id}`)
      .then(() => {
        let favor = favorites.filter((fav) => fav.idproduct !== id);
        dispatch(customerActions.updateCustomerData(favor));
        let newData = [...data];
        newData = newData.filter((prod) => prod.idbooks !== id);
        setData(newData);
      })
      .catch(() => {});
  };

  const openBook = (id) => {
    navigate(`/book/${id}`);
  };
  return (
    <Fragment>
      <PageTitle title="Favorites" />
      <div className="container mt-3">
        {data[0] ? (
          <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-3">
            {data.map((prod, idx) => (
              <div className="col" key={idx}>
                <Book
                  {...prod}
                  favorite={true}
                  onUnsetFavor={handleRemove}
                  onOpenBook={openBook}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="m-auto mt-3 bg-light rounded p-5 text-warning text-center fw-bold display-4">
            Ooops! Your favorites list is empty{" "}
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Favorites;
