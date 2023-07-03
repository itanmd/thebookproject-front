import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";
import OurBooks from "../../components/ourBooks/OurBooks.component";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <PageTitle title={"THE BOOK PROJECT"} />
      <div className="container">
        <div className="mt-4 text-center">
          <article>
            <div className="h1">
              Book's lovers sharing their favorites books using our unique
              platform <h1 className="h1 d-inline">'The Book Project'</h1>
            </div>
            <div className="mt-1 fs-5 pt-0 p-4"></div>
          </article>
          <div className="mt-5">
            <div className="h3">This is our recommendations</div>
            <div className="my-3">
              <div className="row row-cols-2 row-cols-lg-3 g-3">
                <OurBooks />
                <div className="col mt-auto text-end p-3">
                  <Link to="/Our books">Show more{">>"}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
