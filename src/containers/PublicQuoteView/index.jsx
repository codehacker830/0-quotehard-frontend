import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../../components/NavCrump'
import StatusBanner from '../../components/StatusBanner'
import ProgressBar from '../../components/ProgressBar';
import axios from '../../util/Api';
import { formatDate, formatDateTime, toFixedFloat } from '../../util';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { toastrErrorConfig, toastrSuccessConfig, toastrWarningConfig } from '../../util/toastrConfig';
import QuoteItemTotal from '../../components/QuoteItemTotal';
import { setInitUrl, userSignOut } from '../../actions/Auth';
import { getTeammates } from '../../actions/Setting';
import DeclineCommentShow from './components/DeclineCommentShow';

class PublicQuoteView extends Component {
   mounted = false;
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super();
      this.state = {
         isLoading: true,
         teammates: [],
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
      axios.post('/quotes/accept', { entoken: entoken })
         .then(({ data }) => {
            console.log("========== res =========", data);
            toastr.success('Accepted', 'Quote was accepted,', toastrSuccessConfig);
            this.props.history.push(`/q/${entoken}/accepted`);
         })
         .catch(err => {
            console.error(" ========== checking public draft error =========", err);
            toastr.error('Error', 'Failed during quote accept request.,', toastrErrorConfig);
         });
   }
   onClickDecline = () => {
      const { entoken } = this.props.match.params;
      axios.post('/quotes/decline', { entoken: entoken })
         .then(({ data }) => {
            console.log("========== res =========", data);
            toastr.success('Declined', 'Quote was declined,', toastrSuccessConfig);
         })
         .catch(err => {
            console.error(" ========== checking public draft error =========", err);
            toastr.error('Error', 'Failed during quote decline request.,', toastrErrorConfig);
         });
   }

   onClickAddPrivateNote = () => {
      const { privateNoteContent, toMateAccountId } = this.state;
      const { entoken } = this.props.match.params;
      console.log(" privateNoteContent =>", privateNoteContent);
      if (privateNoteContent === "") {
         toastr.warning("Warning", "Private note should not be empty.", toastrWarningConfig);
         return;
      }
      axios.post('/quotes/private-note', { privateNoteContent, toMateAccountId, entoken })
         .then(({ data }) => {
            toastr.success("Succeed", "Private note was submitted.", toastrSuccessConfig);
            console.log(" Private note submit response ==> ", data)
            this.setState({
               discussions: data.discussions,
               privateNoteContent: ""
            });
         })
         .catch(err => {
            console.error("error during submit private note ==>", err);
         });
   }

