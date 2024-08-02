import React from "react";
import homeStyles from "./index.module.css";

export const Home = () => {
  return (
    <div className={homeStyles.bgContainer}>
      <div className={homeStyles.filterContainer}>
        <h1>Filter</h1>
      </div>
      <div className={homeStyles.mainContainer}>
        <div className={homeStyles.searchInputContainer}>
          <h1>SearchBar</h1>
        </div>
        <div>
          <h1>CardsContainer</h1>
        </div>
      </div>
    </div>
  );
};
