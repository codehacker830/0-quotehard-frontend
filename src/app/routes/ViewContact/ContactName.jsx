import React from 'react'

export const ContactName = (props) => {
   return (
      <div className="row no-gutters">
         {
            props.contact.category === "person" &&
            <h3>{props.contact.firstName} {props.contact.lastName}</h3>
         }
         {
            props.contact.category === "company" &&
            <h3>{props.contact.companyName}</h3>
         }

      </div>
   )
}

export default ContactName