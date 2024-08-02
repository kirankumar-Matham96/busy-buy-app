import React from "react";
import cardStyles from "./index.module.css";

export const ItemCard = ({ item }) => {
  const { id, title, price, image } = item;
  return (
    <div className={cardStyles.card}>
      <img className={cardStyles.image} src={image} alt={title} />
      <p className={cardStyles.title}>{title}</p>
      <p className={cardStyles.price}>₹ {price}</p>
      <button className={cardStyles.btn}>Add To Cart</button>
    </div>
  );
};
