import React, { Component } from 'react';
import CompanyContactLink from '../ContactAuthLink/CompanyContactLink';
import PersonContactLinkShow from '../ContactAuthLink/PersonContactLink';

export default class PreparedForInline extends Component {
   render() {
      const { firstPerson } = this.props;
      if (firstPerson.company) return (
         <>
            <div>
               <label>Prepared for</label>&nbsp;
               <span className="quote-detail-block">
                  <CompanyContactLink contact={firstPerson.company} />
               </span>
            </div>
            <div>
               <label>To</label>&nbsp;
               <span class="quote-detail-block">
                  <PersonContactLinkShow contact={firstPerson} />
               </span>
            </div>
         </>
      );
      else return (
         <>
            <div>
               <label>Prepared for</label>&nbsp;
               <span className="quote-detail-block">
                  <PersonContactLinkShow contact={firstPerson} />
               </span>
            </div>
         </>
      );
   }
}