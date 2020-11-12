import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';

export default class Leads extends Component {
   render() {
      return (
         <React.Fragment>
            <div className="content">
               <h2 className="my-4">Leads</h2>
               <div className="maxWidth-800">
                  <p className="font-size-h5 mb-5">
                     Leads allow your customers to send you a quote request via an online form. Their details will
                     be added directly into Quotient, ready to be converted into a quote. You'll get notified
                     instantly by email and on your Dashboard when a new request happens.
                  </p>
                  <div className="mb-3">
                     <h4>Share your Lead Form URL</h4>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}