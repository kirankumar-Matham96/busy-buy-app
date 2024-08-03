import purchaseStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const Purchase = () => {
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
