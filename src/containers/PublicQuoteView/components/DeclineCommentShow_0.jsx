import React, { Component } from 'react';
import { formatDateTime } from '../../../util';

export default class DeclineCommentShow extends Component {
   render() {
      if (this.props.quote.status !== "declined") return null;
      else {
         const declinerFullName = this.props.quote.declinedBy ? this.props.quote.declinedBy.firstName + " " + this.props.quote.declinedBy.lastName : "Nick Name";
         const declinedAt = this.props.quote.declinedAt ? this.props.quote.declinedAt : Date.now();
         return (
            <div className="discuss-wrap bg-light p-4 mb-4">
               <h3>Declined</h3>
               <p>Declined by {declinerFullName}, <span class="dt-time">{formatDateTime(declinedAt)}</span>.</p>
               <p>Comment:</p>
               <p>{this.props.quote.declinedComment}</p>
            </div>
         );
      }
   }
}