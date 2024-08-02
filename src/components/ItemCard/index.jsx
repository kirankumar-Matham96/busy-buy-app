import React from "react";
import cardStyles from "./index.module.css";

export const ItemCard = () => {
  return (
    <div className={cardStyles.card}>
      <img className={cardStyles.image} src="https://m.media-amazon.com/images/I/61yMAsvoVSL._AC_UY1100_.jpg" alt="bag" />
      <p className={cardStyles.title}>Title</p>
      <p className={cardStyles.price}>₹ 1099</p>
      <button className={cardStyles.btn}>Add To Cart</button>
    </div>
  );
};
