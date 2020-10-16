import { time } from 'highcharts';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { initTemplateSettings } from '../../../constants/InitState';
import { toFixedFloat } from '../../../util';

class QuoteTableShow extends Component {
   render() {
      console.log(" =============== this.props.quotes   ///", this.props.quotes);
      const draftQuotes = this.props.quotes.filter((it) => it.status === "draft");
      const awaitingQuotes = this.props.quotes.filter((it) => it.status === "awaiting");
      const acceptedQuotes = this.props.quotes.filter((it) => it.status === "accepted");
      return (
         <div className="col-md-6">
            {
               this.props.quotes.length ?
                  <div className="mb-4">
                     {/* Draft Section */}
                     {
                        !!draftQuotes.length &&
                        <table className="quotient-table mb-4">
                           <tbody className="rowClick" data-tg-click="root_rowClick">
                              {draftQuotes.map((item, index) => (
                                 <tr className="mod-green" key={index} onClick={() => this.props.history.push(`app/quote/${item._id}`)}>
                                    <td>
                                       <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                       <div className="u-ellipsis">
                                          <span>{item.title}</span>
                                       </div>
                                       <span className="float-right">
                                          <small className="text-gray">
                                             <span className="dt-time">{item.createdAt}</span>
                                             <span className="badge badge-success px-3 py-1 ml-1 text-uppercase">{item.status}</span>
                                          </small>
                                       </span>
                                       <div className="u-ellipsis">
                                          <small className="text-gray"> {item.contactNameTo} by {item.userFrom} </small>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     }
                     {/* Awating Acceptance Section*/}
                     {
                        !!awaitingQuotes.length &&
                        <>
                           <div className="font-w700 mb-3">
                              {/* <Link className="btn btn-outline-light btn-alt float-right text-primary" to="app/quotes?tab=Follow-up&author=52036">
                                 Follow-up <span className="badge badge-pill px-3 py-1 badge-primary text-uppercase mb-0">1</span>
                              </Link> */}
                              Awaiting Acceptance
                           </div>
                           <div>
                              <table className="quotient-table mb-4">
                                 <tbody className="rowClick" data-tg-click="root_rowClick">
                                    {awaitingQuotes.map((item, index) => (
                                       <tr className="mod-white" key={index} onClick={() => this.props.history.push(`/q/${item.entoken}`)}>
                                          <td>
                                             <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                             <div className="u-ellipsis">
                                                <span>{item.title}</span>
                                             </div>
                                             <span className="float-right">
                                                <small className="text-gray">
                                                   <span className="dt-time">{item.createdAt}</span>
                                                </small>
                                             </span>
                                             <div className="u-ellipsis">
                                                <small className="text-gray">
                                                   <span className={`${item.viewedAt ? "text-danger" : "text-success"} mr-1`}>
                                                      {item.viewedAt ? `Viewed ` + item.viewedAt : `Unopened`}
                                                   </span>
                                                   {item.contactNameTo} by {item.userFrom}
                                                </small>
                                             </div>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </>
                     }
                     {/* Accepted Section */}
                     {
                        !!acceptedQuotes.length &&
                        <>
                           <div className="font-w700 mb-3 text-success">Accepted</div>
                           <div>

                              <table className="quotient-table mb-4">
                                 <tbody className="rowClick" data-tg-click="root_rowClick">
                                    {
                                       acceptedQuotes.map((item, index) => {
                                          return (
                                             <tr className="mod-blue" key={index} onClick={() => this.props.history.push(`/q/${item.entoken}`)}>
                                                <td>
                                                   <span className="float-right ml-2">{toFixedFloat(item.quoteTotal)}</span>
                                                   <button className="btn btn-sm btn-alt-dark float-left m-1 mr-2" onClick={() => this.onClickArchive()}>Archive</button>
                                                   <div className="u-ellipsis">
                                                      <span>{item.title}</span>
                                                   </div>
                                                   <span className="float-right">
                                                      <small className="text-gray">
                                                         <span className="dt-time">{item.createdAt}</span>
                                                         <span className="badge badge-primary px-3 py-1 ml-1 text-uppercase">{item.status}</span>
                                                      </small>
                                                   </span>
                                                   <div className="u-ellipsis">
                                                      <small className="text-gray">
                                                         <span className="text-danger mr-1">Viewed {item.viewedAt}</span>{item.contactNameTo} by {item.userFrom}</small>
                                                   </div>
                                                </td>
                                             </tr>
                                          );
                                       })
                                    }
                                 </tbody>
                              </table>
                           </div>
                        </>
                     }
                  </div>
                  : null
            }
         </div>
      );
   }
}

export default withRouter(QuoteTableShow);