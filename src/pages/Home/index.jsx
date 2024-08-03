import { useState } from "react";
import { useItems } from "../../customContexts/itemsContext";
import { Filter } from "../../components/Filter";
import { ItemsContainer } from "../../components/ItemsContainer";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";
import homeStyles from "./index.module.css";

/**
 * JSX component to render the home page.
 * This component displays the filter, search input, and list of products.
 * It also handles loading states and error messages.
 * @returns JSX - home page
 */
export const Home = () => {
  // state to manage the search term input by the user
  const [searchTerm, setSearchTerm] = useState("");
  // destructure products, loading state, and error from the useItems context (custom hook)
  const { products, loading, error } = useItems();

  /**
   * Handle changes in the search input field.
   * Updates the searchTerm state with the lowercase value of the input.
   * @param {Object} e - The event object from the input change event
   */
  const searchHandle = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className={homeStyles.bgContainer}>
      {/* toaster component for displaying notifications */}
      <Toaster />

      {/* container for the filter component */}
      <div className={homeStyles.filterContainer}>
        <Filter />
      </div>

      <div className={homeStyles.mainContainer}>
        {/* container for the search input field */}
        <div className={homeStyles.searchInputContainer}>
          <input
            onChange={searchHandle}
            className={homeStyles.search}
            type="search"
            placeholder="Search By Name"
          />
        </div>

        {/* conditionally render content based on loading and error states */}
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
