import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from 'components/SearchButton/SearchButton';

import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit, isLoading }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputVal = e.target.elements.search.value.trim().toLowerCase();
    onSubmit(inputVal);
  };

  return (
    <header className={s.SearchBar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <input
          className={s.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <SearchButton isLoading={isLoading} />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  // hasQuery: PropTypes.bool,
};

export default Searchbar;
