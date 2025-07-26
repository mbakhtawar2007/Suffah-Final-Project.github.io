import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setOrders([
        { id: 1, date: '2024-12-01', total: '$120', status: 'Delivered' },
        { id: 2, date: '2024-11-25', total: '$80', status: 'Shipped' },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="order-history" aria-labelledby="order-history-title">
      <h2 id="order-history-title">Your Orders</h2>

      {loading ? (
        <div className="loading" role="status" aria-live="polite">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="empty-state">You have no orders yet.</p>
      ) : (
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
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
                    <button
                      className="view-details"
                      aria-label={`View details for order ${order.id}`}
                      onClick={() => alert(`Order ${order.id} details coming soon!`)} // Placeholder action
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OrderHistory;
