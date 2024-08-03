import React from "react";
import { ItemsContainer } from "../../components/ItemsContainer";
import { useItems } from "../../customContexts/itemsContext";
import cartStyles from "./index.module.css";
import { Purchase } from "../../components/Purchase";

export const Cart = () => {
  const { cartItems } = useItems();
  console.log("cartItems => ", cartItems);
  return (
    <div className={cartStyles.bgContainer}>
      <div className={cartStyles.purchaseContainer}>
        <Purchase />
      </div>
      <div className={cartStyles.mainContainer}>
        <ItemsContainer products={cartItems} isCart={true} />
      </div>
    </div>
  );
};
