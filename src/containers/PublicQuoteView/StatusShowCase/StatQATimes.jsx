import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatQATimes extends Component {
   render() {
      const { quote } = this.props;
      if (!quote.discussions.length) return null;
      else {
         const qaList = quote.discussions.filter((discussion, index) => discussion.category !== "privateNote");
         if (!qaList.length) return null;
         else return (
            <div className="author-stat">
               <div className="author-stat-title">Q&amp;A</div>
               <div className="author-stat-count">{qaList.length}</div>
            </div>
         );
      }
   }
}
const mapStateToProps = ({ quoteData }) => {
   const { quote } = quoteData;
   return { quote };
};
export default connect(mapStateToProps)(StatQATimes);
