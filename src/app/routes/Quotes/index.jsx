import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import { QUOTE_GET_PATH } from '../../../constants/PathNames';
import axios from '../../../util/Api';
import Tr_Quotient from './Tr_Quotient';

class Quotes extends Component {
   constructor(props) {
      super(props);
      this.state = {
         filterState: "currentAndArchived",
         quotes: []
      };
   }
   componentDidMount() {
      axios.get(`/quotes`)
         .then(({ data }) => {
            this.setState({ quotes: data.quotes });
         }).catch(err => {
            console.error(" error during get quotes :", err)
         });
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.filterState !== this.state.filterState) {
         if (this.state.filterState === "currentAndArchived") {
            axios.get(`/quotes`)
               .then(({ data }) => {
                  this.setState({ quotes: data.quotes });
               }).catch(err => {
                  console.error(" error during get quotes :", err)
               });
         } else {
            axios.get(`/quotes/state/${this.state.filterState}`)
               .then(({ data }) => {
                  this.setState({ quotes: data.quotes });
               }).catch(err => {
                  console.error(" error during get quotes :", err)
               });
         }
      }
   }
   render() {
      console.log("Quotes state --", this.state);
      console.log("Quotes prpos --", this.props);
      const { authUser, teamMembers } = this.props;
      const currentUser = authUser.firstName;
      return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="row p-3">
                     <div className="col-md-7 col-sm-12">
                        <div className="form-group px-1">
                           <div className="input-group">
                              <input type="email" className="form-control" placeholder="Search by Quote Title, Number or Contact..." />
                              <div className="input-group-append">
                                 <button type="button" className="btn btn-alt-dark">Search</button>
                              </div>
                           </div>
                        </div>
                        <div className="row no-gutters">
                           <div className="col-md-4 col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="author" name="author"
                                    value={this.state.filterState}
                                    onChange={(ev) => this.setState({ filterState: ev.target.value })}
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
                                 <select className="form-control" id="filter_from" name="filter_from">
                                    <option value="AllTeamMembers" defaultValue>All Team Members</option>
                                    <optgroup label="---------------------------">
                                       <option value={52036}>{currentUser}</option>
                                    </optgroup>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-12 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="status" name="status">
                                    <option value="AnyStatus" defaultValue>Any Status</option>
                                    <optgroup label="---------------------------">
                                       <option value="Sent">Awaiting Acceptance</option>
                                       <option value="Accepted">Accepted</option>
                                       <option value="Draft">Draft</option>
                                       <option value="Expired">Expired</option>
                                       <option value="Declined">Declined</option>
                                       <option value="Withdrawn">Withdrawn</option>
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
            </div>

            <div className="block block-rounded">
               <div className="block-content">
                  {
                     this.state.quotes.length ?
                        <>
                           <table className="quotient-table">
                              <tbody className="rowClick" data-tg-click="root_rowClick">
                                 {this.state.quotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
                              </tbody>
                           </table>
                           <TotalLabelFor list={this.state.quotes} />
                        </>
                        : <InlineHelp>
                           Organise and search all your quotes in&nbsp;one&nbsp;place.
                           <br />
                           You&nbsp;can&nbsp;create and send your first quote in&nbsp;a matter of&nbsp;minutes.
                        </InlineHelp>
                  }
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ auth, teamSetting }) => {
   const { authUser } = auth;
   const { teamMembers } = teamSetting;
   return { authUser, teamMembers };
}

export default connect(mapStateToProps)(Quotes);