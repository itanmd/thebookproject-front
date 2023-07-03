import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/pageTitle.component";

const AboutUs = () => {
  return (
    <Fragment>
      <PageTitle title="ABOUT US" />
      <div className="my-3 m-auto p-3 w-md-50">
        <p>תוכן לדוגמא</p>
      </div>
    </Fragment>
  );
};
export default AboutUs;
