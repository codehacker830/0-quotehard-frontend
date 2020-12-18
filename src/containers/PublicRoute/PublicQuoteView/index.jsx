import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump';
import ProgressBar from '../../../components/ProgressBar';
import { checkIfTeamMember, formatDate, formatDateTime, toFixedFloat } from '../../../util';
import { connect } from 'react-redux';
import { getPublicViewPersonWithEntoken, setInitUrl, userSignOut } from '../../../actions/Auth';
import { getTeamMembers } from '../../../actions/Team';
import QuoteLogo from '../components/QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';
import PublicNoteItemList from '../components/PublicNoteItemList';
import PublicViewFullWrapper from '../components/PublicViewFullWrapper';
import PublicQuoteDetailWrapper from '../components/PublicQuoteDetailWrapper';
import PublicQuoteItemWrapper from '../components/PublicQuoteItemWrapper';
import { SwitchQuoteLayoutClass } from '../../../util';
import { getPublicQuoteWithEntoken } from '../../../actions/Data';
import PublicVisiableOnlyAuthTeamMember from '../components/PublicVisiableOnlyAuthTeamMember';
import DeclineCommentShow from '../components/DeclineCommentShow';
import PublicQuoteViewTotalWrap from '../components/PublicQuoteViewTotalWrap';
import { QUOTES_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';
import PublicQuoteItemList from '../components/PublicQuoteItemList';
import PublicQuoteDiscussionList from '../components/PublicQuoteDiscussionList';
import { getPublicAppearanceWithEntoken } from '../../../actions/Appearance';
import PublicQuoteDisscussionWrite from '../components/PublicQuoteDisscussionWrite';
import AcceptBox from './AcceptBox';
import PreviewBanner from './PreviewBanner';
import axios from '../../../util/Api';
import { toast } from 'react-toastify';

class PublicQuoteView extends Component {
   mounted = false;

   constructor(props) {
      super(props);
      this.state = {
         isMounting: true,

         isEditAlertOpen: false,
         isUndoAcceptanceAlertOpen: false,
         isDeclineAlertOpen: false,
         isWithdrawAlertOpen: false,
         isUndoWithdrawAlertOpen: false,

         isManualAcceptBoxShow: false
      };
      this.screenEnd = React.createRef();

   }
   onClickUpdateOnly = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         toast.success('Update – back online, not emailed.');
         this.props.history.push(`/q/${data.entoken}`);
      }).catch(err => {
         toast.error('Quote failed to mark as sent.');
      });
   }
   onClickEditQuote = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "editing" }).then(() => {
         this.props.history.push(`/app/quote/${quoteId}`)
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickSendFollowUp = () => {

   }
   onClickArchive = () => {
      const quoteId = this.props.quote._id;
      if (this.props.quote.state === "archived") {
         axios.put(`/quotes/un-archive/${quoteId}`).then(({ data }) => {
            toast.success('Update – unarchived.')
            this.props.history.push(`/q/${data.entoken}`);
         }).catch(err => {
            toast.error('Quote failed to unarchive.');
         });
      } else {
         axios.put(`/quotes/archive/${quoteId}`).then(({ data }) => {
            toast.success('Update – archived.')
            this.props.history.push(`/q/${data.entoken}`);
         }).catch(err => {
            toast.error('Quote failed to archive.');
         });
      }
   }
   onClickAccept = () => {
      if (this.props.quote.status === "accepted") this.setState({ isUndoAcceptanceAlertOpen: true });
      else {
         this.setState({ isManualAcceptBoxShow: true }, () => {
            this.screenEnd.current.scrollIntoView({ behavior: "smooth" });
         });
      }
   }
   undoAcceptance = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         this.props.history.push(`/q/${data.entoken}`);
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickDecline = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "declined" }).then(({ data }) => {
         this.props.history.push(`/q/${data.entoken}`);
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickWithdraw = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "withdrawn" }).then(({ data }) => {
         this.props.history.push(`/q/${data.entoken}`);
      }).catch(err => {
         console.error("Error during update status :", err)
      });
   }
   onClickUndoWithdrawn = () => {
      const quoteId = this.props.quote._id;
      axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" }).then(({ data }) => {
         this.props.history.push(`/q/${data.entoken}`);
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
   async componentDidMount() {
      this.mounted = true;
      const entoken = this.props.match.params.entoken;
      localStorage.setItem('entoken', entoken);
      const { auth } = this.props;
      if (this.mounted) {
         await this.props.getPublicQuoteWithEntoken();
         await this.props.getPublicAppearanceWithEntoken();
         await this.props.getPublicViewPersonWithEntoken();
         this.setState({ isMounting: false });
         if (auth.authUser) {
            this.props.getTeamMembers();
         }
      }
   }
   render() {
      console.log(" ----------- PublicQuoteView state ------", this.state);
      console.log(" ----------- PublicQuoteView props ------", this.props);
      const { isMounting } = this.state;
      const { location } = this.props;
      const { appearanceSetting, teamSetting, quote } = this.props;
      const { teamMembers } = teamSetting;

      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTES_PATH) linkName = "Quotes";

      const isMember = checkIfTeamMember(quote.author, teamMembers);
      console.error("QUOTE AUTHOR IS TEAM MEMBER ? ", isMember);

      if (isMounting) return <div>loading...</div>;
      else if (this.props.match.path === '/q/:entoken/author-discuss') {
         if (isMember) {
            this.props.setInitUrl(`/q/${this.props.match.params.entoken}`);
            return <Redirect to="/sign-in" />
         } else return <Redirect to={`/q/${this.props.match.params.entoken}`} />
      }
      else return (
         <React.Fragment>
            <main id="main-container">
               <PublicVisiableOnlyAuthTeamMember>
                  <NavCrump>
                     <NavCrumpLeft linkTo={linkTo}>
                        {linkName}
                     </NavCrumpLeft>
                     <NavCrumpRight>
                        <ul className="choices" style={{ left: 45, top: 10 }}>
                           {
                              quote.status === "editing" ?
                                 <React.Fragment>
                                    <li>
                                       <button className="btn-in-action" onClick={this.onClickUpdateOnly}>
                                          <div className="icon-wrapper">
                                             <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm pr-2">
                                             <span>Update Only (don't email)</span>
                                          </div>
                                       </button>
                                    </li>
                                 </React.Fragment>
                                 :
                                 <React.Fragment>
                                    {
                                       quote.status !== "withdrawn" &&
                                       <React.Fragment>
                                          <li>
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
                                          <li>
                                             <button className="btn-in-action" onClick={this.onClickSendFollowUp}>
                                                <div className="icon-wrapper">
                                                   <i className="fa fa-fw fa-paper-plane text-secondary" />
                                                </div>
                                                <div className="media-body font-size-sm pr-2">
                                                   <span>Send Follow-up...</span>
                                                </div>
                                             </button>
                                          </li>
                                       </React.Fragment>
                                    }
                                    <li>
                                       <button className="btn-in-action" onClick={this.onClickArchive}>
                                          <div className="icon-wrapper">
                                             <i className="fa fa-fw fa-archive text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm pr-2">
                                             {
                                                quote.state === "archived" ?
                                                   <span>Archived<span className="choices-undo"> ← undo</span></span>
                                                   : <span>Archive</span>
                                             }
                                          </div>
                                       </button>
                                    </li>
                                    {
                                       quote.status !== "withdrawn" &&
                                       <React.Fragment>
                                          <li>
                                             <button className="btn-in-action" onClick={this.onClickAccept}>
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
                                          <li>
                                             <button className="btn-in-action" onClick={() => {
                                                this.setState({
                                                   isEditAlertOpen: false,
                                                   isUndoAcceptanceAlertOpen: false,
                                                   isDeclineAlertOpen: true,
                                                   isWithdrawAlertOpen: false,
                                                   isUndoWithdrawAlertOpen: false
                                                });
                                             }}>
                                                <div className="icon-wrapper">
                                                   <i className="fa fa-fw fa-minus-circle text-secondary" />
                                                </div>
                                                <div className="media-body font-size-sm pr-2">
                                                   <span>Decline</span>
                                                </div>
                                             </button>
                                          </li>
                                       </React.Fragment>
                                    }
                                    <li>
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
                                 </React.Fragment>
                           }
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

                  <div id="AlerterPage">
                     {
                        this.state.isEditAlertOpen ?
                           <div className="alertBar alertBar-prompt">
                              <div className="container">
                                 <h4>Edit Quote?</h4>
                                 <p>
                                    While editing, the details of this Quote will be hidden from your customer.
                                    <br />
                                    Once saved, <strong>edits cannot be undone</strong>. Consider creating a copy instead (Actions &gt; Copy).
                                 </p>
                                 <div className="btnSet">
                                    <button className="btn btn-secondary mr-2" onClick={this.onClickEditQuote}>Take offline and edit quote</button>
                                    <button className="btn" onClick={() => this.setState({
                                       isEditAlertOpen: false,
                                       isUndoAcceptanceAlertOpen: false,
                                       isDeclineAlertOpen: false,
                                       isWithdrawAlertOpen: false,
                                       isUndoWithdrawAlertOpen: false
                                    })}>Cancel</button>
                                 </div>
                              </div>
                           </div>
                           : null
                     }
                     {
                        this.state.isUndoAcceptanceAlertOpen ?
                           <div className="alertBar alertBar-prompt">
                              <div className="container">
                                 <h4>Undo the Acceptance?</h4>
                                 <ul><li>The Order/reference number and any additional comments <strong>will be removed</strong>.</li></ul>
                                 <div className="btnSet">
                                    <button className="btn btn-secondary mr-2" onClick={this.undoAcceptance}>Undo acceptance</button>
                                    <button className="btn" onClick={() => this.setState({
                                       isEditAlertOpen: false,
                                       isUndoAcceptanceAlertOpen: false,
                                       isDeclineAlertOpen: false,
                                       isWithdrawAlertOpen: false,
                                       isUndoWithdrawAlertOpen: false
                                    })}>Cancel</button>
                                 </div>
                              </div>
                           </div>
                           : null
                     }
                     {
                        this.state.isDeclineAlertOpen ?
                           <div className="alertBar alertBar-prompt">
                              <div className="container">
                                 <h4>Mark as declined?</h4>

                                 <div className="btnSet">
                                    <button className="btn btn-secondary mr-2" onClick={this.onClickDecline}>Decline Quote</button>
                                    <button className="btn" onClick={() => this.setState({
                                       isEditAlertOpen: false,
                                       isUndoAcceptanceAlertOpen: false,
                                       isDeclineAlertOpen: false,
                                       isWithdrawAlertOpen: false,
                                       isUndoWithdrawAlertOpen: false
                                    })}>Cancel</button>
                                 </div>
                              </div>
                           </div>
                           : null
                     }
                     {
                        this.state.isWithdrawAlertOpen ?
                           <div className="alertBar alertBar-prompt">
                              <div className="container">
                                 <h4>Are you sure you want to withdraw this quote?</h4>
                                 <ul>
                                    <li>Quote items and pricing <strong>will be hidden</strong> from your customer’s view.</li>
                                    <li>This quote will <strong>no longer be counted</strong> in your Dashboard stats.</li>
                                 </ul>
                                 <div className="btnSet">
                                    <button className="btn btn-secondary mr-2" onClick={this.onClickWithdraw}>Withdraw Quote</button>
                                    <button className="btn" onClick={() => this.setState({
                                       isEditAlertOpen: false,
                                       isUndoAcceptanceAlertOpen: false,
                                       isDeclineAlertOpen: false,
                                       isWithdrawAlertOpen: false,
                                       isUndoWithdrawAlertOpen: false
                                    })}>Cancel</button>
                                 </div>
                              </div>
                           </div>
                           : null
                     }

                     {
                        this.state.isUndoWithdrawAlertOpen ?
                           <div className="alertBar alertBar-prompt">
                              <div className="container">
                                 <h4>Undo and make available to your customer again?</h4>
                                 <div className="btnSet">
                                    <button className="btn btn-secondary mr-2" onClick={this.onClickUndoWithdrawn}>Undo</button>
                                    <button className="btn" onClick={() => this.setState({
                                       isEditAlertOpen: false,
                                       isUndoAcceptanceAlertOpen: false,
                                       isDeclineAlertOpen: false,
                                       isWithdrawAlertOpen: false,
                                       isUndoWithdrawAlertOpen: false
                                    })}>Cancel</button>
                                 </div>
                              </div>
                           </div>
                           : null
                     }
                  </div>
               </PublicVisiableOnlyAuthTeamMember>

               <div className="quoteCanvas-bg" style={{ backgroundColor: appearanceSetting.colors.background }}>
                  <PublicVisiableOnlyAuthTeamMember>
                     <StatusShowCase />
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
                              <h1 className="quoteCanvas-title">{quote.title}</h1>
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
                              <AcceptBox isManualAcceptBoxShow={this.state.isManualAcceptBoxShow} />
                              <div style={{ float: "left", clear: "both" }} ref={this.screenEnd} />
                              <DeclineCommentShow />

                           </PublicQuoteItemWrapper>
                        </PublicViewFullWrapper>
                     </div>
                     {/* <div className="no_print">
                        <a className="powered-by powered-by-bg" href="http://www.qoutehard.com/">
                           <img className="powered-by-black" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-black-01.png" alt="Quotehard. Simply Smarter Quotes." />
                           <img className="powered-by-white" width={102} src="https://asset.quotientapp.com/image/quote/powered-by-quotient-white-01.png" alt="Quotehard. Simply Smarter Quotes." />
                        </a>
                     </div> */}
                  </div>
               </div>
            </main>
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth, appearanceSetting, teamSetting, mainData }) => {
   return { auth, appearanceSetting, teamSetting, quote: mainData.quote };
}
const mapDispatchToProps = {
   setInitUrl, userSignOut,
   getPublicQuoteWithEntoken, getPublicAppearanceWithEntoken, getPublicViewPersonWithEntoken,
   getTeamMembers
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);