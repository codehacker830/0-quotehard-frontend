import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import NavCrump from '../../../../components/NavCrump';

export default class Leads extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowCode: false
      }
      this.code = "";
      this.leadFormCode = `<!-- Quotehard Lead Form -->
      <div id="quotient-lead-form"></div>
      <script>
            (function (w, s, o, g, i, a, m) {
               a = s.createElement(o);
               m = s.getElementsByTagName(o)[0];
               a.async = 1; a.src = g; w._qLead = function(){};
               m.parentNode.insertBefore(a, m);
            })(window, document, 'script', 'https://quotehard.com/e/39310-1d2ce4e9213f4170a3ceb990d0ae61f5/form/embed.js');
            _qLead.id = 'quotient-lead-form';
      </script>
      <!-- End Quotehard Lead Form -->`;
   }

   _onReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Leads</h2>
               <div className="maxWidth-800">
                  <p className="font-size-h5 mb-5">
                     Leads allow your customers to send you a quote request via an online form. Their details will
                     be added directly into Quotehard, ready to be converted into a quote. You'll get notified
                     instantly by email and on your Dashboard when a new request happens.
                  </p>
                  <div className="mb-5">
                     <h4>Share your Lead Form URL</h4>
                     <div className="form-group">
                        <label htmlFor="lead-url">
                           Copy and paste to use.
                           <Link to={`https://quotehard.com/e/39310-1d2ce4e9213f4170a3ceb990d0ae61f5/form`}> Preview…</Link>
                        </label>
                        <input type="email"
                           className="form-control p-4 rounded-0"
                           id="lead-url" name="lead-url"
                           value={`https://quotehard.com/e/39310-1d2ce4e9213f4170a3ceb990d0ae61f5/form`}
                        />
                     </div>
                     {
                        this.state.isShowCode ?
                           <div>
                              <p> Copy and paste into the your HTML to embed your Lead Form.</p>
                              <Link to="https://quotehard.com/help/leads">Learn more in the support article.</Link>
                              <TextareaAutosize className="form-control p-4 rounded-0 mb-2">
                                 {this.leadFormCode}
                              </TextareaAutosize>
                              <button className="btn btn-sm btn-light" onClick={() => this.setState({ isShowCode: false })}>
                                 Hide code…
                              </button>
                           </div>
                           : <p>How to embed into your own website:
                              <button className="btn btn-sm btn-light ml-2" onClick={() => this.setState({ isShowCode: true })}>
                                 Show code…
                              </button>
                           </p>
                     }
                     <div className="row no-gutters">
                        <div className="d-flex text-success mr-2">
                           <span className="m-auto font-w700"><i className="far fa-fw fa-check-circle mr-1" />Published Live</span>
                        </div>
                        <Link className="btn btn-alt-primary" to="/app/add-ons/leads/config">Edit Form</Link>
                     </div>
                  </div>
                  <div className="mb-5">
                     <h4>Email Notifications</h4>
                     <p>Get notified the moment a new Lead request happens.</p>
                     <Link className="btn btn-sm btn-alt-secondary" to="/app/add-ons/leads/notification">Email Settings</Link>
                  </div>
                  <div className="mb-5">
                     <button className="btn btn-outline-secondary">Disable Lead Form</button>
                  </div>

                  <div className="w-100 border-bottom mb-5"></div>

                  <div className="mb-2">
                     <h3>How can I use the Lead FromInColumns?</h3>
                     <ul className="fa-ul">
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Create a link from the contact page on your own website
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Add a link from your Facebook page
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Send the link out in your next Mailchimp newsletter
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Place a link in your email signature
                        </li>
                     </ul>
                  </div>

                  <div className="mb-2">
                     <h4>How do Leads work?</h4>
                     <YouTube videoId="kHehCv4SGzs" opts={{
                        width: '100%',
                        height: '460',
                        playerVars: {
                           // https://developers.google.com/youtube/player_parameters
                           // autoplay: 1,
                        }
                     }} onReady={this._onReady} />
                  </div>

                  <div className="mb-2">
                     <h4>Also, use Zapier with Leads</h4>
                     <p>
                        Create a completely custom Lead Form or create New Leads with 1000’s of other apps using Zapier.
                        <br />
                        See <Link to="/app/add-ons/zapier">{`Settings > Add-ons > Zapier`}</Link>.
                     </p>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}