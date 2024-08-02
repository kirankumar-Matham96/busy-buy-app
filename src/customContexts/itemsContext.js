import React, { useState, useEffect, createContext, useContext } from "react";

const itemsContext = createContext();

export const useItems = () => useContext(itemsContext);

const getData = async () => {
  try {
    // from fake store api
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ItemsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const addFiltersHandle = (filters) => {
    setFilteredProducts(
      products.filter((product) =>
        filters.length > 0
          ? filters.includes(product.category.toLowerCase())
          : products
      )
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getData();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <itemsContext.Provider
        value={{ products: filteredProducts, loading, error, addFiltersHandle }}
      >
        {children}
      </itemsContext.Provider>
    </>
  );
};
