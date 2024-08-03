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

const itemsContext = createContext();
export const useItems = () => useContext(itemsContext);

const getData = async () => {
  try {
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

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
    setLoading(true);
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

  useEffect(() => {
    setLoading(true);

    const categorySet = new Set();
    products &&
      products.forEach((product) => categorySet.add(product.category));
    setCategories(Array.from(categorySet));
    setLoading(false);
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

  // Firestore Operations
  const updateCartFirestore = async (cartItems) => {
    try {
      await setDoc(doc(db, "cart", currentUser), { cartItems });
    } catch (error) {
      console.log("Error updating cart in Firestore:", error);
    }
  };

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
