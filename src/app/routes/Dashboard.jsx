import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const quotes = [
   {
      // status: "draft",
      status: "awaiting",
      // status: "accepted",
      title: "Test Quote",
      time: "36 minutes ago",
      value: 300,
      token: "C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g",
   }
];

export default class Dashboard extends Component {
   state = {
      search: ""
   };
   onClickArchive = () => { }
   render() {
      const { search } = this.state;
      const { match } = this.props;
      const dataMock = [
         { title: '63% Awaiting Acceptance', value: 15, color: 'rgb(255, 128, 66)' },
         { title: '38% Accepted', value: 10, color: 'rgb(0, 196, 159)' }
      ];
      const total = 25;

      const highChartOptions = {
         title: {
            text: 'Stats'
         },
         series: [{
            data: [200, 320, 800, 400, 750]
         }]
      }
      return (
         <div className="content">
            <div className="row py-3">
               <div className="col-md-6">
                  <div className="form-group">
                     <button className="btn btn-success" onClick={() => this.props.history.push({
                        pathname: "/app/quote/get",
                        state: { from: this.props.location.pathname }
                     })}>New Quote</button>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <div className="input-group">
                        <input type="email" className="form-control" placeholder="Search by Quote Title, Number or Contact..." />
                        <div className="input-group-append">
                           <button type="button" className="btn btn-alt-dark">Search</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
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
                        <Link className="btn btn-outline-light btn-alt float-right text-primary" to="app/quotes?tab=Follow-up&author=52036">
                           Follow-up <span className="badge badge-pill badge-primary mb-0">1</span>
                        </Link>
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

               <div className="col-md-6">
                  <div className="mb-4">
                     <div className="pt-4">
                        {/* Circle chart section */}
                        <div className="row">
                           <div className="col-sm-6">
                              <div className="stat-h1">
                                 <span className="text-primary font-size-h2">
                                    <span className="font-size-base">$</span>
                                    <span>300</span><span className="font-size-base">.00</span>
                                 </span>
                                 <p className="text-primary font-size-lg mb-0">Quotes Accepted</p>
                                 <span className="text-black font-size-lg">
                                    <span className="font-size-sm">$</span>
                                    <span>500</span><span className="decimal">.00</span>
                                 </span>
                                 <p className="text-black mb-0">Awaiting Acceptance</p>
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div className="stat-pie stat-pie-loading" data-highcharts-chart="0">
                                 <PieChart
                                    data={dataMock}
                                    style={{
                                       color: 'blue'
                                    }}
                                    label={({ dataEntry }) => dataEntry.value / total * 100 + "%"}
                                    startAngle={-90}
                                    lineWidth={70}
                                    paddingAngle={1}
                                    reveal={100}
                                    animate={true}
                                    animationDuration={500}
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Line chart section */}
                        <div className="mb-4 w-100">
                           <HighchartsReact
                              highcharts={Highcharts}
                              options={highChartOptions}
                           />
                        </div>

                        {/* Flex Controller section */}
                        <div className="row">
                           <div className="col-md-4 col-sm-6">
                              <div className="form-group">
                                 <label htmlFor="filter_from">Display from</label>
                                 <select className="form-control" id="filter_from" name="filter_from">
                                    <optgroup label="Days">
                                       <option value="day:30">30 days ago</option>
                                       <option value="day:90">90 days ago</option>
                                       <option value="day:180">180 days ago</option>
                                       <option value="day:365">365 days ago</option>
                                    </optgroup>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-6">
                              <div className="form-group">
                                 <label htmlFor="filter_unit">Display as</label>
                                 <select className="form-control" id="filter_unit" name="filter_unit">
                                    <option value="total">Total value</option>
                                    <option value="average-total">Average value</option>
                                    <option value="count">Count</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-12">
                              <div className="form-group">
                                 <label htmlFor="filter_rolling">Rolling total</label>
                                 <select className="form-control" id="filter_rolling" name="filter_rolling">
                                    <option value={30}>30 day</option>
                                    <option value={7}>7 day</option>
                                    <option value={1}>1 day</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
            <div className="row py-5 justify-content-center">
               <p className="text-center">
                  <strong>Your trial ends in <span className="badge badge-primary">11</span></strong>
                  <br />
                  To carry on beyond your trial, please
               <Link to="/app/settings/payment-details"> add payment details</Link>
               </p>
            </div>
         </div>
      );
   }
}