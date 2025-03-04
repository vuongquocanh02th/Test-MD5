import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams(); // Get Id from URL
  const navigate = useNavigate();

  // Save product info
  const [product, setProduct] = useState({
    name: "",
    date: "",
    quantity: "",
    categoryId: ""
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get product by Id
    axios.get(`http://localhost:5000/products/${id}`).then((res) => {
      setProduct(res.data);
    });

    // Get Category
    axios.get("http://localhost:5000/categories").then((res) => {
      setCategories(res.data);
    });
  }, [id]);

  // Handle when input form
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle when submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate before update
    if (product.name.length > 100) {
      alert("Product name must not > 100 characters!");
      return;
    }

    if (new Date(product.date) > new Date()) {
      alert("Input date must not > current date!");
      return;
    }

    if (product.quantity <= 0 || !Number.isInteger(Number(product.quantity))) {
      alert("Quantity must be integer > 0!");
      return;
    }

    // Update data to `db.json`
    axios.put(`http://localhost:5000/products/${id}`, product)
      .then(() => {
        alert("Update success!");
        navigate("/"); // Back to product list
      })
      .catch((error) => {
        alert("Error updating!");
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Date of import:</label>
        <input type="date" name="date" value={product.date} onChange={handleChange} required />

        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />

        <label>Category:</label>
        <select name="categoryId" value={product.categoryId} onChange={handleChange} required>
          <option value="">-- Select category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;