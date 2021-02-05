import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { formatDate, toFixedFloat } from '../../../../util';

class DraftSection extends Component {
   render() {
      const { draftQuotes } = this.props;
      if (draftQuotes.length) return (
         <table className="quotient-table mb-4">
            <tbody className="rowClick" data-tg-click="root_rowClick">
               {draftQuotes.map((item, index) => (
                  <tr className="mod-green" key={index} onClick={() => this.props.history.push(`app/quote/${item._id}`)}>
                     <td>
                        <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                        <div className="u-ellipsis">
                           <span>{item.title}</span>
                        </div>
                        <span className="float-right">
                           <small className="text-gray">
                              <span className="dt-time">{formatDate(item.createdAt)}</span>&nbsp;
                              <span className="label label-success">{item.status}</span>
                           </small>
                        </span>
                        <div className="u-ellipsis">
                           <small className="text-gray"> {item.contactNameTo} by {item.userFrom} #{item.number}</small>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      );
      else return null;
   }
}

export default withRouter(DraftSection);