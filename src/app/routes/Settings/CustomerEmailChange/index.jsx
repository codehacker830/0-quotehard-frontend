import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';
import TextareaAutosize from 'react-autosize-textarea';
import axios from '../../../../util/Api';

function insertAtIndex(str, index, val) {
   let validIndex = index;
   for (let i = index; i >= 0; i--) {
      if (str[i] === "]") break;
      if (str[i] === "[") { validIndex = i; break; }
   }
   console.log("index =>", index)
   console.log("validIndex =>", validIndex)
   return str.substring(0, validIndex) + val + str.substring(validIndex);
}

export default function CustomerEmailChange(props) {
   const [isLoading, setLoading] = useState(false);
   const [subject, setSubject] = useState("");
   const [msgHeader, setMsgHeader] = useState("");
   const [msgFooter, setMsgFooter] = useState("");
   const [prevFocus, setPrevFocus] = useState({
      id: null,
      position: null
   });
   const history = useHistory();
   console.log("history =", history)
   console.log("props =", props)

   const { mode } = props.match.params;
   useEffect(() => {
      // New Quote
      if (mode === "1") axios.get('/settings/customer-email/new-quote')
         .then(({ data }) => {
            setSubject(data.subject)
            setMsgHeader(data.msgHeader)
            setMsgFooter(data.msgFooter)
         })
         .catch(err => {
            console.error(" Fetch error during customer new quote email data.");
         });
      // Accepted Quote
      if (mode === "2") axios.get('/settings/customer-email/accepted-quote')
         .then(({ data }) => {
            setSubject(data.subject)
            setMsgHeader(data.msgHeader)
            setMsgFooter(data.msgFooter)
         })
         .catch(err => {
            console.error(" Fetch error during customer accepted quote email data.");
         });
      // First Follow-up
      if (mode === "3") axios.get('/settings/customer-email/first-follow-up')
         .then(({ data }) => {
            setSubject(data.subject)
            setMsgHeader(data.msgHeader)
            setMsgFooter(data.msgFooter)
         })
         .catch(err => {
            console.error(" Fetch error during customer first follow-up email data.");
         });
      // Second Follow-up
      if (mode === "4") axios.get('/settings/customer-email/secoond-follow-up')
         .then(({ data }) => {
            setSubject(data.subject)
            setMsgHeader(data.msgHeader)
            setMsgFooter(data.msgFooter)
         })
         .catch(err => {
            console.error(" Fetch error during customer second follow-up email data.");
         });
      // Ask for a Review
      if (mode === "5") axios.get('/settings/customer-email/ask-for-review')
         .then(({ data }) => {
            setSubject(data.subject)
            setMsgHeader(data.msgHeader)
            setMsgFooter(data.msgFooter)
         })
         .catch(err => {
            console.error(" Fetch error during customer ask for review email data.");
         });
   }, []);
   const onClickInsert = (str) => {
      if (prevFocus.id === "input_custom_email_subject") setSubject(insertAtIndex(subject, prevFocus.position, str));
      if (prevFocus.id === "input_custom_email_header") setMsgHeader(insertAtIndex(msgHeader, prevFocus.position, str));
      if (prevFocus.id === "input_custom_email_footer") setMsgFooter(insertAtIndex(msgFooter, prevFocus.position, str));
   }
   const SubTitle = () => {
      switch (mode) {
         case "1": return "New Quote";
         case "2": return "Accepted Quote";
         case "3": return "First Follow-up";
         case "4": return "Second Follow-up";
         case "5": return "Ask for a Review";
         default: return "New Quote";
      }
   }
   const onClickSave = () => {
      setLoading(true);
      const payload = { subject, msgHeader, msgFooter };
      // New Quote
      if (mode === "1") axios.post('/settings/customer-email/new-quote', payload)
         .then(({ data }) => {
            history.push("/app/settings/customer-emails");
         })
         .catch(err => {
            console.error(" Request error during customer new quote email data.");
         });
      // Accepted Quote
      if (mode === "2") axios.post('/settings/customer-email/accepted-quote', payload)
         .then(({ data }) => {
            history.push("/app/settings/customer-emails");
         })
         .catch(err => {
            console.error(" Request error during customer accepted quote email data.");
         });
      // First Follow-up
      if (mode === "3") axios.post('/settings/customer-email/first-follow-up', payload)
         .then(({ data }) => {
            history.push("/app/settings/customer-emails");
         })
         .catch(err => {
            console.error(" Request error during customer first follow-up email data.");
         });
      // Second Follow-up
      if (mode === "4") axios.post('/settings/customer-email/secoond-follow-up', payload)
         .then(({ data }) => {
            history.push("/app/settings/customer-emails");
         })
         .catch(err => {
            console.error(" Request error during customer second follow-up email data.");
         });
      // Ask for a Review
      if (mode === "5") axios.post('/settings/customer-email/ask-for-review', payload)
         .then(({ data }) => {
            history.push("/app/settings/customer-emails");
         })
         .catch(err => {
            console.error(" Request error during customer ask for review email data.");
         });
   }
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/customer-emails`}>
            Customer Emails
         </NavCrump>
         <div className="sendEmail-bg">
            <div className="content">
               <div className="mb-5">
                  <h3 className="mb-2">{SubTitle()}</h3>
                  <div className="maxWidth-800">
                     <div className="row no-gutters">
                        <select className="form-control rounded-0 ml-auto"
                           name="_new_quote_placeholders" id="_new_quote_placeholders"
                           style={{ width: 300 }}
                           onChange={(ev) => onClickInsert(ev.target.value)}
                        >
                           <option defaultValue>Insert Placeholder</option>
                           <optgroup label=" ––– You ––––––––– ">
                              <option value="[Your-name]">Your Name</option>
                              <option value="[Your-first-name]">Your First Name</option>
                              <option value="[Your-email]">Your Email Address</option>
                              <option value="[Your-company-name]">Your Company Name</option>
                           </optgroup>
                           <optgroup label=" ––– Customer ––––––––– ">
                              <option value="[Customer-given-names]">Customer Given Name(s)</option>
                              <option value="[Customer-company]">Customer Company</option>
                           </optgroup>
                           {
                              mode === "5" ? null :
                                 <optgroup label=" ––– Quote ––––––––– ">
                                    <option value="[Quote-title]">Quote Title</option>
                                    <option value="[Quote-number]">Quote Number</option>
                                 </optgroup>
                           }
                           {
                              mode === "2" ?
                                 <optgroup label=" ––– Acceptance –––––––––">
                                    <option value="[Customer-order-number]">Customer Order Number</option>
                                    <option value="[Customer-comment]">Customer Comment</option>
                                 </optgroup>
                                 : null
                           }
                        </select>
                     </div>

                     <div className="form-group maxWidth-800">
                        <label htmlFor="input_custom_email_subject">Subject</label>
                        <TextareaAutosize
                           onMouseUp={ev => setPrevFocus({
                              id: ev.target.id,
                              position: ev.target.selectionStart
                           })}
                           className="form-control emailWording-subject rounded-0"
                           id="input_custom_email_subject"
                           name="input_custom_email_subject"
                           value={subject}
                           onChange={ev => {
                              setSubject(ev.target.value);
                              setPrevFocus({
                                 id: ev.target.id,
                                 position: ev.target.selectionStart
                              });
                           }}
                        />
                        <div className="emailWording-body">
                           <TextareaAutosize className="form-control sendEmail-part1"
                              onMouseUp={ev => setPrevFocus({
                                 id: ev.target.id,
                                 position: ev.target.selectionStart
                              })}
                              id="input_custom_email_header"
                              rows={3}
                              style={{ height: 90 }}
                              value={msgHeader}
                              onChange={ev => {
                                 setMsgHeader(ev.target.value);
                                 setPrevFocus({
                                    id: ev.target.id,
                                    position: ev.target.selectionStart
                                 });
                              }}
                           />
                           <div className="emailWording-nonEdit">
                              <button className="btn btn-primary">View Quote</button>
                              <br />
                              <br />
                           Captivating Title of Quote
                           <span className="emailWording-small">CompanyName #12345678</span>
                           </div>
                           <TextareaAutosize className="form-control sendEmail-part2"
                              onMouseUp={ev => setPrevFocus({
                                 id: ev.target.id,
                                 position: ev.target.selectionStart
                              })}
                              onFocus={(ev) => setPrevFocus(ev.target.id)}
                              id="input_custom_email_footer"
                              rows={3}
                              style={{ height: 105 }}
                              value={msgFooter}
                              onChange={ev => {
                                 setMsgFooter(ev.target.value);
                                 setPrevFocus({
                                    id: ev.target.id,
                                    position: ev.target.selectionStart
                                 });
                              }}
                           />
                        </div>
                     </div>

                  </div>
               </div>
               <div className="mb-5">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onClickSave}>
                     {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}&nbsp;Save
                  </button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings/customer-emails">Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}
