import React from 'react'
import { Link } from 'react-router-dom'

export const AskForReviewEmailPreview = () => {
   return (
      <div className="mb-3">
         <h3 className="mb-2">First Follow-up</h3>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div className="emailPreviewSubject">
               Tell us what you think about <span className="u-highlight-tag">Your Company Name</span>
            </div>
            <div className="emailPreviewMessage">
               Hi <span className="u-highlight-tag">Customer Given Name(s)</span>,<br />
               <br />
               Would you mind sharing your recent experience with us?
               <br />
               I’d be really grateful for your feedback or a review.
               <br />
               <br />
               If you’re ready to proceed, simply click the ‘Accept’ button at the bottom of the quote and I’ll get the ball rolling. I look forward to hearing from you.
               <br />
               <br />
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Quote</button>
               <br />
               <br />
               Thanks again for your business.
            </div>
         </div>
         <div className="mb-6">
            <Link className="btn btn-alt-dark" to={`/app/settings/customer-email-change/1`}>Edit</Link>
         </div>
      </div>
   )
}

export default AskForReviewEmailPreview