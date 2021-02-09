import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error404 extends Component {
   render() {
      return (
         <main id="main-container">
            {/* Page Content */}
            <div className="bg-white">
               <div className="hero bg-white-95">
                  <div className="hero-inner">
                     <div className="content content-full">
                        <div className="px-3 py-5 text-center">
                           <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                              <div className="col-sm-12 text-center">
                                 <div className="display-1 text-danger font-w700">Not found</div>
                              </div>
                           </div>
                           <h1 className="h2 font-w700 mt-5 mb-3 js-appear-enabled animated fadeInUp" data-toggle="appear" data-className="animated fadeInUp" data-timeout={300}>The page you requested was not found.</h1>
                           <h2 className="h3 font-w700 text-primary mb-5 js-appear-enabled animated fadeInUp" data-toggle="appear" data-className="animated fadeInUp" data-timeout={450}>Quotehard</h2>
                           <div className="js-appear-enabled animated fadeInUp" data-toggle="appear" data-className="animated fadeInUp" data-timeout={600}>
                              <Link className="btn btn-hero-secondary" to="/app">
                                 <i className="fa fa-arrow-left mr-1" /> Visit the Dashboard
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* END Page Content */}
         </main>

      );
   }
}