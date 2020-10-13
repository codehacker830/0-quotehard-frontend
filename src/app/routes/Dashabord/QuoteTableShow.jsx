import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class QuoteTableShow extends Component {
   render() {
      return (
         <div className="col-md-6">
            <div className="mb-4">
               {/* Draft Section */}
               <table className="quotient-table mb-4">
                  <tbody className="rowClick" data-tg-click="root_rowClick">
                     <tr className="mod-green" onClick={() => this.props.history.push(`app/quote/5222670`)}>
                        <td>
                           <span className="float-right ml-2">1,350.00</span>
                           <div className="u-ellipsis">
                              <span>Please checkout your bill...(Title Of Quote)</span>
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
                  </tbody>
               </table>
               {/* Awating Acceptance Section*/}
               <div className="font-w700 mb-3">
                  {/* <Link className="btn btn-outline-light btn-alt float-right text-primary" to="app/quotes?tab=Follow-up&author=52036">
                     Follow-up <span className="badge badge-pill badge-primary mb-0">1</span>
                  </Link> */}
                  Awaiting Acceptance
               </div>
               <div>
                  <table className="quotient-table mb-4">
                     <tbody className="rowClick" data-tg-click="root_rowClick">
                        <tr className="mod-white" onClick={() => this.props.history.push(`/q/C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g`)}>
                           <td>
                              <span className="float-right ml-2">300.00</span>
                              <div className="u-ellipsis">
                                 <span>Test Quote</span>
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

                        <tr className="mod-white" onClick={() => this.props.history.push(`/q/C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g`)}>
                           <td>
                              <span className="float-right ml-2">200.00</span>
                              <div className="u-ellipsis">
                                 <span>Titile of Quote</span>
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
               </div>
               {/* Accepted Section */}
               <div className="font-w700 mb-3 text-success">Accepted</div>
               <div>
                  <table className="quotient-table mb-4">
                     <tbody className="rowClick" data-tg-click="root_rowClick">
                        <tr className="mod-blue" onClick={() => this.props.history.push("/q/C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g")}>
                           <td>
                              <span className="float-right ml-2">300.00</span>
                              <button className="btn btn-sm btn-alt-dark float-left m-1 mr-2" onClick={() => this.onClickArchive()}>Archive</button>
                              <div className="u-ellipsis">
                                 <span>can you checkout the service price today?</span>
                              </div>
                              <span className="float-right">
                                 <small className="text-gray">
                                    <span className="dt-time">Sep 7</span>
                                    <span className="badge badge-primary ml-1">Accepted</span>
                                 </small>
                              </span>
                              <div className="u-ellipsis">
                                 <small className="text-gray">
                                    <span className="text-danger mr-1">Viewed 1 hour ago</span>HK by A Devom #3</small>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );
   }
}