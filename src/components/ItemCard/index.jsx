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
      <div className={cardStyles.priceContainer}>
        <p className={cardStyles.price}>₹ {price}</p>
        {isCart && (
          <div className={cardStyles.controlsContainer}>
            <button className={cardStyles.controlBtn} onClick={() => decreaseQuantityHandle(id)}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9513/9513363.png"
                alt="decrease"
              />
            </button>
            <span className={cardStyles.quantity}>
            {quantity}
            </span>
            <button className={cardStyles.controlBtn} onClick={() => increaseQuantityHandle(id)}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/32/32360.png"
                alt="increase"
              />
            </button>
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
