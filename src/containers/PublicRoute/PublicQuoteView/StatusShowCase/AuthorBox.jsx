import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { archiveQuote } from '../../../../actions/Data';
import { formatDate } from '../../../../util';

export default function AuthorBox() {
   const dispatch = useDispatch();
   const quote = useSelector(state => state.mainData.quote);
   const onClickArchive = () => {
      dispatch(archiveQuote(quote._id));
   }
   if (quote.status === "awaiting") return (
      <div className="author-box author-box-sent" >
         <h5 className="author-box-title">Sent</h5>
         <div><span className="dt-time">{formatDate(quote.settings.sentAt)}</span></div>
         {quote.state === "archived" && <div>Archived</div>}
      </div >
   );
   else if (quote.status === "accepted") return (
      <div className="author-box author-box-accepted">
         <h5 className="author-box-title">Accepted</h5>
         <div><span className="dt-time">{formatDate(quote.acceptedAt)}</span></div>
         <div>Accepted on behalf</div>
         {
            quote.state === "current" ?
               <div className="author-box-btn">
                  <button className="btn btn-default btn-sm" onClick={onClickArchive}>Archive</button>
               </div>
               :
               <div>Archived</div>
         }
      </div>
   );
   else if (quote.status === "declined") return (
      <div className="author-box author-box-declined">
         <h5 className="author-box-title">Declined</h5>
         <div><span className="dt-time">{formatDate(quote.declinedAt)}</span></div>
         <div>Marked as declined</div>
         {
            quote.state === "current" ?
               <div className="author-box-btn">
                  <button className="btn btn-default btn-sm" onClick={onClickArchive}>Archive</button>
               </div>
               :
               <div>Archived</div>
         }
      </div>
   );
   else if (quote.status === "withdrawn") return (
      <div className="author-box ">
         <h5 className="author-box-title">Withdrawn</h5>
         <div><span className="dt-time" data-time="[1608308387,0,1]">{formatDate(quote.withdrawnAt)}</span></div>
         {quote.state === "archived" && <div>Archived</div>}
      </div>
   );
   else return null;
}
