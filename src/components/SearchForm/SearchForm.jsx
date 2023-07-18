import React from 'react';
import css from './SearchForm.module.css';

const SearchForm = ({ handleSubmit }) => {
  return (
    <div className={css.search_form_wrap}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input
          className={css.search_form_input}
          type="text"
          name="search"
          required
        ></input>
        <button className={css.button_search} tepe="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
