import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../../../../util/Api';

export const CompanyNameShow = (props) => {
   const [companyName, setCompanyName] = useState("");
   useEffect(() => {
      if (props.companyId) {
         axios.get(`/contacts/company/id/${props.companyId}`)
            .then(({ data }) => {
               // console.log("44444444444444 ", data);
               setCompanyName(data.contact ? data.contact.companyName : "");
            })
            .catch(err => {
               setCompanyName("");
               console.error("Error during search company name by companyid", err);
            });
      } else setCompanyName("");
   }, [props.companyId]);
   return (
      <span className="text-secondary">{companyName}</span>
   )
}

export default CompanyNameShow;