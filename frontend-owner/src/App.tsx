import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import Home from "./Screen/Home/Home";
import Login from "./Screen/Login/Login";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <ToastProvider autoDismiss={true}>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ToastProvider>
    </div>
  );
};

export default App;
