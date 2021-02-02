import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class AcceptanceSucceed extends Component {
   render() {
      const { entoken } = this.props.match.params;
      return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="content">
                                 <h1 className="font-w700">Thank you.</h1>
                                 <p className="font-size-h4">You will receive an email as confirmation of your acceptance – <Link to={`/q/${entoken}`}>view accepted quote.</Link></p>
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

export default withRouter(AcceptanceSucceed);