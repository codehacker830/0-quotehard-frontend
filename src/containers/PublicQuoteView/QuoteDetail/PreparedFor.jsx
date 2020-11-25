import React, { Component } from 'react';
import CompanyContactLinkShow from './CompanyContactLinkShow';
import PersonContactLinkShow from './PersonContactLinkShow';

export default class PreparedFor extends Component {
   render() {
      const { firstPerson } = this.props;
      if (firstPerson.company) return (
         <>
            <div>
               <label>Prepared for</label>&nbsp;
               <span className="quote-detail-block">
                  <CompanyContactLinkShow contact={firstPerson.company} />
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