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
         axios.get(`/contacts/person/search/${emailTo}`)
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
      <React.Fragment>
         <input
            type="text"
            className="form-control rounded-0"
            autoComplete="off"
            value={emailTo}
            onChange={(ev) => setEmailTo(ev.target.value)}
         />
         {
            emailTo === "" ? null :
               <ul className="completer-ui completer-new-contact" style={{ left: 0, top: 38 }}>
                  <li className="text-info" onClick={() => props.history.push("/app/c/contacts/create/person")}>
                     <i className="fa fa-plus mr-1" />Create New Contact…
                  </li>
                  {
                     list.map((contact, index) => {
                        const {
                           _id,
                           firstName,
                           lastName,
                           companyName,
                           email
                        } = contact;
                        return (
                           <li key={index} className="border-top" onClick={() => addContact(contact)}>
                              <div className="u-ellipsis">
                                 {firstName + " " + lastName}
                                 {
                                    companyName ?
                                       <small><em> - </em><strong>{companyName}</strong></small>
                                       : null
                                 }
                              </div>
                              <div className="u-ellipsis">
                                 <small><strong>{email}</strong></small>
                              </div>
                           </li>
                        );
                     })
                  }
               </ul>
         }
      </React.Fragment>
   )
}

export default withRouter(CompleterContact)