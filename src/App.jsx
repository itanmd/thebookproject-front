import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./pages/home/Home.page";
import NavBar from "./components/navBar/NavBar.component";

function App() {
  useEffect(() => {
    googleAuth();
  }, []);

  const googleAuth = () => {
    const google = window.google;
    if (google.accounts) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: handleCalbackResponse,
      });
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {
              theme: "outline",
              size: "large",
            }
          );
        }
      });
    }
  };

  const handleCalbackResponse = (response) => {
    axios
      .post("/lead/google-lead", { token: response.credential })
      .then(({ data }) => {
        localStorage.setItem("google-token", data.token);
        // dispatch(customerActions.login());
        // getData();
      })
      .catch((e) => {
        localStorage.removeItem("google-token");
        googleAuth();
      });
  };

  return (
    <Fragment>
      <Route path="/" exact>
        {" "}
        <HomePage />
        <NavBar />
      </Route>

      <div className="App">
        <div id="buttonDiv"></div>
      </div>
    </Fragment>
  );
}

export default App;
