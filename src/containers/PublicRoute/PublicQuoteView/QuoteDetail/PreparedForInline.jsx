import React, { Component } from 'react';
import CompanyContactAuthMemberLink from './ContactAuthLink/CompanyContactAuthMemberLink';
import PersonContactLinkShow from './ContactAuthLink/PersonContactAuthMemberLink';

export default class PreparedForInline extends Component {
   render() {
      const { firstPerson } = this.props;
      if (firstPerson.company) return (
         <>
            <div>
               <label>Prepared for</label>&nbsp;
               <span className="quote-detail-block">
                  <CompanyContactAuthMemberLink contact={firstPerson.company} />
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