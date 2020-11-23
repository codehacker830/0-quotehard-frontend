import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../components/NavCrump'
import StatusBanner from '../../components/StatusBanner'
import ProgressBar from '../../components/ProgressBar';
import axios from '../../util/Api';
import { formatDate, formatDateTime, toFixedFloat } from '../../util';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { toastErrorConfig, toastSuccessConfig, toastWarningConfig } from '../../util/toastrConfig';
import QuoteItemTotal from '../../components/QuoteItemTotal';
import { setInitUrl, userSignOut } from '../../actions/Auth';
import { getTeammates } from '../../actions/Setting';
import TextareaAutosize from 'react-autosize-textarea/lib';
import QuoteLogo from './QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';

class PublicQuoteView extends Component {
   mounted = false;
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super();
      this.state = {
         isMounting: true,
         loading: false,

         teamMembers: [],
         fileArray: [],
         quote: {},
         commentShow: false,
         privateNoteShow: false,
         questionSectionShow: false,
         isAgreeChecked: false,

         discussions: [],
         questionContent: "",
         commentContent: "",
         toMateAccountId: "",
         privateNoteContent: "",
         answerContent: "",

         isPrivateEligible: false
      };
      this.hiddenFileInput = React.createRef();
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   uploadMultipleFiles = (e) => {
      console.log("uploadMultipleFiles ==>", e.target.files);
      this.fileObj = [];
      this.fileObj.push(e.target.files);
      for (let i = 0; i < this.fileObj[0].length; i++) {
         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      }
      this.setState({ fileArray: this.fileArray });
   }

   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   onClickAccept = () => {
      const { entoken } = this.props.match.params;
      this.setState({ loading: true });
      axios.post('/quotes/accept', { entoken: entoken })
         .then(({ data }) => {
            console.log("========== res =========", data);
            this.setState({ loading: false });
            toast.success('Quote was Accepted,', toastSuccessConfig);
            this.props.history.push(`/q/${entoken}/accepted`);
         })
         .catch(err => {
            console.error(" ========== checking public draft error =========", err);
            this.setState({ loading: false });
            toast.error('Failed during quote acception request.,', toastErrorConfig);
         });
   }
   onClickDecline = () => {
      const { entoken } = this.props.match.params;
      axios.post('/quotes/decline', { entoken: entoken })
         .then(({ data }) => {
            console.log("========== res =========", data);
            toast.success('Quote was Declined,', toastSuccessConfig);
         })
         .catch(err => {
            console.error(" ========== checking public draft error =========", err);
            this.setState({ loading: false });
            toast.error('Failed during quote decline request.,', toastErrorConfig);
         });
   }

   onClickAddPrivateNote = () => {
      const { privateNoteContent, toMateAccountId } = this.state;
      const { entoken } = this.props.match.params;
      console.log(" privateNoteContent =>", privateNoteContent);
      if (privateNoteContent === "") {
         toast.warn("Private note should not be empty.", toastWarningConfig);
         return;
      }
      this.setState({ loading: true });
      axios.post('/quotes/private-note', { privateNoteContent, toMateAccountId, entoken })
         .then(({ data }) => {
            toast.success("Private note was Submitted.", toastSuccessConfig);
            console.log(" Private note submit response ==> ", data)
            this.setState({
               loading: false,
               discussions: data.discussions,
               privateNoteContent: "",
               commentShow: false,
               privateNoteShow: false
            });
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit private note ==>", err);
         });
   }

