import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Followingups from './FollowingUps';
import EmailNotifications from './EmailNotifications';
import Leads from './Leads';
import NewLeadNotification from './Leads/NewLeadNotification';
import EditLeadForm from './Leads/EditLeadForm';
import Reviews from './Reviews';
import NewReviewNotification from './Reviews/NewReviewNotification';
import ReviewConfig from './ReviewConfig';
import CustomEmail from './CustomEmail';
import TwoFactorForAll from './TwoFactorForAll';
import Webhooks from './Webhooks';
import QuickBooks from './QuickBooks';
import Xero from './Xero';
import Zapier from './Zapier';
import Mailchimp from './Mailchimp';
import Capsule from './Capsule';
import Insightly from './Insightly';
import Highrise from './Highrise';


export default class AddOns extends Component {
   render() {
      return (
         <React.Fragment>
            <Switch>
               <Route exact path="/app/add-ons/follow-ups" component={Followingups} />
               <Route exact path="/app/add-ons/notifications" component={EmailNotifications} />

               <Route exact path="/app/add-ons/leads" component={Leads} />
               <Route exact path="/app/add-ons/leads/notification" component={NewLeadNotification} />
               <Route exact path="/app/add-ons/leads/config" component={EditLeadForm} />

               <Route exact path="/app/add-ons/reviews" component={Reviews} />
               <Route exact path="/app/add-ons/reviews/notification" component={NewReviewNotification} />
               <Route exact path="/app/add-ons/reviews/config/display" component={ReviewConfig} />

               <Route exact path="/app/add-ons/custom-email" component={CustomEmail} />
               <Route exact path="/app/add-ons/two-factor-for-all" component={TwoFactorForAll} />
               <Route exact path="/app/add-ons/webhooks" component={Webhooks} />
               <Route exact path="/app/add-ons/quickbooks" component={QuickBooks} />
               <Route exact path="/app/add-ons/xero" component={Xero} />
               <Route exact path="/app/add-ons/zapier" component={Zapier} />
               <Route exact path="/app/add-ons/mailchimp" component={Mailchimp} />
               <Route exact path="/app/add-ons/capsule" component={Capsule} />
               <Route exact path="/app/add-ons/insightly" component={Insightly} />
               <Route exact path="/app/add-ons/highrise" component={Highrise} />
               
            </Switch>
         </React.Fragment>

      );
   }
}