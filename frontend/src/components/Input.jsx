// input reusable component

import React, { useState, useEffect } from "react";

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`reusable_input__container ${isFocused ? "focused" : ""} ${
        isFilled ? "filled" : ""
      }`}
    >
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error && <div className={"error"}>{error}</div>}
    </div>
  );
};

export default Input;
