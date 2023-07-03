import { Fragment } from "react";
import { Route } from "react-router-dom";
import "./App.css";
// import axios from "axios";
import Home from "./pages/home/Home.page";
import NavBar from "./components/navBar/NavBar.component";
import AboutUs from "./pages/aboutUs/AboutUs.page";
import BookPage from "./pages/book/Book.page";
import ContactUs from "./pages/contactUs/ContactUs.page";

function App() {
  // useEffect(() => {
  //   googleAuth();
  // }, []);

  // const googleAuth = () => {
  //   const google = window.google;
  //   if (google.accounts) {
  //     google.accounts.id.initialize({
  //       client_id: process.env.REACT_APP_CLIENT_ID,
  //       callback: handleCalbackResponse,
  //     });
  //     google.accounts.id.prompt((notification) => {
  //       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
  //         google.accounts.id.renderButton(
  //           document.getElementById("buttonDiv"),
  //           {
  //             theme: "outline",
  //             size: "large",
  //           }
  //         );
  //       }
  //     });
  //   }
  // };

  // const handleCalbackResponse = (response) => {
  //   axios
  //     .post("/lead/google-lead", { token: response.credential })
  //     .then(({ data }) => {
  //       localStorage.setItem("google-token", data.token);
  //       // dispatch(customerActions.login());
  //       // getData();
  //     })
  //     .catch((e) => {
  //       localStorage.removeItem("google-token");
  //       googleAuth();
  //     });
  // };

  return (
    <Fragment>
      <div className="App">
        <NavBar />
        <switch>
          <Route path="/Home" exact>
            <Home />
          </Route>
          <Route path="/About Us" exact>
            <AboutUs />
          </Route>
          <Route path="/Our Books" exact>
            <BookPage />
          </Route>
          <Route path="/Contact Us" exact>
            <ContactUs />
          </Route>
        </switch>

        <div id="buttonDiv"></div>
      </div>
    </Fragment>
  );
}

export default App;
