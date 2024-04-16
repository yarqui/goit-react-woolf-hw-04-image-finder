import PropTypes from 'prop-types';

import Button from 'common/components/Button/Button';
import Spinner from 'components/Spinner/Spinner';

import { CiSearch } from 'react-icons/ci';

import s from './SearchButton.module.css';

const SearchButton = ({ isLoading }) => {
  return (
    <Button className={s.SearchFormButton} type="submit">
      {isLoading ? <Spinner /> : <CiSearch className={s.SearchFormIcon} />}
    </Button>
  );
};

SearchButton.prototype = {
  isLoading: PropTypes.bool,
};

export default SearchButton;
