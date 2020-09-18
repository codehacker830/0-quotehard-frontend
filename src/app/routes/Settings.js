import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends Component {
   render() {
      return (
         <div className="content py-5">
            <div className="row">
               <div className="col-md-6 col-sm-12">
                  <h1 className="pt-5 px-2 mb-5">CodeNetflix </h1>
                  <h3 className="settings-title">Quote Settings</h3>
                  <Link className="set-option" to="/app/settings/quote/appearance">Layout, Style and Company Information</Link>
                  <Link className="set-option" to="/app/settings/quote/defaults">Quote Defaults</Link>
                  <Link className="set-option" to="/app/settings/customer-emails">Customer Emails</Link>
                  <Link className="set-option" to="/app/settings/sales-tax-categories">Sales Tax &amp; Categories</Link>
                  <h3 className="settings-title">Team Members <span className="badge badge-info">1</span></h3>
                  <Link className="set-option" to="/app/settings/team">Add a Team Member</Link>
                  <h3 className="settings-title">Account &amp; Billing</h3>
                  <Link className="set-option" to="/app/settings/billing-overview">Billing Overview</Link>
                  <Link className="set-option" to="/app/settings/account-information">Account Information</Link>
                  <Link className="set-option" to="/app/settings/your-data">Import / Export</Link>
                  <h3 className="settings-title">Add-ons</h3>
                  <Link className="set-option" to="/app/add-ons/follow-ups">
                     <span className="label label-on float-right">ON</span>
                     <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/follow-ups.png" alt="Follow-ups" />
                        Follow-ups
                     </Link>
                  <Link className="set-option" to="/app/add-ons/notifications">
                     <span className="label label-on float-right">ON</span>
                     <img src="https://asset.quotientapp.com/image/integration-02/fav-icon-01/notifications.png"
                        alt="Email Notifications" />
                        Email Notifications
                     </Link>
                  <Link className="set-option" to="/app/add-ons/leads">
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
                     </Link>
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
               </div>
               <div className="col-md-6 col-sm-12">
                  <div className="px-3 py-5">
                     <Link to="/app/settings/profile">
                        <img className="img-avatar img-avatar96 img-avatar-thumb border border-primary rounded-0 m-0" src="/assets/media/avatars/avatar8.jpg" alt="..." />
                     </Link>
                     <div className="row no-gutters my-3">
                        <span className="text-black font-size-h5 font-w700">Raffale C</span>
                     </div>
                     <div className="row no-gutters mb-1">
                        <Link to="/app/settings/profile">Edit Your Profile</Link>
                     </div>
                     <div className="row no-gutters mb-5">
                        <Link to="/app/settings/two-factor/info">
                           Two-Factor Authentication
                           <span class="label label-off ml-1">OFF</span>
                        </Link>
                     </div>

                     <div className="row no-gutters maxWidth-300 mb-5">
                        <Link to="/new-account" className="mb-1">Create Another Account</Link>
                        <span className="text-black">
                           Automatically qualify for a Multi-Account 20% Discount across everything, when 2 or more accounts have the same Account Owner.
                        </span>
                     </div>

                     <div className="row no-gutters maxWidth-300 mb-1">
                        <Link to="/app/referrals" className="mb-1">Your Referral Link</Link>
                        <span className="text-black">If you refer someone and they become a paid customer, you’ll get FREE credit.</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}