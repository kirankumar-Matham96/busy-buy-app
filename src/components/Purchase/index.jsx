import { useItems } from "../../customContexts/itemsContext";
import purchaseStyles from "./index.module.css";

/**
 * JSX component for displaying the total price and a purchase button.
 * @returns JSX - Purchase component
 */
export const Purchase = () => {
   // retrieve totalPrice and purchaseHandle function from items context (custom hook)
  const { totalPrice, purchaseHandle } = useItems();

  return (
    <div className={purchaseStyles.filter}>
      <p className={purchaseStyles.price}>Total Price: ₹{totalPrice}</p>
      <button className={purchaseStyles.btn} onClick={purchaseHandle}>
        Purchase
      </button>
    </div>
  );
};
