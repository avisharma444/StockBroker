import React from 'react'
import './SearchBar.css'
const SearchBar = () => {
  return (
    <div>
      <input
          type="text"
          placeholder="Search for Stocks here"
          value={searchTerm}
          onChange={handleSearchChange}
        />
    </div>
  )
}

export default SearchBar
