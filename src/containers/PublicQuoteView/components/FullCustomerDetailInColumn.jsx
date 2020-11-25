import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullCustomerDetailInColumn extends Component {
   render() {
      const { appearanceSetting } = this.props;
      if (appearanceSetting.isDisplayFullCustomerDetail) return (
         <React.Fragment>
            <div className="quote-detail-block">
               <label className="quote-detail-label">Email</label>
               <a href="mailto:moneyowner0615@gmail.com">moneyowner0615@gmail.com</a>
            </div>
            <div className="quote-detail-block">
               <label className="quote-detail-label">Address</label>
               <div className="quote-detail-val">
                     4922  Mill Street<br />
                     BOLIVAR<br />
                     TN 38008</div>
            </div>
            <div className="quote-detail-block">
               <label className="quote-detail-label">Phone</label>
               <div className="quote-detail-val">123123</div>
            </div>
         </React.Fragment>
      );
      else return null;
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting: appearanceSetting });
export default connect(mapStateToProps)(FullCustomerDetailInColumn);