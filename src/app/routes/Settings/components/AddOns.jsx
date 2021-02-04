import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AddOns = (props) => {
   const accountCompany = useSelector(state => state.auth.accountCompany);
   const { isFollowUpDashboardAlertEnabled } = accountCompany.followUpSetting;
   const { isQuoteViewedNotificationToAuthorEnabled, quoteAccptedNotificationEmails, quoteSentNotificationEmails } = accountCompany.emailNotificationSetting;
   const isEmailNotifications = isQuoteViewedNotificationToAuthorEnabled
      || (quoteAccptedNotificationEmails.length > 0)
      || (quoteSentNotificationEmails.length > 0);
   return (
      <React.Fragment>
         <h3 className="settings-title">Add-ons</h3>
         <Link className="set-option" to="/app/add-ons/follow-ups">
            {
               isFollowUpDashboardAlertEnabled ?
                  <span className="label label-on float-right">ON</span>
                  : <span className="label label-off float-right">OFF</span>
            }
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/follow-ups.png" alt="Follow-ups" />
                        Follow-ups
                     </Link>
         <Link className="set-option" to="/app/add-ons/notifications">
            {
               isEmailNotifications ?
                  <span className="label label-on float-right">ON</span>
                  : <span className="label label-off float-right">OFF</span>
            }
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/notifications.png"
               alt="Email Notifications" />
                        Email Notifications
         </Link>
         {/* <Link className="set-option" to="/app/add-ons/leads">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/leads.png" alt="Leads" />
                        Leads
         </Link>
         <Link className="set-option" to="/app/add-ons/reviews">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/reviews.png" alt="Reviews" />
                        Reviews
         </Link>
         <Link className="set-option" to="/app/add-ons/custom-email">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/custom-email.png"
               alt="Custom Email Address" />
                        Custom Email Address
         </Link>
         <Link className="set-option" to="/app/add-ons/two-factor-for-all">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/two-factor-for-all.png"
               alt="Two-Factor For All" />
                        Two-Factor For All
         </Link>
         <Link className="set-option" to="/app/add-ons/webhooks">
            <span className="label label-off float-right">OFF</span>
            <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/webhooks.png" alt="Webhooks" />
                        Webhooks
         </Link> */}
      </React.Fragment>
   )
}

export default AddOns