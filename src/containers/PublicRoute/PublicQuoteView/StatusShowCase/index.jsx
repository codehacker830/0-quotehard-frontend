import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityHistoryFull from '../../components/ActivityHistoryFull';
import AuthorBox from './AuthorBox';
import StatEditTimes from './StatEditTimes';
import StatOpenTimes from './StatOpenTimes';
import StatQATimes from './StatQATimes';
import StatNoteTimes from './StatNoteTimes';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../../util/Api';

class StatusShowCase extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         show: false,
         activityData: null
      };
   }
   onClickSend = () => {
      const payload = {
         quoteId: this.props.quote._id
      };
      axios.post('/quotes/send', payload)
         .then(({ data }) => {
            toast.success("Quote email was sent.");
            this.props.history.push(`/q/${data.entoken}`);
         })
         .catch(err => {
            console.error(" error => ", err);
            toast.error("Failed to send quote.");
         });
   }
   onClickEditDraft = () => {
      this.props.history.push(`/app/quote/${this.props.quote._id}`);
   }
   onClickActivity = () => {
      this.setState({ loading: true });
      // get all acitivities from backend
      setTimeout(() => {
         this.setState({ show: true, loading: false })
      }, 1000);

   }
   render() {
      const { quote } = this.props;
      const { entoken } = this.props.match.params;
      if (quote.status === "draft") return (
         <div className="offlineBanner no_print" >
            <div className="container">
               <div className="author-stat-spacer" />
               <div className="pull-left">
                  <div className="author-edit">
                     <button type="button" className="btn btn-primary mr-2" onClick={this.onClickSend}>Send...</button>
                     <button type="button" className="btn btn-outline-secondary" onClick={this.onClickEditDraft}>Edit Draft</button>
                  </div>
               </div>
               <div className="author-stat-link author-stat-link-preview">
                  <Link to={`/q/${entoken}/preview`}>Preview as Your Customer</Link>
               </div>
               <div className="clear" />
            </div>
         </div>
      );
      else return (
         <div className="offlineBanner no_print" >
            <div className="container">
               <AuthorBox />
               <div className="author-stat-spacer">
               </div>

               <StatOpenTimes />
               <StatQATimes />
               <StatNoteTimes />
               <StatEditTimes />
               <div className="author-stat-link author-stat-link-preview">
                  <Link to={`/q/${entoken}/preview`}>Preview as Your Customer</Link>
               </div>
               <div className={`author-stat-link history-snippet ${this.state.show ? "isHidden" : ""}`}>
                  <button className={`buttonLink ${this.state.loading ? "disabled" : ""}`}
                     disabled={this.state.loading}
                     onClick={this.onClickActivity}>
                     {
                        this.state.loading ?
                           <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                           : <i className="fa fa-fw fa-history mr-1" />
                     }
                  All Activity
               </button>
               </div>
               <div className="clear" />
               <div className="history-full" style={{}}>
                  {this.state.show && <ActivityHistoryFull onHistoryClose={() => this.setState({ show: false })} data={this.data} />}
               </div>
            </div >
         </div >
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};
export default connect(mapStateToProps)(withRouter(StatusShowCase))