import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDateTime } from '../../../util';

class DeclineCommentShow extends Component {
   render() {
      const { quote } = this.props;
      if (quote.status !== "declined") return null;
      else {
         const declinerFullName = quote.declinedBy ? quote.declinedBy.firstName + " " + quote.declinedBy.lastName : "Nick Name";
         const declinedAt = quote.declinedAt ? quote.declinedAt : Date.now();
         return (
            <div id="accept" className="quote-box-declined">
               <h3>Declined</h3>
               <p>
                  Declined by {declinerFullName}, <span className="dt-time">{formatDateTime(declinedAt)}</span>.
               </p>
               <p>Comment:</p>
               <p>{quote.declinedComment}</p>
            </div>
         );
      }
   }
}

const mapStateToProps = ({ quoteData }) => {
   const { quote } = quoteData;
   return { quote };
};
export default connect(mapStateToProps)(DeclineCommentShow);
