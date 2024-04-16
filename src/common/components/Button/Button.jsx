import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { className, type, label, onClick, children } = props;

  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Button;
