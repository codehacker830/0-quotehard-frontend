import React, { Component } from 'react';
import PersonContactLinkShow from './PersonContactLinkShow';

export default class CopyTo extends Component {
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
                        <PersonContactLinkShow contact={copyReceiver} />
                     );
                  })
               }
            </span>
         </div>
      );
      else return null;
   }
}