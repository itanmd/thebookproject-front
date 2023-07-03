import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customerActions } from "../../store/customer";
import Book from "../book/Book.component";

const OurBooks = ({ sortBy }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const favorites = useSelector((state) => state.customer.customerData);
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (sortBy === "0") {
      getBooks();
    }
    if (sortBy === "1") {
      axios
        .get("/books/cheap-to-exp")
        .then(({ data }) => {
          setBooks(data);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
    if (sortBy === "2") {
      axios
        .get("/books/exp-to-cheap")
        .then(({ data }) => {
          setBooks(data);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  }, [sortBy]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === `${encodeURI("/home")}`
    ) {
      axios
        .get("/books/home")
        .then(({ data }) => {
          setBooks(data);
        })
        .catch(() => {
          navigate("/404");
        });
    } else {
      getBooks();
    }
  }, [loggedIn]);

  const getBooks = () => {
    axios
      .get("/books")
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((e) => {
        navigate("/404");
      });
  };

  useEffect(() => {
    setBooks(data);
  }, [favorites]);

  const setBooks = (data) => {
    if (loggedIn) {
      data.forEach((book) => {
        if (
          favorites[0] &&
          favorites.find((element) => element.idbook === book.idbooks)
        ) {
          book.favorite = true;
        } else {
          book.favorite = false;
        }
      });
    } else {
      setData([...data]);
    }
    setData([...data]);
  };

  const openBook = (id) => {
    navigate(`/book/${id}`);
  };

  const setFavor = (id) => {
    if (loggedIn) {
      if (!favorites.find((fav) => fav.idbook === id)) {
        let favor = [...favorites, { idbook: id }];
        dispatch(customerActions.updateCustomerData(favor));
      }

      axios
        .post("/favorites", { idBook: id })
        .then(() => {})
        .catch(() => {
          let favor = favorites.filter((fav) => fav.idbook === id);
          dispatch(customerActions.updateCustomerData(favor));
        });
    } else {
      toast.error("User is not registered");
    }
  };

  const unsetFavor = (id) => {
    if (loggedIn) {
      if (favorites.find((fav) => fav.idbook === id)) {
        let favor = favorites.filter((fav) => fav.idbook !== id);
        dispatch(customerActions.updateCustomerData(favor));
      }
      axios
        .delete(`/favorites/${id}`)
        .then(() => {})
        .catch(() => {
          let favor = [...favorites, { idbook: id }];
          dispatch(customerActions.updateCustomerData(favor));
        });
    } else {
      toast.error("User is not registered");
    }
  };

  return (
    <Fragment>
      {data &&
        data.map((product, idx) => (
          <div className="col" key={idx}>
            <Book
              {...product}
              onOpenProduct={openBook}
              onSetFavor={setFavor}
              onUnsetFavor={unsetFavor}
            />
          </div>
        ))}
    </Fragment>
  );
};

export default OurBooks;
