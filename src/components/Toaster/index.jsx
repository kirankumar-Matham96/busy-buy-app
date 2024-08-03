import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export const notifySuccess = (message) => toast.success(message);
export const notifyInfo = (message) => toast.info(message);
export const notifyDanger = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warn(message);

export const Toaster = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        closeOnClick
        draggable
        toastClassName="dark-toast"
      />
    </div>
  );
};
