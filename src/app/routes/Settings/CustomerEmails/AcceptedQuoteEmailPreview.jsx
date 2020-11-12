import React from 'react'
import { Link } from 'react-router-dom'

export const AcceptedQuoteEmailPreview = () => {
   return (
      <div className="mb-3">
         <h3 className="mb-2">Accepted Quote</h3>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div className="emailPreviewSubject">
               Quote accepted: <span className="u-highlight-tag">Quote Title</span>
            </div>
            <div className="emailPreviewMessage">
               Hi <span className="u-highlight-tag">Customer Given Name(s)</span>,<br />
               <br />
               Thank you for your acceptance.
               <br />
               <br />
               Additional comments:
               <br />
               <span className="u-highlight-tag">Customer Comment</span>
               <br />
               <br />
               Order/reference number
               <br />
               <span className="u-highlight-tag">Customer Order Number</span>
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Accepted Quote</button>
               <br />
               <br />
               Captivating Title of Quote
               <span className="emailWording-small">CompanyName #12345678</span>
            </div>
         </div>
         <div className="mb-6">
            <Link className="btn btn-alt-dark" to={`/app/settings/customer-email-change/1`}>Edit</Link>
         </div>
      </div>
   )
}

export default AcceptedQuoteEmailPreview