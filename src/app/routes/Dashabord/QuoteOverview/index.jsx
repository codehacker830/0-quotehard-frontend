import React, { Component } from 'react';
import DashMessages from './DashMessages';
import PieChartShow from './PieChartShow';

export default class QuoteOverview extends Component {
   render() {
      return (
         <div className="col-md-6">
            {/* <DashMessages /> */}
            {/* <PieChartShow quotes={this.props.quotes} /> */}
         </div>
      );
   }
}