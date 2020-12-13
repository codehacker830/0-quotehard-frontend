import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';

export default class CustomEmail extends Component {
   onHandleSubmit = () => {

    }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Feature Reviews on Quotes</h2>
               <div className="mb-5">
                  <span>Send email via:</span>
                  <div className="ml-2 mt-3">
                     <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" id="viaQuotient" name="via-email" />
                        <label className="form-check-label text-black" htmlFor="viaQuotient"><strong>Quotehard</strong></label>
                        <div className="p-3 bg-light border maxWidth-400">
                           <div>{`From: Raffale <mail@e.quotientapp.com>`}</div>
                           <div>{`Replies will go to: <Raffale@gmail.com>`}</div>
                        </div>
                        <span>The most reliable and future-proof option.</span>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="viaYourOwnDomain" name="via-email" />
                        <label className="form-check-label text-black" htmlFor="viaYourOwnDomain"><strong>Your Own Domain</strong></label>
                        <div className="p-3 bg-light border maxWidth-400">
                           <div>{`From: Raffale <Raffale@gmail.com>`}</div>
                        </div>
                        <span>If you choose this option make sure you verify your domain… to reduce the risk of Quotes being caught up in spam.</span>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onHandleSubmit}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`/app/settings`}>Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}