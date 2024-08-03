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
  const [cartItems, setCartItems] = useState([]);

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

  const addFiltersHandle = (filters) => {
    setFilteredProducts(
      products.filter((product) =>
        filters.length > 0
          ? filters.includes(product.category.toLowerCase())
          : products
      )
    );
  };

  const addToCartHandle = (itemId) => {
    const newItem = products.find((item) => item.id === itemId);

    const index = cartItems.findIndex((item) => item.id === itemId);

    if (index === -1) {
      newItem.quantity = 1;
      setCartItems([...cartItems, newItem]);
    } else {
      cartItems[index].quantity++;
      setCartItems(cartItems);
    }
  };

  const removeFromCartHandle = (itemId) => {
    const index = cartItems.findIndex((item) => item.id === itemId);
    index !== -1 && cartItems.splice(index, 1);
    setCartItems(cartItems);
  };

  const increaseQuantityHandle = (itemId) => {
    setCartItems((prevState) =>
      prevState.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantityHandle = (itemId) => {
    // const index = cartItems.findIndex((item) => item.id === itemId);

    // if (index !== -1 && cartItems[index].quantity > 1) {
    //   cartItems[index].quantity--;
    // } else if (index !== -1 && cartItems[index].quantity === 1) {
    //   cartItems.splice(index, 1);
    // }

    setCartItems((prevState) =>
      prevState
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      {console.log("cartItems => ", cartItems)}
      <itemsContext.Provider
        value={{
          products: filteredProducts,
          loading,
          error,
          cartItems,
          addFiltersHandle,
          addToCartHandle,
          removeFromCartHandle,
          increaseQuantityHandle,
          decreaseQuantityHandle,
        }}
      >
        {children}
      </itemsContext.Provider>
    </>
  );
};
