import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignOut } from '../actions/Auth';

class InviteExisting extends Component {
   onHandleClick = () => {
      const { accountInfo } = this.props.location.state;
      this.props.userSignOut();
      this.props.history.push({
         pathname: '/sign-in',
         state: { accountInfo }
      });
   }
   render() {
      const { authUser, accountCompany } = this.props.auth;
      const { accountInfo } = this.props.location.state;
      if (authUser) return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <h1 className="font-w700">Accept Invite</h1>
                           <div className="form-group mb-6">
                              <p>You have been invited to create and send quotes for {`CodeCompany`}.</p>
                              <button className="btn btn-default btn-lg" onClick={() => this.onHandleClick()}>
                                 Let's Get Started...
                              </button>
                           </div>
                           <hr />
                           <h4>
                              You are currently signed in as <strong>{authUser.email}</strong> - <button className="buttonLink" onClick={() => this.onHandleClick()}>sign out and create a new sign in...</button>
                           </h4>
                           <h4>
                              <Link to="/app">Don't accept invite and return to Quotehard website.</Link>
                           </h4>
                        </div>
                     </div>
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      );
      else return <Redirect to="/sign-in" />;
   }
}
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { userSignOut };
export default connect(mapStateToProps, mapDispatchToProps)(InviteExisting);