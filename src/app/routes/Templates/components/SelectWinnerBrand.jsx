import React, { Component } from 'react'
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'highcharts';

class SelectWinnerBrand extends Component {
   render() {
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const { merge_loser } = queryObj;
      const isMergeMode = merge_loser ? true : false;
      if (isMergeMode) return (
         <div className="block-content mb-5">
            <div className="row no-gutters">
               <div className="col-sm-6">
                  <h2>Select the Winner</h2>
               </div>
               <div className="col-sm-6">
                  <div className="row no-gutters">
                     <Link className="btn btn-secondary ml-auto" to={this.props.match.path}>Cancel Merge</Link>
                  </div>
               </div>
            </div>
         </div>
      );
      else return null;
   }
}

export default withRouter(SelectWinnerBrand);