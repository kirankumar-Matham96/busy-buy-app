import React, { useState, useEffect } from "react";
import { ItemCard } from "../ItemCard";
import cardContainerStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const ItemsContainer = ({ searchTerm }) => {
  const { products, loading, error } = useItems();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    products &&
      setFilteredProducts(
        products.filter((item) => item.title.toLowerCase().includes(searchTerm))
      );
  }, [products, searchTerm]);

  return (
    <>
      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}
      {!error && loading ? (
        "Loading..."
      ) : (
        <div className={cardContainerStyles.container}>
          {filteredProducts &&
            filteredProducts.map((item) => {
              return <ItemCard key={item.id} item={item} />;
            })}
        </div>
      )}
    </>
  );
};
