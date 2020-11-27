import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../components/InlineHelp';
import TotalLabelFor from '../../components/TotalLabelFor';
import { formatDate, toFixedFloat } from '../../util';
import axios from '../../util/Api';

export default class Quotes extends Component {
   constructor(props) {
      super(props);
      this.state = {
         quotes: []
      };
   }
   componentDidMount() {
      const { location } = this.props;
      // const filter = {
      //    category: location.state ? location.state.category : "",
      //    id: location.state ? location.state.id : ""
      // };
      axios.get('/quotes')
         .then(({ data }) => {
            console.log("RRRRRRRRRRRRRRRR ===", data)
            this.setState({ quotes: data.quotes });
         }).catch(err => {
            console.error(" error during get quotes :", err)
         });
   }
   render() {
      console.log("Quotes state --", this.state);
      console.log("Quotes prpos --", this.props);
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
                                 <select className="form-control" id="author" name="author">
                                    <option value="CurrentAndArchived" defaultValue>Current &amp; Archived</option>
                                    <optgroup label="---------------------------">
                                       <option value="Current">Current</option>
                                       <option value="Archived">Archived</option>
                                       <option value="Follow-up">To follow up</option>
                                    </optgroup>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="filter_from" name="filter_from">
                                    <option value="AllTeamMembers" defaultValue>All Team Members</option>
                                    <optgroup label="---------------------------">
                                       <option value={52036}>A Devom</option>
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
                              pathname: '/app/quote/get',
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
                     !!this.state.quotes.length ?
                        <>
                           <table className="quotient-table">
                              <tbody className="rowClick" data-tg-click="root_rowClick">
                                 {
                                    this.state.quotes.map((item, index) => {
                                       if (item.status === "draft") return (
                                          <tr className="mod-green" key={index} onClick={() => this.props.history.push({
                                             pathname: `/app/quote/${item._id}`,
                                             state: {
                                                from: this.props.location.pathname
                                             }
                                          })}>
                                             <td>
                                                <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                                <div className="u-ellipsis">
                                                   <span>{item.title}</span>
                                                </div>
                                                <span className="float-right">
                                                   <small className="text-gray">
                                                      <span className="dt-time">{formatDate(item.createdAt)}</span>
                                                      <span className="label label-draft">{item.status}</span>
                                                   </small>
                                                </span>
                                                <div className="u-ellipsis">
                                                   <small className="text-gray"> {item.contactNameTo} by {item.userFrom} </small>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                       else if (item.status === "awaiting") return (
                                          <tr className="mod-white" key={index} onClick={() => this.props.history.push({
                                             pathname: `/q/${item.entoken}`,
                                             state: {
                                                from: this.props.location.pathname
                                             }
                                          })}>
                                             <td>
                                                <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                                <div className="u-ellipsis">
                                                   <span>{item.title}</span>
                                                </div>
                                                <span className="float-right">
                                                   <small className="text-gray">
                                                      <span className="dt-time">{formatDate(item.createdAt)}</span>
                                                   </small>
                                                </span>
                                                <div className="u-ellipsis">
                                                   <small className="text-gray">
                                                      <span className={`${item.viewedAt ? "text-danger" : "text-success"} mr-1`}>
                                                         {item.viewedAt ? `Viewed ` + formatDate(item.viewedAt) : `Unopened`}
                                                      </span>
                                                      {item.contactNameTo} by {item.userFrom}
                                                   </small>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                       else return (
                                          <tr className="mod-blue" key={index} onClick={() => this.props.history.push({
                                             pathname: `/q/${item.entoken}`,
                                             state: {
                                                from: this.props.location.pathname
                                             }
                                          })}>
                                             <td>
                                                <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                                <div className="u-ellipsis">
                                                   <span>{item.title}</span>
                                                </div>
                                                <span className="float-right">
                                                   <small className="text-gray">
                                                      <span className="dt-time">{formatDate(item.createdAt)}</span>
                                                      <span className="label label-draft">{item.status}</span>
                                                   </small>
                                                </span>
                                                <div className="u-ellipsis">
                                                   <small className="text-gray">
                                                      <span data-tg-control="{&quot;QuotesLastView&quot;:[1599451559]}">
                                                         {/* <span className="text-danger mr-1">Viewed 1 hour ago</span> */}
                                                         <span className="text-danger mr-1">Viewed {formatDate(item.viewedAt)}</span>
                                                      </span>{item.contactNameTo} by {item.userFrom}</small>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 }
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