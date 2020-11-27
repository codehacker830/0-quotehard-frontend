import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../util/Api';

export default class ThankyouPage extends Component {
   mounted = false;
   state = {
      isLoading: true,
      valid: false
   }
   componentDidMount() {
      this.mounted = true;
      const { entoken } = this.props.match.params;
      console.log("***** entoken ***** ", entoken);
      if (this.mounted) {
         this.setState({ isLoading: true });
         axios.post('/quotes/view-draft', { entoken: entoken })
            .then(({ data }) => {
               console.log("========== res =========", data);
               this.setState({ isLoading: false })
               if (data.quote.status === "accepted") this.setState({ valid: true });
               else this.setState({ valid: false });
            })
            .catch(err => {
               console.error(" ========== checking public draft error =========", err);
               this.setState({ isLoading: false, valid: false });
            });
      }
   }
   render() {
      if (this.state.isLoading) return null;
      else return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              {
                                 this.state.valid ?
                                    <div className="content">
                                       <h3>Thank you.</h3>
                                       <p>You will receive an email as confirmation of your acceptance – <Link to={`/q/${this.props.match.params.entoken}`}>view accepted quote.</Link></p>
                                    </div> :
                                    <div className="content">
                                       <h2>Sorry, something went wrong. Perhaps try again later</h2>
                                       <p>This quote does not exist.</p>
                                       <Link to="/app/dashboard">Visit the Dashboard</Link>
                                    </div>

                              }
                              <div className="form-group">
                                 <h1 className="font-w700">Sorry, something went wrong. Perhaps try again later.</h1>
                                 <p className="font-size-h4">Could not find your invite?</p>
                                 <Link to="/sign-in">Visit the Dashboard</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      );
   }
}