import React from 'react'
import { Link } from 'react-router-dom'

export const ConnectWithOtherApps = (props) => {
   return (
      <React.Fragment>
         <h3 className="settings-title settings-title-sub">Connect with other Apps</h3>
         <Link className="set-option" to="/app/add-ons/quickbooks">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/quickbooks.png" alt="QuickBooks" />
                        QuickBooks &nbsp;<span className="label label-outline">Popular</span>
         </Link>
         <Link className="set-option" to="/app/add-ons/xero">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/xero.png" alt="Xero" />
                        Xero
                     </Link>
         <Link className="set-option" to="/app/add-ons/zapier">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/zapier.png" alt="Zapier" />
                        Zapier
                     </Link>
         <Link className="set-option" to="/app/add-ons/mailchimp">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/mailchimp.png" alt="Mailchimp" />
                        Mailchimp
                     </Link>
         <Link className="set-option" to="/app/add-ons/capsule">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/capsule.png" alt="Capsule" />
                        Capsule
                     </Link>
         <Link className="set-option" to="/app/add-ons/insightly">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/insightly.png" alt="Insightly" />
                        Insightly
                     </Link>
         <Link className="set-option" to="/app/add-ons/highrise">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/highrise.png" alt="Highrise" />
                        Highrise
                     </Link>
      </React.Fragment>
   )
}

export default ConnectWithOtherApps