import React, { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { Loader } from "../../component/loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux";
import string from "../../constants/string";
import { DefaultButton } from "../../component";
import { CurrencyInr } from "phosphor-react";
import { Input } from "../../component/input/Input";
import {
  getAddToCartListAPI,
  placeOrderAPI,
  updateCartDataAPI,
} from "../../api/addToCartAPI";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.user.userData);
  const addressData = useAppSelector(
    (state) => state.shippingAddress.selectedAddress
  );
  const productList = useAppSelector(
    (state) => state.products.product.productList
  );

  const [paymentMode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [addToCartList, setAddToCartList] = useState(undefined);
  useEffect(() => {
    if (loginData) {
      getAddToCartListAPI(
        "Cart",
        setLoading,
        dispatch,
        loginData._id,
        setAddToCartList
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;
    setPaymentMode(name);
  };
  const incrementProductCount = (productData, sizeSelected) => {
    // call update cart api
    const count = sizeSelected.count + 1;
    const params = {
      userId: loginData._id,
      productData: [
        {
          productId: productData._id,
          sizeSelected: {
            size: sizeSelected.size,
            count,
          },
          mrpPrices: productData.mrpPrice * count,
          sellingPrice: productData.sellingPrice * count,
          orderStatus: "Pending",
        },
      ],
      cartStatus: "Pending",
    };
    updateCartDataAPI(setLoading, dispatch, params, "Cart", setAddToCartList);
  };

  const decrementProductCount = (productData, sizeSelected) => {
    const count = sizeSelected.count - 1;
    const params = {
      userId: loginData._id,
      productData: [
        {
          productId: productData._id,
          sizeSelected: {
            size: sizeSelected.size,
            count,
          },
          mrpPrices: productData.mrpPrice / sizeSelected.count,
          sellingPrice: productData.sellingPrice / sizeSelected.count,
          orderStatus: "Pending",
        },
      ],
      cartStatus: "Pending",
    };
    console.log(params);
    // call update cart api
    updateCartDataAPI(setLoading, dispatch, params, "Cart", setAddToCartList);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='cart'>
            <div>
              <h2>Your Cart Items</h2>
            </div>

            <div className='cart'>
              {addToCartList ? (
                <div>
                  <div className='bordercontainer'>
                    <div
                      style={{
                        display: "flex",
                      }}>
                      <p>
                        <b>Delivered to:</b>
                      </p>
                      <div style={{ marginLeft: 10 }}>
                        <p style={{ fontSize: 15, textAlign: "left" }}>
                          {addressData?.name}
                        </p>

                        <p
                          style={{
                            fontSize: 15,
                            textAlign: "left",
                            marginTop: -15,
                          }}>
                          {`${addressData?.typeOfAddress} - ${addressData?.address}, ${addressData?.locality}, ${addressData?.city} ${addressData?.state} - ${addressData?.pincode}`}
                        </p>
                        <p
                          style={{
                            fontSize: 15,
                            textAlign: "left",
                            marginTop: -15,
                          }}>{`Mobile: ${addressData?.mobileNumber}`}</p>
                      </div>
                    </div>
                    <div className='removemargin'>
                      <DefaultButton
                        styleType='bordered'
                        buttonType='button'
                        title={
                          addressData
                            ? string.address.ChangeAddress
                            : string.address.AddAddress
                        }
                        onPress={() =>
                          addressData
                            ? navigate("/addressList", {
                                replace: true,
                                state: true,
                              })
                            : navigate("/addAddress", {
                                replace: true,
                                state: true,
                              })
                        }
                      />
                    </div>
                  </div>
                  <div className='orderdetails'>
                    <div style={{ width: "70%" }}>
                      {addToCartList?.productData.map((product) => {
                        const productData = productList.find(
                          (item) => item._id === product.productId
                        );
                        console.log(product);
                        if (product.sizeSelected.count > 0) {
                          return (
                            <div key={product._id}>
                              <CartItem
                                data={product}
                                productData={productData}
                                decrementProductCount={(
                                  productData,
                                  sizeSelected
                                ) =>
                                  decrementProductCount(
                                    productData,
                                    sizeSelected
                                  )
                                }
                                incrementProductCount={(
                                  productData,
                                  sizeSelected
                                ) =>
                                  incrementProductCount(
                                    productData,
                                    sizeSelected
                                  )
                                }
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div style={{ width: "20%" }}>
                      <div className='bordercontainer orderDetailsHeight'>
                        <p>{`Price Details (${addToCartList?.productData.length} item)`}</p>
                        <div className='billing space'>
                          <p>Total MRP</p>
                          <div className='display'>
                            <CurrencyInr
                              size={15}
                              style={{ marginTop: 18, marginLeft: 20 }}
                            />
                            <p>{`${addToCartList?.orderAmountSummary.totalMRP}`}</p>
                          </div>
                        </div>

                        <div className='billing space'>
                          <p>Discount on MRP</p>
                          <div className='display'>
                            <CurrencyInr
                              size={15}
                              style={{ marginTop: 18, marginLeft: 20 }}
                            />
                            <p>
                              {addToCartList?.orderAmountSummary.discountMRP}
                            </p>
                          </div>
                        </div>

                        <div className='billing space'>
                          <p>Total Amount</p>
                          <div className='display'>
                            <CurrencyInr
                              size={15}
                              style={{ marginTop: 18, marginLeft: 20 }}
                            />
                            <p>
                              {addToCartList?.orderAmountSummary.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ marginTop: 10, height: "30%" }}
                        className='bordercontainer orderDetailsHeight'>
                        <p>Select Payment Mode</p>

                        <div style={{ flex: 1, alignSelf: "flex-start" }}>
                          <Input
                            type='radio'
                            name='Card'
                            placeholder=''
                            handleChange={(e) => handleChange(e)}
                            value={paymentMode}
                            isRequired={false}
                            style={{ display: "flex" }}
                            checked={paymentMode === "Card"}
                          />
                          <Input
                            type='radio'
                            name='Cash On Delivery'
                            placeholder=''
                            handleChange={(e) => handleChange(e)}
                            value={paymentMode}
                            isRequired={false}
                            style={{ display: "flex" }}
                            checked={paymentMode === "Cash On Delivery"}
                          />
                        </div>

                        <DefaultButton
                          styleType='bordered'
                          buttonType='submit'
                          title={string.productDetails.PlaceOder}
                          onPress={() =>
                            paymentMode === ""
                              ? alert("Please select payment mode")
                              : placeOrderAPI(
                                  loginData._id,
                                  setLoading,
                                  dispatch,
                                  navigate
                                )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className='norecords'>
                  <b>{loginData ? string.NoRecords : string.NeedToLogin}</b>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
