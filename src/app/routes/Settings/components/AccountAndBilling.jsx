import React from 'react'
import { Link } from 'react-router-dom'

export const AccountAndBilling = (props) => {
   return (
      <React.Fragment>
         <h3 className="settings-title">Account &amp; Billing</h3>
         <Link className="set-option" to="/app/settings/billing-overview">Billing Overview</Link>
         <Link className="set-option" to="/app/settings/account-information">Account Information</Link>
         <Link className="set-option" to="/app/settings/your-data">Import / Export</Link>
      </React.Fragment>
   )
}

export default AccountAndBilling