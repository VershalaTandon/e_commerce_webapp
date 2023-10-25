import React from "react";
import string from "../../constants/string";
import { DefaultButton } from "../../component";

export const Address = (props) => {
  const {
    name,
    address,
    locality,
    city,
    state,
    pincode,
    typeOfAddress,
    defaultStatus,
    mobileNumber,
  } = props.data;
  const index = props.index;
  const addressSelectionState = props.addressSelectionState;
  const selectOnPress = props.selectOnPress;

  return (
    <div className='addresscontent'>
      {defaultStatus ? (
        <div className='addresstitle'>Default Address</div>
      ) : index === 1 ? (
        <div className='addresstitle'>Other Adress</div>
      ) : null}
      <div className='addressblock'>
        <div className='header'>
          <div className='addresstitle'>{name}</div>
          {addressSelectionState && (
            <div className='removetopmargin'>
              <DefaultButton
                styleType='bordered'
                buttonType='button'
                title={string.address.SelectAddress}
                onPress={() => selectOnPress(props.data)}
              />
            </div>
          )}
        </div>
        <div className='addresstitle'>{address}</div>
        <div className='addresstitle'>{locality}</div>
        <div className='addresstitle'>{city}</div>
        <div className='addresstitle'>{`${state} - ${pincode}`}</div>
        <div className='addresstitle margin'>{`Mobile: ${mobileNumber}`}</div>
        <div className='addresstitle margin'>{`Address Type: ${typeOfAddress}`}</div>
      </div>
    </div>
  );
};
