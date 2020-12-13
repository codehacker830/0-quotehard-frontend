import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { formatDate, toFixedFloat } from '../../../util';

class Tr_Quotient extends Component {
   render() {
      const { item } = this.props;
      if (item.status === "draft") return (
         <tr className="mod-green" onClick={() => this.props.history.push({
            pathname: `/app/quote/${item._id}`,
            state: {
               from: this.props.location.pathname
            }
         })}>
            <td>
               <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
               <div className="u-ellipsis">
                  <span>{item.title}</span>
               </div>
               <span className="float-right">
                  <small className="text-gray">
                     <span className="dt-time">{formatDate(item.createdAt)}</span>&nbsp;
                     <span className="label label-draft">{item.status}</span>
                  </small>
               </span>
               <div className="u-ellipsis">
                  <small className="text-gray"> {item.contactNameTo} by {item.userFrom} </small>
               </div>
            </td>
         </tr>
      );
      else if (item.status === "awaiting") return (
         <tr className="mod-white" onClick={() => this.props.history.push({
            pathname: `/q/${item.entoken}`,
            state: {
               from: this.props.location.pathname
            }
         })}>
            <td>
               <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
               <div className="u-ellipsis">
                  <span>{item.title}</span>
               </div>
               <span className="float-right">
                  <small className="text-gray">
                     <span className="dt-time">{formatDate(item.createdAt)}</span>
                  </small>
               </span>
               <div className="u-ellipsis">
                  <small className="text-gray">
                     <span className={`${item.viewedAt ? "text-danger" : "text-success"} mr-1`}>
                        {item.viewedAt ? `Viewed ` + formatDate(item.viewedAt) : `Unopened`}
                     </span>
                     {item.contactNameTo} by {item.userFrom}
                  </small>
               </div>
            </td>
         </tr>
      );
      else return (
         <tr className="mod-blue" onClick={() => this.props.history.push({
            pathname: `/q/${item.entoken}`,
            state: {
               from: this.props.location.pathname
            }
         })}>
            <td>
               <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
               <div className="u-ellipsis">
                  <span>{item.title}</span>
               </div>
               <span className="float-right">
                  <small className="text-gray">
                     <span className="dt-time">{formatDate(item.createdAt)}</span>
                     <span className="label label-draft">{item.status}</span>
                  </small>
               </span>
               <div className="u-ellipsis">
                  <small className="text-gray">
                     <span data-tg-control="{&quot;QuotesLastView&quot;:[1599451559]}">
                        {/* <span className="text-danger mr-1">Viewed 1 hour ago</span> */}
                        <span className="text-danger mr-1">Viewed {formatDate(item.viewedAt)}</span>
                     </span>{item.contactNameTo} by {item.userFrom}</small>
               </div>
            </td>
         </tr>
      );
   }
}

export default withRouter(Tr_Quotient);