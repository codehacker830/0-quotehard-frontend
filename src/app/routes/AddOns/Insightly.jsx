import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Insightly extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Insightly</h2>

               <div className="maxWidth-800 mb-5">
                  <h4 className="mb-2">What is Insightly?</h4>
                  <div className="mb-4 ml-3">
                     <p>Insightly is the easy, powerful and affordable online Customer Relationship & Project Management Software used by over 400,000 small businesses world wide.</p>
                     <a href="https://www.insightly.com/">Read more on the Insightly website →</a>
                  </div>

                  <h4 className="mb-2">Lookup Contacts</h4>
                  <div className="mb-4 ml-3">
                     <p>When adding Contacts to Quotes, include Insightly Contacts in Lookup Results</p>
                     <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
                  </div>

                  <h4 className="mb-2">Send Emails to Insightly</h4>
                  <div className="mb-4 ml-3">
                     <p>Send customer New Quote and Acceptance emails to a Contact in Insightly.</p>
                     <button className="btn btn-alt-primary"><i className="fa fa-fw fa-plus-circle" /> Enable</button>
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