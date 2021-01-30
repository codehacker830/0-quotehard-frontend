import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdditionalComments from '../AdditionalComments';
import OrderReferenceNumber from '../OrderReferenceNumber';
import _ from 'lodash';
import { acceptOnBehalfQuote } from '../../../../../actions/Data';

export default function AcceptOnBehalfBox() {
   const dispatch = useDispatch();
   const appearanceSetting = useSelector(state => state.appearanceSetting);
   const quote = useSelector(state => state.mainData.quote);
   const loading = useSelector(state => state.commonData.loading);
   const { colors } = appearanceSetting;
   const { orderReferenceNumber, additionalComment } = quote;

   const [onBehalfOfPersonId, setOnBehalfOfPersonId] = useState(null);
   const [isAcceptEmailNotify, setAcceptEmailNotify] = useState(false);

   useEffect(() => {
      const firstRecipient = _.head(quote.toPeopleList);
      setOnBehalfOfPersonId(firstRecipient ? firstRecipient._id : null);
   }, [quote.toPeopleList]);
   const onClickAcceptOnBehalf = () => {
      const quoteId = quote._id;
      dispatch(acceptOnBehalfQuote({
         quoteId,
         additionalComment,
         orderReferenceNumber,
         onBehalfOfPersonId,
         isAcceptEmailNotify
      }));
      // this.props.hideManualAcceptBox();
   }
   const onClickDecline = () => {

   }
   console.log(" onBehalfOfPersonId ==========> ", onBehalfOfPersonId)
   return (
      <div className="acceptBox" style={{ backgroundColor: `${colors.highlights}` }}>
         <h3 className="quote-box-h3-accept">Accept on behalf</h3>
         <div className="acceptSummary">
            <p className="mb-0"><strong>{quote.title}</strong></p>
            <p className="summaryWrapzFixedCost mb-0">
               Total including tax $<span className="summaryPartTotal">1,100.00</span>
            </p>
         </div>
         <div className={clsx("form-group-half", quote.toPeopleList.length > 1 ? "" : "d-none")}>
            <label className="label-light" htmlFor="accept_contact_id">Accept on behalf of</label>
            <select className="form-control rounded-0 maxWidth-700" name="accept[contact_id]" id="accept_contact_id"
               value={onBehalfOfPersonId}
               onChange={ev => setOnBehalfOfPersonId(ev.target.value)}>
               {quote.toPeopleList.map((item, index) => <option key={index} value={item._id}>{item.firstName + " " + item.lastName}</option>)}
            </select>
         </div>
         <AdditionalComments />
         <OrderReferenceNumber />
         {/* acceptCb */}
         <div className="acceptCb">
            <div className="acceptCb-left">
               <label className="acceptCb-label-box" htmlFor="accept_email_notify">
                  <input name="accept[email_notify]" type="checkbox" id="accept_email_notify"
                     checked={isAcceptEmailNotify}
                     onChange={() => setAcceptEmailNotify(!isAcceptEmailNotify)}
                  />
               </label>
            </div>
            <div className="acceptCb-right">
               <label className="acceptCb-label" htmlFor="accept_email_notify">
                  Send email notification to:&nbsp;
                  <strong>
                     {quote.toPeopleList.reduce((accumulator, currentValue, index) => {
                        if (index === (quote.toPeopleList.length - 1)) return accumulator + (currentValue.firstName + " " + currentValue.lastName);
                        else return accumulator + (currentValue.firstName + " " + currentValue.lastName + ", ");
                     }, "")}
                  </strong>
               </label>
            </div>
         </div>

         <div className="clear" />

         {/* accept button box */}
         <div className="quote-box-accept">
            <button className="btn btn-save btnAccept btn-lg" disabled={loading} onClick={onClickAcceptOnBehalf}>
               {loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                        Accept on behalf
                    </button>
            <span className="quote-box-decline-wrap">
               <button className="btn btn-lg btn-lg-skinny" onClick={onClickDecline}>Cancel</button>
            </span>
         </div>
      </div>
   )
}