   onSubmitCommemt = () => {
      const { commentContent } = this.state;
      const { entoken } = this.props.match.params;
      console.log(" commentContent =>", commentContent);
      if (commentContent === "") {
         toastr.warning("Warning", "Comment should not be empty.", toastrWarningConfig);
         return;
      }
      axios.post('/quotes/comment', { commentContent, entoken })
         .then(({ data }) => {
            toastr.success("Succeed", "Comment was submitted.", toastrSuccessConfig);
            console.log(" comment submit response ==> ", data)
            this.setState({
               discussions: data.discussions,
               commentContent: ""
            });
         })
         .catch(err => {
            console.error("error during submit comment ==>", err);
         });
   }
   onSubmitQuestion = () => {
      const { questionContent } = this.state;
      const { entoken } = this.props.match.params;
      if (questionContent === "") {
         toastr.warning("Warning", "Answer content should not be empty.", toastrWarningConfig);
         return;
      }
      axios.post('/quotes/ask-question', { questionContent, entoken })
         .then(({ data }) => {
            toastr.success("Succeed", "Question was submitted.", toastrSuccessConfig);
            this.setState({
               discussions: data.discussions,
               questionContent: ""
            });
         })
         .catch(err => {
            console.error("error during submit question ==>", err);
         });
   }
   onSubmitAnswer = (qaId) => {
      const { answerContent } = this.state;
      const { entoken } = this.props.match.params;
      if (answerContent === "") {
         toastr.warning("Warning", "Answer content should not be empty.", toastrWarningConfig);
         return;
      }
      axios.post('/quotes/answer-question', { answerContent, entoken, qaId })
         .then(({ data }) => {
            toastr.success("Succeed", "Answer was submitted.", toastrSuccessConfig);
            this.setState({
               discussions: data.discussions,
               answerContent: ""
            });
         })
         .catch(err => {
            console.error("error during submit answer ==>", err);
         });
   }
   onSubmitDismiss = (qaId) => {
      const { entoken } = this.props.match.params;
      axios.post('/quotes/dismiss', { entoken, qaId })
         .then(({ data }) => {
            toastr.success("Succeed", "Answer was dismissed.", toastrSuccessConfig);
            this.setState({
               discussions: data.discussions,
               answerContent: ""
            });
         })
         .catch(err => {
            console.error("error during submit dismiss ==>", err);
         });
   }
   componentDidMount() {
      this.mounted = true;
      const entoken = this.props.match.params.entoken;
      console.log("***** entoken ***** ", entoken);
      if (this.mounted) {
         this.setState({ isLoading: true });

         axios.post('/quotes/view-draft', { entoken })
            .then(({ data }) => {
               console.log("========== Publick overview did mount get quote =========", data);
               this.setState({
                  isLoading: false,
                  quote: data.quote,
                  discussions: data.quote.discussions ? data.quote.discussions : []
               });
               if (this.props.auth.authUser) {
                  axios.get('/teammates').then((res) => {
                     console.log("get teammates api response ============>", res.data.teammates)
                     this.setState({ teammates: res.data.teammates });
                     if (this.props.match.path === '/q/:entoken' || this.props.match.path === '/q/:entoken/author-discuss') {
                        const me = res.data.teammates.find(mate => mate._id === this.props.auth.authUser._id);
                        if (me) {
                           console.log(" this user is Eligible %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                           this.setState({ isPrivateEligible: true });
                        } else {
                           this.props.setInitUrl(`/q/${entoken}`);
                           this.props.history.push('/sign-in');
                        }
                     }
                  }).catch(err => {
                     console.error("error during get teammates ==>", err);
                     this.props.setInitUrl(`/q/${entoken}`);
                     this.props.userSignOut;
                  });
               }

            })
            .catch(err => {
               console.error(" ========== checking public draft error =========", err);
            });

      }
   }
   render() {
      console.log(" ----------- PublicQuoteView state ------", this.state);
      console.log(" ----------- PublicQuoteView props ------", this.props);
      if (this.state.isLoading) return null;
      else return (
         <React.Fragment>
            <main id="main-container" className="bg-white">
               {
                  this.props.auth && this.props.auth.authUser ?
                     <React.Fragment>
                        <NavCrump linkTo="/app">
                           Dashboard
                        </NavCrump>
                        <StatusBanner quote={this.state.quote} />
                     </React.Fragment>
                     : null
               }

               <div className="content content-full h-100">
                  <div className="row no-gutters">
                     <div className="px-3 py-5 mx-auto w-100 maxWidth-920">
                        <div className="row no-gutters mb-4">
                           <img title="..." alt="..." src="https://asset.quotientapp.com/file-s/1/logo-v3/38216/e17c79cff88b12263507ecb3f94b9b54" />
                        </div>


                        <div className="row no-gutters mb-4">
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              <span className="text-gray fa-xs text-uppercase">From</span>
                              {this.state.quote.settings.userFrom ?
                                 <React.Fragment>
                                    <p className="mb-0"> {this.state.quote.settings.userFrom.firstName} {this.state.quote.settings.userFrom.lastName}</p>
                                    {
                                       this.state.quote.settings.userFrom.accountCompany ?
                                          <p className="mb-0">{this.state.quote.settings.userFrom.accountCompany.companyName}</p>
                                          : null
                                    }
                                 </React.Fragment>
                                 : null
                              }
                           </div>
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              {this.state.quote.toPeopleList.map((person, index) => {
                                 return (
                                    <React.Fragment key={index}>
                                       {
                                          person.company ?
                                             <div className="mb-1">
                                                <span className="text-gray fa-xs text-uppercase">For</span>
                                                <Link className="d-block" to={`/app/c/contacts/view/${person.company._id}`}>{person.company.companyName}</Link>
                                             </div>
                                             : null
                                       }
                                       <div className="mb-1">
                                          <span className="text-gray fa-xs text-uppercase">{index === 0 ? `To` : `Copy To`}</span>
                                          <Link className="d-block" to={`/app/c/contacts/view/${person._id}`}>{person.firstName} {person.lastName}</Link>
                                       </div>
                                    </React.Fragment>
                                 );
                              })}

                              {/* <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Copy To</span>
                                 <Link className="d-block" to={`/app/c/contacts/view/${person._id}`}>Jack Wang</Link>
                              </div> */}
                           </div>
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Quote Number</span>
                                 <p className="mb-0">{this.state.quote.items.length}</p>
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Date</span>
                                 <p className="mb-0">{formatDate(this.state.quote.createdAt)}</p>
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Valid Until</span>
                                 <p className="mb-0">{formatDate(this.state.quote.settings.validUntil)}</p>
                              </div>
                           </div>
                        </div>
                        {/* Full Quote detail Wrapper */}
                        <div className="mb-4">

                           {/* Quote title */}
                           <div className="row no-gutters border-bottom">
                              <div className="p-3">
                                 <h2 className="mb-0">{this.state.quote.title}</h2>
                              </div>
                           </div>

                           <div className="quoteItems">
                              {/* Quote with images */}
                              {
                                 this.state.quote.items.map((item, index) => {
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
                                                               const newItems = [...this.state.quote.items];
                                                               newItems[index].priceItem.isChoiceSelected = !item.priceItem.isChoiceSelected;
                                                               this.setState({ quote: { ...this.state.quote, items: newItems } });
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
                                                               const newItems = [...this.state.quote.items];
                                                               newItems[index].priceItem.isOptionSelected = !item.priceItem.isOptionSelected;
                                                               this.setState({ quote: { ...this.state.quote, items: newItems } });
                                                            }}
                                                         />
                                                      </div>
                                                   }
                                                   <div className="tItem-desc-cell">
                                                      <p className="item_code">{item.priceItem.itemCode}</p>
                                                      <h3>{item.priceItem.productHeading}</h3>
                                                      <p>{item.priceItem.longDescription}</p>
                                                      <div className="quoteFile-set">
                                                         {
                                                            item.priceItem.files.map((file, ind) => (
                                                               <div className="quoteFile-image" key={ind}>
                                                                  <img
                                                                     src="https://asset.quotientapp.com/file-s/1/quote-v2/38216/9249b88c558b4d3760e13b5a16fc315f/sm/ds/16e327281984e2fbf130376337032601.jpg"
                                                                     alt="..." />
                                                               </div>
                                                            ))
                                                         }
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="tItem-price">
                                                {
                                                   item.priceItem.isCostPriceMargin &&
                                                   <p className="quote-text-sm text-success">
                                                      {toFixedFloat(item.priceItem.costPrice)}<br />
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
                                                                  const newItems = [...this.state.quote.items];
                                                                  newItems[index].priceItem.quantity = ev.target.value;
                                                                  newItems[index].priceItem.itemTotal = newItems[index].priceItem.unitPrice * newItems[index].priceItem.quantity;
                                                                  this.setState({ quote: { ...this.state.quote, items: newItems } });
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
                                          <div className="quoteFile-set">
                                             {
                                                item.textItem.files.map((file, ind) => (
                                                   <div className="quoteFile-image" key={ind}>
                                                      <img src="https://asset.quotientapp.com/file-s/1/quote-v2/38216/354a172205cbcc91c6e7359c8e886ede/sm/ds/496852.jpg"
                                                         alt="..." />
                                                   </div>
                                                ))
                                             }
                                          </div>
                                       </div>
                                    );
                                    else if (item.category === "subTotal") return (
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
                                    );
                                 })
                              }



