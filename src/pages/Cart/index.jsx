import React from "react";
import { ItemsContainer } from "../../components/ItemsContainer";
import { useItems } from "../../customContexts/itemsContext";
import cartStyles from "./index.module.css";
import { Purchase } from "../../components/Purchase";
import { Toaster } from "../../components/Toaster";
// use loader after adding firestore

export const Cart = () => {
  const { cartItems } = useItems();
  return (
    <div className={cartStyles.bgContainer}>
      <Toaster />
      <div className={cartStyles.purchaseContainer}>
        <Purchase />
      </div>
      <div className={cartStyles.mainContainer}>
        <ItemsContainer products={cartItems} isCart={true} />
      </div>
    </div>
  );
};
