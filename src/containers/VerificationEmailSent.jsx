import React, { Component } from 'react'

export default class VerificationEmailSent extends Component {
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
                                 <h1 className="font-w700">Verification email sent</h1>
                                 <p>Please check your xxx@gmail.com email now.</p>
                                 <p>You can close this window now.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      )
   }
}
