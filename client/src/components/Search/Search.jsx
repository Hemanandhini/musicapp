import React from "react";


const Search = ({ searchTerm, onSearch }) => {
  return (
    <input className="search" placeholder="Search for songs"
    value={searchTerm} onChange={(e) => onSearch(e)}/>
  );
};

export default Search;
