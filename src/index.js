import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

axios.defaults.baseURL = `${process.env.REACT_APP_DOMAIN}/api` ;
axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("google-token")
  if(token){
    config.headers["x-auth-token"] = token
  }
  const adminToken = localStorage.getItem("admin-token")
  if(adminToken){
    config.headers["x-auth-admin-token"] = adminToken
  }
  return(config)
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
