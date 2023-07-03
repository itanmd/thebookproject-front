import { useState } from "react";
import { Fragment } from "react";
import OurBooks from "../../components/ourBooks/OurBooks.component";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import SearchBar from "../../components/searchBar/SearchBar.component";
import SortBy from "../../components/sortBy/SortBy.component";

const OurBooksPage = () => {
  const [sortBy, setSortBy] = useState(null);
  const handleSortBy = (val) => {
    setSortBy(val);
  };
  return (
    <Fragment>
      <PageTitle title="Our Books" />
      <div className="container mt-3">
        <div className="col-12 col-md-8 row row-cols-1 row-cols-md-2 g-3 mb-3">
          <div className="col">
            <SearchBar />
          </div>
          <div className="col">
            <SortBy onSortBy={handleSortBy} />
          </div>
        </div>
        <div className="row row-cols-2 row-cols-lg-3 g-3">
          <OurBooks sortBy={sortBy} />
        </div>
      </div>
    </Fragment>
  );
};

export default OurBooksPage;
