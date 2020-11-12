import React from 'react'
import { Link } from 'react-router-dom'

export const FirstFollowUpEmailPreview = () => {
   return (
      <div className="mb-3">
         <h3 className="mb-2">First Follow-up</h3>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div className="emailPreviewSubject">
               Following up: <span className="u-highlight-tag">Quote Title</span>
            </div>
            <div className="emailPreviewMessage">
               Hi <span className="u-highlight-tag">Customer Given Name(s)</span>,<br />
               <br />
               I’m happy to answer any questions you might have about the quote I prepared for you. You can ask these direct in the quote by following the link below or feel free to call me.
               <br />
               <br />
               If you’re ready to proceed, simply click ‘Accept’ at the bottom of the quote.
               <br />
               <br />
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Quote</button>
               <br />
               <br />
               Captivating Title of Quote
               <span className="emailWording-small">CompanyName  #12345678</span>
            </div>
         </div>
         <div className="mb-6">
            <Link className="btn btn-alt-dark" to={`/app/settings/customer-email-change/1`}>Edit</Link>
         </div>
      </div>
   )
}

export default FirstFollowUpEmailPreview