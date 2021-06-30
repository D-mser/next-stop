import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "./DataContext";
import { GET_COUNTRIES } from "./config";

ReactDOM.render(
  <Router>
    <DataContextProvider url={GET_COUNTRIES}>
      <App />
    </DataContextProvider>
  </Router>,
  document.getElementById("root")
);
