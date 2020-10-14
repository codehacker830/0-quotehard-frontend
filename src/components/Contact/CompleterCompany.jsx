import React, { useState, useEffect } from 'react';
import axios from '../../util/Api';

export const CompleterCompany = (props) => {
   const [list, setList] = useState([]);
   useEffect(() => {
      console.log("props.companyName => ", props.companyName);
      if (props.companyName !== "") {
         axios.post("/contacts/search-company-by-name", {
            companyName: props.companyName
         }).then(({ data }) => {
            console.log("respons =>", data)
            setList(data.contacts);
         })
      }
   }, [props.companyName]);
   if (props.companyName === "") return null;
   else return (
      <React.Fragment>
         {
            list.length !== 0 && props.show ?
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
               : null
         }
      </React.Fragment>
   );
}

export default CompleterCompany