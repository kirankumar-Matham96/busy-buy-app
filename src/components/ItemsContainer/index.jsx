import React from "react";
import { ItemCard } from "../ItemCard";
import cardContainerStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const ItemsContainer = () => {
  const { products, loading, error } = useItems();
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
          {/* {console.log("products in the container => ", products)} */}
          {products &&
            products.map((item) => {
              console.log(item);
              return <ItemCard key={item.id} item={item} />;
            })}
        </div>
      )}
    </>
  );
};
