import HighchartsReact from 'highcharts-react-official';
import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { countDecimals } from '../../../../util';
import Highcharts from 'highcharts';
import DashMessages from './DashMessages';

export default class QuoteOverview extends Component {
   render() {
      const awaitingQuotes = this.props.quotes.filter((it) => it.status === "sent");
      const acceptedQuotes = this.props.quotes.filter((it) => it.status === "accepted");
      let awaitingTotal = 0;
      for (let i = 0; i < awaitingQuotes.length; i++) {
         awaitingTotal += awaitingQuotes[i].quoteTotal;
      }
      let acceptedTotal = 0;
      for (let i = 0; i < acceptedQuotes.length; i++) {
         acceptedTotal += acceptedQuotes[i].quoteTotal;
      }
      let total = awaitingTotal + acceptedTotal;

      console.log("awaitingTotal => ", awaitingTotal);
      console.log("acceptedTotal => ", acceptedTotal);
      console.log("total => ", total);
      const chartMock = [
         {
            title: `${awaitingTotal / total * 100}% Awaiting Acceptance`,
            value: awaitingTotal,
            color: 'rgb(113, 117, 123)'
         },
         {
            title: `${acceptedTotal / total * 100}% Accepted`,
            value: acceptedTotal,
            color: 'rgb(33, 118, 199)'
         }
      ];

      const highChartOptions = {
         title: {
            text: 'Stats'
         },
         series: [
            {
               data: [200, 320, 800, 400, 750]
            }
         ]
      }
      return (
         <div className="col-md-6">
            <DashMessages />
            <div className="mb-4">
               <div className="pt-4">
                  {/* Circle chart section */}
                  <div className="row">
                     <div className="col-sm-6">
                        <div className="stat-h1">
                           <span className="text-primary font-size-h2">
                              <span className="font-size-base">$</span>
                              <span>{acceptedTotal.toFixed(0)}</span>
                              <span className="font-size-base">.{countDecimals(acceptedTotal.toFixed(2))}</span>
                           </span>
                           <p className="text-primary font-size-lg mb-0">Quotes Accepted</p>
                           <span className="text-black font-size-lg">
                              <span className="font-size-sm">$</span>
                              <span>{awaitingTotal.toFixed(0)}</span>
                              <span className="font-size-base">.{countDecimals(awaitingTotal.toFixed(2))}</span>
                           </span>
                           <p className="text-black mb-0">Awaiting Acceptance</p>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="row no-gutters justify-content-center">
                           <div className="stat-pie stat-pie-loading" style={{ width: "236px", height: "236px", background: "url(/pie-loading.png) no-repeat", backgroundSize: "236px 236px" }}>
                              {
                                 total !== 0 &&
                                 <PieChart
                                    data={chartMock}
                                    style={{
                                       color: 'blue',
                                       justifyContent: "center",
                                       width: "236px",
                                       height: "236px"
                                    }}
                                    label={({ dataEntry }) => {
                                       let labelNum = dataEntry.value / total * 100;
                                       return `${labelNum.toFixed(0) + "%"}`;
                                    }}
                                    startAngle={-90}
                                    lineWidth={70}
                                    paddingAngle={1}
                                    reveal={100}
                                    animate={false}
                                 // animationDuration={500}
                                 />
                              }
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Line chart section */}
                  <div className="mb-4 w-100">
                     <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
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
      );
   }
}