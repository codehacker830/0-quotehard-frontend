import React, { Component } from 'react'
import { connect } from 'react-redux';
import { QUOTE_GET_PATH } from '../../../constants/PathNames';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

class QuoteControlPanel extends Component {
   constructor(props) {
      super(props);
      this.state = {
         search: ""
      };

      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.search = queryObj.search ? queryObj.search : "";
      this.tab = queryObj.tab ? queryObj.tab : "currentAndArchived";
      this.author = queryObj.author ? queryObj.author : "allTeamMembers";
      this.status = queryObj.status ? queryObj.status : "anyStatus";
   }
   componentDidMount() {
      this.setState({ search: this.search });
   }
   onChangeTab = (ev) => {
      this.tab = ev.target.value;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/quotes",
         search: query
      })
   }
   onChangeAuthor = (ev) => {
      this.author = ev.target.value;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/quotes",
         search: query
      })
   }
   onChangeStatus = (ev) => {
      this.status = ev.target.value;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/quotes",
         search: query
      })
   }
   onHandleKeyDown = (ev) => {
      if (ev.keyCode === 13) {
         // event when enter was clicked
         this.onClickSearch();
      }
   }
   onClickSearch = () => {
      this.search = this.state.search;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/quotes",
         search: query
      })
   }
   onClickCancelSearch = () => {
      this.search = "";
      this.tab = "currentAndArchived";
      this.author = "allTeamMembers";
      this.status = "anyStatus";
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/quotes",
         search: query
      })
   }
   makeQuery = () => {
      let queryObj = {};
      if (this.search) queryObj = { ...queryObj, search: this.search };
      if (this.tab !== "currentAndArchived") queryObj = { ...queryObj, tab: this.tab };
      if (this.author !== "allTeamMembers") queryObj = { ...queryObj, author: this.author };
      if (this.status !== "anyStatus") queryObj = { ...queryObj, status: this.status };
      return qs.stringify(queryObj);
   }
   render() {
      const { authUser, teamMembers } = this.props;
      const currentUser = authUser.firstName + " " + authUser.lastName;
      const isCancelButtonShow = this.search
         || this.tab !== "currentAndArchived"
         || this.author !== "allTeamMembers"
         || this.status !== "anyStatus"
      console.log(" dddddd ", isCancelButtonShow)

      return (
         <div className="block block-rounded">
            <div className="block-content">
               <div className="row p-3">
                  <div className="col-md-7 col-sm-12">
                     <div className="form-group px-1">
                        <div className="input-group">
                           <input type="text" className="form-control" placeholder="Search by Quote Title, Number or Contact..."
                              onKeyDown={this.onHandleKeyDown}
                              value={this.state.search}
                              onChange={ev => this.setState({ search: ev.target.value })}
                           />
                           <div className="input-group-append">
                              <button type="button" className="btn btn-default mr-1" onClick={this.onClickSearch}>Search</button>
                              {
                                 isCancelButtonShow &&
                                 <button type="button" className="btn btn-light" onClick={this.onClickCancelSearch}><i className="fa fa-fw fa-times" /></button>
                              }
                           </div>
                        </div>
                     </div>
                     <div className="row no-gutters">
                        <div className="col-md-4 col-sm-6 px-1">
                           <div className="form-group">
                              <select className="form-control" id="author" name="author"
                                 value={this.tab}
                                 onChange={this.onChangeTab}
                              >
                                 <option value="currentAndArchived">Current &amp; Archived</option>
                                 <optgroup label="---------------------------">
                                    <option value="current">Current</option>
                                    <option value="archived">Archived</option>
                                    <option value="follow-up">To follow up</option>
                                 </optgroup>
                              </select>
                           </div>
                        </div>
                        <div className="col-md-4 col-sm-6 px-1">
                           <div className="form-group">
                              <select className="form-control" id="filter_from" name="filter_from"
                                 value={this.author}
                                 onChange={this.onChangeAuthor}
                              >
                                 <option value="allTeamMembers">All Team Members</option>
                                 <optgroup label="---------------------------">
                                    <option value={authUser._id}>{currentUser}</option>
                                 </optgroup>
                              </select>
                           </div>
                        </div>
                        <div className="col-md-4 col-sm-12 px-1">
                           <div className="form-group">
                              <select className="form-control" id="status" name="status"
                                 value={this.status}
                                 onChange={this.onChangeStatus}
                              >
                                 <option value="anyStatus">Any Status</option>
                                 <optgroup label="---------------------------">
                                    <option value="sent">Awaiting Acceptance</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="draft">Draft</option>
                                    <option value="expired">Expired</option>
                                    <option value="declined">Declined</option>
                                    <option value="withdrawn">Withdrawn</option>
                                 </optgroup>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-md-5 col-sm-12">
                     <div className="row no-gutters mb-2 px-1">
                        <button className="btn btn-success ml-auto" onClick={() => this.props.history.push({
                           pathname: QUOTE_GET_PATH,
                           state: { from: this.props.location.pathname }
                        })}>New Quote</button>
                     </div>
                  </div>
               </div>
            </div>
         </div >

      )
   }
}
const mapStateToProps = ({ auth, teamSetting }) => ({
   authUser: auth.authUser,
   teamMembers: teamSetting.teamMembers
})

export default connect(mapStateToProps)(withRouter(QuoteControlPanel));