                              {/* ****************************** */}
                              {/* Quote subtotal */}
                              {/* <div className="tItem vSubTotal">
                                 <div className="tItem-desc">
                                    <p>Subtotal</p>
                                 </div>
                                 <div className="tItem-price">
                                    <p>
                                       <span>100.00</span>
                                    </p>
                                 </div>
                              </div> */}
                              {/* Quote total */}
                              <div className="quoteViewTotalWrap pt-3">
                                 <QuoteItemTotal settings={this.state.quote.settings} items={this.state.quote.items} />

                                 {/* <table className={`quoteTotal hasTerm table table-borderless`}>
                                    <tbody>
                                       <tr className="options">
                                          <td className="total-desc">
                                             <p className="quote-text-sm">
                                                <span>Options selected</span>
                                             </p>
                                          </td>
                                          <td className="total-price">
                                             <p className="quote-text-sm">1 of 1</p>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="total-desc">Subtotal</td>
                                          <td className="total-price">100.00</td>
                                       </tr>
                                       <tr className="total">
                                          <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                                          <td className="total-price"><span className="quoteTotal-gTotal">$100.00</span>
                                             <div className="quote-text-sm">per week</div>
                                             <div className="quote-text-sm">(for 4 weeks)</div>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table> */}

                                 {/* Has No Subscription QuoteTotal */}
                                 {/* <table className="quoteTotal hasNoTerm table table-borderless">
                                    <tbody>
                                       <tr className="options">
                                          <td className="total-desc">
                                             <p className="quote-text-sm"><span>Options selected</span></p>
                                          </td>
                                          <td className="total-price">
                                             <p className="quote-text-sm">2 of 4</p>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="total-desc">Subtotal</td>
                                          <td className="total-price">900.00</td>
                                       </tr>
                                       <tr className={`tProfit`}>
                                          <td className="total-desc">Total margin 20%</td>
                                          <td className="total-price">100.00</td>
                                       </tr>
                                       <tr>
                                          <td className="total-desc">Tax 10%</td>
                                          <td className="total-price">80.00</td>
                                       </tr>
                                       <tr className="total">
                                          <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                                          <td className="total-price">
                                             <span className="quoteTotal-gTotal">$980.00</span>
                                             <p className="quote-text-sm">per week</p>
                                             <p className="quote-text-sm">(for 4 weeks)</p>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table> */}
                                 {/* ******************************* */}



