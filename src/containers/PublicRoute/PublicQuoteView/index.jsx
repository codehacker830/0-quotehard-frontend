import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump';
import { checkIfTeamMember, formatDate, formatDateTime, parseStrIntoHtml, toFixedFloat } from '../../../util';
import { connect } from 'react-redux';
import { getUser, setInitUrl, setPersonData, userSignOut } from '../../../actions/Auth';
import { getTeamMembers, setTeamMembers } from '../../../actions/Team';
import QuoteLogo from '../components/QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';
import PublicNoteItemList from '../components/PublicNoteItemList';
import PublicViewFullWrapper from '../components/PublicViewFullWrapper';
import PublicQuoteDetailWrapper from '../components/PublicQuoteDetailWrapper';
import PublicQuoteItemWrapper from '../components/PublicQuoteItemWrapper';
import { SwitchQuoteLayoutClass } from '../../../util';
import PublicVisiableOnlyAuthTeamMember from '../components/PublicVisiableOnlyAuthTeamMember';
import DeclineCommentShow from '../components/DeclineCommentShow';
import PublicQuoteViewTotalWrap from '../components/PublicQuoteViewTotalWrap';
import { QUOTES_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';
import PublicQuoteItemList from '../components/PublicQuoteItemList';
import PublicQuoteDiscussionList from '../components/PublicQuoteDiscussionList';
import PublicQuoteDisscussionWrite from '../components/PublicQuoteDisscussionWrite';
import AcceptBox from './AcceptBox';
import PreviewBanner from './PreviewBanner';
import axios from '../../../util/Api';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import QuoteViewSend from './QuoteViewSend';
import { archiveQuote, getQuoteFromEntoken, markAsSentQuote, setQuote, unArchiveQuote } from '../../../actions/Data';
import ExampleIgnoreMessage from './ExampleIgnoreMessage';
import QuoteViewFollowUp from './QuoteViewFollowUp';
import { updateAppearanceSetting } from '../../../actions';
import ErrorQuoteNotExist from '../ErrorQuoteNotExist.jsx';

class PublicQuoteView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         isInValid: false,

         isEditAlertOpen: false,
         isUndoAcceptanceAlertOpen: false,
         isDeclineAlertOpen: false,
         isUndoDeclineAlertOpen: false,
         isWithdrawAlertOpen: false,
         isUndoWithdrawAlertOpen: false,

         isAcceptOnBehalfBoxShow: false,
         isViewMode: true,
      };
      this.screenEnd = React.createRef();

   }
   onClickMarkAsSent = () => {
      const { _id, toPeopleList, title } = this.props.quote;
      if (title === "") {
         toast.info("Missing a Quote Title.");
         this.setState({ isValidWarning: true });
         return;
      }
      if (toPeopleList.length === 0) { toast.info("You must add at least one contact."); return; }
      this.props.markAsSentQuote(_id);
   }
   onClickUpdateOnly = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         toast.success('Update – back online, not emailed.');
      }).catch(err => {
         toast.error('Quote failed to mark as sent.');
      });
   }
   onClickEditQuote = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "editing" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         this.props.history.push(`/app/quote/${quoteId}`)
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickSendFollowUp = () => {
      const { entoken } = this.props.match.params;
      this.props.history.push(`/q/${entoken}/?do-follow-up=&returnTo=quote`);
   }
   onClickArchive = () => {
      const quoteId = this.props.quote._id;
      if (this.props.quote.state === "archived") this.props.unArchiveQuote(quoteId);
      else this.props.archiveQuote(quoteId);
   }
   onClickAcceptTab = () => {
      if (this.props.quote.status === "accepted") this.setState({ isUndoAcceptanceAlertOpen: true });
      else this.setState({ isAcceptOnBehalfBoxShow: true }, () => {
         this.screenEnd.current.scrollIntoView({ behavior: "smooth" });
      });
   }
   onClickUndoAcceptance = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/undo-acceptance/${quoteId}`).then(({ data }) => {
         toast.success("Acceptance Undone.")
         this.setState({
            isUndoAcceptanceAlertOpen: false,
            isAcceptOnBehalfBoxShow: false
         });
         this.props.setQuote(data.quote);
      }).catch(err => {
         console.error("Error during update status :", err)
      });

   }
   onClickDecline = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "declined" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         this.closeAllAlert();
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickUndoDecline = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         this.closeAllAlert();
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickWithdraw = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "withdrawn" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         this.closeAllAlert();
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickUndoWithdrawn = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         this.props.setQuote(data.quote);
         this.closeAllAlert();
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickCopy = () => {
      const quoteId = this.props.quote._id;
      this.props.history.push(`/app/quote/get/duplicate/${quoteId}`)
   }
   onClickCopyToTemplate = () => {
      const quoteId = this.props.quote._id;
      this.props.history.push(`/app/content/template/get/copy-to-template/${quoteId}`)
   }
   closeAllAlert = () => {
      this.setState({
         isEditAlertOpen: false,
         isUndoAcceptanceAlertOpen: false,
         isDeclineAlertOpen: false,
         isUndoDeclineAlertOpen: false,
         isWithdrawAlertOpen: false,
         isUndoWithdrawAlertOpen: false
      });
   }
   componentDidMount() {
      this.setState({
         isLoading: true,
         isInValid: false,
      });
      const { entoken } = this.props.match.params;
      if (this.props.match.path === '/q/:entoken/author') {
         axios.get('/account').then((res) => {
            console.log(" GET ACCOUNT DATA RES ====> ", res.data)
            this.getInitializingQuoteData();
         }).catch(err => {
            this.props.setInitUrl(`/q/${entoken}`);
            this.props.history.push('/sign-in');
         });
      }
      else this.getInitializingQuoteData();
   }
   getInitializingQuoteData = () => {
      const { entoken } = this.props.match.params;
      axios.post('/quotes/view-public/quote', { entoken }).then((res) => {
         const { quote, person, appearanceSetting } = res.data;
         this.props.setQuote(quote);
         this.props.setPersonData(person);
         this.props.updateAppearanceSetting(appearanceSetting);
         if (this.props.authUser) {
            axios.get('/settings/team/real-members').then((res) => {
               const { members } = res.data;
               this.props.setTeamMembers(members);
               this.setState({
                  isLoading: false,
                  isInValid: false
               });
            }).catch((err) => {
               this.setState({
                  isLoading: false,
                  isInValid: false
               });
               console.error("Error during fetch team members.")
            });
         } else {
            this.setState({
               isLoading: false,
               isInValid: false
            })
         }
      }).catch(err => {
         this.setState({
            isLoading: false,
            isInValid: true
         })
      });
   }
   render() {
      console.log(" ----------- PublicQuoteView state ------", this.state);
      console.log(" ----------- PublicQuoteView props ------", this.props);
      const { entoken } = this.props.match.params;
      const { location } = this.props;
      const { appearanceSetting, teamSetting, quote } = this.props;
      const { teamMembers } = teamSetting;
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTES_PATH) linkName = "Quotes";

      const isMember = checkIfTeamMember(quote.author, teamMembers);
      console.log(" quote.author => ", quote.author)
      console.log(" teamMembers => ", teamMembers)
      console.error("QUOTE AUTHOR IS TEAM MEMBER ? ", isMember);
      console.error("isLoading ? ", this.state.isLoading);

      const hideMarkAsSent = (quote.status !== "draft")
      const hideUpdateOnly = (quote.status !== "editing");
      const hideEditeQuote = (quote.status !== "awaiting");
      const hideSendFollowup = (quote.status !== "awaiting");
      const hideArchive = (quote.status === "draft" || quote.status === "editing");
      const hideAccept = (quote.status === "editing" || quote.status === "withdrawn");
      const hideDecline = (quote.status === "editing" || quote.status === "accepted" || quote.status === "withdrawn");
      const hideWithdraw = (quote.status === "editing");

      if (this.state.isLoading) return <div>Loading...</div>;
      else if (this.state.isInValid) return <ErrorQuoteNotExist />;
      else if (this.props.match.path === '/q/:entoken/author') {
         if (isMember) return <Redirect to={`/q/${entoken}`} />
         else {
            this.props.setInitUrl(`/q/${entoken}`);
            return <Redirect to="/sign-in" />
         }
      }
      else return (
         <React.Fragment>
            <main id="main-container" className="bg-app">
               <PublicVisiableOnlyAuthTeamMember>
                  <NavCrump>
                     <NavCrumpLeft linkTo={linkTo}>
                        {linkName}
                     </NavCrumpLeft>
                     <NavCrumpRight>
                        <ul className="choices" style={{ left: 45, top: 10 }}>
                           <li className={clsx(hideMarkAsSent && "d-none")}>
                              <button className="btn-in-action" onClick={this.onClickMarkAsSent}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Mark as Sent (don't email)</span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideUpdateOnly && "d-none")}>
                              <button className="btn-in-action" onClick={this.onClickUpdateOnly}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Update Only (don't email)</span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideEditeQuote && "d-none")}>
                              <button className="btn-in-action" onClick={() => {
                                 this.setState({
                                    isEditAlertOpen: true,
                                    isUndoAcceptanceAlertOpen: false,
                                    isDeclineAlertOpen: false,
                                    isWithdrawAlertOpen: false,
                                    isUndoWithdrawAlertOpen: false
                                 });
                              }}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-pencil-alt text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Edite Quote</span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideSendFollowup && "d-none")}>
                              <button className="btn-in-action" onClick={this.onClickSendFollowUp}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-paper-plane text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Send Follow-up...</span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideArchive && "d-none")}>
                              <button className="btn-in-action" onClick={this.onClickArchive}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-archive text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span className={clsx(quote.state === "archived" ? "" : "d-none")}>Archived<span className="choices-undo"> ← undo</span></span>
                                    <span className={clsx(quote.state === "archived" ? "d-none" : "")}>Archive</span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideAccept && "d-none")}>
                              <button className="btn-in-action" onClick={this.onClickAcceptTab}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-check text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    {
                                       quote.status === "accepted" ?
                                          <span>Accepted<span className="choices-undo"> ← undo</span></span>
                                          : <span>Accept</span>
                                    }
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideDecline && "d-none")}>
                              <button className="btn-in-action" onClick={() => {
                                 if (quote.status === "declined") this.setState({ isUndoDeclineAlertOpen: true });
                                 else this.setState({ isDeclineAlertOpen: true });
                              }}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-minus-circle text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span className={clsx(quote.status === "declined" ? "d-none" : "")}>Decline</span>
                                    <span className={clsx(quote.status === "declined" ? "" : "d-none")}>Declined<span className="choices-undo"> ← undo</span></span>
                                 </div>
                              </button>
                           </li>
                           <li className={clsx(hideWithdraw && "d-none")}>
                              <button className="btn-in-action" onClick={() => {
                                 if (quote.status !== "withdrawn") this.setState({
                                    isEditAlertOpen: false,
                                    isUndoAcceptanceAlertOpen: false,
                                    isDeclineAlertOpen: false,
                                    isWithdrawAlertOpen: true,
                                    isUndoWithdrawAlertOpen: false
                                 });
                                 else this.setState({
                                    isEditAlertOpen: false,
                                    isUndoAcceptanceAlertOpen: false,
                                    isDeclineAlertOpen: false,
                                    isWithdrawAlertOpen: false,
                                    isUndoWithdrawAlertOpen: true
                                 });
                              }}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-ban text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    {
                                       quote.status === "withdrawn" ?
                                          <span>Withdraw<span className="choices-undo"> ← undo</span></span>
                                          : <span>Withdraw</span>
                                    }
                                 </div>
                              </button>
                           </li>

                           <li className="choices-break" />
                           <li>
                              <button className="btn-in-action" onClick={this.onClickCopy}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-copy text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Copy</span>
                                 </div>
                              </button>
                           </li>
                           <li>
                              <button className="btn-in-action" onClick={this.onClickCopyToTemplate}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-plus-circle text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Copy to Template</span>
                                 </div>
                              </button>
                           </li>
                        </ul>
                     </NavCrumpRight>
                  </NavCrump>
               </PublicVisiableOnlyAuthTeamMember>

               <ExampleIgnoreMessage />
               <div id="AlerterPage">
                  <div className={clsx("alertBar alertBar-prompt", !this.state.isEditAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Edit Quote?</h4>
                        <p>While editing, the details of this Quote will be hidden from your customer.<br />
                              Once saved, <strong>edits cannot be undone</strong>. Consider creating a copy instead (Actions &gt; Copy).
                           </p>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickEditQuote}>Take offline and edit quote</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>
                  <div className={clsx("alertBar alertBar-prompt", !this.state.isUndoAcceptanceAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Undo the Acceptance?</h4>
                        <ul><li>The Order/reference number and any additional comments <strong>will be removed</strong>.</li></ul>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickUndoAcceptance}>Undo acceptance</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>
                  <div className={clsx("alertBar alertBar-prompt", !this.state.isDeclineAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Mark as declined?</h4>
                        <p>This quote will also be archived.</p>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickDecline}>Decline Quote</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>
                  <div className={clsx("alertBar alertBar-prompt", !this.state.isUndoDeclineAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Undo and make available to your customer again?</h4>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickUndoDecline}>Undo</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>

                  <div className={clsx("alertBar alertBar-prompt", !this.state.isWithdrawAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Are you sure you want to withdraw this quote?</h4>
                        <ul>
                           <li>Quote items and pricing <strong>will be hidden</strong> from your customer’s view.</li>
                           <li>This quote will <strong>no longer be counted</strong> in your Dashboard stats.</li>
                        </ul>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickWithdraw}>Withdraw Quote</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>
                  <div className={clsx("alertBar alertBar-prompt", !this.state.isUndoWithdrawAlertOpen && "isHidden")}>
                     <div className="container">
                        <h4 className="mb-2">Undo and make available to your customer again?</h4>
                        <div className="btnSet">
                           <button className="btn btn-dark" onClick={this.onClickUndoWithdrawn}>Undo</button>
                           <button className="btn" onClick={this.closeAllAlert}>Cancel</button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* QuoteViewSend */}
               <PublicVisiableOnlyAuthTeamMember>
                  <QuoteViewSend isViewMode={this.state.isViewMode} setViewMode={(val) => this.setState({ isViewMode: val })} />
               </PublicVisiableOnlyAuthTeamMember>

               {/* QuoteViewFollowUp */}
               <PublicVisiableOnlyAuthTeamMember>
                  <QuoteViewFollowUp />
               </PublicVisiableOnlyAuthTeamMember>

               {/* QuoteView */}
               <div className={clsx("quoteCanvas-bg", !this.state.isViewMode && "d-none")} style={{ backgroundColor: appearanceSetting.colors.background }}>
                  <PublicVisiableOnlyAuthTeamMember>
                     <StatusShowCase onClickConfirmSend={() => this.setState({ isViewMode: false })} />
                  </PublicVisiableOnlyAuthTeamMember>
                  <PreviewBanner />

                  <div className={`${SwitchQuoteLayoutClass(appearanceSetting.contactDetailLayout, appearanceSetting.layout)}`}>
                     <div className="quoteCanvas-page">
                        <PublicViewFullWrapper>
                           <PublicQuoteDetailWrapper>
                              <QuoteLogo />
                              <QuoteDetail />
                           </PublicQuoteDetailWrapper>

                           <PublicQuoteItemWrapper>
                              <h1 className="quoteCanvas-title">{parseStrIntoHtml(quote.title)}</h1>
                              <div id="form_message" />
                              <div className="clear" />

                              <div className="quoteItems">
                                 <PublicQuoteItemList />
                                 <div className="clear" />
                                 <PublicQuoteViewTotalWrap />
                                 <PublicNoteItemList />
                              </div>

                              <div id="discussion" className="discuss-wrap">
                                 <PublicQuoteDiscussionList />
                                 <PublicQuoteDisscussionWrite />
                              </div>
                              <AcceptBox isAcceptOnBehalfBoxShow={this.state.isAcceptOnBehalfBoxShow} hideManualAcceptBox={() => this.setState({ isAcceptOnBehalfBoxShow: false })} />
                              <div style={{ float: "left", clear: "both" }} ref={this.screenEnd} />
                              <DeclineCommentShow />

                           </PublicQuoteItemWrapper>
                        </PublicViewFullWrapper>
                     </div>
                     <div className="no_print">
                        <a className={clsx("powered-by", true && "powered-by-no", "powered-by-bg")} href="http://www.qoutehard.com/">
                           <img className="powered-by-black" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-black-01.png" alt="Quotehard. Simply Smarter Quotes." />
                           <img className="powered-by-white" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-white-01.png" alt="Quotehard. Simply Smarter Quotes." />
                        </a>
                     </div>
                  </div>
               </div>
            </main>
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth, appearanceSetting, teamSetting, mainData }) => {
   return { authUser: auth.authUser, appearanceSetting, teamSetting, quote: mainData.quote };
}
const mapDispatchToProps = {
   setInitUrl, userSignOut,
   // getUser, 
   // getQuoteFromEntoken,
   // getTeamMembers,
   markAsSentQuote, archiveQuote, unArchiveQuote,
   setQuote,
   setPersonData,
   updateAppearanceSetting,
   setTeamMembers,
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);