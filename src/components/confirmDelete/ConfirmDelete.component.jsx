import { useLocation } from "react-router-dom";
import "./confirmDelete.css";
const ConfirmDelete = ({ id, name, onCancel, onDelete }) => {
  const { pathname } = useLocation();
  const handleDeleteLead = () => {
    onDelete(id);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="custom-fixed">
      <div className="custom-modal">
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h4 className="modal-title">
                  {pathname.includes("leads") ? "Delete lead" : "Delete book"}
                </h4>
              </div>
              <div className="modal-body">
                <p className="text-dark">
                  Are you sure you want to delete {name} ?
                </p>
              </div>
              <div className="modal-footer justify-content-start">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteLead}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
