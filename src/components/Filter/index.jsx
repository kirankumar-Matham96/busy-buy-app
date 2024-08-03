import { useState, useEffect } from "react";
import { useItems } from "../../customContexts/itemsContext";
import filterStyles from "./index.module.css";

/**
 * JSX component for filtering items by price and category.
 * @returns JSX - Filter component
 */
export const Filter = () => {
  // destructure addFiltersHandle function and categories from useItems context (custom hook)
  const { addFiltersHandle, categories } = useItems();
  // state variable to store selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  // state variable to store selected price filter
  const [priceFilter, setPriceFilter] = useState(1000);

  /**
   * useEffect hook to call addFiltersHandle whenever selectedCategories or priceFilter changes.
   * This updates the filters applied to items based on user input.
   */
  useEffect(() => {
    addFiltersHandle(selectedCategories, priceFilter);
  }, [selectedCategories, priceFilter]);

  /**
   * useEffect hook to call addFiltersHandle whenever selectedCategories or priceFilter changes.
   * This updates the filters applied to items based on user input.
   */
  const selectFilterHandle = (e) => {
    if (e.target.checked) {
      // adding selected category to the list
      setSelectedCategories([
        ...selectedCategories,
        e.target.value.toLowerCase(),
      ]);
    } else {
      // removing unselected category from the list
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== e.target.value.toLowerCase()
        )
      );
    }
  };

  /**
   * Handler for price range input change event.
   * Updates the price filter value based on user input.
   * @param {Object} e - Event object
   */
  const priceChangeHandle = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className={filterStyles.filter}>
      {/* Price filter section */}
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
      
       {/* Category filter section */}
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
