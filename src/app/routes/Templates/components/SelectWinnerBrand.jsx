import React, { Component } from 'react'
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';

class SelectWinnerBrand extends Component {
   render() {
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isMergeMode = merge_loser ? true : false;
      if (isMergeMode) return (
         <div className="block block-rounded">
            <div className="block-content">
               <div className="row no-gutters">
                  <h2>Select the Winner</h2>
                  <p className="ml-auto">
                     <Link className="btn btn-secondary" to={this.props.match.path}>Cancel Merge</Link>
                  </p>
               </div>
            </div>
         </div>
      );
      else return null;
   }
}

export default withRouter(SelectWinnerBrand);