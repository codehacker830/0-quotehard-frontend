import React from 'react';
import NavCrump from '../../../../components/NavCrump';
import ContactsData from './ContactsData';
import PriceItemsData from './PriceItemsData';
import QuotesData from './QuotesData';
import TextItemsData from './TextItemsData';

export const YourData = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2 className="my-4">Import / Export</h2>
            <div className="mb-5">
               <ContactsData />
               <PriceItemsData />
               <TextItemsData />
            </div>
            <div className="mb-5">
               <h3>Your Quotes</h3>
               <QuotesData />
            </div>
            <div className="mb-2">
               <p>Read the <a target="_blank" href="http://quotehard.com">Help Article</a> for more details.</p>
            </div>
         </div>
      </React.Fragment>
   );
}

export default YourData;