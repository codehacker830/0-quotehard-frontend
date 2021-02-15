import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib'
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../../util/Api';
import _ from "lodash";

const makeStrFromNameArr = (nameArr) => {
   let str = "";
   if (Array.isArray(nameArr)) {
      for (let i = 0; i < nameArr.length; i++) {
         str += nameArr[i];
         if (i === nameArr.length - 1) str += "";
         else str += ", ";
      }
      return str;
   } else return "";
}

export default function QuoteViewSend(props) {
   const [isLoading, setLoading] = useState(false);
   const [subject, setSubject] = useState("");
   const [msgHeader, setMsgHeader] = useState("");
   const [msgFooter, setMsgFooter] = useState("");
   const history = useHistory();
   const match = useRouteMatch();
   const { entoken } = match.params;
   const quote = useSelector(state => state.mainData.quote);
   const accountCompany = useSelector(state => state.auth.accountCompany);
   const sendEmailTo = makeStrFromNameArr(quote.toPeopleList.map(person => {
      if (person) return person.firstName + " " + person.lastName;
   }));
   const { userFrom } = quote.settings;
   const sendEmailFrom = userFrom.firstName + " " + userFrom.lastName;
   console.log("sendEmailTo =>", sendEmailTo);
   const onClickSendNow = () => {
      setLoading(true);
      const quoteId = quote._id;
      axios.post('/quotes/send', { quoteId, subject, msgHeader, msgFooter })
         .then(({ data }) => {
            toast.success("Quote email was sent.");
            history.push(`/q/${entoken}`);
         })
         .catch(err => {
            setLoading(false);
            console.error(" error => ", err);
            toast.error("Failed to send quote.");
         });
   }
   const onClickDismiss = () => { };
   useEffect(() => {
      axios.get('/settings/customer-email/new-quote')
         .then(({ data }) => {
            console.log(" data ---> ", data);
            console.log(" data.subject ===> ", data.subject);
            setSubject(replacePlaceholdersWithQuoteData(data.subject));
            setMsgHeader(replacePlaceholdersWithQuoteData(data.msgHeader));
            setMsgFooter(replacePlaceholdersWithQuoteData(data.msgFooter));
         }).catch(err => {
            console.error(" Fetch error during customer email for new quote.")
         });
      return () => { }
   }, [props.isViewMode]);
   const replacePlaceholdersWithQuoteData = (str) => {
      console.log(" str : ", str)
      let pStr = str;
      const customerGivenNames = makeStrFromNameArr(quote.toPeopleList.map(person => {
         if (person) return person.firstName;
      }));
      console.log(" customerGivenNames : ", customerGivenNames)
      const firstCustomer = _.head(quote.toPeopleList)
      console.log(" firstCustomer : ", firstCustomer)
      pStr = pStr.replaceAll('[Quote-title]', quote.title);
      pStr = pStr.replaceAll('[Your-name]', sendEmailFrom);
      pStr = pStr.replaceAll('[Your-first-name]', userFrom.firstName);
      pStr = pStr.replaceAll('[Your-email]', userFrom.email);
      pStr = pStr.replaceAll('[Your-company-name]', accountCompany.companyDisplayName);
      pStr = pStr.replaceAll('[Customer-given-names]', customerGivenNames);
      pStr = pStr.replaceAll('[Customer-company]', firstCustomer && firstCustomer.company ? firstCustomer.company.companyName : "");
      pStr = pStr.replaceAll('[Quote-number]', quote.number);

      return pStr;
   }
   const { isViewMode, setViewMode } = props;
   console.log(" subject ____", subject)
   console.log(" msgHeader ____", msgHeader);
   console.log(" msgFooter ____", msgFooter);
   return (
      <div data-tg-control="QuoteViewSend" className={clsx("sendEmail-bg no_print", isViewMode && "d-none")}>
         <div className="container">
            <form acceptCharset="UTF-8">
               <div className={clsx("mb-4", isLoading ? "isHidden" : "")}>
                  <button type="button" className="btn btn-primary rounded-0 mr-2" onClick={onClickSendNow}>Send Now</button>
                  <button type="button" className="btn btn-outline-secondary rounded-0 mr-2 isHidden" onClick={onClickDismiss}>Dismiss</button>
                  <button type="button" className="btn btn-light text-primary rounded-0" onClick={() => setViewMode(true)}>Cancel</button>
               </div>
               <div className={clsx("mb-4", isLoading ? "" : "isHidden")}>
                  <button type="button" className="btn btn-secondary rounded-0 mr-2" disabled>Send...</button>
               </div>


               <div className="form-group maxWidth-800">
                  <div className="sendEmail-toFrom">
                     <span className="lighter">To:</span>&nbsp;{sendEmailTo}&nbsp;&nbsp;
                     <span className="lighter">From:</span>&nbsp;{sendEmailFrom}
                  </div>
                  <label htmlFor="input_custom_email_subject_for_new_quote">Subject</label>
                  <TextareaAutosize
                     className="form-control emailWording-subject rounded-0"
                     id="input_custom_email_subject_for_new_quote"
                     name="input_custom_email_subject_for_new_quote"
                     value={subject}
                     onChange={ev => setSubject(ev.target.value)}
                  />
                  <div className="emailWording-body">
                     <TextareaAutosize className="form-control sendEmail-part1"
                        rows={3}
                        style={{ height: 90 }}
                        value={msgHeader}
                        onChange={ev => setMsgHeader(ev.target.value)}
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
                        value={msgFooter}
                        onChange={ev => setMsgFooter(ev.target.value)}
                     />
                  </div>
               </div>


            </form>
         </div>
      </div>

   )
}
