import { first } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullCustomerDetailInline extends Component {
   render() {
      const { isDisplayFullCustomerDetail, firstPerson } = this.props;
      if (isDisplayFullCustomerDetail) return (
         <React.Fragment>
            <div>
               <label>Email</label>&nbsp;
               <span className="quote-detail-block"><a href={`mailto:${firstPerson.email}`}>{firstPerson.email}</a></span>
            </div>
            {
               firstPerson.addresses.map((address, index) => (
                  <div key={index}>
                     <label>Address</label>&nbsp;
                     <span className="quote-detail-block">{address.street}, {address.city}, {address.stateOrRegion}, {address.postCode}</span>
                  </div>
               ))
            }
            {
               firstPerson.phones.map((phone, index) => (
                  <div key={index}>
                     <label>Phone</label>&nbsp;
                     <span className="quote-detail-block">{phone.content}</span>
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
export default connect(mapStateToProps)(FullCustomerDetailInline);