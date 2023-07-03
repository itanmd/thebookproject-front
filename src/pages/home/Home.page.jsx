import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import Book from "../../components/book/Book.component";
const Home = () => {
  return (
    <Fragment>
      <PageTitle title={"THE BOOK PROJECT"}></PageTitle>
      <Book />
    </Fragment>
  );
};

export default Home;
