import React from 'react';

const Button = (props) => {

  const {
    type,
    text,
    onClick,
    disabled,
    className
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`mui-btn mui-btn--primary mui--pull-right ${className || ''}`}
    >{text}</button>

  )
}

export default Button;
