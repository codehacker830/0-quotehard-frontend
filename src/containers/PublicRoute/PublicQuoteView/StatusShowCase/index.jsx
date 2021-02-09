import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuoteActivities from '../../components/QuoteActivities';
import AuthorBox from './AuthorBox';
import StatEditTimes from './StatEditTimes';
import StatOpenTimes from './StatOpenTimes';
import StatQATimes from './StatQATimes';
import StatNoteTimes from './StatNoteTimes';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../../util/Api';
import clsx from 'clsx';

class StatusShowCase extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         showActivity: false,
         activities: []
      };
   }
   onClickEditDraft = () => {
      this.props.history.push(`/app/quote/${this.props.quote._id}`);
   }
   onClickShowActivity = () => {
      this.setState({ loading: true });
      // get all acitivities from backend
      // setTimeout(() => {
      //    this.setState({ showActivity: true, loading: false })
      // }, 1000);
      axios.get(`/quotes/activities/${this.props.quote._id}`).then(({ data }) => {
         console.log(" 000000000 ", data)
         this.setState({
            showActivity: true,
            loading: false,
            activities: data.activities
         });
      }).catch(err => {
         console.error("err during get contact activities");
         this.setState({ showActivity: false, loading: false });
      });
   }
   render() {
      const { quote } = this.props;
      const { entoken } = this.props.match.params;
      return (
         <div className="offlineBanner no_print" >
            <div className="container">
               {
                  quote.status === "draft" || quote.status === "editing" ?
                     <React.Fragment>
                        <div className="author-stat-spacer" />
                        <div className="pull-left">
                           <div className="author-edit">
                              <button type="button" className="btn btn-primary rounded-0 mr-2" onClick={this.props.onClickConfirmSend}>Send...</button>
                              <button type="button" className="btn btn-outline-secondary rounded-0" onClick={this.onClickEditDraft}>Edit Draft</button>
                           </div>
                        </div>
                     </React.Fragment>
                     :
                     <React.Fragment>
                        <AuthorBox />
                        <div className="author-stat-spacer" />
                        <StatOpenTimes />
                        {/* <StatQATimes /> */}
                        <StatNoteTimes />
                        <StatEditTimes />
                     </React.Fragment>
               }
               <div className="author-stat-link author-stat-link-preview">
                  <Link to={`/q/${entoken}/preview`}>Preview as Your Customer</Link>
               </div>
               <div className={clsx("author-stat-link history-snippet", this.state.showActivity ? "isHidden" : "")}>
                  <button className={clsx("buttonLink", this.state.loading ? "disabled" : "")}
                     disabled={this.state.loading}
                     onClick={this.onClickShowActivity}>
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
                  {this.state.showActivity && <QuoteActivities onHistoryClose={() => this.setState({ showActivity: false })} activities={this.state.activities} />}
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};
export default connect(mapStateToProps)(withRouter(StatusShowCase))