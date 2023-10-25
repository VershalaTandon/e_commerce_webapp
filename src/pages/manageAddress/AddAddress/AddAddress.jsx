import React, { useState } from "react";
import "../Address.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux";
import {
  saveAddress,
  setSelectedAddress,
} from "../../../redux/user/manageAddressSlice";
import { Loader } from "../../../component/loader/Loader";
import { Input } from "../../../component/input/Input";
import string from "../../../constants/string";
import { DefaultButton } from "../../../component";
import { saveAddressAPI } from "../../../api/userAPI";

export const AddAddress = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.user.userData);
  const { state } = useLocation();

  const PhoneNumberRegex =
    /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [aState, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("");

  const validate = () => {
    if (name === "") {
      alert("Name cannot be blank.");
      return false;
    } else if (
      mobileNo.length < 10 ||
      PhoneNumberRegex.test(mobileNo) === false
    ) {
      alert("Invalid Mobile.");
      return false;
    } else if (pincode.length < 6) {
      alert("Invalid Pincode.");
      return false;
    } else if (aState === "") {
      alert("State cannot be blank.");
      return false;
    } else if (city === "") {
      alert("City cannot be blank.");
      return false;
    } else if (address === "") {
      alert("Address cannot be blank.");
      return false;
    } else if (locality === "") {
      alert("Locality cannot be blank.");
      return false;
    } else if (type === "") {
      alert("Address Type cannot be blank.");
      return false;
    }
    return true;
  };

  const onAddressSave = async () => {
    if (validate()) {
      const params = {
        userId: loginData._id,
        name,
        mobileNumber: mobileNo,
        pincode,
        state: aState,
        address,
        locality,
        city,
        typeOfAddress: type,
      };
      saveAddressAPI(setLoading, dispatch, params, state, navigate);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className='addressmain'>
          <img
            src={require("../../../assets/bannerImage1.png")}
            alt=''
            width={"200"}
            height={"300"}
          />
          <div className='addresscontainer elementRight elementLeft'>
            <h3>Add New Address</h3>
            <form>
              <Input
                type='text'
                placeholder={string.login.Name}
                handleChange={(e) => setName(e.target.value)}
                value={name}
                isRequired={true}
              />
              <Input
                type='tel'
                placeholder={string.login.Mobile}
                handleChange={(e) => setMobileNo(e.target.value)}
                value={mobileNo}
                isRequired={true}
              />
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  height: 0.5,
                  marginTop: 20,
                }}
              />
              <div className='rowelement'>
                <div className='elementRight width'>
                  <Input
                    type='tel'
                    placeholder={string.address.Pincode}
                    handleChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    isRequired={true}
                  />
                </div>
                <div className='elementLeft width'>
                  <Input
                    type='text'
                    placeholder={string.address.State}
                    handleChange={(e) => setState(e.target.value)}
                    value={aState}
                    isRequired={true}
                  />
                </div>
              </div>
              <div className='rowelement'>
                <div className='elementRight width'>
                  <Input
                    type='text'
                    placeholder={string.address.City}
                    handleChange={(e) => setCity(e.target.value)}
                    value={city}
                    isRequired={true}
                  />
                </div>
                <div className='elementLeft width'>
                  <Input
                    type='text'
                    placeholder={string.address.Address}
                    handleChange={(e) => setAddress(e.target.value)}
                    value={address}
                    isRequired={true}
                  />
                </div>
              </div>
              <div className='rowelement'>
                <div className='elementRight width'>
                  <Input
                    type='text'
                    placeholder={string.address.Locality}
                    handleChange={(e) => setLocality(e.target.value)}
                    value={locality}
                    isRequired={true}
                  />
                </div>
                <div className='elementLeft width'>
                  <Input
                    type='text'
                    placeholder={string.address.AddressType}
                    handleChange={(e) => setType(e.target.value)}
                    value={type}
                    isRequired={true}
                  />
                </div>
              </div>

              <DefaultButton
                styleType='bordered'
                buttonType='submit'
                title={string.address.Save}
                onPress={() => onAddressSave()}
              />
            </form>
          </div>
          <img
            src={require("../../../assets/bannerImage2.png")}
            alt=''
            width={"200"}
            height={"300"}
          />
        </div>
      )}
    </div>
  );
};
