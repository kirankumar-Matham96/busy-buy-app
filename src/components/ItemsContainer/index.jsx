import React from "react";
import { ItemCard } from "../ItemCard";
import cardContainerStyles from "./index.module.css";

export const ItemsContainer = () => {
  return (
    <div className={cardContainerStyles.container}>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
};
