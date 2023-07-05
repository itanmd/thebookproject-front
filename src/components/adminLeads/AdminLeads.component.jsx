import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import AdminLeadsTable from "../adminLeadsTable/AdminLeadsTable.component";
import ConfirmDelete from "../confirmDelete/ConfirmDelete.component";

const AdminLeads = () => {
  const [data, setData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  useEffect(() => {
    axios
      .get("/leads")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  const confirmDeleteLead = (obj) => {
    setConfirmDelete(obj);
  };
  const cancelDelete = () => {
    setConfirmDelete(null);
  };
  const deleteLead = (id) => {
    axios
      .delete(`/leads/${id}`)
      .then(() => {
        setConfirmDelete(null);
        toast.done("Lead deleted");
        let d = [...data];
        d = d.filter((lead) => lead.idleads !== id);
        setData(d);
      })
      .catch(() => {
        setConfirmDelete(null);
        toast.error("Something went wrong");
      });
  };
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">Leads</h1>

        <div className="mt-4 overflow-auto">
          {data && (
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((lead, idx) => (
                  <AdminLeadsTable
                    key={idx}
                    {...lead}
                    onDelete={confirmDeleteLead}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
        {confirmDelete && (
          <ConfirmDelete
            onCancel={cancelDelete}
            onDelete={deleteLead}
            {...confirmDelete}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AdminLeads;
