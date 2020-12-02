import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatOpenTimes extends Component {
   render() {
      const { quote } = this.props;
      if (!quote.openTimes) return null;
      else return (
         <div className="author-stat mod-private">
            <div className="author-stat-title">Opens</div>
            <div className="author-stat-count">{quote.openTimes}</div>
         </div>
      );
   }
}
const mapStateToProps = ({ quoteData }) => {
   const { quote } = quoteData;
   return { quote };
};
export default connect(mapStateToProps)(StatOpenTimes);