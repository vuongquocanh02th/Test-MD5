import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", date: "", quantity: 0, categoryId: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then(res => setProduct(res.data));
    axios.get("http://localhost:5000/categories").then(res => setCategories(res.data));
  }, [id]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name.length > 100 || product.quantity <= 0) {
      alert("Invalid data!");
      return;
    }
    axios.put(`http://localhost:5000/products/${id}`, product)
      .then(() => {
        alert("Update Success!");
        navigate("/");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} />
      
      <label>Date of import:</label>
      <input type="date" name="date" value={product.date} onChange={handleChange} />
      
      <label>Quantity:</label>
      <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
      
      <label>Category:</label>
      <select name="categoryId" value={product.categoryId} onChange={handleChange}>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      
      <button type="submit">Update</button>
    </form>
  );
}

export default ProductForm;