import { first } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullCustomerDetail extends Component {
   render() {
      const { isDisplayFullCustomerDetail, firstPerson } = this.props;
      if (isDisplayFullCustomerDetail) return (
         <>
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
         </>
      );
      else return null;
   }
}
const mapStateToProps = ({ appearanceSetting }) => {
   const { isDisplayFullCustomerDetail } = appearanceSetting;
   return { isDisplayFullCustomerDetail };
};
export default connect(mapStateToProps)(FullCustomerDetail);