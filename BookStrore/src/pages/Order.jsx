// Orders.js

import React from 'react';
import { useGlobalContext } from '../context.';

const Orders = () => {
  const { orders } = useGlobalContext();

  return (
    <div style={styles.ordersContainer}>
      <h2>Your Orders</h2>
      {orders && orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={styles.ordersList}>
          {orders.map((order, index) => (
            <li key={index} style={styles.orderItem}>
              <p>Order #{index + 1}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    <p>Title: {item.title}</p>
                   
                  </li>
                ))}
              </ul>
              <p>Total Price: ${calculateTotalPrice(order.items).toFixed(2)}</p>
              <button
                style={styles.viewOrderButton}
                onClick={() => console.log(`View Order ${index + 1}`)}
              >
                View Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + (item.price || 0), 0);
};

const styles = {
  ordersContainer: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  ordersList: {
    listStyle: 'none',
    padding: '0',
  },
  orderItem: {
    marginBottom: '20px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  viewOrderButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#6f6fff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Orders;
