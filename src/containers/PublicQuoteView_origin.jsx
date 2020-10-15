import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../components/NavCrump'
import StatusBanner from '../components/StatusBanner'
import ProgressBar from '../components/ProgressBar';

class PublicQuoteView extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super();
      this.state = {
         fileArray: []
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
   render() {
      return (
         <React.Fragment>
            <main id="main-container" className="bg-white">
               <NavCrump linkTo="/app">
                  Dashboard
               </NavCrump>
               <StatusBanner />
               <div className="content content-full h-100">
                  <div className="row no-gutters">
                     <div className="px-3 py-5 mx-auto w-100 maxWidth-920">
                        <div className="row no-gutters mb-4">
                           <img title="..." alt="..." src="https://asset.quotientapp.com/file-s/1/logo-v3/38216/e17c79cff88b12263507ecb3f94b9b54" />
                        </div>


                        <div className="row no-gutters mb-4">
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              <span className="text-gray fa-xs text-uppercase">From</span>
                              <p className="mb-0">A Devom</p>
                              <p className="mb-0">CodeNetflix</p>
                           </div>
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">For</span>
                                 <Link className="d-block" to={`/app/c/contacts/view/4143283`}>Raff Company</Link>
                                 {/* <p className="mb-0">Raff Company</p> */}
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">To</span>
                                 <Link className="d-block" to={`/app/c/contacts/view/4143283`}>Danil Zolo</Link>
                                 {/* <p className="mb-0">Danil Zolo</p> */}
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Copy To</span>
                                 <Link className="d-block" to={`/app/c/contacts/view/4143283`}>Jack Wang</Link>
                                 {/* <p className="mb-0">Danil Zolo</p> */}
                              </div>
                           </div>
                           <div className="col-md-4 col-sm-12 border-left px-3 py-1">
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Quote Number</span>
                                 <p className="mb-0">4</p>
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Date</span>
                                 <p className="mb-0">September 7, 2020</p>
                              </div>
                              <div className="mb-1">
                                 <span className="text-gray fa-xs text-uppercase">Valid Until</span>
                                 <p className="mb-0">December 6, 2020 at 1:03PM</p>
                              </div>
                           </div>
                        </div>
                        {/* Full Quote detail Wrapper */}
                        <div className="mb-4">

                           {/* Quote title */}
                           <div className="row no-gutters border-bottom">
                              <div className="p-3">
                                 <h2 className="mb-0">Title of Quote</h2>
                              </div>
                           </div>

                           <div className="quoteItems">
                              {/* Quote item 1 */}
                              <div className="tItem isSelected">
                                 <div className="tItem-desc">
                                    <div className="tItem-desc-table">
                                       <div className="tItem-desc-cell">
                                          <p className="item_code">111</p>
                                          <h3>Service 1</h3>
                                          <p>description 1</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tItem-price">
                                    <p className="quote-text-sm">10.00</p>
                                    <p className="quote-text-sm">x 10</p>
                                    <p>
                                       <span className="itemPartItemTotal">100.00</span>
                                    </p>
                                 </div>
                              </div>

                              {/* Quote subtotal */}
                              <div className="tItem vSubTotal">
                                 <div className="tItem-desc">
                                    <p>Subtotal</p>
                                 </div>
                                 <div className="tItem-price">
                                    <p>
                                       <span>100.00</span>
                                    </p>
                                 </div>
                              </div>

                              {/* Quote with images */}
                              <div className="tItem isSelected">
                                 <div className="tItem-desc">
                                    <div className="tItem-desc-table">
                                       <div className="tItem-desc-cell">
                                          <p className="item_code">222</p>
                                          <h3>Service 2</h3>
                                          <p>description 2 ...</p>
                                          <div className="quoteFile-set">

                                             {/* image 1 */}
                                             <div className="quoteFile-image">
                                                <img
                                                   src="https://asset.quotientapp.com/file-s/1/quote-v2/38216/9249b88c558b4d3760e13b5a16fc315f/sm/ds/16e327281984e2fbf130376337032601.jpg"
                                                   alt="16e327281984e2fbf130376337032601.jpg" />
                                             </div>
                                             {/* image 2 */}
                                             <div className="quoteFile-image">
                                                <img
                                                   src="https://asset.quotientapp.com/file-s/1/quote-v2/38216/9249b88c558b4d3760e13b5a16fc315f/sm/ds/16e327281984e2fbf130376337032601.jpg"
                                                   alt="16e327281984e2fbf130376337032601.jpg" />
                                             </div>

                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tItem-price">
                                    <p className="quote-text-sm">10.00</p>
                                    <p className="quote-text-sm itemPartQuantity d-none">x 10</p>
                                    <div className="itemPartEditableWrap">
                                       <label htmlFor="chooseQuantity41426965">
                                          x <input
                                             className="form-control"
                                             type="text"
                                             defaultValue={10}
                                          />
                                       </label>
                                       <label className="quote-text-sm" htmlFor="chooseQuantity41426965">Choose quantity</label>
                                    </div>
                                    <p>
                                       <span className="itemPartItemTotal">100.00</span>
                                    </p>
                                 </div>
                              </div>

                              {/* Quote optional */}
                              {/* <div className={`tItem`}> */}
                              <div className={`tItem isSelected`}>
                                 <div className="tItem-desc">
                                    <div className="tItem-desc-table">
                                       <div className="tItem-desc-option">
                                          <input
                                             type="checkbox"
                                             name="choiceGroup[41437239]"
                                             id="choiceId-41437239"
                                             defaultValue={1} defaultChecked="checked" />
                                       </div>
                                       <div className="tItem-desc-cell">
                                          <p className="item_code">11-optional</p>
                                          <h3>
                                             <span className="text-primary">optional service</span>
                                          </h3>
                                          <p>decroption...</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tItem-price">
                                    <p className="quote-text-sm">10.00</p>
                                    <p className="quote-text-sm itemPartQuantity">x 10</p>
                                    <p>
                                       <span className="itemPartItemTotal">100.00</span>
                                    </p>
                                    <p className="quote-text-sm"><span className="option-text">Not selected</span></p>
                                 </div>
                                 <div className="clear"> </div>
                              </div>

                              {/* Quote text item */}
                              <div className="tItem-text">
                                 <h3>this is text item</h3>
                                 <p>item description here ...</p>
                                 <div className="quoteFile-set">
                                    <div className="quoteFile-image">
                                       <img src="https://asset.quotientapp.com/file-s/1/quote-v2/38216/354a172205cbcc91c6e7359c8e886ede/sm/ds/496852.jpg"
                                          alt="496852.jpg" />
                                    </div>
                                 </div>
                              </div>

                              {/* Quote with multi choices  */}
                              {/* choice 1 */}
                              <div className="tItem isSelected">
                                 <div className="tItem-desc">
                                    <div className="tItem-desc-table">
                                       <div className="tItem-desc-option">
                                          <input name="viewItem[41426968][contact_selected]" defaultValue={1} type="hidden"
                                             id="viewItem_41426968_contact_selected" /><label htmlFor="choiceId-41426968" className="isHidden"
                                                aria-hidden="true" />
                                          <input type="radio" name="choiceGroup[0]" defaultValue={1} defaultChecked="checked" />
                                       </div>
                                       <div className="tItem-desc-cell">
                                          <p className="item_code">333</p>
                                          <h3>
                                             <span className="text-primary">Multi choice Service 3</span></h3>
                                          <p>description 3</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tItem-price">
                                    <p className="quote-text-sm text-success">
                                       40.00<br />
                                       20% margin
                                    </p>
                                    <p className="quote-text-sm">50.00</p>
                                    <p className="quote-text-sm itemPartQuantity">x 10</p>
                                    <p>
                                       <span className="itemPartItemTotal">500.00</span>
                                    </p>
                                    <p className="quote-text-sm"><span className="option-text">Not selected</span></p>
                                 </div>
                              </div>
                              {/* choice 2 */}
                              <div className="tItem">
                                 <div className="tItem-desc">
                                    <div className="tItem-desc-table">
                                       <div className="tItem-desc-option">
                                          <input type="radio" name="choiceGroup[0]" id="choiceId-41427130"
                                             defaultValue={1} />
                                       </div>
                                       <div className="tItem-desc-cell">
                                          <p className="item_code">444</p>
                                          <h3><span className="text-primary">Multi choice Service 4</span></h3>
                                          <p>description 4</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tItem-price">
                                    <p className="quote-text-sm">10.00</p>
                                    <p className="quote-text-sm itemPartQuantity">x 10</p>
                                    <p>
                                       <span className="itemPartItemTotal">100.00</span>
                                    </p>
                                    <p className="quote-text-sm"><span className="option-text">Not selected</span></p>
                                 </div>
                                 <div className="clear"> </div>
                              </div>
                              {/* Subtotal with multi options */}
                              <div className="tItem vSubTotal">
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
                              {/* Quote total */}
                              <div className="quoteViewTotalWrap">
                                 {/* Has Subscription QuoteTotal */}
                                 <table className={`quoteTotal hasTerm table table-borderless`}>
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
                                 </table>

                                 {/* Has No Subscription QuoteTotal */}
                                 <table className="quoteTotal hasNoTerm table table-borderless">
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
                                       <tr className="tProfit">
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
                                 </table>

                                 {/* Quote text item */}
                                 <div className="tItem-text">
                                    <h3>It's text item</h3>
                                    <p>description...</p>
                                 </div>
                              </div>

                              {/* Discussion section */}
                              <div className="discuss-wrap">
                                 
                                 <div className="mb-4">
                                    {/* button wrapper  */}
                                    <div className="discuss-button-wrap">
                                       <button className="btn btn-rounded btn-secondary font-size-sm  px-3 py-2 mr-1">Comment</button>
                                       <button className="btn btn-rounded btn-success font-size-sm px-3 py-2">Private Note</button>
                                    </div>

                                    {/* comment wraper */}
                                    <div className="discuss-row discuss-form">
                                       <p>Send email to:</p>
                                       <h3>Danil Zolotuhin</h3>
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
                                          <button className="btn btn-alt-secondary">Cancel</button>
                                       </div>
                                    </div>

                                    {/* private note wraper */}
                                    <div className="discuss-row discuss-form">
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
                                       <div className="row no-gutters my-3">
                                          <button className="btn btn-success mr-2">Add Private Note</button>
                                          <button className="btn btn-alt-secondary">Cancel</button>
                                       </div>
                                       <div className="row no-gutters">
                                          <p>
                                             Customers will <strong>not</strong> see Private Notes on Quotes.
                                       </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
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

export default PublicQuoteView;