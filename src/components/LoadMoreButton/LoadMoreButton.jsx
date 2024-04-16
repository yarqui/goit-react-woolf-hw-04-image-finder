import PropTypes from 'prop-types';
import Button from 'common/components/Button/Button';
import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className={s.LoadMoreBtnWrap}>
      <Button
        className={s.LoadMoreBtn}
        type="button"
        label="Load more"
        onClick={onClick}
      />
    </div>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
