import clsx from 'clsx'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateQuoteTotal, formatDateTime } from '../../../../../util'
import AcceptedAdditionalComments from '../AcceptedAdditionalComments'
import AcceptedOrderReferenceNumber from '../AcceptedOrderReferenceNumber';
import dateFormat from 'dateformat';

export default function AcceptedBox() {
   const appearanceSetting = useSelector(state => state.appearanceSetting);
   const salesTaxes = useSelector(state => state.salesSetting.salesTaxes);
   const quote = useSelector(state => state.mainData.quote);
   const [isFingerDetailShow, setFingerDetailShow] = useState(false);

   const { colors } = appearanceSetting;
   const { acceptedAt, acceptedBy, acceptedOnBehalfBy, acceptedOnBehalfOf, isAcceptanceEmailNotificationSent } = quote;
   const acceptRecipientFullName = acceptedBy ? acceptedBy.firstName + " " + acceptedBy.lastName : "";
   const acceptedOnBehalfOfFullName = acceptedOnBehalfOf ? acceptedOnBehalfOf.firstName + " " + acceptedOnBehalfOf.lastName : "";
   const acceptedOnBehalfByFullName = acceptedOnBehalfBy ? acceptedOnBehalfBy.firstName + " " + acceptedOnBehalfBy.lastName : "";

   const hasFingerDetail = acceptedBy;
   // const hasFingerDetail = false;
   return (
      <React.Fragment>
         <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
            <h3 className="quote-box-h3-accept">{quote.title}</h3>
            <div className="acceptSummary">
               <p className="summaryWrapzFixedCost">
                  Total including tax $<span className="summaryPartTotal">{calculateQuoteTotal(quote, salesTaxes)}</span>
               </p>
               <div className="acceptBox-right no_print">
                  {/* <a className={clsx("acceptBox-fingerLink", hasFingerDetail ? "" : "d-none")} onClick={() => setFingerDetailShow(!isFingerDetailShow)}>
                     Digital Fingerprint…
                  </a> */}
                  <span className="label acceptBox-label">Accepted</span>
               </div>
               <div className="clear" />
            </div>


            <div className={clsx("fingerDetail", isFingerDetailShow ? "" : "isHidden")}>
               <div className="fingerDetail-table">
                  <div className="fingerDetail-left isImage">
                     <img src="https://asset.quotientapp.com/image/app/accept-fingerprint.jpg" alt="Accept fingerprint mark" />
                  </div>
                  <div className="fingerDetail-left">
                     <h3 className="u-pad-top-5">Digital Fingerprint</h3>
                     <div className="u-section-4">
                        <strong>Timestamp:</strong>
                        <div>{dateFormat(acceptedAt)}</div>
                     </div>
                     <div className="u-section-4">
                        <strong>IP Address:</strong>
                        <div>xx.xxxx.xxx.xxxx </div>
                     </div>
                     <div><strong>Device information:</strong></div>
                     <div><small>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 </small></div>
                  </div>
               </div>
            </div>
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
