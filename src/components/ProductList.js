import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      const sortedProducts = response.data.sort(
        (a, b) => a.quantity - b.quantity
      );
      setProducts(sortedProducts);
    });
    //Get category
    axios.get("http://localhost:5000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  //Find category name form category id
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => Number(c.id) === Number(categoryId));
    return category ? category.name : "Undefined";
  };

  return (
    <div>
      <h2>List Clothes</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date of import</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.date}</td>
              <td>{p.quantity}</td>
              <td>{getCategoryName(p.categoryId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
