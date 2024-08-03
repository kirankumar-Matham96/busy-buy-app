import React, { useState, useEffect } from "react";
import filterStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const Filter = () => {
  const { addFiltersHandle, categories } = useItems();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState(1000);

  useEffect(() => {
    addFiltersHandle(selectedCategories, priceFilter);
  }, [selectedCategories, priceFilter]);

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

  const priceChangeHandle = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className={filterStyles.filter}>
      <div className={filterStyles.priceStyle}>
        <h3 className={filterStyles.heading}>Filter</h3>
        <p>Price: {priceFilter}</p>
        <input
          value={priceFilter}
          onChange={priceChangeHandle}
          type="range"
          step="10"
          min="50"
          max="1000"
        />
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
            <span className={filterStyles.categoryText}>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
