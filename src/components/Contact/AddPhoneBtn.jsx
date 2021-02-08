import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT_PHONES } from '../../constants/ActionTypes'

export default function AddPhoneBtn() {
   const dispatch = useDispatch();
   const phones = useSelector(state => state.contactData.phones);
   const handleClick = () => dispatch({ type: UPDATE_CONTACT_PHONES, payload: [...phones, { category: "primaryPhone" }] });
   return (
      <div className="form-group">
         <button
            type="button"
            className="btn btn-light"
            onClick={handleClick}
         >
            <i className="fa fa-plus"></i> Add Phone</button>
      </div>
   )
}
