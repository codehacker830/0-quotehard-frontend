import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RequestPasswordExpired extends Component {
   render() {
      return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="form-group">
                                 <h1 className="font-w700">Password change expired.</h1>
                                 <p className="font-size-h4">For security reasons the password change request is valid for up to <strong>10 minutes</strong> only.</p>

                              </div>
                           </div>
                           <div className="form-group text-center">
                              <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                 <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/request-password">
                                    Request a new email link…
                                 </Link>
                              </p>
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