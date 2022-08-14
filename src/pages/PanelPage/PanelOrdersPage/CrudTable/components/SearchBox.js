import React from "react";

const SearchBox = ({ searchHandler }) => {
  const handleSearchInputChange = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <form className="search">
      <input
        onChange={handleSearchInputChange}
        type="text"
        placeholder="جست و جو..."
      />
    </form>
  );
};

export default SearchBox;
