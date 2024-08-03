import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../config/firestore.config";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { notifySuccess, notifyInfo, notifyDanger } from "../components/Toaster";
import { useAuth } from "./authContext";

// create a context for items management
const itemsContext = createContext();

// custom hook to use the items context
export const useItems = () => useContext(itemsContext);

/**
 * Fetches data from a remote API (fake store API)
 * @returns {Promise<Array>} - A promise that resolves to an array of products
 */
const getData = async () => {
  try {
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Provider component for items context
 * @param {*} param - Contains children components that will have access to the items context
 * @returns JSX - Provides items context to its children
 */
export const ItemsContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);

  /**
   * Fetches product data from the API and updates the state.
   * This effect runs once when the component mounts.
   */
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

  /**
   * Fetches orders and cart items for the current user from Firestore.
   * This effect runs whenever `currentUser` changes.
   */
  useEffect(() => {
    setLoading(true);

    // fetch orders from Firestore
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser)
        );
        const querySnapshot = await getDocs(q);
        const ordersFetched = [];
        querySnapshot.forEach((doc) => {
          ordersFetched.push({ id: doc.id, ...doc.data() });
        });

        setOrders(ordersFetched);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders from firestore\n", error);
        setLoading(false);
        setError(error);
      }
    };

    // fetch cart items from Firestore
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const docRef = doc(db, "cart", currentUser);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const cartData = docSnap.data().cartItems;
            setCartItems(cartData);
            const total = cartData.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            setTotalPrice(total.toFixed(2));
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error(error.message);
      }
    };

    fetchOrders();
    fetchCartItems();
  }, [currentUser]);

  /**
   * Updates the list of categories based on the fetched products.
   * This effect runs whenever `products` changes.
   */
  useEffect(() => {
    setLoading(true);

    const categorySet = new Set();
    products &&
      products.forEach((product) => categorySet.add(product.category));
    setCategories(Array.from(categorySet));
    setLoading(false);
  }, [products]);

  /**
   * Applies filters to the products and updates the filtered products state.
   * @param {Array} filters - Array of selected category filters.
   * @param {number} filterPrice - Maximum price to filter products.
   */
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

  /**
   * Updates the cart items in Firestore.
   * @param {Array} cartItems - Array of cart items to update.
   */
  const updateCartFirestore = async (cartItems) => {
    try {
      await setDoc(doc(db, "cart", currentUser), { cartItems });
    } catch (error) {
      console.log("Error updating cart in Firestore:", error);
    }
  };

  /**
   * Adds an item to the cart and updates the Firestore and state.
   * @param {string} itemId - ID of the item to add to the cart.
   */
  const addToCartHandle = (itemId) => {
    const newItem = products.find((item) => item.id === itemId);

    setCartItems((prevCartItems) => {
      const index = prevCartItems.findIndex((item) => item.id === itemId);
      let updatedCartItems;

      if (index === -1) {
        newItem.quantity = 1;
        updatedCartItems = [...prevCartItems, newItem];
        setTotalPrice((prevPrice) =>
          (parseFloat(prevPrice) + parseFloat(newItem.price)).toFixed(2)
        );
      } else {
        updatedCartItems = prevCartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setTotalPrice((prevPrice) =>
          (parseFloat(prevPrice) + parseFloat(newItem.price)).toFixed(2)
        );
      }

      updateCartFirestore(updatedCartItems);
      notifySuccess("Item added to cart!");
      return updatedCartItems;
    });
  };

  /**
   * Removes an item from the cart and updates the Firestore and state.
   * @param {string} itemId - ID of the item to remove from the cart.
   */
  const removeFromCartHandle = (itemId) => {
    setCartItems((prevCartItems) => {
      const index = prevCartItems.findIndex((item) => item.id === itemId);
      let updatedCartItems = prevCartItems;

      if (index !== -1) {
        const itemToRemove = prevCartItems[index];
        setTotalPrice((prevPrice) =>
          (
            parseFloat(prevPrice) -
            parseFloat(itemToRemove.price) * itemToRemove.quantity
          ).toFixed(2)
        );
        updatedCartItems = prevCartItems.filter((item) => item.id !== itemId);
      }

      updateCartFirestore(updatedCartItems);
      notifyDanger("Item removed from cart!");
      return updatedCartItems;
    });
  };

  /**
   * Increases the quantity of an item in the cart and updates the Firestore and state.
   * @param {string} itemId - ID of the item to increase quantity for.
   */
  const increaseQuantityHandle = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      const item = updatedCartItems.find((item) => item.id === itemId);
      setTotalPrice((prevPrice) =>
        (parseFloat(prevPrice) + parseFloat(item.price)).toFixed(2)
      );

      updateCartFirestore(updatedCartItems);
      notifyInfo("Item quantity increased!");
      return updatedCartItems;
    });
  };

  /**
   * Decreases the quantity of an item in the cart and updates the Firestore and state.
   * @param {string} itemId - ID of the item to decrease quantity for.
   */
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

      updateCartFirestore(updatedCartItems);
      notifyInfo("Item quantity decreased!");
      return updatedCartItems;
    });
  };

  /**
   * Creates a new order and adds it to Firestore.
   * @returns {Promise<boolean>} - A promise that resolves to true if the order was placed successfully, false otherwise.
   */
  const createOrderHandle = async () => {
    try {
      if (cartItems.length === 0) {
        notifyDanger("The cart is empty!");
        return false;
      }

      await addDoc(collection(db, "orders"), {
        userId: currentUser,
        items: cartItems,
        total: totalPrice,
        timestamp: new Date(),
      });
      notifySuccess("Order Placed!");
      return true;
    } catch (error) {
      console.log("Error creating order in Firestore:", error);
    }
  };

  /**
   * Handles the purchase process: creates an order, clears the cart, and updates Firestore.
   * @returns {Promise<void>}
   */
  const purchaseHandle = async () => {
    const isOrderPlaced = await createOrderHandle();
    if (isOrderPlaced) {
      setCartItems([]);
      setTotalPrice(0);
      await updateCartFirestore([]);
      notifySuccess("Purchase Confirmed!");
    }
  };

  return (
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
  );
};
