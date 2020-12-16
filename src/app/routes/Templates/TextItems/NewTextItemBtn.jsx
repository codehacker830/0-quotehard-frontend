import React, { Component } from 'react'
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';

class NewTextItemBtn extends Component {
   render() {
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isMergeMode = merge_loser ? true : false;
      
      if (isMergeMode) return null;
      else return (
         <div className="col-md-6">
            <div className="row no-gutters mb-2">
               <Link to="/app/content/item-text/create-new" className="btn btn-success ml-auto">New Item</Link>
            </div>
         </div>
      )
   }
}

export default withRouter(NewTextItemBtn);