import React from "react";
import "./DefaultButton.css";
import string from "../../constants/string";

export const DefaultButton = (props) => {
  const { styleType, buttonType, title, onPress, style } = props;
  return (
    <button
      type={buttonType}
      className={
        styleType === string.buttonType.Border
          ? "borderButton"
          : "noborderButton"
      }
      onClick={(e) => {
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
      style={style}>
      {title}
    </button>
  );
};
