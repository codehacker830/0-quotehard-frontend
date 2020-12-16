import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';

class Tr_TextItem extends Component {
   render() {
      const { item } = this.props;
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isLoser = merge_loser === item._id;
      return (
         <tr className={isLoser ? "rowClick-disable" : ""} onClick={() => {
            if (isLoser) return;
            if (merge_loser) this.props.history.push(`/app/content/item-text/view/${item._id}/?merge_loser=${merge_loser}`);
            else this.props.history.push(`/app/content/item-text/view/${item._id}`);
         }}>
            <td>
               <div className="d-flex">
                  <div className="u-ellipsis">
                     <span>{item.textHeading}</span>&nbsp;
                     {isLoser && <span className="label label-success">Loser</span>}
                     <br />
                     <small className="text-gray font-size-sm">{item.longDescription}&nbsp;</small>
                  </div>
               </div>
            </td>
         </tr>
      )
   }
}

export default withRouter(Tr_TextItem);