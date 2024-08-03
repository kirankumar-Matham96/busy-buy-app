import React from "react";
import cardStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const ItemCard = ({ item, isCart = false }) => {
  const { id, title, price, image, quantity } = item;

  const {
    addToCartHandle,
    removeFromCartHandle,
    increaseQuantityHandle,
    decreaseQuantityHandle,
  } = useItems();

  return (
    <div className={cardStyles.card}>
      <img className={cardStyles.image} src={image} alt={title} />
      <p className={cardStyles.title}>
        {title.length > 40 ? title.slice(0, 40) + "..." : title}
      </p>
      <div>
        <p className={cardStyles.price}>₹ {price}</p>
        {isCart && (
          <div>
            <button onClick={() => decreaseQuantityHandle(id)}>-</button>
            {quantity}
            <button onClick={() => increaseQuantityHandle(id)}>+</button>
          </div>
        )}
      </div>
      <button
        className={cardStyles.btn}
        onClick={() =>
          !isCart ? addToCartHandle(id) : removeFromCartHandle(id)
        }
      >
        {isCart ? "Remove From Cart" : "Add To Cart"}
      </button>
    </div>
  );
};
