import React, { useState, useEffect } from "react";
import filterStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Jewelery",
  "Electronics",
];

export const Filter = () => {
  const { addFiltersHandle } = useItems();
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    addFiltersHandle(selectedCategories);
  }, [selectedCategories]);

  const selectFilterHandle = (e) => {
    if (e.target.checked) {
      setSelectedCategories([
        ...selectedCategories,
        e.target.value.toLowerCase(),
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== e.target.value.toLowerCase()
        )
      );
    }
  };

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
            <input
              value={category}
              type="checkbox"
              onChange={selectFilterHandle}
            />
            &nbsp;&nbsp;
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};