                                 {/* Here is notes */}
                                 {
                                    this.state.quote.notes.map((note, index) => {
                                       return (
                                          <div className="tItem-text" key={index}>
                                             <h3>{note.textItem.textHeading}</h3>
                                             <p>{note.textItem.longDescription}</p>
                                          </div>
                                       );
                                    })
                                 }
                              </div>


                              {/* Discussion or Question Section */}

                              {/* show QA records */}
                              {/* <div className={`mb-4 ${this.state.discussions.length ? "" : "d-none"}`}> */}
                              <div className={`mb-4 `}>
                                 <h3 className="py-3 border-bottom mx-4">Questions & Answers</h3>
                                 {
                                    this.state.discussions.map((discussion, index) => {
                                       if (discussion.category === "privateNote") {
                                          if (this.state.isPrivateEligible) return (
                                             <div className="discuss-row discuss-form mb-3 d-flex" key={index}>
                                                <img className="avatar-48 mr-3 mb-2" src={discussion.privateNote.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                                                <div className="border-green-left pl-3">
                                                   <div className="row no-gutters mb-1">
                                                      <span className="badge badge-success my-auto mr-2 text-uppercase">private</span>
                                                      <span className="font-w700 text-black mr-2">{discussion.privateNote.author.firstName + " " + discussion.privateNote.author.lastName}</span>
                                                      <span className="font-w400 text-secondary">{formatDateTime(discussion.privateNote.updatedAt)}</span>
                                                   </div>
                                                   <div className="row no-gutters">
                                                      <span className="text-black">{discussion.privateNote.content}</span>
                                                   </div>
                                                </div>
                                             </div>
                                          );
                                       }
                                       else if (discussion.category === "comment") return (
                                          <div className="discuss-row discuss-form mb-3 d-flex" key={index}>
                                             <img className="avatar-48 mr-3 mb-2" src={discussion.comment.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                                             <div className="">
                                                <div className="row no-gutters mb-1">
                                                   <span className="font-w700 text-black mr-2">{discussion.comment.author.firstName + " " + discussion.comment.author.lastName}</span>
                                                   <span className="font-w400 text-secondary">{formatDateTime(discussion.comment.updatedAt)}</span>
                                                </div>
                                                <div className="row no-gutters">
                                                   <span className="text-black">{discussion.comment.content}</span>
                                                </div>
                                             </div>
                                          </div>
                                       );
                                       else if (discussion.category === "questionAndAnswer") {
                                          const isAnswerAbleUser = this.props.auth.authUser && this.state.quote && (this.props.auth.authUser._id === this.state.quote.author._id);
                                          return (
                                             <React.Fragment key={index}>
                                                <div className="discuss-row discuss-form mb-3 d-flex">
                                                   <img className="avatar-48 mr-3 mb-2" src={discussion.questionAndAnswer.question.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                                                   <div className="">
                                                      <div className="row no-gutters mb-1">
                                                         <span className="font-w700 text-black mr-2">{discussion.questionAndAnswer.question.author.firstName + " " + discussion.questionAndAnswer.question.author.lastName}</span>
                                                         <span className="font-w400 text-secondary">{formatDateTime(discussion.questionAndAnswer.question.updatedAt)}</span>
                                                      </div>
                                                      <div className="row no-gutters">
                                                         <span className="text-black">{discussion.questionAndAnswer.question.content}</span>
                                                      </div>
                                                   </div>
                                                </div>
                                                {
                                                   discussion.questionAndAnswer.answer.status === "answered" &&
                                                   <div className="discuss-row discuss-form mb-3 d-flex">
                                                      <img className="avatar-48 mr-3 mb-2" src={discussion.questionAndAnswer.answer.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                                                      <div className="">
                                                         <div className="row no-gutters mb-1">
                                                            <span className="font-w700 text-black mr-2">{discussion.questionAndAnswer.answer.author.firstName + " " + discussion.questionAndAnswer.answer.author.lastName}</span>
                                                            <span className="font-w400 text-secondary">{formatDateTime(discussion.questionAndAnswer.answer.updatedAt)}</span>
                                                         </div>
                                                         <div className="row no-gutters">
                                                            <span className="text-black">{discussion.questionAndAnswer.answer.content}</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                }
                                                {
                                                   discussion.questionAndAnswer.answer.status === "dismissed" && null
                                                }
                                                {
                                                   discussion.questionAndAnswer.answer.status === "pending" && isAnswerAbleUser &&
                                                   <div className="discuss-row discuss-form">
                                                      <textarea
                                                         className="form-control mb-2"
                                                         name="example-textarea-input"
                                                         rows={4}
                                                         state={this.state.answerContent}
                                                         onChange={(ev) => this.setState({ answerContent: ev.target.value })} />

                                                      {/* Images preview section */}
                                                      <div className="row m-1">
                                                         {(this.state.fileArray || []).map((url, index) => (
                                                            <div className="p-1" key={index}>
                                                               <img src={url} className="mr-2 image-preview-size" alt="..." />
                                                               <button className="btn btn-sm btn-light" onClick={() => this.removeImageItem(url)}>
                                                                  <i className="fa fa-times-circle"></i>
                                                               </button>
                                                            </div>
                                                         ))}
                                                      </div>

                                                      {/* <ProgressBar percentage={75} /> */}
                                                      <input type="file"
                                                         ref={this.hiddenFileInput}
                                                         onChange={this.uploadMultipleFiles}
                                                         className="d-none"
                                                         multiple
                                                      />
                                                      <button className="btn btn-hero-sm btn-square btn-outline-warning w-100 p-3"
                                                         onClick={this.handleClickFileOpen}
                                                      >
                                                         <i className="si si-paper-clip fa-fw mr-1"></i>
                                                      Add Image or File
                                                      </button>
                                                      <div className="row no-gutters mt-3">
                                                         <button className="btn btn-secondary mr-2" onClick={() => this.onSubmitAnswer(discussion._id)}>Answer Question</button>
                                                         <button className="btn btn-alt-secondary" onClick={() => this.onSubmitDismiss(discussion._id)}>Dismiss</button>
                                                      </div>
                                                   </div>
                                                }
                                             </React.Fragment>
                                          );
                                       }
                                    })
                                 }
                              </div>
                              {
                                 this.props.auth.authUser && this.state.quote && (this.props.auth.authUser._id === this.state.quote.author._id) ?
                                    <div className="discuss-wrap mb-4">
                                       {/* controller button wrapper  */}
                                       <div className={`discuss-button-wrap ${this.state.commentShow || this.state.privateNoteShow ? "d-none" : ""}`}>
                                          <button className="btn btn-sm btn-dark font-size-sm px-2 py-1 mr-2" onClick={() => this.setState({ commentShow: true })}>Comment</button>
                                          <button className="btn btn-sm btn-success font-size-sm px-2 py-1" onClick={() => this.setState({ privateNoteShow: true })}>Private Note</button>
                                       </div>

                                       {/* ------------------- comment wraper ----------------------- */}
                                       <div className={`discuss-row discuss-form ${this.state.commentShow ? "" : "d-none"}`}>
                                          <p>Send email to:</p>
                                          <h3>
                                             {this.state.quote.toPeopleList.map((person, index) => {
                                                return (
                                                   <span className="mr-2" key={index}>{person.firstName} {person.lastName},</span>
                                                );
                                             })}
                                          </h3>
                                          <textarea
                                             className="form-control mb-2"
                                             name="comment-content-input"
                                             rows={4}
                                             placeholder="Write comment..."
                                             value={this.state.commentContent}
                                             onChange={(ev) => this.setState({ commentContent: ev.target.value })}
                                          />

                                          {/* Images preview section */}
                                          <div className="row m-1">
                                             {(this.state.fileArray || []).map((url, index) => (
                                                <div className="p-1">
                                                   <img src={url} className="mr-2 image-preview-size" alt="..." />
                                                   <button className="btn btn-sm btn-light" onClick={() => this.removeImageItem(url)}>
                                                      <i className="fa fa-times-circle"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>

                                          {/* <ProgressBar percentage={75} /> */}
                                          <input type="file"
                                             ref={this.hiddenFileInput}
                                             onChange={this.uploadMultipleFiles}
                                             className="d-none"
                                             multiple
                                          />
                                          <button className="btn btn-hero-sm btn-square btn-outline-warning w-100 p-3"
                                             onClick={this.handleClickFileOpen}
                                          >
                                             <i className="si si-paper-clip fa-fw mr-1"></i>
                                                Add Image or File
                                             </button>
                                          <div className="row no-gutters mt-3">
                                             <button className="btn btn-secondary mr-2" onClick={this.onSubmitCommemt}>Send Comment</button>
                                             <button className="btn btn-alt-secondary" onClick={() => this.setState({ commentShow: false, privateNoteShow: false })}>Cancel</button>
                                          </div>
                                       </div>

                                       {/* --------------------- private note wraper --------------------------- */}
                                       <div className={`discuss-row discuss-form ${this.state.privateNoteShow ? "" : "d-none"}`}>
                                          <h3>Private Note</h3>
                                          <div className="form-group">
                                             <label htmlFor="sendMode">Send to:</label>
                                             <select className="form-control" id="sendMode" name="sendMode"
                                                value={this.state.toMateAccountId}
                                                onChange={(ev) => this.setState({ toMateAccountId: ev.target.value })}
                                             >
                                                <option value={""}>Add as Private Note only</option>
                                                {
                                                   (this.state.teammates.length > 0) &&
                                                   <optgroup label="Send email to:">
                                                      {
                                                         this.state.teammates.map((mate, index) => {
                                                            const mateFullName = mate.firstName + " " + mate.lastName;
                                                            const isMe = mate._id === this.props.auth.authUser._id;
                                                            return (<option value={mate._id} key={index}>{mateFullName} {isMe ? "- note to self" : ""}</option>);
                                                         })
                                                      }
                                                   </optgroup>
                                                }

                                             </select>
                                          </div>
                                          <textarea
                                             className="form-control mb-2"
                                             name="example-textarea-input"
                                             rows={4}
                                             placeholder="Write private note..."
                                             value={this.state.privateNoteContent}
                                             onChange={(ev) => this.setState({ privateNoteContent: ev.target.value })}
                                          />

                                          {/* Images preview section */}
                                          <div className="row m-1">
                                             {(this.state.fileArray || []).map((url, index) => (
                                                <div className="p-1" key={index}>
                                                   <img src={url} className="mr-2 image-preview-size" alt="..." />
                                                   <button className="btn btn-sm btn-light" onClick={() => this.removeImageItem(url)}>
                                                      <i className="fa fa-times-circle"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>

                                          {/* <ProgressBar percentage={75} /> */}
                                          <input type="file"
                                             ref={this.hiddenFileInput}
                                             onChange={this.uploadMultipleFiles}
                                             className="d-none"
                                             multiple
                                          />
                                          <button className="btn btn-hero-sm btn-square btn-outline-warning w-100 p-3"
                                             onClick={this.handleClickFileOpen}
                                          >
                                             <i className="si si-paper-clip fa-fw mr-1"></i>
                                                Add Image or File
                                             </button>
                                          <div className="row no-gutters my-3">
                                             <button className="btn btn-success mr-2" onClick={this.onClickAddPrivateNote}>Add Private Note</button>
                                             <button className="btn btn-alt-secondary" onClick={() => this.setState({ commentShow: false, privateNoteShow: false })}>Cancel</button>
                                          </div>
                                          <div className="row no-gutters">
                                             <p>Customers will <strong>not</strong> see Private Notes on Quotes.</p>
                                          </div>
                                       </div>
                                    </div>
                                    :
                                    <div className="discuss-wrap">
                                       <div className="mb-4">
                                          {/* question button wrapper  */}
                                          <div className={`discuss-button-wrap ${this.state.questionSectionShow ? "d-none" : ""}`}>
                                             <button className="btn btn-hero-lg btn-outline-primary mr-1 mb-3" onClick={() => this.setState({ questionSectionShow: true })}>Ask a Question</button>
                                          </div>

                                          {/* --------------------- question section wraper ------------------------ */}
                                          <div className={`discuss-row discuss-form ${this.state.questionSectionShow ? "" : "d-none"}`}>
                                             <textarea
                                                className="form-control mb-2"
                                                name="example-textarea-input"
                                                rows={4}
                                                value={this.state.questionContent}
                                                onChange={(ev) => this.setState({ questionContent: ev.target.value })} />

                                             {/* Images preview section */}
                                             <div className="row m-1">
                                                {(this.state.fileArray || []).map((url, index) => (
                                                   <div className="p-1">
                                                      <img src={url} className="mr-2 image-preview-size" alt="..." />
                                                      <button className="btn btn-sm btn-light" onClick={() => this.removeImageItem(url)}>
                                                         <i className="fa fa-times-circle"></i>
                                                      </button>
                                                   </div>
                                                ))}
                                             </div>

                                             {/* <ProgressBar percentage={75} /> */}
                                             <input type="file"
                                                ref={this.hiddenFileInput}
                                                onChange={this.uploadMultipleFiles}
                                                className="d-none"
                                                multiple
                                             />
                                             <button className="btn btn-hero-sm btn-square btn-outline-warning w-100 p-3"
                                                onClick={this.handleClickFileOpen}
                                             >
                                                <i className="si si-paper-clip fa-fw mr-1"></i>
                                                Add Image or File
                                             </button>
                                             <div className="row no-gutters mt-3">
                                                <button className="btn btn-secondary mr-2" onClick={this.onSubmitQuestion}>Submit Question</button>
                                                <button className="btn btn-alt-secondary" onClick={() => this.setState({ questionSectionShow: false })}>Cancel</button>
                                             </div>
                                          </div>
                                       </div>

                                       {/* ------------------------- Additional comments and accept/decline section ------------------------------- */}
                                       {
                                          this.state.quote.status !== "declined" &&
                                          <div className="bg-acceptBox px-4 py-5">
                                             <div className="form-group">
                                                <label htmlFor="additionalComments">Additional comments</label>
                                                <div className={`float-right ${this.state.quote.status === "accepted" ? "" : "d-none"}`}>
                                                   <span className="badge badge-primary px-3 py-1 ml-1 text-uppercase">Accepted</span>
                                                </div>
                                                <textarea className="form-control" id="additionalComments" name="additionalComments" rows={4} placeholder="Optional.." defaultValue={""} />

                                             </div>
                                             <div className="form-group">
                                                <label htmlFor="referenceNum">Your order/reference number</label>
                                                <textarea className="form-control" id="referenceNum" name="referenceNum" rows={1} placeholder="Optional.." defaultValue={""} />
                                             </div>
                                             <div className={`form-check ${this.state.quote.status === "accepted" ? "d-none" : ""}`}>
                                                <input className="form-check-input" type="checkbox"
                                                   checked={this.state.isAgreeChecked}
                                                   id="agreeCheck" name="agreeCheck"
                                                   onChange={() => this.setState({ isAgreeChecked: !this.state.isAgreeChecked })}
                                                />
                                                <label className="form-check-label" htmlFor="agreeCheck">Yes, I {`my full name`} agree to and accept this quote</label>
                                             </div>
                                             <div className={`form-check ${this.state.quote.status === "accepted" ? "" : "d-none"}`}>
                                                <input className="form-check-input" type="checkbox"
                                                   defaultChecked
                                                   id="agreeCheckAccepted" name="agreeCheckAccepted"
                                                   disabled
                                                />
                                                <label className="form-check-label" htmlFor="agreeCheckAccepted">Yes, {`my full name`} I agree to and accept this quote</label>
                                             </div>
                                             <div className={`mt-4 ${this.state.quote.status === "awaiting" ? "" : "d-none"}`}>
                                                <button type="button" className="btn btn-square btn-hero-primary mr-2" disabled={!this.state.isAgreeChecked} onClick={this.onClickAccept}>Accept Quote</button>
                                                <button type="button" className="btn btn-square btn-hero-secondary" onClick={this.onClickDecline}>Decline</button>
                                             </div>
                                          </div>
                                       }

                                    </div>
                              }
                              <DeclineCommentShow quote={this.state.quote} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth }) => {
   return { auth };
}
const mapDispatchToProps = { setInitUrl, userSignOut, getTeammates };
export default connect(mapStateToProps, mapDispatchToProps)(PublicQuoteView);