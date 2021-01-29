import React from 'react'
import { useSelector } from 'react-redux';

export default function AcceptedAdditionalComments() {
   const quote = useSelector(state => state.mainData.quote);
   return (
      <div className="form-group-half">
         <label className="label-light">Additional comments</label>
         <div className="accept-input-submitted">
            <p>{quote.additionalComment}&nbsp;</p>
         </div>
      </div>
   )
}
