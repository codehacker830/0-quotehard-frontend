import clsx from 'clsx'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDateTime } from '../../../../../util'
import AcceptedAdditionalComments from '../AcceptedAdditionalComments'
import AcceptedOrderReferenceNumber from '../AcceptedOrderReferenceNumber';
import AcceptSummary from '../AcceptSummary'
import FingerDetail from '../FingerDetail'

export default function AcceptedBox() {
   const appearanceSetting = useSelector(state => state.appearanceSetting);
   const salesTaxes = useSelector(state => state.salesSetting.salesTaxes);
   const quote = useSelector(state => state.mainData.quote);

   const { colors } = appearanceSetting;
   const { acceptedAt, acceptedBy, acceptedOnBehalfBy, acceptedOnBehalfOf, isAcceptanceEmailNotificationSent } = quote;
   const acceptRecipientFullName = acceptedBy ? acceptedBy.firstName + " " + acceptedBy.lastName : "";
   const acceptedOnBehalfOfFullName = acceptedOnBehalfOf ? acceptedOnBehalfOf.firstName + " " + acceptedOnBehalfOf.lastName : "";
   const acceptedOnBehalfByFullName = acceptedOnBehalfBy ? acceptedOnBehalfBy.firstName + " " + acceptedOnBehalfBy.lastName : "";

   return (
      <React.Fragment>
         <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
            <h3 className="quote-box-h3-accept">{quote.title}</h3>
            <AcceptSummary />
            <FingerDetail />
            <AcceptedAdditionalComments />
            <AcceptedOrderReferenceNumber />
            {/* acceptCb */}
            <div className={clsx("form-group-half", acceptedBy ? "" : "d-none")}>
               <div className="acceptCb">
                  <div className="acceptCb-left">
                     <label className="acceptCb-label-box">
                        <input disabled="disabled" name="dummy-not-used" defaultChecked="checked" type="checkbox" id="dummy-not-used" /></label>
                  </div>
                  <div className="acceptCb-right">
                     <label className="acceptCb-label-done">
                        Yes, I {acceptRecipientFullName} agree to and accept this quote{acceptedAt ? <>, on <span className="dt-time">{formatDateTime(acceptedAt)}</span>.</> : null}
                     </label>
                  </div>
               </div>
            </div>
         </div>

         <div className={clsx("acceptBox", acceptedBy ? "d-none" : "")} style={{ backgroundColor: `${colors.highlights}` }}>
            <p>Accepted on behalf of {acceptedOnBehalfOfFullName} by {acceptedOnBehalfByFullName} on <span className="dt-time" data-time="[1611935205,1,0]">{formatDateTime(acceptedAt)}</span>
               {isAcceptanceEmailNotificationSent && <><br />Email notification sent.</>}
            </p>
         </div>

      </React.Fragment>
   )
}
