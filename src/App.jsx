import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import axios from "axios";
import Home from "./pages/home/Home.page";
import NavBar from "./components/navBar/NavBar.component";
import AboutUs from "./pages/aboutUs/AboutUs.page";
import BookPage from "./pages/book/Book.page";
import ContactUs from "./pages/contactUs/ContactUs.page";
import CreateAdmin from "./pages/createAdmin/CreateAdmin.page";
import Admin from "./pages/admin/Admin.page";
import AuthGuard from "./components/authGuard/AuthGuard.component";
import DashboardNavBar from "./pages/dashboard/Dashboard.page";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.page";
import RecoveryPassword from "./pages/recoveryPassword/RecoveryPassword.page";
import AdminAutoLogIn from "./components/adminAutoLogIn/AdminAutoLogIn.component";
import PageNotFount from "./pages/404/404.page";

function App() {
  return (
    <Fragment>
      <AdminAutoLogIn />
      <ToastContainer />
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/About Us" element={<AboutUs />} />
          <Route exact path="/Our Books" element={<BookPage />} />
          <Route exact path="/Contact Us" element={<ContactUs />} />
          <Route path="/create-admin" element={<CreateAdmin />} />;
          <Route exact path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="recovery-password/:secret/:iv/:data"
            exact
            element={<RecoveryPassword />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route path="/404" element={<PageNotFount />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
