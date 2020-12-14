import React, { Component } from 'react';
import CompanyContactLink from '../ContactAuthLink/CompanyContactLink';
import PersonContactLinkShow from '../ContactAuthLink/PersonContactLink';

export default class PreparedForInColumns extends Component {
   render() {
      const { firstPerson } = this.props;
      if (firstPerson.company) return (
         <>
            <label className="quote-detail-label">For</label>
            <div className="quote-detail-block">
               <CompanyContactLink contact={firstPerson.company} />
            </div>
            <label className="quote-detail-label">To</label>
            <div className="quote-detail-block">
               <PersonContactLinkShow contact={firstPerson} />
            </div>
         </>
      );
      else return (
         <>
            <div>
               <label>For</label>&nbsp;
               <span className="quote-detail-block">
                  <PersonContactLinkShow contact={firstPerson} />
               </span>
            </div>
         </>
      );
   }
}