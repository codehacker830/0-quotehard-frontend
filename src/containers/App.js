import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser, setInitUrl } from '../actions/Auth';
import axios from '../util/Api';
import asyncComponent from '../util/asyncComponent';

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
   componentWillMount() {
      window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      if (this.props.initURL === '') {
         this.props.setInitUrl(this.props.history.location.pathname);
      }
   }


   componentWillReceiveProps(nextProps) {
      if (nextProps.token) {
         axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      }
      if (nextProps.token && !nextProps.authUser) {
         this.props.getUser()

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
                  {/* <RestrictedRoute path={`${match.url}/app`} token={token} component={MainApp}/> */}
                  <Route path='/app' component={asyncComponent(() => import("../app"))} />
                  <Route path='/q/:token' component={asyncComponent(() => import("./QuoteView"))} />
                  <Route path='/sign-in' component={asyncComponent(() => import("./SignIn"))} />
                  <Route path='/new-account' component={asyncComponent(() => import("./SignUp"))} />
                  <Route path='/forgot-pass' component={asyncComponent(() => import("./ForgotPassword"))} />
                  <Route component={asyncComponent(() => import('../components/Error404'))} />
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
export default connect(mapStateToProps, { setInitUrl, getUser })(App);