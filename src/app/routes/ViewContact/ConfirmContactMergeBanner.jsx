import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs';
import { toast } from 'react-toastify';
import axios from '../../../util/Api';

class ConfirmContactMergeBanner extends Component {
   constructor(props) {
      super(props);
      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.merge_loser = queryObj.merge_loser;
   }
   onClickConfirmMerge = () => {
      const { category } = this.props.contact;
      const contactId = this.props.match.params.id;
      console.log(" AAAAAAAAAAAAAAAAAAA winner ", contactId)
      console.log(" AAAAAAAAAAAAAAAAAAA merge_loser ", this.merge_loser)
      axios.post(`/contacts/${category}/merge`, { winnerOfMerge: contactId, loserOfMerge: this.merge_loser })
         .then(() => {
            toast.success('Contact merged.');
            this.props.history.push('/app/c/contacts');
         })
         .catch(err => {
            console.error("error during merge contact : ", err);
         });
   }
   render() {
      const isMergeMode = this.merge_loser ? true : false;
      if (isMergeMode) return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content p-4">
                  <div className="row no-gutters">
                     <h2>This will be the Winner</h2>
                  </div>
                  <div className="row no-gutters">
                     <button className="btn btn-secondary mr-2" onClick={this.onClickConfirmMerge}>Confirm Merge</button>
                     <Link className="btn btn-outline-dark" to='/app/c/contacts'>Cancel</Link>
                  </div>
               </div>
            </div>
         </div>
      );
      else return null;
   }
}

export default withRouter(ConfirmContactMergeBanner);
