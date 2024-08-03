import { useItems } from "../../customContexts/itemsContext";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import orderStyles from "./index.module.css";

/**
 * JSX component to render the list of user orders.
 * This component displays the orders of the user, handles loading state, and shows an appropriate message if there are no orders.
 * @returns JSX - Orders page
 */
export const Orders = () => {
  // destructure orders and loading state from useItems context (custom hook)
  const { orders, loading } = useItems();

  /**
   * Format a timestamp in seconds to a human-readable date string.
   * @param {number} seconds - The timestamp in seconds
   * @returns {string} - Formatted date string in YYYY-MM-DD format
   */
  const formatDate = (seconds) => {
    // convert seconds to milliseconds and create a Date object
    const date = new Date(seconds * 1000);

    // add leading zero for single-digit days and months
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  return (
    <div className={orderStyles.container}>
      <h1 className={orderStyles.h1}>Your Orders</h1>

      {/* conditionally render content based on loading and orders state */}
      {loading ? (
        <LoaderSpinner />
      ) : orders.length === 0 ? (
        <h1 className={orderStyles.noOrdersMessage}>
          No Previous Orders... Order some!
        </h1>
      ) : (
        // map through orders and display each order
        orders.map((order) => (
          <div className={orderStyles.orderContainer} key={order.id}>
            <h2 className={orderStyles.h3}>
              Ordered On: {/* format and display the order date */}
              {order.timestamp && formatDate(order.timestamp.seconds)}
            </h2>
            <table className={orderStyles.table}>
              <thead className={orderStyles.tableHead}>
                <tr className={orderStyles.row}>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {/* map through items in the order and display each item */}
                {order.items.map((item) => (
                  <tr className={orderStyles.row} key={item.id}>
                    <td className={orderStyles.data}>{item.title}</td>
                    <td className={orderStyles.data}>₹ {item.price}</td>
                    <td className={orderStyles.data}>{item.quantity}</td>
                    <td className={orderStyles.data}>
                      ₹ {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
                <tr className={orderStyles.row}>
                  {/* empty cells for spacing */}
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData} colSpan={4}>
                    ₹ {order.total}
                  </td>
                </tr>
                {/* extra row for automatic height adjustment */}
                <tr className={orderStyles.autoHeight}></tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};
