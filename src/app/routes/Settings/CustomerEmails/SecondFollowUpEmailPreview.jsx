import React from 'react'
import { Link } from 'react-router-dom'

export const SecondFollowUpEmailPreview = () => {
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
               This is just a quick reminder about the quote I prepared for you recently. If you have any questions I’d be happy to help. You can ask me anything direct in the quote by clicking the link below. Or feel free to call me.
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

export default SecondFollowUpEmailPreview