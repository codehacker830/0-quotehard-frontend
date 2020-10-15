import React, { useState, useEffect } from 'react'
import { peopleContacts } from '../../../../constants/Dump';
import axios from '../../../../util/Api';

export const CompleterContact = (props) => {
   const [list, setList] = useState([]);
   useEffect(() => {
      console.log("props.emailTo => ", props.emailTo);
      if (props.emailTo !== "") {
         // get search email list from api
         axios.post("/contacts/search-people-by-email", { email: props.emailTo })
            .then(({ data }) => {
               setList(data.contacts);
            })
            .catch(err => {
               console.error("get contacts by email err =>", err)
            });
      }
   }, [props.emailTo]);
   if (props.emailTo === "") return null;
   else return (
      <ul className="completer-ui completer-new-contact" style={{ left: 0, top: 38 }}>
         <li className="text-info"><i className="fa fa-plus" /> Create New Contact…</li>
         {
            list.map((contact, index) => {
               return (
                  <li key={index} className="border-top" onClick={() => props.addContact(contact)}>
                     <div className="u-ellipsis">
                        {contact.firstName} {contact.lastName} <small><em>-</em> <strong> {contact.company}</strong></small>
                     </div>
                     <div className="u-ellipsis"> <small><strong> {contact.email}</strong></small></div>
                  </li>
               );
            })
         }
      </ul>
   )
}

export default CompleterContact