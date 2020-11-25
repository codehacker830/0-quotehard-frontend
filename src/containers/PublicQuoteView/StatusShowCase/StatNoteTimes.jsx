import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatNoteTimes extends Component {
   render() {
      const { quote } = this.props;
      if (!quote.discussions.length) return null;
      else {
         const pnList = quote.discussions.filter((discussion, index) => discussion.category === "privateNote");
         if (!pnList.length) return null;
         else return (
            <div className="author-stat mod-private">
               <div className="author-stat-title">Notes</div>
               <div className="author-stat-count">{pnList.length}</div>
            </div>
         );
      }
   }
}
const mapStateToProps = ({ publicView }) => {
   const { quote } = publicView;
   return { quote };
};
export default connect(mapStateToProps)(StatNoteTimes);
