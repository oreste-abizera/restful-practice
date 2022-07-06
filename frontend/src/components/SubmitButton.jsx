// reusable subbmit button component
//
import React, { useState, useEffect } from "react";

const SubmitButton = ({
  type = "submit",
  value,
  onClick,
  isFocused,
  isFilled,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [isFocused]);

  return (
    <div
      className={`reusable_submit_button__container ${
        isHovered ? "hovered" : ""
      }`}
    >
      <button
        type={type}
        value={value}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        {value}
      </button>
    </div>
  );
};

export default SubmitButton;
