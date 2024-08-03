import React from "react";
import { useItems } from "../../customContexts/itemsContext";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import orderStyles from "./index.module.css";
// use loader after adding firestore

export const Orders = () => {
  const { orders, loading } = useItems();

  const formatDate = (seconds) => {
    const date = new Date(seconds * 1000);
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  return (
    <div className={orderStyles.container}>
      <h1 className={orderStyles.h1}>Your Orders</h1>
      {loading ? (
        <LoaderSpinner />
      ) : orders.length === 0 ? (
        <h1 className={orderStyles.noOrdersMessage}>
          No Previous Orders... Order some!
        </h1>
      ) : (
        orders.map((order) => (
          <div className={orderStyles.orderContainer} key={order.id}>
            <h2 className={orderStyles.h3}>
              Ordered On:{" "}
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
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData}></td>
                  <td className={orderStyles.spcData} colSpan={4}>
                    ₹ {order.total}
                  </td>
                </tr>
                <tr className={orderStyles.autoHeight}></tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};
