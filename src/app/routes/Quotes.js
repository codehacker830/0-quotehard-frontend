import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../components/InlineHelp';

export default class Quotes extends Component {
   render() {
      return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="row p-3">
                     <div className="col-md-6">
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
                                    <option value selected="selected">Current &amp; Archived</option>
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
                                    <option value selected="selected">All Team Members</option>
                                    <optgroup label="---------------------------">
                                       <option value={52036}>A Devom</option>
                                    </optgroup>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-12 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="status" name="status">
                                    <option value selected="selected">Any Status</option>
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

                     <div className="col-md-6">
                        <div className="row mb-2">
                           <button className="btn btn-success ml-auto">New Quote</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="block block-rounded">
               <div className="block-content py-3">
                  <InlineHelp>
                     Organise and search all your quotes in&nbsp;one&nbsp;place.
                     <br />
                     You&nbsp;can&nbsp;create and send your first quote in&nbsp;a matter of&nbsp;minutes.
                  </InlineHelp>
                  <table className="quotient-table mb-4">
                     <tbody className="rowClick" data-tg-click="root_rowClick">
                        <tr className="mod-white">
                           <td>
                              <span className="float-right ml-2">300.00</span>
                              <div className="u-ellipsis">
                                 <Link to="q/C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g">Test Quote</Link>
                              </div>
                              <span className="float-right">
                                 <small className="text-gray">
                                    <span className="dt-time">36 minutes ago</span>
                                 </small>
                              </span>
                              <div className="u-ellipsis">
                                 <small className="text-gray">
                                    <span data-tg-control="{&quot;QuotesLastView&quot;:[1599451874]}"><span className="text-danger mr-1">Viewed 29 minutes ago</span></span>                    DanilCompany by A Devom #4              </small>
                              </div>
                           </td>
                        </tr>
                        <tr className="mod-green">
                           <td>
                              <span className="float-right ml-2">1,350.00</span>
                              <div className="u-ellipsis">
                                 <Link to="app/quote/5222670">Please checkout your bill...(Title Of Quote)</Link>
                              </div>
                              <span className="float-right">
                                 <small className="text-gray">
                                    <span className="dt-time">37 minutes ago</span>
                                    <span className="badge badge-success ml-1">Draft</span>
                                 </small>
                              </span>
                              <div className="u-ellipsis">
                                 <small className="text-gray"> DanilCompany by A Devom #2 </small>
                              </div>
                           </td>
                        </tr>
                        <tr className="mod-blue">
                           <td>
                              <span className="float-right ml-2">300.00</span>
                              <div className="u-ellipsis">
                                 <Link to="/q/O1VCV2MznD47FjGU.oIlCgqcAT-fxYhenFAFX9trWuI">can you checkout the service price today?</Link>
                              </div>
                              <span className="float-right">
                                 <small className="text-gray">
                                    <span className="dt-time">Sep 7</span>
                                    <span className="badge badge-primary ml-1">Accepted</span>
                                 </small>
                              </span>
                              <div className="u-ellipsis">
                                 <small className="text-gray">
                                    <span data-tg-control="{&quot;QuotesLastView&quot;:[1599451559]}">
                                       <span className="text-danger mr-1">Viewed 1 hour ago</span>
                                    </span>HK by A Devom #3</small>
                              </div>
                           </td>
                        </tr>
                        <tr className="mod-white">
                           <td>
                              <span className="float-right ml-2">200.00</span>
                              <div className="u-ellipsis">
                                 <Link to="q/GQWDSP0.YXD1HFESUwFpFhVFmd-GHtoQiqNpu8anUiU">Titile of Quote</Link>
                              </div>
                              <span className="float-right">
                                 <small className="text-gray">
                                    <span className="dt-time">Sep 1</span></small>
                              </span>
                              <div className="u-ellipsis">
                                 <small className="text-gray">
                                    <span className="text-success mr-1">Unopened</span>Allover by A Devom #1</small>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="p-4">
                     <span>Total 4</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}