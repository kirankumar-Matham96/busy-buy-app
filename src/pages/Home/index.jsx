import React from "react";
import { Filter } from "../../components/Filter";
import { ItemsContainer } from "../../components/ItemsContainer";
import homeStyles from "./index.module.css";

export const Home = () => {
  return (
    <div className={homeStyles.bgContainer}>
      <div className={homeStyles.filterContainer}>
        <Filter />
      </div>
      <div className={homeStyles.mainContainer}>
        <div className={homeStyles.searchInputContainer}>
          <h1>SearchBar</h1>
        </div>
        <div>
          <ItemsContainer />
        </div>
      </div>
    </div>
  );
};
