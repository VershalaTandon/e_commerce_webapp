import { CurrencyInr } from "phosphor-react";
import React from "react";
import string from "../../constants/string";

export const CartItem = (props) => {
  const { mrpPrices, sellingPrice, sizeSelected } = props.data;
  const productData = props.productData;
  const incrementProductCount = props.incrementProductCount;
  const decrementProductCount = props.decrementProductCount;

  return (
    <div className='cartItem'>
      <img src={productData && productData.images[0]} />
      <div className='description'>
        <h3>{productData.brand}</h3>
        <p>{productData.title}</p>
        <div className='cartpricing'>
          <CurrencyInr size={15} />
          <div className='margin'>{`${sellingPrice},`}</div>
          <div className='margin'>{`${string.productDetails.MRP} -`}</div>
          <CurrencyInr size={15} />
          <div className='margin'>{`${mrpPrices},`}</div>
          <div className='margin'>{`${mrpPrices - sellingPrice} OFF`}</div>
        </div>
        <div className='countHandler'>
          <p>{`Size: ${sizeSelected.size}`}</p>
          <button
            className='button'
            onClick={() => decrementProductCount(productData, sizeSelected)}>
            -
          </button>
          <p>{` Qty: ${sizeSelected.count}`}</p>
          <button
            className='button'
            onClick={() => incrementProductCount(productData, sizeSelected)}>
            +
          </button>
        </div>
        <p>{productData.returnPolicy}</p>
      </div>
    </div>
  );
};
