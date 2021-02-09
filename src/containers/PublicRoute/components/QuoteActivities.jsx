import React, { Component } from 'react';
import { createLogger } from 'redux-logger';
import { formatDateTime, parseBrInStr } from '../../../util';

export default class QuoteActivities extends Component {
   state = {

   };

   render() {
      return (
         <div>
            <p>
               <span className="glyphicon glyphicon-time" /> All Activity
               <button className="buttonLink" onClick={this.props.onHistoryClose}>Hide</button>
            </p>
            <table className="table">
               <tbody>
                  {
                     this.props.activities.map((activity, index) => {
                        return (
                           <tr key={index}>
                              <td className="history-date"><span className="dt-time">{formatDateTime(activity.at)}</span></td>
                              {quoteActivityContent(activity)}
                           </tr>
                        );
                     })
                  }
               </tbody>
            </table>
         </div>
      );
   }
}


export const quoteActivityContent = (activity) => {
   switch (activity.category) {
      case "created":
         return <td>Created by {activity.by}</td>;
      case "edited":
         return <td>Edited by {activity.by}</td>;
      case "sent":
         return <td>
            Quote sent by {activity.by}
            <div className="history-email">
               <p className="history-email-subject">{parseBrInStr(activity.emailContent.subject)}</p>
               <p>
                  {parseBrInStr(activity.emailContent.msgHeader)}
                  <br />
                  <br />
                [View-quote-link-block]
               {parseBrInStr(activity.emailContent.msgFooter)}
               </p>
            </div>
         </td>;
      case "markAsSent":
         return <td>Updated and Back Online by SUPER MAN (not emailed)</td>;
      case "archived":
         return <td>Archived by {activity.by}</td>;
      case "unarchived":
         return <td>Unarchived by {activity.by}</td>;
      case "accepted":
         return <td></td>;
      case "accpetedOnBehalf":
         return <td>Accepted on Behalf by {activity.by}</td>;
      case "undoAcceptance":
         return <td>Accepted by {activity.acceptedBy}</td>;
      case "declined":
         return <td>Declined by {activity.declinedBy}</td>;
      case "markAsDeclined":
         return <td>Mark as Declined by {activity.by}</td>;
      case "undoDeclined":
         return <td>Undo by {activity.by} (decline)</td>;
      case "withdrawn":
         return <td>Withdrawn by {activity.by}</td>;
      case "undoWithdrawn":
         return <td>Undo by {activity.by} (withdraw)</td>;
      case "takeOffline":
         return <td>Taken Offline by {activity.by}, Editing…</td>;
      case "backOnline":
         return <td>
            Updated and Back Online by {activity.by}
            <div className="history-email">
               <p className="history-email-subject">{parseBrInStr(activity.emailContent.subject)}</p>
               <p>
                  {parseBrInStr(activity.emailContent.msgHeader)}
                  <br />
                  <br />
                   [View-quote-link-block]
                  {parseBrInStr(activity.emailContent.msgFooter)}
               </p>
            </div>
         </td>;
      case "firstFollowup":
         return <td>
            First Follow-up sent by {activity.by}
            <div className="history-email">
               <p className="history-email-subject">{parseBrInStr(activity.emailContent.subject)}</p>
               <p>
                  {parseBrInStr(activity.emailContent.msgHeader)}
                  <br />
                  <br />
                   [View-quote-link-block]
                  {parseBrInStr(activity.emailContent.msgFooter)}
               </p>
            </div>
         </td>;
      case "secondFollowup":
         return <td>
            Second Follow-up sent by {activity.by}
            <div className="history-email">
               <p className="history-email-subject">{parseBrInStr(activity.emailContent.subject)}</p>
               <p>
                  {parseBrInStr(activity.emailContent.msgHeader)}
                  <br />
                  <br />
                   [View-quote-link-block]
                  {parseBrInStr(activity.emailContent.msgFooter)}
               </p>
            </div>
         </td>;
      case "openedViaDirectLink":
         return <td>Opened via direct link</td>;
      default:
         break;
   }
}