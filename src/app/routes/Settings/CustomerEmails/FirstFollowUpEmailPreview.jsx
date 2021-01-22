import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import { previewMessageStr } from '../../../../util';

export const FirstFollowUpEmailPreview = () => {
   const data = useSelector(state => state.customerEmailSetting.firstFollowup);
   return (
      <div className="mb-3">
         <h3 className="mb-2">First Follow-up</h3>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div className="emailPreviewSubject">
               {parse(previewMessageStr(data.subject))}
            </div>
            <div className="emailPreviewMessage">
               {parse(previewMessageStr(data.msgHeader))}
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Quote</button>
               <br />
               <br />
               Captivating Title of Quote
               <span className="emailWording-small">CompanyName  #12345678</span>
            </div>
            <div className="emailPreviewMessage">
               {parse(previewMessageStr(data.msgFooter))}
            </div>
         </div>
         <div className="mb-6">
            <Link className="btn btn-alt-dark" to={`/app/settings/customer-email-change/1`}>Edit</Link>
         </div>
      </div>
   )
}

export default FirstFollowUpEmailPreview