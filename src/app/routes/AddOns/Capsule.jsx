import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Capsule extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Capsule</h2>

               <div className="maxWidth-800 mb-5">
                  <h4 className="mb-2">What is Capsule?</h4>
                  <div className="mb-4 ml-3">
                     <p>Use Capsule to keep track of the people and companies you do business with,
                     communications with them, opportunities in the pipeline, and what needs to be done when.</p>
                     <a href="https://capsulecrm.com/">Read more on the Capsule website →</a>
                  </div>

                  <h4 className="mb-2">Lookup Contacts</h4>
                  <div className="mb-4 ml-3">
                     <p>When adding Contacts to Quotes, include Capsule Contacts in Lookup Results.</p>
                     <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
                  </div>

                  <h4 className="mb-2">Send Emails to Capsule</h4>
                  <div className="mb-4 ml-3">
                     <p>Send customer New Quote and Acceptance emails to a Contact in Capsule.</p>
                     <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
                  </div>

                  <h4 className="mb-2">Create Quotes from Capsule</h4>
                  <div className="mb-4 ml-3">
                     <p>You can add a time saving link within Capsule to create a new Quotient Quote.</p>
                     <button className="btn btn-alt-primary">See Instructions...</button>
                  </div>
               </div>

               <div className="mb-4">
                  <Link className="text-primary font-w600" to={`/app/settings`}><i className="fa fa-fw fa-arrow-left" /> Return to Settings</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}