import React from 'react'
import { Link } from 'react-router-dom'

export const EditContactBtn = (props) => {
   return (
      <div className="form-group">
         <Link className="btn btn-outline-dark font-size-sm" to={`/app/c/contacts/edit/4128664`}>
            {props.contact.category === 'person' ? "Edit Person" : "Edit Company"}
         </Link>
      </div>
   )
}

export default EditContactBtn