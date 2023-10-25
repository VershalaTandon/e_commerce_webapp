import React, { useEffect, useState } from "react";
import "../Address.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setSelectedAddress } from "../../../redux/user/manageAddressSlice";
import { Loader } from "../../../component/loader/Loader";
import string from "../../../constants/string";
import { DefaultButton } from "../../../component";
import { Address } from "../Address";
import { getUserAddressData } from "../../../api/userAPI";

export const AddressList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.user.userData);

  const [loading, setLoading] = useState(false);
  const [addressList, setAddresasList] = useState([]);

  useEffect(() => {
    getUserAddressData(
      setLoading,
      dispatch,
      loginData._id,
      "AddressList",
      navigate,
      setAddresasList
    );
  }, []);

  const selectOnPress = async (selectedAddress) => {
    await dispatch(setSelectedAddress(selectedAddress));
    navigate("/cart", { replace: true });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className='addresscontainer'>
          <div className='rowelement'>
            <div className='elementRight textalignment'>
              <h3>Saved Addresses</h3>
            </div>
            <div className='elementLeft'>
              <DefaultButton
                styleType='bordered'
                buttonType='button'
                title={string.address.AddAddress}
                onPress={() =>
                  navigate("/addAddress", { replace: true, state })
                }
              />
            </div>
          </div>

          {addressList.map((item, index) => (
            <div key={item._id}>
              <Address
                data={item}
                index={index}
                addressSelectionState={state}
                selectOnPress={(data) => selectOnPress(data)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
