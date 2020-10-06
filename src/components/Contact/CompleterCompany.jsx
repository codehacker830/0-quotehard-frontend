import React, { useState, useEffect } from 'react';
import axios from '../../util/Api';

export const CompleterCompany = (props) => {
   const [list, setList] = useState([]);
   useEffect(() => {
      console.log("props.companyName => ", props.companyName);
      if (props.companyName !== "") {
         // get search email list from api
         axios.post("/contacts/search-company-by-name", {
            companyName: props.companyName
         }).then(({ data }) => {
            console.log("respons =", data)
            setList(data.contacts);
         })
      }
   }, [props.companyName]);
   
   if (list.length && props.show)
      return (
         <ul className="completer-ui completer-new-contact" style={{ left: 0, top: 68 }}>
            {
               list.map((contact, index) => {
                  return (
                     <li key={index} className="border-top" onClick={() => props.setCompany(contact)}>
                        <div className="u-ellipsis">
                           <strong> {contact.companyName}</strong>
                        </div>
                     </li>
                  );
               })
            }
         </ul >
      )
   else return null;
}

export default CompleterCompany