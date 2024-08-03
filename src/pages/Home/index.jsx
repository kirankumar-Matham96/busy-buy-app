import React, { useState } from "react";
import { Filter } from "../../components/Filter";
import { ItemsContainer } from "../../components/ItemsContainer";
import homeStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useItems();

  const searchHandle = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className={homeStyles.bgContainer}>
      <Toaster />
      <div className={homeStyles.filterContainer}>
        <Filter />
      </div>
      <div className={homeStyles.mainContainer}>
        <div className={homeStyles.searchInputContainer}>
          <input
            onChange={searchHandle}
            className={homeStyles.search}
            type="search"
            placeholder="Search By Name"
          />
        </div>
        <div>
          {loading ? (
            <LoaderSpinner />
          ) : (
            <ItemsContainer
              searchTerm={searchTerm}
              products={products}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};
