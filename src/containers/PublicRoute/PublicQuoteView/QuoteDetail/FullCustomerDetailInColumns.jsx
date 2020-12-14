import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyContactLink from './ContactAuthLink/CompanyContactLink';
import PersonContactLink from './ContactAuthLink/PersonContactLink';
import PersonContactLinkShow from './ContactAuthLink/PersonContactLink';

class FullCustomerDetailInColumns extends Component {
   render() {
      const { isDisplayFullCustomerDetail, toPeopleList } = this.props;
      const firstPerson = toPeopleList[0];
      return (
         <div className="quote-detail-row">
            {
               firstPerson.company ?
                  <React.Fragment>
                     <label className="quote-detail-label">For</label>
                     <div className="quote-detail-block">
                        <CompanyContactLink contact={firstPerson.company} />
                     </div>
                     <label className="quote-detail-label">To</label>
                     <div className="quote-detail-block">
                        <PersonContactLinkShow contact={firstPerson} />
                     </div>
                  </React.Fragment>
                  :
                  <React.Fragment>
                     <label>For</label>&nbsp;
                     <span className="quote-detail-block">
                        <PersonContactLinkShow contact={firstPerson} />
                     </span>
                  </React.Fragment>
            }
            {
               isDisplayFullCustomerDetail &&
               <React.Fragment>
                  <div className="quote-detail-block">
                     <label className="quote-detail-label">Email</label>
                     <a className="text-primary" href={`mailto:${firstPerson.email}`}>{firstPerson.email}</a>
                  </div>
                  {
                     firstPerson.addresses.map((address, index) => (
                        <div className="quote-detail-block" key={index}>
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
            }
            {
               toPeopleList.length > 1 &&
               <div className="quote-detail-block">
                  <label className="quote-detail-label">Copy to</label>
                  <div className="quote-detail-block">
                     {
                        toPeopleList.map((copyReceiver, index) => {
                           if (index === 0) return null;
                           else return (
                              <React.Fragment>
                                 <PersonContactLink contact={copyReceiver} key={index} />
                                 <br />
                              </React.Fragment>
                           );
                        })
                     }
                  </div>
               </div>
            }
         </div>
      );
   }
}
const mapStateToProps = ({ appearanceSetting, mainData }) => {
   const { toPeopleList } = mainData.quote;
   const { isDisplayFullCustomerDetail } = appearanceSetting;
   return { isDisplayFullCustomerDetail, toPeopleList };
};
export default connect(mapStateToProps)(FullCustomerDetailInColumns);