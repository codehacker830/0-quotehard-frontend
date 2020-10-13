import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from '../../../util/Api';
import QuoteTableShow from './QuoteTableShow';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

const quotes = [
   {
      // status: "draft",
      status: "awaiting",
      // status: "accepted",
      title: "Test Quote",
      time: "36 minutes ago",
      value: 300,
      token: "C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g"
   }
];

export default class Dashboard extends Component {
   state = {
      search: ""
   };
   onClickArchive = () => { }
   componentDidMount() {
      axios
         .get('/quotes')
         .then(({ data }) => { 
            console.log("RRRRRRRRRRRRRRRR ===", data)
          });
   }
   render() {
      const { search } = this.state;
      const { match } = this.props;
      const dataMock = [
         {
            title: '63% Awaiting Acceptance',
            value: 15,
            color: 'rgb(255, 128, 66)'
         }, {
            title: '38% Accepted',
            value: 10,
            color: 'rgb(0, 196, 159)'
         }
      ];
      const total = 25;

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
         <div className="content">
            <div className="row py-3">
               <div className="col-md-6">
                  <div className="form-group">
                     <button
                        className="btn btn-success"
                        onClick={() => this.props.history.push({
                           pathname: "/app/quote/get",
                           state: {
                              from: this.props.location.pathname
                           }
                        })}>New Quote</button>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <div className="input-group">
                        <input
                           type="email"
                           className="form-control"
                           placeholder="Search by Quote Title, Number or Contact..." />
                        <div className="input-group-append">
                           <button type="button" className="btn btn-alt-dark">Search</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <QuoteTableShow />

               <div className="col-md-6">
                  <div className="mb-4">
                     <div className="pt-4">
                        {/* Circle chart section */}
                        <div className="row">
                           <div className="col-sm-6">
                              <div className="stat-h1">
                                 <span className="text-primary font-size-h2">
                                    <span className="font-size-base">$</span>
                                    <span>300</span>
                                    <span className="font-size-base">.00</span>
                                 </span>
                                 <p className="text-primary font-size-lg mb-0">Quotes Accepted</p>
                                 <span className="text-black font-size-lg">
                                    <span className="font-size-sm">$</span>
                                    <span>500</span>
                                    <span className="decimal">.00</span>
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
                                    animationDuration={500} />
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

            </div>
            <div className="row py-5 justify-content-center">
               <p className="text-center">
                  <strong>Your trial ends in
                            <span className="badge badge-primary">11</span>
                  </strong>
                  <br />
                        To carry on beyond your trial, please
                        <Link to="/app/settings/payment-details">
                     add payment details</Link>
               </p>
            </div>
         </div>
      );
   }
}