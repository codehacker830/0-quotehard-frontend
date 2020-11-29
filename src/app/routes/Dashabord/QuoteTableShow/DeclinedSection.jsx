import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { formatDate, toFixedFloat } from '../../../../util';

class DeclinedSection extends Component {
   render() {
      const { declinedQuotes } = this.props;
      if (declinedQuotes.length) return (
         <React.Fragment>
            <div className="font-w700 mb-3 text-danger">Declined</div>
            <table className="quotient-table mb-4">
               <tbody className="rowClick" data-tg-click="root_rowClick">
                  {
                     declinedQuotes.map((item, index) => {
                        return (
                           <tr className="mod-red" key={index} onClick={() => this.props.history.push(`/q/${item.entoken}`)}>
                              <td>
                                 <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                 <button className="btn btn-sm btn-alt-dark float-left m-1 mr-2" onClick={() => this.onClickArchive()}>Archive</button>
                                 <div className="u-ellipsis">
                                    <span>{item.title}</span>
                                 </div>
                                 <span className="float-right">
                                    <small className="text-gray">
                                       <span className="dt-time">{formatDate(item.createdAt)}</span>&nbsp;
                                          <span className="label label-declined">{item.status}</span>
                                    </small>
                                 </span>
                                 <div className="u-ellipsis">
                                    <small className="text-gray">
                                       <span className="text-danger mr-1">Viewed {formatDate(item.viewedAt)}</span>{item.contactNameTo} by {item.userFrom}</small>
                                 </div>
                              </td>
                           </tr>
                        );
                     })
                  }
               </tbody>
            </table>
         </React.Fragment>
      );
      else return null;
   }
}

export default withRouter(DeclinedSection);