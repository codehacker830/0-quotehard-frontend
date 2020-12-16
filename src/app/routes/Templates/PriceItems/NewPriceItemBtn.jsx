import React, { Component } from 'react'
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';

class NewPriceItemBtn extends Component {
   render() {
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isMergeMode = merge_loser ? true : false;
      if (isMergeMode) return null;
      else return (
         <div className="col-md-6">
            <div className="row mb-2">
               <Link to="/app/content/item-price/create-new" className="btn btn-success ml-auto" >New Item</Link>
            </div>
         </div>
      )
   }
}

export default withRouter(NewPriceItemBtn);
