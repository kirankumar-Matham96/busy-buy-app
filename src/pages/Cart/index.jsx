import { ItemsContainer } from "../../components/ItemsContainer";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";
import { Purchase } from "../../components/Purchase";
import { useItems } from "../../customContexts/itemsContext";
import cartStyles from "./index.module.css";

/**
 * JSX component that renders the cart page
 * @returns JSX - cart page component
 */
export const Cart = () => {
  // getting data from items context with custom hook
  const { cartItems, loading } = useItems();
  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className={cartStyles.bgContainer}>
          <Toaster />
          <div className={cartStyles.purchaseContainer}>
            <Purchase />
          </div>
          <div className={cartStyles.mainContainer}>
            {cartItems.length > 0 ? (
              <ItemsContainer products={cartItems} isCart={true} />
            ) : (
              <h1 className={cartStyles.emptyMessage}>Add some items!</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};
