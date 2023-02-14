import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./features/store";

import NavBar from "./component/NavBar";
import HomePage from "./HomePage";
import ErrorBoundary from "./component/ErrorBoundary";
import CheckoutPage from "./component/CheckoutPage";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Provider>
    </React.Fragment>
  );
  // </ErrorBoundary>
}

export default App;
// <Route path="*" element={<NotFound />}></Route>;
//
