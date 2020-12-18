import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyContactLink from './ContactAuthLink/CompanyContactLink';
import PersonContactLink from './ContactAuthLink/PersonContactLink';

class ForCustomerDetailInline extends Component {
   render() {
      const { isDisplayFullCustomerDetail, toPeopleList } = this.props;
      const firstPerson = toPeopleList[0];
      return (
         <React.Fragment>
            {
               firstPerson.company ?
                  <React.Fragment>
                     <div>
                        <label>Prepared for</label>&nbsp;
                        <span className="quote-detail-block">
                           <CompanyContactLink contact={firstPerson.company} />
                        </span>
                     </div>
                     <div>
                        <label>To</label>&nbsp;
                        <span class="quote-detail-block">
                           <PersonContactLink contact={firstPerson} />
                        </span>
                     </div>
                  </React.Fragment>
                  : <React.Fragment>
                     <div>
                        <label>Prepared for</label>&nbsp;
                        <span className="quote-detail-block">
                           <PersonContactLink contact={firstPerson} />
                        </span>
                     </div>
                  </React.Fragment>
            }
            {
               isDisplayFullCustomerDetail &&
               <React.Fragment>
                  <div>
                     <label>Email</label>&nbsp;
                     <span className="quote-detail-block">
                        <a className="text-primary" href={`mailto:${firstPerson.email}`}>{firstPerson.email}</a>
                     </span>
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
                  {
                     toPeopleList.length > 1 &&
                     <div>
                        <label>Copy to</label>&nbsp;
                           <span className="quote-detail-block">
                           {
                              toPeopleList.map((copyReceiver, index) => {
                                 if (index === 0) return null;
                                 else return <PersonContactLink contact={copyReceiver} key={index} />;
                              })
                           }
                        </span>
                     </div>
                  }

               </React.Fragment>
            }
         </React.Fragment>
      )
   }
}
const mapStateToProps = ({ appearanceSetting, mainData }) => {
   const { isDisplayFullCustomerDetail } = appearanceSetting;
   const { toPeopleList } = mainData.quote;
   return { isDisplayFullCustomerDetail, toPeopleList };
};
export default connect(mapStateToProps)(ForCustomerDetailInline);