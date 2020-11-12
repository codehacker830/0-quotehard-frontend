import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Followingups from './FollowingUps';
import NavCrump from '../../../components/NavCrump';
import EmailNotifications from './EmailNotifications';
import Leads from './Leads';


export default class AddOns extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <Switch>
               <Route exact path="/app/add-ons/follow-ups" component={Followingups} />
               <Route exact path="/app/add-ons/notifications" component={EmailNotifications} />
               <Route exact path="/app/add-ons/leads" component={Leads} />
            </Switch>
         </React.Fragment>

      );
   }
}