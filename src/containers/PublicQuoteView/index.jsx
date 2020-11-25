import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NavCrump from '../../components/NavCrump'
import StatusBanner from './StatusBanner_0'
import ProgressBar from '../../components/ProgressBar';
import axios from '../../util/Api';
import { checkIfTeamMember, formatDate, formatDateTime, toFixedFloat } from '../../util';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { toastErrorConfig, toastSuccessConfig, toastWarningConfig } from '../../util/toastrConfig';
import QuoteItemTotal from '../../components/QuoteItemTotal';
import { setInitUrl, userSignOut } from '../../actions/Auth';
import { getTeamMembers } from '../../actions/Team';
import TextareaAutosize from 'react-autosize-textarea/lib';
import QuoteLogo from './QuoteLogo';
import QuoteDetail from './QuoteDetail';
import StatusShowCase from './StatusShowCase';
import AttachedFilesShowCase from './components/AttachedFilesShowCase';
import NoteItemList from './components/NoteItemList';
import FullWrapper from './components/FullWrapper';
import QuoteDetailWrapper from './components/QuoteDetailWrapper';
import QuoteItemWrapper from './components/QuoteItemWrapper';
import { SwitchQuoteLayoutClass } from '../../util/index';
import { getQuote } from '../../actions/PublicView';
import VisiableOnlyAuthTeamMember from './components/VisiableOnlyAuthTeamMember';
import DeclineCommentShow from './components/DeclineCommentShow';

