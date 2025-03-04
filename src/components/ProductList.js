import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      const sortedProducts = response.data.sort(
        (a, b) => a.quantity - b.quantity
      );
      setProducts(sortedProducts);
      setFilteredProducts(response.data);
    });
    //Get category
    axios.get("http://localhost:5000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  //Find category name form category id
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (c) => Number(c.id) === Number(categoryId)
    );
    return category ? category.name : "Undefined";
  };

  //Search
  const handleSearch = (keyword, categoryId) => {
    let results = products;

    if (keyword) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (categoryId) {
      results = results.filter(
        (p) => Number(p.categoryId) === Number(categoryId)
      );
    }

    setFilteredProducts(results);
    setNotFound(results.length === 0);
  };

  return (
    <div className="container">
      <h2>List Clothes</h2>
      <Search onSearch={handleSearch} />
      {notFound ? (
        <p className="no-results">Product not found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date of import</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.date}</td>
                <td>{p.quantity}</td>
                <td>{getCategoryName(p.categoryId)}</td>
                <td>
                  <Link to={`/edit/${p.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
