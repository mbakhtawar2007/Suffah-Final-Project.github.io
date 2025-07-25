const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p><strong>Price:</strong> ${product.price}</p>
      <p>{product.description}</p>
      <div className="buttons">
        <button onClick={() => onEdit(product)}>✏️ Edit</button>
        <button onClick={() => onDelete(product._id)} className="danger">🗑️ Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
