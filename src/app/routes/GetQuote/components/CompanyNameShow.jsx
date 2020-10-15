import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../../../util/Api';

export const CompanyNameShow = (props) => {
   const [companyName, setCompanyName] = useState("");
   useEffect(() => {
      axios.get(`/contacts/search-company-by-id/${props.companyId}`)
         .then(({ data }) => {
            // console.log("44444444444444 ", data);
            setCompanyName(data.contact.companyName);
         })
         .catch();
   }, [props]);
   return (
      <span className="text-secondary">{companyName}</span>
   )
}

export default CompanyNameShow