import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignOut } from '../actions/Auth';

class InviteExisting extends Component {
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
                           <h1 className="font-w700">Accept Invite</h1>
                           <div className="form-group mb-6">
                              <button className="btn btn-default btn-lg" onClick={() => this.onHandleClick()}>
                                 Let's Get Started...
                              </button>
                           </div>
                           <hr />
                           <h4>
                              You are currently signed in as <strong>... email ...</strong> - <Link to="#">sign out and create a new sign in...</Link>
                           </h4>
                           <h4>
                              <Link to="#">Don't accept invite and return to Quotient website.</Link>
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