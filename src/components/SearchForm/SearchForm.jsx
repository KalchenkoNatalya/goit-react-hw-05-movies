import React from 'react';

const SearchForm = ({ handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input type="text" name="search" required></input>
        <button tepe="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
