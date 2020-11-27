import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { userSignIn } from "../actions/Auth";

class SignIn extends Component {
   state = {
      isRemember: true,
      email: "",
      password: "",

      _id: "",
      accountCompany: "",
      firstName: "",
      lastName: "",
      role: false
   };
   onClickSignIn = () => {
      const { email, password, isRemember } = this.state;
      if (email === "" || password === "") {
         toast.warn("Email and password fields are required.");
      }
      else this.props.userSignIn({ email, password, isRemember });
   };

   componentDidUpdate(prevProps, prevState) {
      const { authUser, initURL, commonData, location } = this.props;
      if (authUser) {
         this.props.history.push(initURL === '' || initURL === '/sign-in' || initURL === '/sign-in/' ? '/app' : initURL);
      } else if (commonData.error !== "") {
         toast.error(commonData.error);
      }
      if (prevProps.location.state !== this.props.location.state) {
         const { _id, accountCompany, firstName, lastName, email, role } = this.props.location.state;
         this.setState({
            _id, accountCompany, firstName, lastName, email, role
         });
      }
   };
   render() {
      console.log(" SIGN IN STATE +++>", this.state);
      console.log(" SIGN IN PROPS +++>", this.props);
      const { isRemember, email, password } = this.state;
      const { history, location } = this.props;
      const isInvited = !!location.state;
      console.log("isInvited ---", isInvited);

      return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     {/* Header */}
                     <div className="mb-3 text-center">
                        <Link to="/" className="d-flex justify-content-center">
                           <img src="/logo-180.png" className="logo" alt="logo" />
                        </Link>
                        <span className="text-dark font-w700 font-size-h2">Sign in to Quotient</span>
                        {
                           true &&
                           <p className="font-size-h4">
                              To accept the invite, sign in below or <Link to="/sign-in/invite/create">create a new sign in here…</Link>
                           </p>
                        }
                     </div>
                     {/* END Header */}
                     {/* Sign In Form */}
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="form-group">
                                 <input
                                    type="text"
                                    className="form-control form-control-lg form-control-alt"
                                    id="login-email"
                                    name="login-email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(ev) => this.setState({ email: ev.target.value })}
                                 />
                              </div>
                              <div className="form-group">
                                 <input
                                    type="password"
                                    className="form-control form-control-lg form-control-alt"
                                    id="login-password"
                                    name="login-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(ev) => this.setState({ password: ev.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="form-group">
                              <div className="d-flex custom-control custom-checkbox custom-control-lg justify-content-center mb-3">
                                 <input type="checkbox" className="custom-control-input" id="remember-me-checkbox" name="remember-me-checkbox" checked={isRemember} onChange={() => this.setState({ isRemember: !this.state.isRemember })} />
                                 <label className="custom-control-label" htmlFor="remember-me-checkbox">Remember me</label>
                              </div>
                              <button className="btn btn-block btn-hero-lg btn-hero-primary" onClick={() => this.onClickSignIn()}>
                                 <i className="fa fa-fw fa-sign-in-alt mr-1" /> Sign In
                              </button>
                              <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                 <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/request-password">
                                    <i className="fa fa-exclamation-triangle text-muted mr-1" />
                                    Forgot password
                                 </Link>
                                 <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/new-account">
                                    <i className="fa fa-plus text-muted mr-1" />
                                    New Account
                                 </Link>
                              </p>
                           </div>

                        </div>
                     </div>
                     {/* END Sign In Form */}
                  </div>
               </div>
               {/* END Main Section */}
               {/* Meta Info Section */}

               {/* END Meta Info Section */}
            </div>
         </main>
      );
   }
}

const mapStateToProps = ({ auth, commonData }) => {
   const { authUser, initURL } = auth;

   return { authUser, initURL, commonData };
}
const mapDispatchToProps = { userSignIn };
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);