import React from 'react'

export const QuotetoPeopleList = (props) => {
   return (
      <>
         {
            props.toPeopleList.map((contact, index) => {
               return (
                  <div className="alert alert-info w-100 border border-primary" key={index}>
                     <button type="button" className="btn close" onClick={() => props.removeContact(contact)}>
                        <span>×</span>
                     </button>
                     <strong className="text-black my-1 mr-1">{contact.name}</strong>
                     <span className="text-secondary">{contact.company}</span>
                     <p className="mb-0">{contact.email}</p>
                  </div>
               );
            })
         }
      </>

   )
}

export default QuotetoPeopleList;