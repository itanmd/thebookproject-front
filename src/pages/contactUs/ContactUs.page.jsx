import "./contuctUs.css";
import { Fragment } from "react";
import ContactUsForm from "../../components/contuctUsForm/ContuctUsForm.component";
import PageTitle from "../../components/pageTitle/pageTitle.component";

const ContactUs = () => {
  return (
    <Fragment>
      <PageTitle title="CONTACT US" />
      <div className="container mt-4">
        <ContactUsForm />
      </div>
    </Fragment>
  );
};

export default ContactUs;
