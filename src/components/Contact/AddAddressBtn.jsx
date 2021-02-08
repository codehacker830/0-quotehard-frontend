import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT_ADDRESSES } from '../../constants/ActionTypes';
import { allLocationArrData } from '../../constants/Dump';

export default function AddAddressBtn() {
   const dispatch = useDispatch();
   const accountCompany = useSelector(state => state.auth.accountCompany);
   console.log(" DDDDDDDDDDDDDDDDDDDDDD ", accountCompany.location)
   console.log(" DDDDDDDDDDDDDDDDDDDDDD ", allLocationArrData[accountCompany.location])
   const addresses = useSelector(state => state.contactData.addresses);
   const handleClick = () => dispatch({ type: UPDATE_CONTACT_ADDRESSES, payload: [...addresses, { category: "primaryAddress", country: allLocationArrData[accountCompany.location - 1] }] })
   return (
      <div className="form-group">
         <button
            type="button"
            className="btn btn-light"
            onClick={handleClick}>
            <i className="fa fa-plus"></i> Add Address</button>
      </div>
   )
}
