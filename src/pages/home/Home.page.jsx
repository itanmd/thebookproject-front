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
              A virtual haven for all book lovers -{" "}
              <h1 className="h1 d-inline">'The Book Project'</h1>
            </div>

            <h3>
              Welcome to The Books Project, Our website is a passionate endeavor
              to cultivate and share the love for books with a vibrant community
              of readers. We believe that books have the power to inspire,
              enlighten, and transport us to new realms of imagination.
            </h3>
          </article>
          <div className="mt-5">
            <div className="h3">BEST SELLERS</div>
            <div className="my-3">
              <div className="row row-cols-1 row-cols-lg-3 g-3">
                <OurBooks />
                <div className="col mt-auto text-end p-3">
                  <Link to="/our-books">Show more{">>"}</Link>
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
