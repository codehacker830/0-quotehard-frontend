import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatEditTimes extends Component {
   render() {
      const { quote } = this.props;
      if (!quote.editTimes) return null;
      else return (
         <div className="author-stat">
            <div className="author-stat-title">Edits</div>
            <div className="author-stat-count">{quote.editTimes}</div>
         </div>
      );
   }
}
const mapStateToProps = ({ publicView }) => {
   const { quote } = publicView;
   return { quote };
};
export default connect(mapStateToProps)(StatEditTimes);