import React from 'react'
import { Link } from 'react-router-dom'

export const PersonCompany = (props) => {
   const companyId = 2222;
   return (
      <>
         {
            (props.contact.category === "person") &&
            <div className="form-group">
               <span className="text-gray fa-xs text-uppercase">Company</span>
               <Link className="d-block" to={`/app/c/contacts/view/${companyId}`}>{props.contact.companyName}</Link>
            </div>
         }
      </>
   )
}

export default PersonCompany