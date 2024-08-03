import React, { useState, useEffect } from "react";
import purchaseStyles from "./index.module.css";
import { useItems } from "../../customContexts/itemsContext";

export const Purchase = () => {
  // const { addFiltersHandle } = useItems();
  // const [selectedCategories, setSelectedCategories] = useState([]);

  // useEffect(() => {
  //   addFiltersHandle(selectedCategories);
  // }, [selectedCategories]);

  // const selectFilterHandle = (e) => {
  //   if (e.target.checked) {
  //     setSelectedCategories([
  //       ...selectedCategories,
  //       e.target.value.toLowerCase(),
  //     ]);
  //   } else {
  //     setSelectedCategories(
  //       selectedCategories.filter(
  //         (item) => item !== e.target.value.toLowerCase()
  //       )
  //     );
  //   }
  // };

  return (
    <div className={purchaseStyles.filter}>
      <p>Total Price: ₹{"20000"}</p>
      <button>Purchase</button>
    </div>
  );
};
