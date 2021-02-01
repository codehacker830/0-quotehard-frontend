import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formatDateTime } from '../../../../../util';
import axios from '../../../../../util/Api';
import AcceptSummary from '../AcceptSummary';
import AdditionalComments from '../AdditionalComments';
import OrderReferenceNumber from '../OrderReferenceNumber';
import _ from 'lodash';
import { showExampleIgnoreMessage } from '../../../../../actions';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function AcceptanceBox() {
   const dispatch = useDispatch();
   const appearanceSetting = useSelector(state => state.appearanceSetting);
   const quote = useSelector(state => state.mainData.quote);
   const match = useRouteMatch();
   const history = useHistory();
   const { colors } = appearanceSetting;
   const [isAgreeChecked, setAgreeChecked] = useState(false);
   const [isLoading, setLoading] = useState(false);

   const isPreviewMode = match.path === "/q/:entoken/preview";

   const onClickAccept = () => {
      if (!isAgreeChecked) { toast.success("Check the agree box to accept."); return; }
      if (isPreviewMode) {
         dispatch(showExampleIgnoreMessage());
         return;
      }
      const { entoken } = match.params;
      const { orderReferenceNumber, additionalComment } = quote;

      setLoading(true);
      axios.post('/quotes/accept', { entoken, orderReferenceNumber, additionalComment })
         .then(() => {
            setLoading(false);
            toast.success('Quote was Accepted, Thank you.');
            history.push(`/q/${entoken}/accepted`);
         })
         .catch(err => {
            setLoading(false);
            toast.error('Failed during quote acception request.,');
         });
   }
   const onClickDecline = () => {
      if (isPreviewMode) {
         dispatch(showExampleIgnoreMessage());
         return;
      }
   }
   const firstRecipient = _.head(quote.toPeopleList);
   const firstRecipientFullName = firstRecipient ? firstRecipient.firstName + " " + firstRecipient.lastName : "";
   return (
      <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
         <h3 className="quote-box-h3-accept">{quote.title}</h3>
         <AcceptSummary />
         <AdditionalComments />
         <OrderReferenceNumber />
         {/* acceptCb */}
         <div className="form-group-half">
            <div className="acceptCb">
               <div className="acceptCb-left">
                  <label className="acceptCb-label-box" htmlFor="accept__confirm">
                     <input className="quote-accept-checkbox" name="accept[_confirm]" type="checkbox" id="accept__confirm"
                        checked={isAgreeChecked}
                        onChange={() => setAgreeChecked(!isAgreeChecked)}
                     />
                  </label>
               </div>
               <div className="acceptCb-right">
                  <label className="acceptCb-label" htmlFor="accept__confirm">
                     Yes, I {firstRecipientFullName} agree to and accept this quote, on <span className="dt-time">{formatDateTime(new Date())}</span>.
                  </label>
                  <div className="acceptCb-prompt isHidden">
                     <span className="glyphicon glyphicon-arrow-up" /> Check the box to accept.
                  </div>
               </div>
            </div>
         </div>

         <div className="clear" />

         {/* accept button box */}
         <div className="quote-box-accept">
            <button className="btn btn-save btnAccept btn-lg" disabled={isLoading} onClick={onClickAccept}>
               {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                    Accept
                </button>
            <span className="quote-box-decline-wrap">
               <button className="btn btn-lg btn-lg-skinny" onClick={onClickDecline}>Decline</button>
            </span>
         </div>
      </div>
   )
}
