import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../../../util';

class AuthorBox extends Component {
   render() {
      const { quote } = this.props;
      if (quote.status === "awaiting") return (
         <div className="author-box author-box-sent" >
            <h4 className="author-box-title">Sent</h4>
            <div><span className="dt-time">{formatDate(quote.settings.sentAt)}</span></div>
            {quote.state === "archived" && <div>Archived</div>}
         </div >
      );
      else if (quote.status === "accepted") return (
         <div className="author-box author-box-accepted">
            <h4 className="author-box-title">Accepted</h4>
            <div><span className="dt-time">{formatDate(quote.settings.acceptedAt)}</span></div>
            <div>Accepted on behalf</div>
            {
               quote.state === "current" ?
                  <div className="author-box-btn">
                     <button className="btn btn-default btn-sm" onClick={this.onClickArchive}>Archive</button>
                  </div>
                  :
                  <div>Archived</div>
            }
         </div>
      );
      else if (quote.status === "declined") return (
         <div className="author-box author-box-declined">
            <h4 className="author-box-title">Declined</h4>
            <div><span className="dt-time">{formatDate(quote.settings.declinedAt)}</span></div>
            {
               quote.state === "current" ?
                  <div className="author-box-btn">
                     <button className="btn btn-default btn-sm" onClick={this.onClickArchive}>Archive</button>
                  </div>
                  :
                  <div>Archived</div>
            }
         </div>
      );
      else if (quote.status === "withdrawn") return (
         <div className="author-box ">
            <h4 className="author-box-title">Withdrawn</h4>
            <div><span className="dt-time" data-time="[1608308387,0,1]">{formatDate(quote.settings.withdrawnAt)}</span></div>
            {quote.state === "archived" && <div>Archived</div>}
         </div>
      );
      else return null;
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};

export default connect(mapStateToProps)(AuthorBox);