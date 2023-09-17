import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NavbarSection from "./components/navbarSection/Navbar";
import RoutesComponent from './routesComponent'
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSection />
      <RoutesComponent />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