   onSubmitCommemt = () => {
      const { commentContent } = this.state;
      const { entoken } = this.props.match.params;
      console.log(" commentContent =>", commentContent);
      if (commentContent === "") {
         toast.warn("Comment should not be empty.", toastWarningConfig);
         return;
      }
      this.setState({ loading: true });
      axios.post('/quotes/comment', { commentContent, entoken })
         .then(({ data }) => {
            toast.success("Comment was submitted.", toastSuccessConfig);
            console.log(" comment submit response ==> ", data)
            this.setState({
               loading: false,
               discussions: data.discussions,
               commentContent: "",
               commentShow: false,
               privateNoteShow: false
            });
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit comment ==>", err);
         });
   }
   onSubmitQuestion = () => {
      const { questionContent } = this.state;
      const { entoken } = this.props.match.params;
      if (questionContent === "") {
         toast.warn("Answer content should not be empty.", toastWarningConfig);
         return;
      }
      this.setState({ loading: true });
      axios.post('/quotes/ask-question', { questionContent, entoken })
         .then(({ data }) => {
            toast.success("Question was Submitted.", toastSuccessConfig);
            this.setState({
               loading: false,
               discussions: data.discussions,
               questionContent: ""
            });
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit question ==>", err);
         });
   }
   onSubmitAnswer = (qaId) => {
      const { answerContent } = this.state;
      const { entoken } = this.props.match.params;
      if (answerContent === "") {
         toast.warn("Answer content should not be empty.", toastWarningConfig);
         return;
      }
      this.setState({ loading: true });
      axios.post('/quotes/answer-question', { answerContent, entoken, qaId })
         .then(({ data }) => {
            toast.success("Answer was Submitted.", toastSuccessConfig);
            this.setState({
               loading: false,
               discussions: data.discussions,
               answerContent: ""
            });
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit answer ==>", err);
         });
   }
   onSubmitDismiss = (qaId) => {
      const { entoken } = this.props.match.params;
      this.setState({ loading: true });
      axios.post('/quotes/dismiss', { entoken, qaId })
         .then(({ data }) => {
            toast.success("Answer was Dismissed.", toastSuccessConfig);
            this.setState({
               loading: false,
               discussions: data.discussions,
               answerContent: ""
            });
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit dismiss ==>", err);
         });
   }
   componentDidMount() {
      this.mounted = true;
      const entoken = this.props.match.params.entoken;
      console.log("***** entoken ***** ", entoken);
      if (this.mounted) {
         this.setState({ isMounting: true });

         axios.post('/quotes/view-draft', { entoken })
            .then(({ data }) => {
               console.log("========== Publick overview did mount get quote =========", data);
               this.setState({
                  isMounting: false,
                  quote: data.quote,
                  discussions: data.quote.discussions ? data.quote.discussions : []
               });
               if (this.props.auth.authUser) {
                  axios.get('/team-members').then((res) => {
                     console.log("get team-members api response ============>", res.data.teamMembers)
                     this.setState({ teamMembers: res.data.teamMembers });
                     const me = res.data.teamMembers.find(mate => mate._id === this.props.auth.authUser._id);
                     if (me) {
                        console.log(" this user is Eligible %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        this.setState({ isPrivateEligible: true });
                     }
                     else {
                        this.setState({ isPrivateEligible: false });
                     }
                  }).catch(err => {
                     console.error("error during get teamMembers ==>", err);
                     this.props.setInitUrl(`/q/${entoken}`);
                     this.props.userSignOut;
                  });
               }

            })
            .catch(err => {
               this.setState({ isMounting: false });
               console.error(" ========== checking public draft error =========", err);
            });

      }
   }
   render() {
      console.log(" ----------- PublicQuoteView state ------", this.state);
      console.log(" ----------- PublicQuoteView props ------", this.props);
      if (this.state.isMounting) return <div>loading...</div>;
      else if (this.props.match.path === '/q/:entoken/author-discuss') {
         if (!this.state.isPrivateEligible) {
            this.props.setInitUrl(`/q/${this.props.match.params.entoken}`);
            // this.props.history.push('/sign-in');
            return <Redirect to="/sign-in" />
         } else return <Redirect to={`/q/${this.props.match.params.entoken}`} />
      }
      else return (
         <React.Fragment>
            <main id="main-container">
               {
                  this.props.auth && this.props.auth.authUser ?
                     <React.Fragment>
                        <NavCrump linkTo="/app">
                           Dashboard
                        </NavCrump>
                        {/* <StatusBanner quote={this.state.quote} /> */}
                     </React.Fragment>
                     : null
               }
               <div className="quoteCanvas-bg" style={{ backgroundColor: "#fff1f5" }}>
                  <input type="hidden" name="_x_antiFooInput" defaultValue="ewvr1abgw47sqk74oun1p" />
                  <div className="offlineBanner no_print">
                     <div className="container">
                        <StatusShowCase />
                     </div>
                  </div>

                  <div className="container qCustomCss quoteCanvas quoteCanvas-1col">
                     <div className="quoteCanvas-page">
                        <QuoteLogo />
                        <QuoteDetail />
                        <h1 className="quoteCanvas-title">
                           Quote title... </h1>
                        <div id="form_message"> </div>
                        <div className="clear" />

                        <div className="quoteItems" data-tg-control="QuoteViewTotal">
                           <div className="tItem vIsLine tItemId-43620285 isSelected">
                              <div className="tItem-desc">
                                 <div className="tItem-desc-table">
                                    <div className="tItem-desc-cell">
                                       <p className="item_code">ix123</p>
                                       <h3>service</h3>
                                       <p>ddd..</p>
                                       <div className="quoteFile-wrap">
                                          <div className="quoteFile-set">
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/quote-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/dn/mascot1.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/quote-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/ds/mascot1.jpeg"
                                                   title="mascot1.jpeg"><img
                                                      src="https://asset.quotientapp.com/file-s/1/quote-v2/39310/c65255299cf0bf369a3b192b204e507d/sm/ds/mascot1.jpeg"
                                                      alt="mascot1.jpeg" /></a>
                                             </div>
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/lg/dn/mascot2.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/lg/ds/mascot2.jpeg"
                                                   title="mascot2.jpeg"><img
                                                      src="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/sm/ds/mascot2.jpeg"
                                                      alt="mascot2.jpeg" /></a>
                                             </div>
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/dn/mascot3.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/ds/mascot3.jpeg"
                                                   title="mascot3.jpeg"><img
                                                      src="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/sm/ds/mascot3.jpeg"
                                                      alt="mascot3.jpeg" /></a>
                                             </div>
                                          </div>
                                          <div className="clear" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="tItem-price">
                                 <p className="quote-text-sm">10.00</p>
                                 <p className="quote-text-sm itemPartQuantity">x 10</p>
                                 <p>
                                    <span className="itemPartItemTotal">100.00</span>
                                 </p>
                              </div>
                              <div className="clear" />
                           </div>
                           <div className="clear" />
                           <div className="quoteViewTotalWrap quoteViewTotalWrap-client">
                              <div>
                                 <table className="quoteTotal hasNoTerm">
                                    <tbody>
                                       <tr>
                                          <td className="total-desc">Subtotal</td>
                                          <td className="total-price">100.00</td>
                                       </tr>
                                       <tr className="total">
                                          <td className="total-desc"><span className="quoteTotal-gDesc">Total USD including tax</span>
                                          </td>
                                          <td className="total-price"><span className="quoteTotal-gTotal">$100.00</span></td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div className="quoteViewTotalWrap quoteViewTotalWrap-server isHidden">
                              <table className="quoteTotal subscribe_zFixedCost hasNoTerm">
                                 <tbody>
                                    <tr>
                                       <td className="total-desc">Subtotal</td>
                                       <td className="total-price">
                                          <p>100.00</p>
                                       </td>
                                    </tr>
                                    <tr className="total">
                                       <td className="total-desc">
                                          <p className="quoteTotal-gDesc">Total USD including tax</p>
                                       </td>
                                       <td className="total-price">
                                          <p className="quoteTotal-gTotal">$100.00</p>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div className="tItem-text tItemId-43620286">
                              <h3>tt</h3>
                              <p>ddd</p>
                              <div className="quoteFile-wrap">
                                 <div className="quoteFile-set">
                                    <div className="quoteFile-image">
                                       <a data-tg-click="root_lightboxQuote"
                                          data-download-original="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/lg/dn/mascot2.jpeg"
                                          className="quoteFile-image-a"
                                          href="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/lg/ds/mascot2.jpeg"
                                          title="mascot2.jpeg"><img
                                             src="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1f6d2da2be86c0ca94a2846f6b7b1089/sm/ds/mascot2.jpeg"
                                             alt="mascot2.jpeg" /></a>
                                    </div>
                                    <div className="quoteFile-image">
                                       <a data-tg-click="root_lightboxQuote"
                                          data-download-original="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/dn/mascot3.jpeg"
                                          className="quoteFile-image-a"
                                          href="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/ds/mascot3.jpeg"
                                          title="mascot3.jpeg"><img
                                             src="https://asset.quotientapp.com/file-s/1/quote-v2/39310/1caefa955b2b2f7a478c8c6307043a82/sm/ds/mascot3.jpeg"
                                             alt="mascot3.jpeg" /></a>
                                    </div>
                                 </div>
                                 <div className="clear" />
                              </div>
                           </div>
                        </div>

                        <div id="discussion" className="discuss-wrap">
                           <h3 className="quote-discuss-h3">Questions &amp; Answers</h3>
                           <div className="discuss-row discuss-row-private">
                              <div className="discuss-bubble">
                                 <div className="bubble-left avatar-48"
                                    style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}>
                                 </div>
                                 <div className="bubble-right">
                                    <div className="discuss-title">
                                       <span className="label label-green">Private</span>&nbsp;
                                       <strong className="util-no-wrap">Silver Mind&nbsp;</strong>
                                       <span className="lighter">
                                          <span className="util-no-wrap"><span className="dt-time" data-time="[1605898908,1,1]">22 minutes ago</span></span>&nbsp;
                                          <a className="discuss-edit-a"
                                             data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2752358&quot;}}"
                                             href="javascript:void(0)">Edit</a>&nbsp;
                                       </span>
                                    </div>
                                    <div className="clear" />
                                    <div className="discuss-message">
                                       <p>test</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="discuss-row discuss-row-private">
                              <div className="discuss-bubble">
                                 <div className="bubble-left avatar-48"
                                    style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}> </div>
                                 <div className="bubble-right">
                                    <div className="discuss-title">
                                       <span className="label label-green">Private</span>&nbsp; <strong className="util-no-wrap">Silver Mind&nbsp;</strong>→ <strong className="util-no-wrap">Alexey Ryzhkov&nbsp;</strong>
                                       <span className="lighter">
                                          <span className="util-no-wrap"><span className="dt-time" data-time="[1605900155,1,1]">1 minute ago</span></span>&nbsp;
                                          <a className="discuss-edit-a" data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2752392&quot;}}" href="javascript:void(0)">Edit</a>&nbsp;
                                       </span>
                                    </div>
                                    <div className="clear" />
                                    <div className="discuss-message">
                                       <p>asdfasdf</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="discuss-row discuss-row-private">
                              <div className="discuss-bubble">
                                 <div className="bubble-left avatar-48"
                                    style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}> </div>
                                 <div className="bubble-right">
                                    <div className="discuss-title">
                                       <span className="label label-green">Private</span>&nbsp; <strong className="util-no-wrap">Silver Mind&nbsp;</strong>
                                       <span className="lighter">
                                          <span className="util-no-wrap"><span className="dt-time" data-time="[1605900167,1,1]">1 minute ago</span></span>&nbsp;– modified <span className="dt-time" data-time="[1605900207,1,1]">moments ago</span>&nbsp; <a
                                             className="discuss-edit-a"
                                             data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2752394&quot;}}"
                                             href="javascript:void(0)">Edit</a>&nbsp;
                                          </span>
                                    </div>
                                    <div className="clear" />
                                    <div className="discuss-message">
                                       <p>asdf</p>
                                       <div className="quoteFile-wrap">
                                          <div className="quoteFile-set">
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/dn/mascot1.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/ds/mascot1.jpeg"
                                                   title="mascot1.jpeg"><img
                                                      src="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/sm/ds/mascot1.jpeg"
                                                      alt="mascot1.jpeg" /></a>
                                             </div>
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/dn/mascot3.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/1caefa955b2b2f7a478c8c6307043a82/lg/ds/mascot3.jpeg"
                                                   title="mascot3.jpeg">
                                                   <img
                                                      src="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/1caefa955b2b2f7a478c8c6307043a82/sm/ds/mascot3.jpeg"
                                                      alt="mascot3.jpeg" />
                                                </a>
                                             </div>
                                          </div>
                                          <div className="clear" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="discuss-row">
                              <div className="discuss-bubble">
                                 <div className="bubble-left avatar-48"
                                    style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}> </div>
                                 <div className="bubble-right">
                                    <div className="discuss-title">
                                       <strong className="util-no-wrap">Silver Mind&nbsp;</strong>
                                       <span className="lighter">
                                          <span className="util-no-wrap"><span className="dt-time" data-time="[1605900183,1,1]">moments ago</span>
                                          </span>&nbsp;
                                       <a className="discuss-edit-a"
                                             data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2752395&quot;}}"
                                             href="javascript:void(0)">Edit</a>&nbsp;
                                    </span>
                                    </div>
                                    <div className="clear" />
                                    <div className="discuss-message">
                                       <p>test</p>
                                       <div className="quoteFile-wrap">
                                          <div className="quoteFile-set">
                                             <div className="quoteFile-image">
                                                <a data-tg-click="root_lightboxQuote"
                                                   data-download-original="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/dn/mascot1.jpeg"
                                                   className="quoteFile-image-a"
                                                   href="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/lg/ds/mascot1.jpeg"
                                                   title="mascot1.jpeg"><img
                                                      src="https://asset.quotientapp.com/file-s/1/discuss-v2/39310/c65255299cf0bf369a3b192b204e507d/sm/ds/mascot1.jpeg"
                                                      alt="mascot1.jpeg" /></a>
                                             </div>
                                          </div>
                                          <div className="clear" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="clear" />
                           <div className="no_print u-section-2">
                              comment private note wrtiing
                           </div>
                        </div>

                        {/* Accept Box */}
                        <div className="acceptBox" style={{ backgroundColor: "#e9f1f9" }}>
                           <h3 className="quote-box-h3-accept">Accept on behalf</h3>
                           <div className="acceptSummary">
                              <p>
                                 <strong>Quote title...</strong>
                              </p>
                              <p className="summaryWrapzFixedCost">
                                 Total USD including tax $<span className="summaryPartTotal">100.00</span> </p>
                           </div>
                           <div className="form-group-half">
                              <label className="label-light" htmlFor="accept_comment">Additional comments</label>
                              <TextareaAutosize className="form-control" rows={5} placeholder="Optional" name="accept[comment]" id="accept_comment" defaultValue={""} /> </div>
                           <div className="form-group-half">
                              <label className="label-light" htmlFor="accept_reference">Order/reference number</label>
                              <input className="form-control util-width-1" placeholder="Optional" name="accept[reference]" defaultValue type="text" id="accept_reference" /> </div>
                           <div className="acceptCb">
                              <div className="acceptCb-left">
                                 <label className="acceptCb-label-box" htmlFor="accept_email_notify">
                                    <input name="accept[email_notify]" defaultValue={1} type="checkbox" className id="accept_email_notify" />
                                 </label>
                              </div>
                              <div className="acceptCb-right">
                                 <label className="acceptCb-label" htmlFor="accept_email_notify">
                                    Send email notification to: <strong>Money Owner</strong>
                                 </label>
                              </div>
                           </div>
                           <div className="clear" />
                           <input type="hidden" name="@checkbox[accept][email_notify]" defaultValue={2} id="@checkbox_accept_email_notify" />
                           <div className="quote-box-accept">
                              <a className="btn btn-save btnAccept quote-btn-lg" href="#trigger:accept_on_behalf">Accept on behalf</a>
                              <span className="quote-box-decline-wrap">
                                 <a className="btn btn-lg btn-lg-skinny" data-tg-click="clickCancelOnBehalf" href="javascript:void(0)">Cancel</a>
                              </span>
                           </div>
                        </div>

                        {/* Accepted Show Box */}
                        <div className="acceptBox" style={{ backgroundColor: "#e9f1f9" }}>
                           <h3 className="quote-box-h3-accept">Quote title...</h3>
                           <div className="acceptSummary">
                              <p className="summaryWrapzFixedCost">
                                 Total USD including tax $<span className="summaryPartTotal">100.00</span> </p>
                              <div className="acceptBox-right no_print">
                                 <span className="label acceptBox-label">Accepted</span>
                              </div>
                              <div className="clear" />
                           </div>
                           <div className="form-group-half">
                              <label className="label-light">Additional comments</label>
                              <div className="accept-input-submitted">
                                 <p>&nbsp;</p>
                              </div>
                           </div>
                           <div className="form-group">
                              <label className="label-light">Order/reference number</label>
                              <div className="accept-input-submitted">
                                 <p>&nbsp;</p>
                              </div>
                           </div>
                        </div>

                        <div className="acceptBox" style={{ backgroundColor: "#e9f1f9" }}>
                           <p>
                              Accepted on behalf of Money Owner by Silver Mind on <span className="dt-time"
                                 data-time="[1605901913,1,0]">November 20, 2020 at 9:51PM</span> </p>
                        </div>

                        <div className="clear" />
                     </div>
                     <div className="no_print">
                        <a className="powered-by powered-by-no powered-by-bg" href="https://www.quotientapp.com/" data-sheet="ignore"><img className="powered-by-black" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-black-01.png" alt="Quotient. Simply Smarter Quotes." /><img className="powered-by-white" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-white-01.png" alt="Quotient. Simply Smarter Quotes." /></a>
                     </div>
                  </div>
               </div>
            </main>
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth, appearanceSetting }) => {
   return { auth, appearanceSetting };
}
const mapDispatchToProps = { setInitUrl, userSignOut, getTeammates };
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);