import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FilterPage from "./components/FilterPage";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/filters" element={<FilterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
