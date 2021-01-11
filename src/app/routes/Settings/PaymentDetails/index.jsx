import React from 'react';
import NavCrump from '../../../../components/NavCrump'
import ManualCardForm from './ManualCardForm';
import SplitCardElementForm from './SplitCardElementForm';

export const PaymentDetails = (props) => {
   const { state } = props.location;
   let HeadLinkText = 'Dashboard';
   if (state && state.from === "/app/settings/billing-overview") HeadLinkText = 'Billing Overview';
   return (
      <React.Fragment>
         <NavCrump linkTo={`${state && state.from ? state.from : "/app"}`}>
            {HeadLinkText}
         </NavCrump>
         <div className="content">
            <h1>Payment Details</h1>
            <div className="stripeWrapper">
               <div className="stripeElement">
                  <SplitCardElementForm />
               </div>
            </div>
            {/* <ManualCardForm /> */}
         </div>
      </React.Fragment>
   )
}

export default PaymentDetails