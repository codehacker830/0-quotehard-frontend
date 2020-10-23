import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from '../../../util/Api';
import QuoteTableShow from './QuoteTableShow';
import { countDecimals, toFixedFloat } from '../../../util';

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
   constructor(props) {
      super(props);
      this.state = {
         dropdownOpen: false,
         search: "",
         quotes: [],
         templates: []
      };
      this.dropdownContainer = React.createRef();
   }
   onClickOutsideHandler = (ev) => {
      if (this.state.dropdownOpen && !this.dropdownContainer.current.contains(ev.target)) {
         this.setState({ dropdownOpen: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      // get all quotes and templates
      const Promise1 = axios.get('/quotes');
      const Promise2 = axios.get('/templates');
      Promise.all([Promise1, Promise2]).then((values) => {
         console.log("values ==========================>", values);
         this.setState({
            quotes: values[0].data.quotes,
            templates: values[1].data.templates
         })
      }).catch(err => {
         console.error(" error ===>", err);
      });
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }

   render() {
      const { search } = this.state;
      const { match } = this.props;

      const awaitingQuotes = this.state.quotes.filter((it) => it.status === "awaiting");
      const acceptedQuotes = this.state.quotes.filter((it) => it.status === "accepted");
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
      const templateList = this.state.templates.filter((temp, index) => temp.status === "current");
      return (
         <div className="content">
            <div className="row py-3">
               <div className="col-md-6">

                  <div className="form-group">
                     <div style={{ position: "relative", width: "fit-content" }} ref={this.dropdownContainer}>
                        <button className="btn btn-success"
                           onClick={() => {
                              if (templateList.length === 0) {
                                 this.props.history.push({
                                    pathname: "/app/quote/get",
                                    state: {
                                       from: this.props.location.pathname
                                    }
                                 });
                              } else this.setState({ dropdownOpen: !this.state.dropdownOpen })
                           }}>
                           <span>New Quote</span>
                           {
                              templateList.length !== 0 &&
                              <i className={`fa fa-fw fa-angle-down ml-1 `} />
                           }
                        </button>
                        <div className={`dropdown-menu dropdown-menu-left p-0 border ${this.state.dropdownOpen ? "show" : ""}`}>
                           <div className="p-2">
                              {
                                 templateList.map((template, index) => {
                                    return (
                                       <Link className="dropdown-item" to={`/app/quote/get/from-template/${template._id}`} key={index}>{template.title}</Link>
                                    );
                                 })
                              }
                              <div role="separator" className="dropdown-divider" />
                              <Link className="dropdown-item" to={{
                                 pathname: "/app/quote/get",
                                 state: {
                                    from: this.props.location.pathname
                                 }
                              }}>
                                 New Quote, without Template
                           </Link>
                           </div>
                        </div>
                     </div>
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
               <QuoteTableShow quotes={this.state.quotes} />

               <div className="col-md-6">
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