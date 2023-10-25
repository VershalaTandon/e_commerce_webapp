import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { CurrencyInr, Star } from "phosphor-react";
import { DefaultButton } from "../../component";
import string from "../../constants/string";
import { Loader } from "../../component/loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addToCartAPI } from "../../api/addToCartAPI";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const loginData = useAppSelector((state) => state.user.userData);
  const cartData = useAppSelector(
    (state) => state.productsOrder.addToCart.data
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addToCartStatus, setAddToCartStatus] = useState(false);

  const {
    _id,
    brand,
    title,
    mrpPrice,
    discount,
    sellingPrice,
    images,
    productDetails,
    rating,
    returnPolicy,
    sellerDetails,
    sizeAvailable,
  } = state;

  useEffect(() => {
    // On size selection, check if same product with same size already aaded to card then only update the count.
    const checkCartProduct = cartData?.productData?.find(
      (product) =>
        product.productId === _id && product.sizeSelected.size === selectedSize
    );
    if (checkCartProduct) {
      setCount(checkCartProduct.sizeSelected.count + 1);
    }
  }, [selectedSize]);

  const addToCart = async () => {
    if (loginData) {
      if (selectedSize === "") {
        alert("Please select the size.");
      } else {
        const params = {
          userId: loginData._id,
          productData: [
            {
              productId: _id,
              sizeSelected: { size: selectedSize, count },
              mrpPrices: mrpPrice,
              sellingPrice,
              orderStatus: "Pending",
            },
          ],
          cartStatus: "Pending",
        };
        addToCartAPI(setLoading, dispatch, params, setAddToCartStatus);
      }
    } else {
      alert("You need to login to add this product in your cart.");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='detailscontainer display'>
            {/* images */}
            <div className='images'>
              {images.map((image) => (
                <div className='image'>
                  <img src={image} alt='' />
                </div>
              ))}
            </div>

            <div className='productDetails'>
              {/* brand */}
              <h2 className='brand'>{brand}</h2>
              {/* title */}
              <div className='title'>{title}</div>
              {/* rating */}
              <div className='rating display'>
                <div className='title'>{rating}</div>
                <div className='ratingStar'>
                  <Star size={15} />
                </div>
              </div>
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  height: 0.5,
                }}
              />
              {/* pricing */}
              <div className='pricing'>
                <CurrencyInr size={15} />
                <div className='title'>{sellingPrice}</div>
                {sellingPrice !== mrpPrice && (
                  <div className='pricing'>
                    <div className='title'>{string.productDetails.MRP}</div>
                    <CurrencyInr size={15} />
                    <div className='title'>{mrpPrice}</div>
                    <div className='title'>{`(${discount}% OFF)`}</div>
                  </div>
                )}
              </div>
              {/* size */}
              <div className='sizeChart'>
                <div className='title'>{string.productDetails.SelectSize}</div>
                <div className='selectSize display'>
                  {sizeAvailable.map((size) => (
                    <div>
                      <button
                        className={
                          selectedSize === size.size
                            ? "selectedsize"
                            : size.count > 0
                            ? "size"
                            : "unavailablesize"
                        }
                        onClick={() => {
                          if (size.count > 0) {
                            setSelectedSize(size.size);
                          } else {
                            alert("Size unavailable");
                          }
                        }}>
                        {size.size}
                      </button>
                      {size.count < 5 && size.count !== 0 && (
                        <div className='titlesmall'>{`${size.count} Left`}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* product details */}
              <h5 className='title'>{string.productDetails.ProductDetails}</h5>
              <div
                className='title'
                dangerouslySetInnerHTML={{ __html: productDetails }}
              />
              {/* return policy */}
              <div className='returnPolicy'>
                <div className='title'>
                  <b>{string.productDetails.ReturnPolicy}</b>
                </div>
                <div className='title'>{returnPolicy}</div>
              </div>
              {/* seller details */}
              <div className='returnPolicy'>
                <div className='title'>
                  <b>{string.productDetails.SellerDetails}</b>
                </div>
                <div className='title'>{sellerDetails}</div>
              </div>
              <DefaultButton
                title={
                  addToCartStatus
                    ? string.productDetails.GoTOCart
                    : string.productDetails.AddToCart
                }
                styleType='bordered'
                buttonType='submit'
                onPress={() =>
                  addToCartStatus
                    ? navigate("/cart", {
                        replace: true,
                      })
                    : addToCart()
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
