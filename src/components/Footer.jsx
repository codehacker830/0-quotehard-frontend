import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
   render() {
      return (
         <footer id="page-footer" className="bg-body-light border-top">
            <div className="content py-0">
               <div className="row font-size-sm">
                  <div className="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-right">
                     Crafted with
                     <i className="fa fa-heart text-danger" /> by
                     <span className="font-w600">AAA</span>
                  </div>
                  <div className="col-sm-6 order-sm-1 text-center text-sm-left">
                     <span className="font-w600">Quotient</span> ©
                     <span data-toggle="year-copy" className="js-year-copy-enabled">2020</span>
                  </div>
               </div>
            </div>
         </footer>
      );
   }
}