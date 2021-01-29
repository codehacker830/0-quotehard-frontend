import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderReferenceNumber } from '../../../../actions/Data';

export default function OrderReferenceNumber() {
   const quote = useSelector(state => state.mainData.quote);
   const dispatch = useDispatch();
   const onHandleChange = (val) => {
      dispatch(updateOrderReferenceNumber(val));
   }
   return (
      <div className="form-group-half">
         <label className="label-light" htmlFor="accept_reference">Your order/reference number</label>
         <input className="form-control rounded-0" placeholder="Optional" name="accept[reference]" type="text"
            id="accept_reference"
            value={quote.orderReferenceNumber}
            onChange={ev => onHandleChange(ev.target.value)} />
      </div>
   )
}
