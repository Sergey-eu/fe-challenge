import React from "react";

const Button = (props) => {

  const {
    type: type,
    text: text,
    onClick: onClick,
    disabled: disabled,
    className: className
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`mui-btn mui-btn--primary mui--pull-right ${className}`}
    >{text}</button>

  )
}

export default Button;
