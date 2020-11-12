import React from 'react';
import NavCrump from '../../../../components/NavCrump';
import NewQuoteEmailPreview from './NewQuoteEmailPreview';
import AcceptedQuoteEmailPreview from './AcceptedQuoteEmailPreview';
import FirstFollowUpEmailPreview from './FirstFollowUpEmailPreview';
import SecondFollowUpEmailPreview from './SecondFollowUpEmailPreview';
import AskForReviewEmailPreview from './/AskForReviewEmailPreview';

export const CustomerEmails = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2 className="my-4">Customer Emails</h2>

            {/* New Quote */}
            <NewQuoteEmailPreview />

            {/* Accepted Quote */}
            <AcceptedQuoteEmailPreview />

            {/* First Follow-up */}
            <FirstFollowUpEmailPreview />

            {/* Second Follow-up */}
            <SecondFollowUpEmailPreview />

            {/* Ask for a Review */}
            <AskForReviewEmailPreview />
         </div>
      </React.Fragment>
   );
}

export default CustomerEmails;