import React from 'react';
import '../styles/OrderHistory.css';

function OrderHistory() {
  const orders = [
    { id: 1, date: '2024-12-01', total: '$120', status: 'Delivered' },
    { id: 2, date: '2024-11-25', total: '$80', status: 'Shipped' },
  ];

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
