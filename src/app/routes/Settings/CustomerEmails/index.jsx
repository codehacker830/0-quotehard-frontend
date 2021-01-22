import React, { useEffect } from 'react';
import NavCrump from '../../../../components/NavCrump';
import NewQuoteEmailPreview from './NewQuoteEmailPreview';
import AcceptedQuoteEmailPreview from './AcceptedQuoteEmailPreview';
import FirstFollowUpEmailPreview from './FirstFollowUpEmailPreview';
import SecondFollowUpEmailPreview from './SecondFollowUpEmailPreview';
import AskForReviewEmailPreview from './/AskForReviewEmailPreview';
import { getCustomerEmailSetting } from '../../../../actions/CustomerEmailSetting';
import { useDispatch, useSelector } from 'react-redux';

export const CustomerEmails = (props) => {
   const dispatch = useDispatch();
   const customerEmailSetting = useSelector(state => state.customerEmailSetting);
   console.log(" customerEmailSetting ===> ", customerEmailSetting)
   useEffect(() => {
      dispatch(getCustomerEmailSetting());
   }, [])
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