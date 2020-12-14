import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullCustomerDetailInColumns extends Component {
   render() {
      const { isDisplayFullCustomerDetail, firstPerson } = this.props;
      if (isDisplayFullCustomerDetail) return (
         <React.Fragment>
            <div className="quote-detail-block">
               <label className="quote-detail-label">Email</label>
               <a href={`mailto:${firstPerson.email}`}>{firstPerson.email}</a>
            </div>
            {
               firstPerson.addresses.map((address, index) => (
                  <div className="quote-detail-block">
                     <label className="quote-detail-label">Address</label>
                     <div className="quote-detail-val">
                        {
                           address.city && <>{address.city}<br /></>
                        }
                        {
                           address.street && <>{address.street}<br /></>
                        }
                        {address.stateOrRegion} {address.postCode}
                     </div>
                  </div>
               ))
            }
            {
               firstPerson.phones.map((phone, index) => (
                  <div className="quote-detail-block" key={index}>
                     <label className="quote-detail-label">Phone</label>
                     <div className="quote-detail-val">{phone.content}</div>
                  </div>
               ))

            }
         </React.Fragment>
      );
      else return null;
   }
}
const mapStateToProps = ({ appearanceSetting }) => {
   const { isDisplayFullCustomerDetail } = appearanceSetting;
   return { isDisplayFullCustomerDetail };
};
export default connect(mapStateToProps)(FullCustomerDetailInColumns);