import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorQuoteNotExist extends Component {
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
                              <div className="content">
                                 <h1 className="font-w700">Sorry, something went wrong. Perhaps try again later</h1>
                                 <p className="font-size-h4">This quote does not exist.</p>
                                 <Link to="/app">Visit the Dashboard</Link>
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