import React from 'react'

export const QuoteContact = (props) => {
   return (
      <div className="alert alert-info w-100 maxWidth-550 border border-primary" role="alert">
         <button type="button" className="btn close">
            <span>×</span>
         </button>
         <strong className="text-black my-1 mr-1">{props.name}</strong>
         <span className="text-secondary">{props.companyName}</span>
         <p className="mb-0">{props.email}</p>
      </div>

   )
}

export default QuoteContact;