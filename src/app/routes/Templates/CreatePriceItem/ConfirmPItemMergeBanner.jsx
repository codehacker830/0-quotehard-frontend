import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs';
import axios from '../../../../util/Api';
import { toast } from 'react-toastify';

class ConfirmPItemMergeBanner extends Component {
   constructor(props) {
      super(props);
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.merge_loser = queryObj.merge_loser
   }
   onClickConfirmMerge = () => {
      const priceItemId = this.props.match.params.id;
      axios.post('/templates/priceitem/merge', { winnerOfMerge: priceItemId, loserOfMerge: this.merge_loser })
         .then(() => {
            toast.success('Item merged.');
            this.props.history.push('/app/content/item-price/browse');
         })
         .catch(err => {
            console.error("error during merge : ", err);
         });
   }
   render() {
      const isMergeMode = this.merge_loser ? true : false;
      if (isMergeMode) return (
         <div className="content mb-5">
            <div className="row no-gutters">
               <h2>This will be the Winner</h2>
            </div>
            <div className="row no-gutters">
               <button className="btn btn-secondary mr-2" onClick={this.onClickConfirmMerge}>Confirm Merge</button>
               <Link className="btn btn-outline-dark" to='/app/content/item-price/browse'>Cancel</Link>
            </div>
         </div>
      );
      else return null;
   }
}

export default withRouter(ConfirmPItemMergeBanner);
