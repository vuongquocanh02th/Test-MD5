import React, { useState } from "react";

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <input type="text" placeholder="Enter product name" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={() => onSearch(keyword)}>Search</button>
    </div>
  );
}

export default Search;