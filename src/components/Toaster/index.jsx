import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message) => toast.success(message);
export const notifyInfo = (message) => toast.info(message);
export const notifyDanger = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warn(message);

export const Toaster = () => {
  return (
    <div>
      {/* <button onClick={() => notify("Notify!")}>Notify!</button> */}
      <ToastContainer />
    </div>
  );
};
