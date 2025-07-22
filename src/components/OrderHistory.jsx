

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
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
    <section className="order-history" aria-label="Order History">
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
                  <button className="view-details" aria-label={`View details for order ${order.id}`}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OrderHistory;
