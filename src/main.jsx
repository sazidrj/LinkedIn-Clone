import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./Routes";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { app } from "./firebaseConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);