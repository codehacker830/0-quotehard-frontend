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
               
            </Switch>
         </React.Fragment>

      );
   }
}