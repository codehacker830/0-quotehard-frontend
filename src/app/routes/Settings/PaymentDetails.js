import React from 'react'
import NavCrump from '../../../components/NavCrump'

export const PaymentDetails = (props) => {
   const { location } = props;
   const { state } = location;
   let HeadLinkText = 'Dashboard';
   if (state && state.from === "/app/settings/billing-overview") HeadLinkText = 'Billing Overview';
   return (
      <React.Fragment>
         <NavCrump linkTo={`${state && state.from ? state.from : "/app"}`}>
            {HeadLinkText}
         </NavCrump>

      </React.Fragment>
   )
}

export default PaymentDetails