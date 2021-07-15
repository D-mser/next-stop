import React, { useContext, useEffect } from "react";
import Home from "./custom_components/Home";
import MapsBoard from "./custom_components/MapsBoard";
import Navbar from "./custom_components/Navbar";
import Login from "./custom_components/Login";
import { Switch, Route } from "react-router-dom";
import { DataContext } from "./DataContext";

export default function App() {
  const { isFetching } = useContext(DataContext);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  });

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/maps">
          {!isFetching ? <MapsBoard /> : <div>Almost there</div>}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
}
