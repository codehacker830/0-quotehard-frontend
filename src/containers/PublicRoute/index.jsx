import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';

export default function PublicRoute(props) {
    return (
        <Switch>
            <Route exact path='/q/:entoken' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/preview' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/author' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/accepted' component={asyncComponent(() => import("./Accepted"))} />
            <Route exact path='/q/:entoken/decline' component={asyncComponent(() => import("./Decline"))} />
        </Switch>
    )
}
