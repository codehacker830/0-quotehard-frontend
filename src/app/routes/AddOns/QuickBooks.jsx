import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class QuickBooks extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">QuickBooks</h2>

               <h4 className="mb-2">What is QuickBooks?</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">#1 Online Accounting Software. QuickBooks Online is used globally by millions of people.</p>
                  <a href="https://quickbooks.intuit.com/online">Read more on the QuickBooks website →</a>
               </div>

               <h4 className="mb-2">Lookup Customers</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">When adding Contacts to Quotes, include QuickBooks Customers in Lookup Results.</p>
                  <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
               </div>

               <h4 className="mb-2">Create Invoices</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">Create QuickBooks Invoices from Accepted Quotes.</p>
                  <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
               </div>

               <h4 className="mb-2">Lookup Products/Services</h4>
               <div className="ml-3 mb-5">
                  <p className="mb-1">When adding Items to Quotes, include QuickBooks Products/Services in Lookup Results.</p>
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