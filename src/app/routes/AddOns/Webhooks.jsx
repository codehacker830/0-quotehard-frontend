import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Webhooks extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Webhooks</h2>
               <div className="mb-5">
                  <div className="maxWidth-800 mb-4">
                     <p className="font-size-h4">
                        Webhooks allow you to receive a payload of data in JSON format whenever certain events happen on this Quotehard Account.
                     <a href="https://quotehard.com/webhooks"> Read the Documentation.</a>
                     </p>

                     <div className="form-group">
                        <label htmlFor="webhook-url">Your Webhook URL <span className="badge badge-pill badge-secondary">REQUIRED</span></label>
                        <input type="text" className="form-control rounded-0 mb-2" id="webhook-url" name="webhook-url" />
                        <button className="btn btn-primary">Save</button>
                     </div>
                  </div>

                  <h3 className="mb-2">Events Available</h3>
                  <div className="maxWidth-550 mb-4">
                     <table className="table">
                        <tbody>
                           <tr>
                              <td>
                                 <div className="float-right">
                                    <button className="btn btn-secondary" disabled>Turn On</button>
                                 </div>
                                 <strong className="text-black">Quote Accepted</strong>
                                 <br />
                                 <small className="text-black">Triggers when a Quote is Accepted.</small>
                                 <br />
                                 <p>
                                    <button className="btn btn-outline-secondary btn-sm " disabled>Test With Sample Data</button>
                                 </p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div className="float-right">
                                    <button className="btn btn-secondary" disabled>Turn On</button>
                                 </div>
                                 <strong className="text-black">Customer Viewed Quote</strong>
                                 <br />
                                 <small className="text-black">Triggers every time a Customer views a Quote.</small>
                                 <br />
                                 <small className="font-w400 text-secondary">
                                    Concurrent views within a 6 hour period will fire a trigger on the first-view only.
                                 </small>
                                 <p>
                                    <button className="btn btn-outline-secondary btn-sm " disabled>Test With Sample Data</button>
                                 </p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div className="float-right">
                                    <button className="btn btn-secondary" disabled>Turn On</button>
                                 </div>
                                 <strong className="text-black">Customer Asked Question</strong>
                                 <br />
                                 <small className="text-black">Triggers when a Customer asks a New Question.</small>
                                 <br />
                                 <p>
                                    <button className="btn btn-outline-secondary btn-sm " disabled>Test With Sample Data</button>
                                 </p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div className="float-right">
                                    <button className="btn btn-secondary" disabled>Turn On</button>
                                 </div>
                                 <strong className="text-black">Quote Declined</strong>
                                 <br />
                                 <small className="text-black">Triggers when a Quote is Declined.</small>
                                 <br />
                                 <p>
                                    <button className="btn btn-outline-secondary btn-sm " disabled>Test With Sample Data</button>
                                 </p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div className="float-right">
                                    <button className="btn btn-secondary" disabled>Turn On</button>
                                 </div>
                                 <strong className="text-black">Quote Sent</strong>
                                 <br />
                                 <small className="text-black">Triggers when a New Quote is first Sent.</small>
                                 <br />
                                 <p>
                                    <button className="btn btn-outline-secondary btn-sm " disabled>Test With Sample Data</button>
                                 </p>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <h3 className="mb-2">Event Log</h3>
                  <div className="maxWidth-550 mb-4">
                     <p className="text-secondary">Nothing to show here yet.</p>
                  </div>
               </div>

               <div className="mb-4">
                  <Link className="text-primary font-w600" to={`/app/settings`}>← Return to Settings</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}