import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import NavCrump from '../../../../components/NavCrump';

export default class Reviews extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowReviewFormCode: false,
         isShowReviewPageCode: false,
      }
      this.code = "";
      this.reviewFormCode = `<!-- Quotehard Review Form -->
      <div id="quotient-review-form"></div>
      <script>
          (function (w, s, o, g, i, a, m) {
              a = s.createElement(o);
              m = s.getElementsByTagName(o)[0];
              a.async = 1; a.src = g; w._qReviewForm = function(){};
              m.parentNode.insertBefore(a, m);
          })(window, document, 'script', 'https://quotehard.com/e/39310-e00e6ab738d94571b39bc1db4f0c019d/reviews/form-embed.js');
          _qReviewForm.id = 'quotient-review-form';
      </script>
      <!-- End Quotehard Ask for Review Form -->`;
      this.reviewPageCode = `<!-- Quotehard Reviews Page -->
      <div id="quotient-reviews-page"></div>
      <script>
          (function (w, s, o, g, i, a, m) {
              a = s.createElement(o);
              m = s.getElementsByTagName(o)[0];
              a.async = 1; a.src = g; w._qReviewPage = function(){};
              m.parentNode.insertBefore(a, m);
          })(window, document, 'script', 'https://quotehard.com/e/39310-e00e6ab738d94571b39bc1db4f0c019d/reviews/page-embed.js');
          _qReviewPage.id = 'quotient-reviews-page';
      </script>
      <!-- End Quotehard Reviews Page -->`;
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
               <h2 className="my-4">Reviews</h2>
               <div className="maxWidth-800">
                  <p className="font-size-h5 mb-5">
                     Effortlessly collect Reviews from your customers, and feature the best of them on new Quotes. Collect valuable feedback about the business you conduct, while creating great social evidence that helps build trust and credibility with future customers.
                  </p>
                  <div className="mb-5">
                     <h4>Ask for Reviews Form</h4>
                     <div className="form-group">
                        <div className="row no-gutters mb-1">
                           <Link to={`https://quotehard.com/e/39310-1d2ce4e9213f4170a3ceb990d0ae61f5/form`}>Review Form</Link>
                        </div>
                        <label htmlFor="reviewForm-link">
                           Copy the below link to your Review Form.
                        </label>
                        <input type="email"
                           className="form-control p-4 rounded-0"
                           id="reviewForm-link" name="reviewForm-link"
                           value={`https://quotehard.com/e/39310-e00e6ab738d94571b39bc1db4f0c019d/reviews/new`}
                        />
                     </div>
                     {
                        this.state.isShowReviewFormCode ?
                           <div>
                              <p>Copy and paste into the your HTML to embed your Reviews.</p>
                              <Link to="https://quotehard.com/help/reviews">Learn more in the support article.</Link>
                              <TextareaAutosize className="form-control p-4 rounded-0 mb-2">
                                 {this.reviewPageCode}
                              </TextareaAutosize>
                              <button className="btn btn-sm btn-light" onClick={() => this.setState({ isShowReviewFormCode: false })}>
                                 Hide code…
                              </button>
                           </div>
                           : <p>How to embed into your own website:
                              <button className="btn btn-sm btn-light ml-2" onClick={() => this.setState({ isShowReviewFormCode: true })}>
                                 Show code…
                              </button>
                           </p>
                     }
                  </div>
                  <div className="mb-5">
                     <h4>Effortlessly Ask for Reviews</h4>
                     <p>
                        Ask for Reviews and Feedback from customers, when the time is right, based on rules you define. Candidates receive an email from you, automatically – with a link to a really simple form.
                        <Link to={`/add-ons/reviews`}>Preview the form Candidates will see…</Link>
                     </p>
                     <Link className="btn btn-sm btn-alt-secondary" to="/app/add-ons/leads/notification"><i className="fa fa-fw fa-plus-circle" /> Get Started...</Link>
                  </div>

                  <div className="mb-5">
                     <h4>Feature Reviews on Quotes</h4>
                     <p>As you collect new Reviews, you choose the Reviews you want featured.</p>
                     <div className="row no-gutters">
                        <div className="d-flex text-success mr-2">
                           <span className="m-auto font-w700"><i className="far fa-fw fa-check-circle mr-1" />Now Showing</span>
                        </div>
                        <Link className="btn btn-alt-primary" to="/app/add-ons/reviews/config/display">How it works...</Link>
                     </div>
                  </div>

                  <div className="mb-5">
                     <h4>Share Your Reviews</h4>
                     <div className="form-group">
                        <div className="row no-gutters mb-1">
                           <Link to={`https://quotehard.com/e/39310-e00e6ab738d94571b39bc1db4f0c019d/reviews`}>Your Reviews Page</Link>
                        </div>
                        <label htmlFor="reviewPage-link">
                           Copy the below link to your Reviews Page.
                        </label>
                        <input type="email"
                           className="form-control p-4 rounded-0"
                           id="reviewPage-link" name="reviewPage-link"
                           value={`https://quotehard.com/e/39310-e00e6ab738d94571b39bc1db4f0c019d/reviews`}
                        />
                     </div>
                     {
                        this.state.isShowReviewPageCode ?
                           <div>
                              <p>Copy and paste into the your HTML to embed your Reviews.</p>
                              <a href="https://quotehard.com/help/reviews">Learn more in the support article.</a>
                              <TextareaAutosize className="form-control p-4 rounded-0 mb-2">
                                 {this.reviewFormCode}
                              </TextareaAutosize>
                              <button className="btn btn-sm btn-light" onClick={() => this.setState({ isShowReviewPageCode: false })}>
                                 Hide code…
                              </button>
                           </div>
                           : <p>How to embed into your own website:
                              <button className="btn btn-sm btn-light ml-2" onClick={() => this.setState({ isShowReviewPageCode: true })}>
                                 Show code…
                              </button>
                           </p>
                     }
                  </div>

                  <div className="mb-5">
                     <h4>Email Notifications</h4>
                     <p>Get notified when a new Review has been posted.</p>
                     <Link className="btn btn-alt-primary" to="/app/add-ons/reviews/notification">Email Settings</Link>
                  </div>

                  <div className="mb-5">
                     <button className="btn btn-outline-secondary">Disable Lead Form</button>
                  </div>

                  <div className="w-100 border-bottom mb-5"></div>

                  <div className="mb-2">
                     <h3>What can I do with Reviews?</h3>
                     <ul className="fa-ul">
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Feature your best Reviews on Quotes
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> Share or Embed your Reviews Page in your website
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-arrow-right" />
                           </span> And most importantly… get valuable feedback about your business
                        </li>
                     </ul>
                  </div>

                  <div className="mb-2">
                     <h4>How do Reviews work?</h4>
                     <YouTube videoId="ZBcaMxzIL5k" opts={{
                        width: '100%',
                        height: '460',
                        playerVars: {
                           // https://developers.google.com/youtube/player_parameters
                           // autoplay: 1,
                        }
                     }} onReady={this._onReady} />
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}