class PublicQuoteView extends Component {
   mounted = false;
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super(props);
      this.state = {
         isMounting: true,
         loading: false,

         fileArray: [],
         quote: {},
         commentShow: false,
         privateNoteShow: false,
         questionSectionShow: false,
         isAgreeChecked: false,

         questionContent: "",
         commentContent: "",
         toMateAccountId: "",
         privateNoteContent: "",
         answerContent: "",

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
   async componentDidMount() {
      this.mounted = true;
      const entoken = this.props.match.params.entoken;
      localStorage.setItem('entoken', entoken);
      const { auth } = this.props;
      if (this.mounted) {
         await this.props.getQuote();
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
      const { auth, commonData, appearanceSetting, teamSetting, publicView } = this.props;
      const { authUser } = auth;
      const { teamMembers } = teamSetting;
      const { loading, type } = commonData;
      const { quote, discussions } = publicView;

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
                  <React.Fragment>
                     <NavCrump linkTo="/app">
                        Dashboard
                     </NavCrump>
                  </React.Fragment>
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
                                 {
                                    quote.items.map((item, index) => {
                                       if (item.category === "priceItem") {
                                          let isSelected = true;
                                          if (item.priceItem.isMultipleChoice) isSelected = item.priceItem.isChoiceSelected;
                                          if (item.priceItem.isOptional) isSelected = item.priceItem.isOptionSelected;
                                          return (
                                             <div className={`tItem ${isSelected ? "isSelected" : ""}`} key={index}>
                                                <div className="tItem-desc">
                                                   <div className="tItem-desc-table">
                                                      {
                                                         item.priceItem.isMultipleChoice &&
                                                         <div className="tItem-desc-option">
                                                            <input type="checkbox"
                                                               value={item.priceItem.isChoiceSelected}
                                                               onChange={(ev) => {
                                                                  const newItems = [...quote.items];
                                                                  newItems[index].priceItem.isChoiceSelected = !item.priceItem.isChoiceSelected;
                                                                  this.setState({ quote: { ...quote, items: newItems } });
                                                               }}
                                                            />
                                                         </div>
                                                      }
                                                      {
                                                         item.priceItem.isOptional &&
                                                         <div className="tItem-desc-option">
                                                            <input type="radio"
                                                               // name="group"
                                                               value={item.priceItem.isOptionSelected}
                                                               onChange={(ev) => {
                                                                  const newItems = [...quote.items];
                                                                  newItems[index].priceItem.isOptionSelected = !item.priceItem.isOptionSelected;
                                                                  this.setState({ quote: { ...quote, items: newItems } });
                                                               }}
                                                            />
                                                         </div>
                                                      }
                                                      <div className="tItem-desc-cell">
                                                         <p className="item_code">{item.priceItem.itemCode}</p>
                                                         <h3>{item.priceItem.productHeading}</h3>
                                                         <p>{item.priceItem.longDescription}</p>
                                                         <AttachedFilesShowCase files={item.priceItem.files} />
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="tItem-price">
                                                   {
                                                      item.priceItem.isCostPriceMargin &&
                                                      <p className="quote-text-sm text-success">
                                                         {toFixedFloat(item.priceItem.costPrice)}
                                                         <br />
                                                         {item.priceItem.margin}% margin
                                                   </p>
                                                   }

                                                   <p className="quote-text-sm">{item.priceItem.unitPrice}</p>
                                                   {
                                                      item.priceItem.isEditableQuantity ?
                                                         <div className="itemPartEditableWrap">
                                                            <label htmlFor={`chooseQuantity${item._id}`}>
                                                               x <input
                                                                  className="form-control"
                                                                  type="number"
                                                                  value={item.priceItem.quantity}
                                                                  onChange={(ev) => {
                                                                     const newItems = [...quote.items];
                                                                     newItems[index].priceItem.quantity = ev.target.value;
                                                                     newItems[index].priceItem.itemTotal = newItems[index].priceItem.unitPrice * newItems[index].priceItem.quantity;
                                                                     this.setState({ quote: { ...quote, items: newItems } });
                                                                  }}
                                                               />
                                                            </label>
                                                            <label className="quote-text-sm" htmlFor={`chooseQuantity${item._id}`}>Choose quantity</label>
                                                         </div>
                                                         : <p className="quote-text-sm">x {item.priceItem.quantity}</p>
                                                   }
                                                   <p><span className="itemPartItemTotal">{item.priceItem.itemTotal}</span></p>
                                                   <p className="quote-text-sm"><span className="option-text">Not selected</span></p>
                                                </div>
                                             </div>
                                          );
                                       }
                                       else if (item.category === "textItem") return (
                                          <div className="tItem-text" key={index}>
                                             <h3>{item.textItem.textHeading}</h3>
                                             <p>{item.textItem.longDescription}</p>
                                             <AttachedFilesShowCase files={item.textItem.files} />
                                          </div>
                                       );
                                       else if (item.category === "subTotal") return (
                                          <>
                                             <div className="tItem vSubTotal" key={index}>
                                                <div className="tItem-desc">
                                                   <p>
                                                      <span className="quote-text-sm">Options selected</span>
                                                      <br />
                                                Subtotal
                                             </p>
                                                </div>
                                                <div className="tItem-price">
                                                   <p>
                                                      <span className="quote-text-sm">1 of 1</span><br />
                                                      <span>200.00</span>
                                                   </p>
                                                </div>
                                             </div>

                                             {/* <div className="tItem vSubTotal tItemId-43717163">
                                          <div className="tItem-desc">
                                             <p>Subtotal</p>
                                          </div>
                                          <div className="tItem-price">
                                             <p>
                                                <span className="itemPartSubTotal">300.00</span>
                                             </p>
                                          </div>
                                          <div className="clear"> </div>
                                       </div> */}
                                          </>
                                       );
                                    })
                                 }

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
                                 <NoteItemList noteList={quote.notes} />
                              </div>

                              <div id="discussion" className="discuss-wrap">
                                 <h3 className="quote-discuss-h3">Questions &amp; Answers</h3>
                                 {
                                    discussions.map((discussion, index) => {
                                       if (discussion.category === "privateNote") {
                                          if (checkIfTeamMember(authUser, teamMembers)) return (
                                             <div className="discuss-row discuss-row-private" key={index}>
                                                <div className="discuss-bubble">
                                                   <div className="bubble-left avatar-48"
                                                      style={{ backgroundImage: `url(${discussion.privateNote.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"})` }}> </div>
                                                   <div className="bubble-right">
                                                      <div className="discuss-title">
                                                         <span className="label label-green">Private</span>&nbsp; <strong className="util-no-wrap">{discussion.privateNote.author.firstName + " " + discussion.privateNote.author.lastName}&nbsp;</strong>
                                                         <span className="lighter">
                                                            <span className="util-no-wrap">
                                                               <span className="dt-time" data-time="[1605900167,1,1]">{formatDateTime(discussion.privateNote.updatedAt)}</span></span>&nbsp;
                                                         {/* <span className="dt-time" data-time="[1605900207,1,1]"> moments ago</span>&nbsp; */}
                                                            {/* <a className="discuss-edit-a"
                                                         data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2752394&quot;}}"
                                                         href="javascript:void(0)">Edit</a>&nbsp; */}
                                                         </span>
                                                      </div>
                                                      <div className="clear" />
                                                      <div className="discuss-message">
                                                         <p>{discussion.privateNote.content}</p>
                                                         <AttachedFilesShowCase files={discussion.privateNote.files} />
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          );
                                       } else if (discussion.category === "comment") return (
                                          <div className="discuss-row" key={index}>
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
                                                      <AttachedFilesShowCase files={discussion.comment.files} />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       );
                                       else if (discussion.category === "questionAndAnswer") {
                                          const isAnswerAbleUser = authUser && quote && (authUser._id === quote.author._id);
                                          return (
                                             <React.Fragment key={index}>
                                                <div className="discuss-row">
                                                   <div className="discuss-bubble">
                                                      <div className="bubble-left avatar-48"
                                                         style={{ backgroundImage: 'url("https://secure.gravatar.com/avatar/5b790291599408b1b231ae1cf4c7a07a?r=g&s=64&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png")' }}>
                                                      </div>
                                                      <div className="bubble-right">
                                                         <div className="discuss-title">
                                                            <strong className="util-no-wrap">Money Owner&nbsp;</strong>
                                                            <span className="lighter">
                                                               <span className="util-no-wrap"><span className="dt-time" data-time="[1606187569,1,1]">17 minutes ago</span></span>&nbsp;
                                                         </span>
                                                         </div>
                                                         <div className="clear"> </div>
                                                         <div className="discuss-message">
                                                            <p>Is this correct calculation?</p>
                                                            <AttachedFilesShowCase files={discussion.questionAndAnswer.question.files} />
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                                {
                                                   discussion.questionAndAnswer.answer.status === "answered" &&
                                                   <div className="discuss-row">
                                                      <div className="discuss-bubble">
                                                         <div className="bubble-left avatar-48"
                                                            style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128/")' }}>
                                                         </div>
                                                         <div className="bubble-right">
                                                            <div className="discuss-title">
                                                               <strong className="util-no-wrap">Silver Mind&nbsp;</strong>
                                                               <span className="lighter">
                                                                  <span className="util-no-wrap">
                                                                     <span className="dt-time" data-time="[1606188471,1,1]">moments ago</span>
                                                                  </span>&nbsp;
                                                            <a className="discuss-edit-a" data-tg-click="{&quot;clickDiscussEdit&quot;:{&quot;id&quot;:&quot;2757442&quot;}}"
                                                                     href="javascript:void(0)">Edit</a>&nbsp;
                                                            </span>
                                                            </div>
                                                            <div className="clear"> </div>
                                                            <div className="discuss-message">
                                                               <p>yes, it's fair deal</p>
                                                               <AttachedFilesShowCase files={discussion.questionAndAnswer.answer.files} />
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                }
                                                {
                                                   discussion.questionAndAnswer.answer.status === "dismissed" && null
                                                }
                                                {
                                                   discussion.questionAndAnswer.answer.status === "pending" && isAnswerAbleUser &&
                                                   <div className="discuss-row discuss-form discussIsAnswer">
                                                      <input className="discuss-form-prefix" name="postDiscuss[answerIndex0][_prefix]" defaultValue="answerIndex0"
                                                         type="hidden" id="postDiscuss_answerIndex0__prefix" />
                                                      <div className="discuss-bubble">
                                                         {/*div class="bubble-left avatar-48" style="background-image:
                                                   url('https://asset.quotientapp.com/file-s/1/avatar-v2/128/');"> </div*/}
                                                         <div className="bubble-right">
                                                            <div className="bubble-margin">
                                                               <textarea className="form-control" rows={3} name="postDiscuss[answerIndex0][discuss_body]"
                                                                  id="postDiscuss_answerIndex0_discuss_body" style={{ height: 77 }} defaultValue={""} /> </div>
                                                            <div data-tg-control="FileWrap" className="quoteFile-wrap quoteFile-wrap-edit" />
                                                            <div className="clear" />
                                                            <div className="u-file-drop-area">
                                                               <input className="u-file-hidden" data-tg-change="changeDiscussFile" name="file_input" type="file" multiple />
                                                               <div className="u-file-wrap">
                                                                  <button type="button" data-tg-click="clickDiscussFile" className="btn btn-text"><span className="glyphicon glyphicon-paperclip" />&nbsp;Add Image or File</button>
                                                               </div>
                                                            </div>
                                                            <div className="bubble-buttons">
                                                               <input name="postDiscuss[answerIndex0][_answerHash]" defaultValue="5557107-2757399" type="hidden" className id="postDiscuss_answerIndex0__answerHash" /><a href="#trigger:triggerAnswer-answerIndex0" className="btn btn-action btn-lg">Answer Question</a>
                                                               <a className="btn btn-default btn-lg btn-lg-skinny" href="javascript:void(0)" data-tg-click="{&quot;clickPostAction&quot;:[&quot;\/39310\/act-on\/quote-close-question\/5557107-2757399&quot;]}">Dismiss</a>
                                                            </div>
                                                         </div>
                                                      </div>
                                                      <div className="clear"> </div>
                                                   </div>
                                                }
                                             </React.Fragment>
                                          );
                                       }
                                    })
                                 }


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
                                          <input name="accept[email_notify]" defaultValue={1} type="checkbox" id="accept_email_notify" />
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
                                       data-time="[1605901913,1,0]">November 20, 2020 at 9:51PM</span>
                                 </p>
                              </div>

                              <div className="clear" />
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

const mapStateToProps = ({ auth, commonData, appearanceSetting, teamSetting, publicView }) => {
   return { auth, commonData, appearanceSetting, teamSetting, publicView };
}
const mapDispatchToProps = { setInitUrl, userSignOut, getQuote, getTeamMembers };
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);