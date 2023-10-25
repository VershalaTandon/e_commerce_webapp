import React, { useState } from "react";
import "./Login.css";
import { useAppSelector } from "../../redux";
import { Input } from "../../component/input/Input";
import { DefaultButton } from "../../component/button/DefaultButton";
import string from "../../constants/string";
import { useAppDispatch } from "../../redux";

import { useNavigate } from "react-router-dom";
import { Loader } from "../../component/loader/Loader";
import { loginApi, logoutApi, registerApi } from "../../api/userAPI";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginData = useAppSelector((state) => state.user.userData);

  const EmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const PhoneNumberRegex =
    /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(loginData ? loginData.email : "");
  const [name, setName] = useState(loginData ? loginData.name : "");
  const [mobileNo, setMobileNo] = useState(
    loginData ? loginData.mobileNumber : ""
  );
  const [password, setPassword] = useState("");

  const [registeredEmailStatus, setRegisteredEmailStatus] = useState(
    loginData ? "Done" : null
  );

  const reset = () => {
    setRegisteredEmailStatus(null);
    setEmail("");
    setName("");
    setMobileNo("");
    setPassword("");
  };

  const onFormSubmit = () => {
    if (email !== "" && EmailReg.test(email) === true) {
      if (
        registeredEmailStatus === null ||
        registeredEmailStatus === string.login.Login
      ) {
        const params = {
          email,
          password,
        };
        loginApi(
          dispatch,
          setLoading,
          params,
          loginData,
          setRegisteredEmailStatus,
          navigate
        );
      } else {
        if (validate()) {
          let params = {
            name,
            email,
            mobileNumber: mobileNo,
            password,
          };
          registerApi(
            setLoading,
            params,
            dispatch,
            setRegisteredEmailStatus,
            navigate
          );
        }
      }
    } else {
      alert(string.login.InvalidEmailError);
    }
  };

  const validate = () => {
    if (name === "") {
      alert("Name cannot be blank.");
      return false;
    } else if (
      mobileNo.length < 10 ||
      PhoneNumberRegex.test(mobileNo) === false
    ) {
      alert("Invalid Mobile ");
      return false;
    } else if (password === "") {
      alert("Password cannot be blank.");
      return false;
    }
    return true;
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='main'>
            <img
              src={require("../../assets/bannerImage1.png")}
              alt=''
              width={"300"}
            />
            <div className='logincontainer'>
              <div className='login'>
                <h2>{string.login.Login}</h2>
                <div className='or'>{<b>{string.login.Or}</b>}</div>
                <h2>{string.login.Signup}</h2>
              </div>
              <form>
                <Input
                  type='email'
                  placeholder={string.login.Email}
                  handleChange={(e) => setEmail(e.target.value)}
                  value={email}
                  isRequired={true}
                  disabled={
                    registeredEmailStatus === null || !loginData ? false : true
                  }
                />
                {(registeredEmailStatus === string.login.Signup ||
                  loginData) && (
                  <div>
                    <Input
                      type='text'
                      placeholder={string.login.Name}
                      handleChange={(e) => setName(e.target.value)}
                      value={name}
                      isRequired={true}
                      disabled={!loginData ? false : true}
                    />
                    <Input
                      type='tel'
                      placeholder={string.login.Mobile}
                      handleChange={(e) => setMobileNo(e.target.value)}
                      value={mobileNo}
                      isRequired={true}
                      disabled={!loginData ? false : true}
                    />
                  </div>
                )}
                {registeredEmailStatus !== null &&
                  registeredEmailStatus !== "Done" && (
                    <Input
                      type='password'
                      placeholder={string.login.Password}
                      handleChange={(e) => setPassword(e.target.value)}
                      value={password}
                      isRequired={true}
                      disabled={!loginData ? false : true}
                    />
                  )}
                {/* If loginin then show logout button */}
                {loginData ? (
                  <div>
                    <DefaultButton
                      styleType='bordered'
                      buttonType='reset'
                      title={string.login.Logout}
                      onPress={() =>
                        logoutApi(
                          setLoading,
                          loginData._id,
                          dispatch,
                          setRegisteredEmailStatus,
                          setEmail,
                          setName,
                          setMobileNo,
                          setPassword
                        )
                      }
                    />
                    <DefaultButton
                      styleType='bordered'
                      buttonType='button'
                      title={string.login.ManageAddress}
                      onPress={() =>
                        navigate("/addressList", { replace: true })
                      }
                    />
                  </div>
                ) : (
                  <div>
                    {/* signu/login button */}
                    <DefaultButton
                      styleType='bordered'
                      buttonType='submit'
                      title={
                        registeredEmailStatus === string.login.Login
                          ? string.login.Login
                          : string.login.Signup
                      }
                      onPress={() => onFormSubmit()}
                    />
                    {/* reset button */}
                    <DefaultButton
                      styleType='bordered'
                      buttonType='reset'
                      title={string.login.Reset}
                      onPress={() => reset()}
                    />
                  </div>
                )}
              </form>
            </div>

            <img
              src={require("../../assets/bannerImage2.png")}
              alt=''
              width={"300"}
            />
          </div>
        </div>
      )}
    </div>
  );
};
