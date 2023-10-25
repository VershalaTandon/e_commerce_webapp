import React from "react";
import { useNavigate } from "react-router-dom";
import string from "../../constants/string";

export const Product = (props) => {
  const navigate = useNavigate();
  const { brand, title, sellingPrice, images } = props.data;

  return (
    <div
      className='product'
      onClick={() => {
        navigate("/productDetails", { replace: true, state: props.data });
      }}>
      <img src={images[0]} alt='' />
      <div>
        <p>
          <b>{brand}</b>
        </p>
        <div className='producttitle'>
          <p>{title}</p>
          <p>
            {" "}
            {string.home.Rs}
            {sellingPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
