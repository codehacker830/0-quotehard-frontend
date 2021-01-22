import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import { previewMessageStr } from '../../../../util';

export const AcceptedQuoteEmailPreview = () => {
   const data = useSelector(state => state.customerEmailSetting.acceptedQuote);
   return (
      <div className="mb-3">
         <h4 className="mb-2">Accepted Quote</h4>
         <div className="p-4 maxWidth-800 u-preview-shadow mb-2">
            <div className="emailPreviewSubject">
               {parse(previewMessageStr(data.subject))}
            </div>
            <div className="emailPreviewMessage">
               {parse(previewMessageStr(data.msgHeader))}
            </div>
            <div className="emailPreviewMessage">
               <button className="btn btn-primary">View Accepted Quote</button>
               <br />
               <br />
               Captivating Title of Quote
               <span className="emailWording-small">CompanyName #12345678</span>
            </div>
            <div className="emailPreviewMessage">
               {parse(previewMessageStr(data.msgFooter))}
            </div>
         </div>
         <div className="mb-6">
            <Link className="btn btn-alt-dark" to={`/app/settings/customer-email-change/2`}>Edit</Link>
         </div>
      </div>
   )
}

export default AcceptedQuoteEmailPreview