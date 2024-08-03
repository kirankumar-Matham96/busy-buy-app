import { useItems } from "../../customContexts/itemsContext";
import cardStyles from "./index.module.css";

/**
 * JSX component for displaying an item card.
 * This component can be used for both displaying items and cart items.
 * @param {Object} item - The item object containing details like id, title, price, image, and quantity.
 * @param {boolean} isCart - Flag to determine if the item is displayed in the cart.
 * @returns JSX - ItemCard component
 */
export const ItemCard = ({ item, isCart = false }) => {
  // destructure item properties
  const { id, title, price, image, quantity } = item;

  // Destructure functions for handling cart actions from useItems context
  const {
    addToCartHandle,
    removeFromCartHandle,
    increaseQuantityHandle,
    decreaseQuantityHandle,
  } = useItems();

  return (
    <div className={cardStyles.card}>
      <img className={cardStyles.image} src={image} alt={title} />
      {/* display item title, truncate if longer than 40 characters */}
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
