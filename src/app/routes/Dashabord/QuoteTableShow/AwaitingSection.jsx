import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { formatDate, toFixedFloat } from '../../../../util';

class AwaitingSection extends Component {
   render() {
      const { awaitingQuotes } = this.props;
      if (awaitingQuotes.length) return (
         <React.Fragment>
            <div className="font-w700 mb-3">
               {/* <Link className="btn btn-outline-light btn-alt float-right text-primary" to="app/quotes?tab=Follow-up&author=52036">
                  Follow-up <span className="badge badge-pill px-3 py-1 badge-primary text-uppercase mb-0">1</span>
               </Link> */}
               Awaiting Acceptance
            </div>
            <table className="quotient-table mb-4">
               <tbody className="rowClick" data-tg-click="root_rowClick">
                  {awaitingQuotes.map((item, index) => (
                     <tr className="mod-white" key={index} onClick={() => this.props.history.push(`/q/${item.entoken}`)}>
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
                  ))}
               </tbody>
            </table>
         </React.Fragment>
      );
      else return null;
   }
}

export default withRouter(AwaitingSection);