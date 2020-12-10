import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

export default  class Team extends Component {
   render() {
      return (
         <Switch>
            <Route exact path="/app/settings/team" component={asyncComponent(() => import("./TeamOverview"))} />
            <Route exact path="/app/settings/team/invite-form" component={asyncComponent(() => import("./InviteForm"))} />
            <Route exact path="/app/settings/team/view/:id" component={asyncComponent(() => import("./MemberView"))} />
         </Switch>
      )
   }
}
