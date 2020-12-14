import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatDateTime } from '../../../../util';

class InfoInline extends Component {
   render() {
      const { quote } = this.props;
      return (
         <div>
            <label>Quote number</label>&nbsp;
            <span className="quote-detail-block">{quote.number}</span>
            <label>Date</label>&nbsp;
            <span className="quote-detail-block">
               <span className="dt-time">{formatDate(quote.settings.sentAt)}</span>
            </span>
            <label>Valid until</label>&nbsp;
            <span className="quote-detail-block">
               <span className="dt-time">{formatDateTime(quote.settings.validUntil)}</span>
            </span>
         </div>
      )
   }
}

const mapStateToProps = ({ mainData }) => ({
   quote: mainData.quote
})

export default connect(mapStateToProps)(InfoInline);
