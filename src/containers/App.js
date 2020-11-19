import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser, setInitUrl } from '../actions/Auth';
import axios from '../util/Api';
import asyncComponent from '../util/asyncComponent';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RequestPassword from './RequestPassword';
import RequestPasswordSent from './RequestPasswordSent';
import Error404 from '../components/Error404';
import RequestPasswordExpired from './RequestPasswordExpired';
import ChangePassword from './ChangePassword';

const RestrictedRoute = ({ component: Component, token, ...rest }) => {
   return (
      <Route
         {...rest}
         render={props =>
            token
               ? <Component {...props} />
               : <Redirect
                  to={{
                     pathname: '/sign-in',
                     state: { from: props.location }
                  }}
               />}
      />
   );
}


class App extends Component {
   constructor(props) {
      super(props);

      if (this.props.initURL === '') {
         this.props.setInitUrl(this.props.history.location.pathname);
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.token) {
         axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      }
      if (nextProps.token && !nextProps.authUser) {
         this.props.getUser();
      }
   }
   render() {
      const { match, location, token, initURL } = this.props;
      if (location.pathname === '/') {
         if (token === null) {
            return (<Redirect to={'/sign-in'} />);
         } else if (initURL === '' || initURL === '/' || initURL === '/sign-in') {
            return (<Redirect to={'/app'} />);
         } else {
            return (<Redirect to={initURL} />);
         }
      }
      return (
         <React.Fragment>
            <div id="page-container" className="main-content-boxed">
               <Switch>
                  <RestrictedRoute path='/app' token={token} component={asyncComponent(() => import("../app"))} />
                  {/* <Route path='/app' component={asyncComponent(() => import("../app"))} /> */}

                  <Route exact path='/q/:entoken/author-discuss' component={asyncComponent(() => import("./PublicQuoteView"))} />
                  <Route exact path='/q/:entoken/accepted' component={asyncComponent(() => import("./ThankyouPage"))} />
                  <Route exact path='/q/:entoken' component={asyncComponent(() => import("./PublicQuoteView"))} />
                  <Route exact path='/sign-in' component={SignIn} />
                  <Route exact path='/sign-in/invite/i/:invitationEntoken' component={SignIn} />
                  <Route exact path='/sign-in/invite/i/already-have-access/:invitationEntoken' component={SignIn} />
                  
                  <Route exact path='/new-account' component={SignUp} />
                  <Route exact path='/request-password' component={RequestPassword} />
                  <Route exact path='/request-password/sent' component={RequestPasswordSent} />
                  <Route exact path='/request-password/new/expired' component={RequestPasswordExpired} />
                  <Route exact path='/request-password/change/:entoken' component={ChangePassword} />
                  <Route component={Error404} />
               </Switch>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = ({ auth }) => {
   const { authUser, token, initURL } = auth;
   return { token, authUser, initURL }
};
const mapDispatchToProps = { setInitUrl, getUser };
export default connect(mapStateToProps, mapDispatchToProps)(App);