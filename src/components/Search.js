import React, { useState, useEffect } from "react";
import axios from "axios";

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSearch = () => {
    onSearch(keyword, categoryId);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter product name"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">-- Select category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
