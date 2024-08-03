import { useState, useEffect } from "react";
import { ItemCard } from "../ItemCard";
import cardContainerStyles from "./index.module.css";

/**
 * JSX component to display a list of items in a container.
 * It filters items based on a search term and can display items for both general and cart views.
 * @param {string} searchTerm - The term used for filtering items by title.
 * @param {Array} products - List of products to display.
 * @param {string|null} error - Error message to display if any error occurs.
 * @param {boolean} isCart - Flag to determine if items are displayed in the cart view.
 * @returns JSX - ItemsContainer component
 */
export const ItemsContainer = ({
  searchTerm = "",
  products = [],
  error = null,
  isCart = false,
}) => {
  // state to store filtered products based on search term
  const [filteredProducts, setFilteredProducts] = useState([]);

  // to filter products when products or searchTerm change
  useEffect(() => {
    // filter products to match searchTerm (case insensitive)
    products &&
      setFilteredProducts(
        products.filter((item) => item.title.toLowerCase().includes(searchTerm))
      );
  }, [products, searchTerm]);

  return (
    <>
      {/* display error message if there is an error */}
      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}

      {/* container for filtered products */}
      <div className={cardContainerStyles.container}>
        {filteredProducts &&
          filteredProducts.map((item) => {
            return <ItemCard key={item.id} item={item} isCart={isCart} />;
          })}
      </div>
    </>
  );
};
