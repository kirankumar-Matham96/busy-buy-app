import React from "react";
import filterStyles from "./index.module.css";
const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Jewelery",
  "Electronics",
];

export const Filter = () => {
  return (
    <div className={filterStyles.filter}>
      <div className={filterStyles.priceStyle}>
        <h3 className={filterStyles.heading}>Filter</h3>
        <p>Price: </p>
        <input type="range" step="10" />
      </div>
      <div className={filterStyles.filterCategoryContainer}>
        <h3 className={filterStyles.heading}>Category</h3>
        {categories.map((category, index) => (
          <label key={index}>
            <input type="checkbox" />
            &nbsp;&nbsp;
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};
