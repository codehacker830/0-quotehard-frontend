import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Zapier extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Zapier</h2>

               <h4 className="mb-2">What is Zapier?</h4>
               <div className="maxWidth-800 mb-4">
                  <p>Easy automation for busy people. Zapier moves info between your web apps automatically.</p>
                  <p>Ready to Get Started? Creating Zaps takes place in <a href="https://zapier.com/apps/quotient/integrations">Zapier</a>, so you’ll need to sign up with Zapier if you haven’t already. To get started, you can start with a Popular Zap below.</p>
               </div>

               <h4 className="mb-2">Zap Log</h4>
               <div className="maxWidth-800 mb-4">
                  <span className="text-secondary">No recent Zaps triggered yet.</span>
               </div>

               <h4 className="mb-2">Popular Zaps</h4>
               <div className="maxWidth-800 mb-4">
               </div>

               <div className="mb-4">
                  <Link className="text-primary font-w600" to={`/app/settings`}><i className="fa fa-fw fa-arrow-left" /> Return to Settings</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}