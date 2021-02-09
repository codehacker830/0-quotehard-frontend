import clsx from 'clsx';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { formatDate, toFixedFloat } from '../../../util';
import dateFormat from 'dateformat';
import axios from '../../../util/Api';
import { archiveQuote } from '../../../actions/Data';
import { connect } from 'react-redux';

export const switchQuotePath = (item) => {
   switch (item.status) {
      case "draft": return `/app/quote/${item._id}`;
      case "editing": return `/app/quote/${item._id}`;
      case "sent": return `/q/${item.entoken}`;
      case "accepted": return `/q/${item.entoken}`;
      case "declined": return `/q/${item.entoken}`;
      case "withdrawn": return `/q/${item.entoken}`;
      default: return `/q/${item.entoken}`;
   }
}
export const switchQuoteTRClass = (item) => {
   switch (item.status) {
      case "draft": return "mod-green";
      case "editing": return "mod-white";
      case "sent": return "mod-white";
      case "accepted": return "mod-blue";
      case "declined": return "mod-red";
      case "withdrawn": return "mod-white mod-withdrawn";
      default: return "mod-white";
   }
}
export const switchQuoteStatusLabelClass = (item) => {
   switch (item.status) {
      case "draft": return "quotes-label label-draft";
      case "editing": return "quotes-label label-sent label-editing";
      case "sent": return "d-none";
      case "accepted": return "quotes-label label-accepted";
      case "declined": return "quotes-label label-declined";
      case "withdrawn": return "quotes-label label-withdrawn";
      default: return "";
   }
}
export const showQuoteSituation = (item) => {
   switch (item.status) {
      case "draft": return <span className="quotes-high-unopened">Unopened</span>;
      case "sent": return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
      case "editing": return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
      case "accepted": return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
      case "declined": return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
      case "withdrawn": return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
      default: return item.viewedAt ? <span className="quotes-high-open">{`Viewed ` + formatDate(item.viewedAt)}</span> : <span className="quotes-high-unopened">Unopened</span>;
   }
}
export const switchQuoteLabelDateContent = (item) => {
   switch (item.status) {
      case "draft": return dateFormat(new Date(item.createdAt), "mmm d");
      case "sent": return dateFormat(new Date(item.settings.sentAt ? item.settings.sentAt : item.createdAt), "mmm d");
      case "editing": return dateFormat(new Date(item.updatedAt), "mmm d");
      case "accepted": return dateFormat(new Date(item.acceptedAt), "mmm d");
      case "declined": return dateFormat(new Date(item.declinedAt), "mmm d");
      case "withdrawn": return dateFormat(new Date(item.updatedAt), "mmm d");
      default: return dateFormat(new Date(item.createdAt), "mmm d");
   }
}
class Tr_Quotient extends Component {
   onClickRow = (ev) => {
      if (ev.target.name === "archiveBtn") return;
      this.props.history.push({
         pathname: switchQuotePath(this.props.item),
         state: { from: this.props.location.pathname }
      });
   }
   onClickArchive = (ev) => {
      if (ev.target.name === "quoteItem") return;
      this.props.archiveQuote(this.props.item._id);
   }
   render() {
      const { item } = this.props;
      console.log("this.props.location ==> ", this.props.location)
      console.log("item ==> ", item)
      const isShowArchiveBtn = this.props.match.path === "/app" && (item.status === "accepted" || item.status === "declined");
      return (
         <tr className={switchQuoteTRClass(item)} onClick={this.onClickRow} name="quoteItem">
            <td>
               <span className="quotes-value">{toFixedFloat(item.quoteTotal)}</span>
               <button className={clsx("btn btn-sm btn-default float-left m-1 mr-2", isShowArchiveBtn ? "" : "d-none")} name="archiveBtn" onClick={this.onClickArchive}>Archive</button>
               <div className="u-ellipsis">
                  <span>{item.title}</span>
               </div>
               <span className="float-right">
                  <small className="text-gray">
                     <span className="dt-time">{switchQuoteLabelDateContent(item)}</span>&nbsp;
                     <span className={switchQuoteStatusLabelClass(item)}>{item.status}</span>
                  </small>
               </span>
               <div className="u-ellipsis">
                  <small className="text-gray">
                     {showQuoteSituation(item)}&nbsp;
                     {item.contactNameTo} by {item.userFrom} #{item.number}
                  </small>
               </div>
            </td>
         </tr>
      );
   }
}
const mapDispatchToProps = { archiveQuote }
export default connect(() => ({}), mapDispatchToProps)(withRouter(Tr_Quotient));