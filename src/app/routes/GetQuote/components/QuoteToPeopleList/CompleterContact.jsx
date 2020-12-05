import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateQuoteToPeopleList } from '../../../../../actions/Data';
import axios from '../../../../../util/Api';

const CompleterContact = (props) => {
   const [emailTo, setEmailTo] = useState("");
   const [list, setList] = useState([]);
   const toPeopleList = useSelector(state => state.mainData.quote.toPeopleList)
   useEffect(() => {
      if (emailTo !== "") {
         axios.post("/contacts/search-people-by-email", { email: emailTo })
            .then(({ data }) => {
               setList(data.contacts);
            })
            .catch(err => {
               console.error("get contacts by email err =>", err)
            });
      }
   }, [emailTo]);

   const dispatch = useDispatch();
   const addContact = (contact) => {
      if (toPeopleList.find((it) => it._id === contact._id)) setEmailTo("");
      else {
         dispatch(updateQuoteToPeopleList([
            ...toPeopleList,
            contact
         ]));
         setEmailTo("");
      }
   };

   return (
      <>
         <input
            type="text"
            id="emailTo"
            className="form-control rounded-0"
            autoComplete="off"
            value={emailTo}
            onChange={(ev) => setEmailTo(ev.target.value)}
         />
         {
            emailTo === "" ? null :
               <ul className="completer-ui completer-new-contact" style={{ left: 0, top: 38 }}>
                  <li className="text-info" onClick={() => props.history.push("/app/c/contacts/create/person")}>
                     <i className="fa fa-plus" /> Create New Contact…
                  </li>
                  {
                     list.map((contact, index) => {
                        return (
                           <li key={index} className="border-top" onClick={() => addContact(contact)}>
                              <div className="u-ellipsis">
                                 {contact.firstName} {contact.lastName} <small><em>-</em> <strong> {contact.company}</strong></small>
                              </div>
                              <div className="u-ellipsis"> <small><strong> {contact.email}</strong></small></div>
                           </li>
                        );
                     })
                  }
               </ul>
         }
      </>
   )
}

export default withRouter(CompleterContact)