import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignOut } from '../actions/Auth';

class AlreadyHaveAccess extends Component {
   onHandleClick = () => {
      const { invitationEntoken } = this.props.match.params;
      this.props.userSignOut();
      this.props.history.push({
         pathname: '/sign-in',
         state: { invitationEntoken }
      });
   }
   render() {
      const { authUser } = this.props.auth;
      if (authUser) return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <h1 className="font-w700">You’re signed in currently, as {authUser.email}</h1>
                           <div className="form-group mb-6">
                              <button className="btn btn-default btn-lg" onClick={() => this.onHandleClick()}>
                                 Sign out and create a new sign in
                              </button>
                           </div>
                           <h4>
                              Or ignore invite, and <Link to="/app">continue as {authUser.email}…</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(AlreadyHaveAccess);