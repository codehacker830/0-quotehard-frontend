import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../components/NavCrump'
import StatusBanner from '../components/StatusBanner'
import ProgressBar from '../components/ProgressBar';
import axios from '../util/Api';
import { toFixedFloat } from '../util';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { toastrErrorConfig, toastrSuccessConfig } from '../util/toastrConfig';
import QuoteItemTotal from '../components/QuoteItemTotal';

class PublicQuoteView extends Component {
   mounted = false;
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super();
      this.state = {
         isLoading: true,
         fileArray: [],
         quote: {},
         commentShow: false,
         privateNoteShow: false,
         questionSectionShow: false
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
            this.props.history.push(`/q/${this.props.match.params}/accepted`);
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
   componentDidMount() {
      this.mounted = true;
      const { entoken } = this.props.match.params;
      console.log("***** entoken ***** ", entoken);
      if (this.mounted) {
         this.setState({ isLoading: true });
         axios.post('/quotes/view-draft', { entoken: entoken })
            .then(({ data }) => {
               console.log("========== res =========", data);
               this.setState({ isLoading: false, quote: data.quote })
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
                                 <p className="mb-0">{this.state.quote.createdAt}</p>
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Valid Until</span>
                                 <p className="mb-0">{this.state.quote.settings.validUntil}</p>
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
                              {
                                 this.props.auth && this.props.auth.authUser ?
                                    <div className="discuss-wrap">
                                       <div className="mb-4">
                                          {/* button wrapper  */}
                                          <div className={`discuss-button-wrap ${this.state.commentShow || this.state.privateNoteShow ? "d-none" : ""}`}>
                                             <button className="btn btn-rounded btn-secondary font-size-sm  px-3 py-2 mr-1" onClick={() => this.setState({ commentShow: true })}>Comment</button>
                                             <button className="btn btn-rounded btn-success font-size-sm px-3 py-2" onClick={() => this.setState({ privateNoteShow: true })}>Private Note</button>
                                          </div>

                                          {/* comment wraper */}
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
                                                name="example-textarea-input"
                                                rows={4}
                                                placeholder="Write comment..."
                                                defaultValue={""} />

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

                                             <ProgressBar percentage={75} />
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
                                                <button className="btn btn-secondary mr-2">Send Comment</button>
                                                <button className="btn btn-alt-secondary" onClick={() => this.setState({ commentShow: false, privateNoteShow: false })}>Cancel</button>
                                             </div>
                                          </div>

                                          {/* private note wraper */}
                                          <div className={`discuss-row discuss-form ${this.state.privateNoteShow ? "" : "d-none"}`}>
                                             <h3>Private Note</h3>
                                             <div className="form-group">
                                                <label htmlFor="sendMode">Send to:</label>
                                                <select className="form-control" id="sendMode" name="sendMode">
                                                   <option value={0}>Add as Private Note only</option>
                                                   <optgroup label="Send email to:">
                                                      <option value={1}>A Devom - note to self</option>
                                                   </optgroup>
                                                </select>
                                             </div>
                                             <textarea
                                                className="form-control mb-2"
                                                name="example-textarea-input"
                                                rows={4}
                                                placeholder="Write private note..."
                                                defaultValue={""} />

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

                                             <ProgressBar percentage={75} />
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
                                                <button className="btn btn-success mr-2">Add Private Note</button>
                                                <button className="btn btn-alt-secondary" onClick={() => this.setState({ commentShow: false, privateNoteShow: false })}>Cancel</button>
                                             </div>
                                             <div className="row no-gutters">
                                                <p>
                                                   Customers will <strong>not</strong> see Private Notes on Quotes.
                                          </p>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    :
                                    <div className="discuss-wrap">
                                       <div className="mb-4">
                                          {/* button wrapper  */}
                                          <div className={`discuss-button-wrap ${this.state.questionSectionShow ? "d-none" : ""}`}>
                                             <button className="btn btn-hero-lg btn-outline-primary mr-1 mb-3" onClick={() => this.setState({ questionSectionShow: true })}>Ask a Question</button>
                                          </div>

                                          {/* question section wraper */}
                                          <div className={`discuss-row discuss-form ${this.state.questionSectionShow ? "" : "d-none"}`}>
                                             <textarea
                                                className="form-control mb-2"
                                                name="example-textarea-input"
                                                rows={4}
                                                placeholder=""
                                                defaultValue={""} />

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

                                             <ProgressBar percentage={75} />
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
                                                <button className="btn btn-secondary mr-2">Submit Question</button>
                                                <button className="btn btn-alt-secondary" onClick={() => this.setState({ questionSectionShow: false })}>Cancel</button>
                                             </div>
                                          </div>
                                       </div>

                                       <div className="bg-acceptBox px-4 py-5">
                                          <div className="form-group">
                                             <label htmlFor="additionalComments">Additional comments</label>
                                             <textarea className="form-control" id="additionalComments" name="additionalComments" rows={4} placeholder="Optional.." defaultValue={""} />
                                          </div>
                                          <div className="form-group">
                                             <label htmlFor="referenceNum">Your order/reference number</label>
                                             <textarea className="form-control" id="referenceNum" name="referenceNum" rows={1} placeholder="Optional.." defaultValue={""} />
                                          </div>
                                          <div className="form-check">
                                             <input className="form-check-input" type="checkbox" defaultValue id="agreeCheck" name="agreeCheck" />
                                             <label className="form-check-label" htmlFor="agreeCheck">Yes, I agree to and accept this quote</label>
                                          </div>
                                          <div className={`mt-4 ${this.state.quote.status === "awaiting" ? "" : "d-none"}`}>
                                             <button type="button" className="btn btn-square btn-hero-primary mr-2" onClick={this.onClickAccept}>Accept Quote</button>
                                             <button type="button" className="btn btn-square btn-hero-secondary" onClick={this.onClickDecline}>Decline</button>
                                          </div>
                                       </div>
                                    </div>
                              }
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
export default connect(mapStateToProps)(PublicQuoteView);