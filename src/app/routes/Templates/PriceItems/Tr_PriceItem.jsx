import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { toFixedFloat } from '../../../../util';
import qs from 'qs';

class Tr_PriceItem extends Component {
   render() {
      const { item } = this.props;
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isLoser = merge_loser === item._id;
      return (
         <tr onClick={() => {
            if (isLoser) return;
            if (merge_loser) this.props.history.push(`/app/content/item-price/view/${item._id}/?merge_loser=${merge_loser}`);
            else this.props.history.push(`/app/content/item-price/view/${item._id}`)
         }}>
            <td>
               <div className="d-flex">
                  <div className="u-ellipsis">
                     <small className="text-gray">{item.itemCode}</small>
                     <br />
                     <span>{item.productHeading ? item.productHeading : "[ No title ]"}</span>&nbsp;
                     {isLoser && <span className="label label-success">Loser</span>}
                     <br />
                     <small className="text-gray font-size-sm">{item.longDescription}&nbsp;</small>
                  </div>
                  {
                     item.isSubscription ?
                        <React.Fragment>
                           <span className="text-gray font-size-sm ml-auto"> per {item.per} {item.every}</span>
                           {
                              item.period ?
                                 null
                                 : <span className="text-gray font-size-sm ml-auto"> (for {item.period} months)</span>
                           }
                        </React.Fragment>
                        : <span className="text-black font-size-sm ml-auto">{item.quantity} @ {toFixedFloat(item.unitPrice)}</span>
                  }
               </div>
            </td>
         </tr>
      )
   }
}

export default withRouter(Tr_PriceItem);