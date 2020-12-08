import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump';
import ProgressBar from '../../../components/ProgressBar';
import { checkIfTeamMember, formatDate, formatDateTime, toFixedFloat } from '../../../util';
import { connect } from 'react-redux';
import { getPublicViewPersonWithEntoken, setInitUrl, userSignOut } from '../../../actions/Auth';
import { getTeamMembers } from '../../../actions/Team';
import TextareaAutosize from 'react-autosize-textarea/lib';
import QuoteLogo from '../components/QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';
import AttachedFilesShowCase from '../components/AttachedFilesShowCase';
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

      if (isMounting) return <div>loading...</div>;
      else if (this.props.match.path === '/q/:entoken/author-discuss') {
         if (checkIfTeamMember(quote.author, teamMembers)) {
            this.props.setInitUrl(`/q/${this.props.match.params.entoken}`);
            return <Redirect to="/sign-in" />
         }
         else return <Redirect to={`/q/${this.props.match.params.entoken}`} />
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
               </PublicVisiableOnlyAuthTeamMember>
               <div className="quoteCanvas-bg" style={{ backgroundColor: appearanceSetting.colors.background }}>

                  <PublicVisiableOnlyAuthTeamMember>
                     <StatusShowCase />
                  </PublicVisiableOnlyAuthTeamMember>

                  <div className={`${SwitchQuoteLayoutClass(appearanceSetting.contactDetailLayout, appearanceSetting.layout)}`}>
                     <div className="quoteCanvas-page">
                        <PublicViewFullWrapper>
                           <PublicQuoteDetailWrapper>
                              <QuoteLogo />
                              <QuoteDetail quote={quote} />
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
                                 <h3 className="quote-discuss-h3">Questions &amp; Answers</h3>
                                 <PublicQuoteDiscussionList />
                                 <div className="clear" />

                                 <PublicQuoteDisscussionWrite />
                              </div>
                              <AcceptBox />
                              <DeclineCommentShow />
                           </PublicQuoteItemWrapper>
                        </PublicViewFullWrapper>
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

const mapStateToProps = ({ auth, appearanceSetting, teamSetting, mainData }) => {
   return { auth, appearanceSetting, teamSetting, quote: mainData.quote };
}
const mapDispatchToProps = {
   setInitUrl, userSignOut,
   getPublicQuoteWithEntoken, getPublicAppearanceWithEntoken, getPublicViewPersonWithEntoken,
   getTeamMembers
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);