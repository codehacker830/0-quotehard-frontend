import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Followingups from './FollowingUps';

export default class AddOns extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/app/add-ons/follow-ups" component={Followingups} />
         </Switch>
      );
   }
}