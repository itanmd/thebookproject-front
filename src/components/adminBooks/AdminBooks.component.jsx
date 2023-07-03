import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminBook from "../adminBook/AdminBook";
import ConfirmDelete from "../confirmDelete/ConfirmDelete.component";
import Loading from "../loading/Loading.component";

const AdminBooks = () => {
  const [data, setData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/books")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  const addBook = () => {
    navigate("/admin/add");
  };

  const editCard = (id) => {
    navigate(`/admin/edit/${id}`);
  };
  const deleteCardConfirmation = (obj) => {
    setConfirmDelete({ ...obj });
  };
  const cancelDelete = () => {
    setConfirmDelete(null);
  };
  const deleteBook = (id) => {
    axios
      .delete(`/books/${id}`)
      .then(() => {
        toast.done("Book deleted");
        let d = [...data];
        d = d.filter((prod) => prod.idbooks !== id);
        setData(d);
        setConfirmDelete(null);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setConfirmDelete(null);
      });
  };
  const openBook = (id) => {
    navigate(`/admin/book/${id}`);
  };
  return (
    <Fragment>
      <h1 className="text-center">Books</h1>
      <div className="container">
        <button className="btn btn-outline-warning" onClick={addBook}>
          Add book <span className="fw-bold">+</span>
        </button>
        <div className="mt-4">
          {data[0] ? (
            <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
              {data &&
                data.map((prod, idx) => (
                  <div className="col" key={idx}>
                    <AdminBook
                      {...prod}
                      onDelete={deleteCardConfirmation}
                      onEdit={editCard}
                      onOpenProduct={openBook}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      {confirmDelete && (
        <ConfirmDelete
          {...confirmDelete}
          onCancel={cancelDelete}
          onDelete={deleteBook}
        />
      )}
    </Fragment>
  );
};

export default AdminBooks;
