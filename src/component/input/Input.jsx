import React from "react";
import "./Input.css";

export const Input = (props) => {
  const {
    name,
    type,
    placeholder,
    handleChange,
    value,
    isRequired,
    disabled,
    style,
    checked,
  } = props;
  return (
    <div style={style}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(value) => handleChange(value)}
        value={value}
        required={isRequired}
        className={name ? "" : "input"}
        disabled={disabled}
        checked={checked}
      />
      {type === "radio" && name}
    </div>
  );
};
