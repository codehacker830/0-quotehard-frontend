import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../components/NavCrump';
import ProgressBar from '../../components/ProgressBar';
import axios from '../../util/Api';
import { checkIfTeamMember, formatDate, formatDateTime, toFixedFloat } from '../../util';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { toastErrorConfig, toastSuccessConfig, toastWarningConfig } from '../../util/toastrConfig';
import QuoteTotal from '../../components/QuoteTotal';
import { setInitUrl, userSignOut } from '../../actions/Auth';
import { getTeamMembers } from '../../actions/Team';
import TextareaAutosize from 'react-autosize-textarea/lib';
import QuoteLogo from './components/QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';
import AttachedFilesShowCase from './components/AttachedFilesShowCase';
import NoteItemList from './components/NoteItemList';
import FullWrapper from './components/FullWrapper';
import QuoteDetailWrapper from './components/QuoteDetailWrapper';
import QuoteItemWrapper from './components/QuoteItemWrapper';
import { SwitchQuoteLayoutClass } from '../../util/index';
import { getPublicQuoteWithEntoken } from '../../actions/Data';
import VisiableOnlyAuthTeamMember from './components/VisiableOnlyAuthTeamMember';
import DeclineCommentShow from './components/DeclineCommentShow_0';
import QuoteViewTotalWrap from './components/QuoteViewTotalWrap';
import { QUOTES_PATH } from '../../constants/PathNames';
import NavCrumpLeft from '../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../components/NavCrump/NavCrumpRight';
import QuoteItemList from './components/QuoteItemList';
import QuoteDiscussionList from './components/QuoteDiscussionList';
import { getPublicAppearanceWithEntoken } from '../../actions/Appearance';
import QuoteDisscussionWrite from './components/QuoteDisscussionWrite';
import AcceptBox from './AcceptBox';

class PublicQuoteView extends Component {
   mounted = false;

   constructor(props) {
      super(props);
      this.state = {
         isMounting: true,
         loading: false,

         quote: {},
         commentShow: false,
         privateNoteShow: false,

         questionSectionShow: false,
         isAgreeChecked: false,

         questionContent: "",
         toMateAccountId: "",
         privateNoteContent: "",
         answerContent: "",

      };

   }

   async componentDidMount() {
      this.mounted = true;
      const entoken = this.props.match.params.entoken;
      localStorage.setItem('entoken', entoken);
      const { auth } = this.props;
      if (this.mounted) {
         await this.props.getPublicQuoteWithEntoken();
         await this.props.getPublicAppearanceWithEntoken();
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
      const { auth, commonData, appearanceSetting, teamSetting, quote } = this.props;
      const { authUser } = auth;
      const { teamMembers } = teamSetting;
      const { discussions } = quote;
      console.log('quote_____', quote)
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTES_PATH) linkName = "Quotes";

      if (isMounting) return <div>loading...</div>;
      else if (this.props.match.path === '/q/:entoken/author-discuss') {
         if (checkIfTeamMember(authUser, teamMembers)) {
            this.props.setInitUrl(`/q/${this.props.match.params.entoken}`);
            // this.props.history.push('/sign-in');
            return <Redirect to="/sign-in" />
         } else return <Redirect to={`/q/${this.props.match.params.entoken}`} />
      }
      else return (
         <React.Fragment>
            <main id="main-container">
               <VisiableOnlyAuthTeamMember>
                  <NavCrump>
                     <NavCrumpLeft linkTo={linkTo}>
                        {linkName}
                     </NavCrumpLeft>
                     <NavCrumpRight>
                        <ul className="choices" style={{ left: 45, top: 10 }}>
                           <li>
                              <button className="btn-in-action">
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-archive text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Archive</span>
                                 </div>
                              </button>
                           </li>
                           <li>
                              <button className="btn-in-action">
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-check text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Accepted<span className="choices-undo"> ← undo</span></span>
                                 </div>
                              </button>
                           </li>
                           <li>
                              <button className="btn-in-action">
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-ban text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Withdraw</span>
                                 </div>
                              </button>
                           </li>
                           <li className="choices-break" />
                           <li>
                              <button className="btn-in-action">
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-copy text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Copy</span>
                                 </div>
                              </button>
                           </li>
                           <li>
                              <button className="btn-in-action">
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-plus-circle text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Copy to Template</span>
                                 </div>
                              </button>
                           </li>
                        </ul>
                     </NavCrumpRight>
                  </NavCrump>
               </VisiableOnlyAuthTeamMember>
               <div className="quoteCanvas-bg" style={{ backgroundColor: appearanceSetting.colors.background }}>

                  <VisiableOnlyAuthTeamMember>
                     <StatusShowCase />
                  </VisiableOnlyAuthTeamMember>

                  <div className={`${SwitchQuoteLayoutClass(appearanceSetting.contactDetailLayout, appearanceSetting.layout)}`}>
                     <div className="quoteCanvas-page">
                        <FullWrapper>
                           <QuoteDetailWrapper>
                              <QuoteLogo />
                              <QuoteDetail quote={quote} />
                           </QuoteDetailWrapper>

                           <QuoteItemWrapper>
                              <h1 className="quoteCanvas-title">{quote.title}</h1>
                              <div id="form_message" />
                              <div className="clear" />

                              <div className="quoteItems">
                                 <QuoteItemList />
                                 <div className="clear" />
                                 <QuoteViewTotalWrap />
                                 <NoteItemList />
                              </div>

                              <div id="discussion" className="discuss-wrap">
                                 <h3 className="quote-discuss-h3">Questions &amp; Answers</h3>
                                 <QuoteDiscussionList />
                                 <div className="clear" />

                                 <QuoteDisscussionWrite />
                              </div>

                              
                              <AcceptBox />

                              <DeclineCommentShow />

                           </QuoteItemWrapper>
                        </FullWrapper>
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

const mapStateToProps = ({ auth, commonData, appearanceSetting, teamSetting, mainData }) => {
   return { auth, commonData, appearanceSetting, teamSetting, quote: mainData.quote };
}
const mapDispatchToProps = { setInitUrl, userSignOut, getPublicQuoteWithEntoken, getPublicAppearanceWithEntoken, getTeamMembers };
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);