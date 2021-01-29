import React from 'react'
import { useSelector } from 'react-redux';

export default function AcceptedOrderReferenceNumber() {
   const quote = useSelector(state => state.mainData.quote);
   return (
      <div className="form-group">
         <label className="label-light">Order/reference number</label>
         <div className="accept-input-submitted">
            <p>{quote.orderReferenceNumber} &nbsp;</p>
         </div>
      </div>
   )
}
