import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';
import { connect } from 'react-redux';

class PublicRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/q/:entoken' component={asyncComponent(() => import("./PublicQuoteView"))} />
                <Route exact path='/q/:entoken/author-discuss' component={asyncComponent(() => import("./PublicQuoteView"))} />
                <Route exact path='/q/:entoken/accepted' component={asyncComponent(() => import("./Accepted"))} />
                <Route exact path='/q/:entoken/decline' component={asyncComponent(() => import("./Decline"))} />
            </Switch>
        );
    }
}
const mapStateToProps = ({ }) => {
}
export default connect(mapStateToProps)(PublicRoute);