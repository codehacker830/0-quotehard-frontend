import React, { Component } from 'react';
import PersonContactLink from '../ContactAuthLink/PersonContactLink';

export default class CopyToInline extends Component {
   render() {
      const { toPeopleList } = this.props;
      if (toPeopleList.length > 1) return (
         <div>
            <label>Copy to</label>
            <span className="quote-detail-block">
               {
                  toPeopleList.map((copyReceiver, index) => {
                     if (index === 0) return null;
                     else return (
                        <PersonContactLink contact={copyReceiver} />
                     );
                  })
               }
            </span>
         </div>
      );
      else return null;
   }
}