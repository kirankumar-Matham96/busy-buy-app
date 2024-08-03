// import React, { useState, useEffect } from "react";
import purchaseStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const Purchase = () => {
  const { totalPrice, purchaseHandle } = useItems();

  return (
    <div className={purchaseStyles.filter}>
      <p>Total Price: ₹{totalPrice}</p>
      <button onClick={purchaseHandle}>Purchase</button>
    </div>
  );
};
