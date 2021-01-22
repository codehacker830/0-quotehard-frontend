import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseHtml } from '../../../../util';
import axios from '../../../../util/Api';

export default function QuoteViewSend(props) {
   const [isLoading, setLoading] = useState(false);
   const [subject, setSubject] = useState();
   const [msgHeader, setMsgHeader] = useState();
   const [msgFooter, setMsgFooter] = useState();
   const history = useHistory();
   const quote = useSelector(state => state.mainData.quote);
   console.error("AAAAAAAAAAAAAAAAA", quote);
   const onClickSendNow = () => {
      const quoteId = quote._id;
      axios.post('/quotes/send', { quoteId, subject, msgHeader, msgFooter })
         .then(({ data }) => {
            toast.success("Quote email was sent.");
            history.push(`/q/${data.entoken}`);
         })
         .catch(err => {
            console.error(" error => ", err);
            toast.error("Failed to send quote.");
         });
   }
   const onClickDismiss = () => { };
   const onClickCancel = () => props.setViewMode(true);
   useEffect(() => {
      console.log(" LLLLLLLL ")
      axios.get('/settings/customer-email/new-quote')
         .then(({ data }) => {
            console.log(" YYYYYYYYYYY : ", data)
            setSubject(parseHtml(data.subject));
            setMsgHeader(parseHtml(data.msgHeader));
            setMsgFooter(parseHtml(data.msgFooter));
         }).catch(err => {
            console.error(" Fetch error during customer email setting .")
         });
      return () => { }
   }, []);
   return (
      <div data-tg-control="QuoteViewSend" className={clsx("sendEmail-bg no_print", props.isViewMode && "d-none")}>
         <div className="container">
            <form acceptCharset="UTF-8">
               <div className={clsx("mb-4", isLoading ? "isHidden" : "")}>
                  <button type="button" className="btn btn-primary rounded-0 mr-2" onClick={onClickSendNow}>Send Now</button>
                  <button type="button" className="btn btn-outline-secondary rounded-0 mr-2 isHidden" onClick={onClickDismiss}>Dismiss</button>
                  <button type="button" className="btn btn-light text-primary rounded-0" onClick={onClickCancel}>Cancel</button>
               </div>
               <div className={clsx("mb-4", isLoading ? "" : "isHidden")}>
                  <button type="button" className="btn btn-secondary rounded-0 mr-2" disabled>Send...</button>
               </div>


               <div className="form-group maxWidth-800">
                  <div className="sendEmail-toFrom">
                     <span className="lighter">To:</span> Wanda Romano, Money Owner &nbsp;
                              <span className="lighter">From:</span> A Devom
                           </div>
                  <label htmlFor="input_custom_email_subject">Subject</label>
                  <TextareaAutosize
                     className="form-control emailWording-subject rounded-0"
                     id="input_custom_email_subject"
                     name="input_custom_email_subject"
                     value={`New quote: [Quote-title]`}
                     onChange={ev => { }}
                  />
                  <div className="emailWording-body">
                     <TextareaAutosize className="form-control sendEmail-part1"
                        rows={3}
                        style={{ height: 90 }}
                        value={`Hi [Customer-given-names],\n\n[Your-name] of [Your-company-name] has prepared the following quote for you:`}
                        onChange={ev => { }}
                     />
                     <div className="emailWording-nonEdit">
                        <button className="btn btn-primary">View Quote</button>
                        <br />
                        <br />
                              Captivating Title of Quote
                              <span className="emailWording-small">CompanyName #12345678</span>
                     </div>
                     <TextareaAutosize className="form-control sendEmail-part2"
                        rows={3}
                        style={{ height: 105 }}
                        value={`TTTTTT\n\naaaaaaaaaa`}
                        onChange={ev => { }}
                     />
                  </div>
               </div>


            </form>
         </div>
      </div>

   )
}
