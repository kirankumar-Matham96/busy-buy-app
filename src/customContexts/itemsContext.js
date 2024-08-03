import React, { useState, useEffect, createContext, useContext } from "react";
import {
  notifySuccess,
  notifyInfo,
  notifyWarning,
  notifyDanger,
} from "../components/Toaster";
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
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    const categorySet = new Set();
    products &&
      products.forEach((product) => categorySet.add(product.category));
    setCategories(Array.from(categorySet));
  }, [products]);

  const addFiltersHandle = (filters, filterPrice) => {
    const filtered = products.filter((product) =>
      filters.length > 0
        ? filters.includes(product.category.toLowerCase())
        : products
    );
    setFilteredProducts(
      filtered.filter((product) => product.price <= filterPrice)
    );
  };

  const addToCartHandle = (itemId) => {
    const newItem = products.find((item) => item.id === itemId);

    setCartItems((prevCartItems) => {
      const index = prevCartItems.findIndex((item) => item.id === itemId);

      if (index === -1) {
        newItem.quantity = 1;
        setTotalPrice((prevPrice) =>
          (parseFloat(prevPrice) + parseFloat(newItem.price)).toFixed(2)
        );
        return [...prevCartItems, newItem];
      } else {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setTotalPrice((prevPrice) =>
          (parseFloat(prevPrice) + parseFloat(newItem.price)).toFixed(2)
        );
        return updatedCartItems;
      }
    });

    // toast here
    notifySuccess("Item added to cart!");
  };

  const removeFromCartHandle = (itemId) => {
    setCartItems((prevCartItems) => {
      const index = prevCartItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        const itemToRemove = prevCartItems[index];
        setTotalPrice((prevPrice) =>
          (
            parseFloat(prevPrice) -
            parseFloat(itemToRemove.price) * itemToRemove.quantity
          ).toFixed(2)
        );
        return prevCartItems.filter((item) => item.id !== itemId);
      }
      return prevCartItems;
    });
    notifyDanger("Item removed from cart!");
  };

  const increaseQuantityHandle = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      const item = updatedCartItems.find((item) => item.id === itemId);
      setTotalPrice((prevPrice) =>
        (parseFloat(prevPrice) + parseFloat(item.price)).toFixed(2)
      );
      return updatedCartItems;
    });
    notifyInfo("Item quantity increased!");
  };

  const decreaseQuantityHandle = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      const item = prevCartItems.find((item) => item.id === itemId);
      setTotalPrice((prevPrice) =>
        (parseFloat(prevPrice) - parseFloat(item.price)).toFixed(2)
      );
      return updatedCartItems;
    });
    notifyInfo("Item quantity decreased!");
  };

  const createOrderHandle = () => {
    setOrders([
      ...orders,
      {
        id: orders.length + 1,
        items: cartItems,
        total: totalPrice,
        timestamp: new Date(),
      },
    ]);
  };

  const purchaseHandle = () => {
    createOrderHandle();
    setCartItems([]);
    setTotalPrice(0);
    notifySuccess("Purchase Confirmed!");
  };

  return (
    <>
      <itemsContext.Provider
        value={{
          products: filteredProducts,
          loading,
          error,
          categories,
          cartItems,
          totalPrice,
          orders,
          addFiltersHandle,
          addToCartHandle,
          removeFromCartHandle,
          increaseQuantityHandle,
          decreaseQuantityHandle,
          purchaseHandle,
        }}
      >
        {children}
      </itemsContext.Provider>
    </>
  );
};
