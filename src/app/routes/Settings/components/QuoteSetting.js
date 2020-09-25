
import React from 'react'
import { Link } from 'react-router-dom'

export const QuoteSetting = (props) => {
   return (
      <>
         <h3 className="settings-title">Quote Settings</h3>
         {/* <Link className="set-option" to="/app/settings/quote/appearance">Layout, Style and Company Information</Link> */}
         <Link className="set-option" to="/app/settings/quote/defaults">Quote Defaults</Link>
         {/* <Link className="set-option" to="/app/settings/customer-emails">Customer Emails</Link> */}
         <Link className="set-option" to="/app/settings/sales-tax-categories">Sales Tax &amp; Categories</Link>
      </>
   )
}

export default QuoteSetting