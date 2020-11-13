import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Xero extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Xero</h2>

               <h4 className="mb-2">What is Xero?</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">Xero is small business accounting software.</p>
                  <a href="https://www.xero.com">Read more on the Xero website →</a>
               </div>

               <h4 className="mb-2">Create Invoices</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">Create Xero Invoices from Accepted Quotes.</p>
                  <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
               </div>

               <h4 className="mb-2">Lookup Contacts</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">When adding Contacts to Quotes, include Xero Contacts in Lookup Results.</p>
                  <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
               </div>

               <h4 className="mb-2">Lookup Inventory Items</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">When adding Items to Quotes, include Xero inventory items in Lookup Results.</p>
                  <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
               </div>

               <div className="mb-4">
                  <Link className="text-primary font-w600" to={`/app/settings`}><i className="fa fa-fw fa-arrow-left" /> Return to Settings</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}