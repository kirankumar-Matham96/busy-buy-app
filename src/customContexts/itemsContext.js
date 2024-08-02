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
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getData();
        setProducts(productsData);
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
      {console.log("products => ", products)}
      <itemsContext.Provider value={{ products, loading, error }}>
        {children}
      </itemsContext.Provider>
    </>
  );
};
