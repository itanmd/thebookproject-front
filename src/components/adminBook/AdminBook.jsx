import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const AdminBook = ({
  idbooks,
  name,
  price,
  pages,
  image_link,
  uuid,
  onEdit,
  onDelete,
  onOpenBook,
}) => {
  const handleClick = (ev) => {
    onOpenBook(idbooks);
    
  };
  const handleDeleteClick = (ev) => {
    ev.stopPropagation();
    onDelete({ id: idbooks, name });
  };
  const handleEditClick = (ev) => {
    ev.stopPropagation();
    onEdit(idbooks);
  };
  return (
    <Fragment>
      <div className="card pointer" onClick={handleClick}>
        <img
          src={`${process.env.REACT_APP_DOMAIN}/imgs/book/${image_link}`}
          className="card-img-top"
          alt={name}
        />
        <div className="card-body">
          <h4 className="card-title fw-bold">{name}</h4>
          <p>uuid: {uuid}</p>
          <p>Pages: {pages}</p>
          <p className="fw-bold">Price: {price}$</p>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                onClick={handleEditClick}
                className="btn btn-warning w-100"
                title="Edit"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
            <div className="col">
              <button
                onClick={handleDeleteClick}
                className="btn btn-danger w-100"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminBook;
