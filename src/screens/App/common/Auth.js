/* eslint-disable no-undef */
import React from "react";
//import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import App from "../../../screens/App/index";
import Login from "./Login";
import Forgetpassword from "./Forgetpassword";

const ProtectedRoute = ({ children }) => {
  // eslint-disable-next-line no-undef
  const loginStato = localStorage.getItem("loginStatus") == "true";

  if (!loginStato) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function Auth() {
  return (
    <div style={{ height: "100vh", backgroundColor: "#F4F5F7", overflow: "auto" }}>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route index element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
        <Route path="/changepassword" element={<Forgetpassword />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Auth;
