import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FilterPage from "./components/FilterPage";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import "./styles/Background.css";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorPage />}>
        <div className="dotted-background" />
        <div className="flex flex-col min-h-screen content-wrapper">
          <main className="flex-grow">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/filters" element={<FilterPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
