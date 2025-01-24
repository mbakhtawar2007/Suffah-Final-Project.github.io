import React, { useState, useEffect } from 'react';
import '../styles/OrderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching data
    setTimeout(() => {
      setOrders([
        { id: 1, date: '2024-12-01', total: '$120', status: 'Delivered' },
        { id: 2, date: '2024-11-25', total: '$80', status: 'Shipped' },
      ]);
      setLoading(false);
    }, 1500); // Simulate 1.5s loading time
  }, []);

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="empty-state">You have no orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button className="view-details">View Details</button>
                  {/* Add more actions, like Reorder or Track Status */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
