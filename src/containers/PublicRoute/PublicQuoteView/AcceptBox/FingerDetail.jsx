import clsx from 'clsx'
import React, { useState } from 'react'
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';

export default function FingerDetail() {
   const quote = useSelector(state => state.mainData.quote);
   const { acceptedAt, acceptedBy, acceptedOnBehalfBy, acceptedOnBehalfOf, isAcceptanceEmailNotificationSent } = quote;
   const [isFingerDetailShow, setFingerDetailShow] = useState(false);
   return (
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
   )
}
