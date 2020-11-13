import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Mailchimp extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Mailchimp</h2>

               <div className="maxWidth-800 mb-5">
                  <h4 className="mb-2">What is Mailchimp?</h4>
                  <div className="mb-4 ml-3">
                     <p>Mailchimp is a complete email marketing solution.</p>
                     <a href="https://mailchimp.com/">Read more on the Mailchimp website →</a>
                  </div>

                  <h4 className="mb-2">Copy contacts to a Mailchimp list</h4>
                  <div className="mb-4 ml-3">
                     <p>Import your current Quotient contacts into Mailchimp, and continue to copy contacts to Mailchimp every time a quote is sent.</p>
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