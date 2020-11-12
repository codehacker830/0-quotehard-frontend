import React from 'react'
import { Link } from 'react-router-dom';

export const NewQuoteEmailPreview = () => {
   return (
      <div className="mb-3">
         <h3 className="mb-2">New Quote</h3>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div class="emailPreviewSubject">
               New quote: <span class="u-highlight-tag">Quote Title</span>
            </div>
            <div className="emailPreviewMessage">
               Hi <span className="u-highlight-tag">Customer Given Name(s)</span>,
               <br />
               <br />
               <span className="u-highlight-tag">Your Name</span> of <span className="u-highlight-tag">Your Company Name</span> has prepared the following quote for you:
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Quote</button>
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

export default NewQuoteEmailPreview;