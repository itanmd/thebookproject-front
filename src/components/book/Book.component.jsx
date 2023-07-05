import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import "./book.css";

const Book = ({
  name,
  description,
  uuid,
  pages,
  price,
  category,
  image_link,
  idbooks,
  onSetFavor,
  onUnsetFavor,
  onOpenProduct,
  favorite,
}) => {
  const handleClick = () => {
    onOpenProduct(idbooks);
  };

  const handleFavor = () => {
    if (favorite) {
      onUnsetFavor(idbooks);
    } else {
      onSetFavor(idbooks);
    }
  };
  return (
    <Fragment>
      <div className="card">
        <img
          src={`${process.env.REACT_APP_DOMAIN}/imgs/book/${image_link}`}
          className="card-img-top"
          alt={name}
        />
        <div className="card-body text-center">
          <h4 className="card-title">{name}</h4>
          <p className="card-text text-center">
            {price}
            <span>$</span>
          </p>
        </div>
        <div className="card-footer text-center">
          <button onClick={handleClick} className="btn btn-outline-dark">
            More details
          </button>
          <FontAwesomeIcon
            icon={faStar}
            className={`pointer ms-2  ${
              favorite ? "text-warning" : "text-secondary"
            }`}
            onClick={handleFavor}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Book;
