import React from 'react'
import { Link } from 'react-router-dom'

export const PersonCompany = (props) => {
   const { contact } = props;
   if (contact.category === "person" && contact.company) return (
      <div className="form-group">
         <span className="text-gray fa-xs text-uppercase">Company</span>
         <Link className="d-block" to={`/app/c/contacts/view/${contact.company._id}`}>{contact.company.companyName}</Link>
      </div>
   );
   else return null;
}

export default PersonCompany