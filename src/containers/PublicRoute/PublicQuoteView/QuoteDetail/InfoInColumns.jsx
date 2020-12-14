import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatDateTime } from '../../../../util';

export class InfoInColumns extends Component {
   render() {
      const { quote } = this.props;
      return (
         <div className="quote-detail-row">
            <label className="quote-detail-label">Quote Number</label>
            <div className="quote-detail-block">{quote.number}</div>
            <label className="quote-detail-label">Date</label>
            <div className="quote-detail-block">
               <span className="dt-time">{formatDate(quote.settings.sentAt)}</span></div>
            <label className="quote-detail-label">Valid until</label>
            <div className="quote-detail-block">
               <span className="dt-time">{formatDateTime(quote.settings.validUntil)}</span>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ mainData }) => ({
   quote: mainData.quote
})

export default connect(mapStateToProps)(InfoInColumns)
