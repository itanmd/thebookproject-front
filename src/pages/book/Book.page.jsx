import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import "./book.css";
import Book from "../../components/book/Book.component";

const BookPage = () => {
  return (
    <Fragment>
      <PageTitle title="OUR BOOKS" />
      <div className="my-3 m-auto p-3 w-md-50">
        <p>תוכן לדוגמא</p>
        <Book />
      </div>
    </Fragment>
  );
};

export default BookPage;
