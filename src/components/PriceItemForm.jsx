import React, { Component } from 'react';
import NavCrump from './NavCrump';
import ToolWrapper from './ToolWrapper';

export default class PriceItemForm extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,
      }
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }
   render() {
      return (
         <React.Fragment>
            {/* Controller button group */}
            <ToolWrapper
               isPaperClipDisabled={this.props.isPaperClipDisabled}
               isSettingDisabled={this.props.isSettingDisabled}
               isAddItemDisabled={this.props.isAddItemDisabled}
               isOrderUpDisabled={this.props.isOrderUpDisabled}
               isOrderDownDisabled={this.props.isOrderDownDisabled}
               isRemoveDisabled={this.props.isRemoveDisabled}

               fileArray={this.state.fileArray}
               updateFileArray={(fileArray) => this.setState({ fileArray: fileArray })}

               isEditableQuantity={this.state.isEditableQuantity}
               isDiscount={this.state.isDiscount}
               isSubscription={this.state.isSubscription}
               isCostPriceMargin={this.state.isCostPriceMargin}

               updateEditableQuantityShow={(show) => this.setState({ isEditableQuantity: show })}
               updateDiscountShow={(show) => this.setState({ isDiscount: show })}
               updateSubscriptionShow={(show) => this.setState({ isSubscription: show })}
               updateCostPriceMarginShow={(show) => this.setState({ isCostPriceMargin: show })}
            />

            <div className="row">
               {/* Textarea section */}
               <div className="col-sm-6 pr-0">
                  <div className="w-100 border p-2 mb-2">
                     <input className="form-control border-0 rounded-0 p-2 mb-1" placeholder="Item Code / ID (optional)" />
                     <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2" rows={1} placeholder="Product or Service Heading">
                     </textarea>
                     <textarea className="form-control border-0 rounded-0 mt-1 p-2" rows={1} placeholder="Long description">
                     </textarea>

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
                  </div>
               </div>


               <div className="col-sm-6">
                  <div className="row pb-1">
                     <div className="col-6 pr-0">
                        <select className="custom-select rounded-0" defaultValue={"sales"}>
                           <option value="sales">Sales</option>
                        </select>
                     </div>
                     <div className="col-6">
                        <select className="custom-select rounded-0" defaultValue={10}>
                           <option value="0">No tax</option>
                           <option value="10">10% tax</option>
                        </select>
                     </div>
                  </div>
                  <div className={`row pb-1 ${this.state.isDiscount ? "" : "d-none"}`}>
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="row">
                              <div className="col-4 pr-0">
                                 <input className="form-control rounded-0" />
                              </div>
                              <span className="text-secondary text-uppercase mx-2 my-auto">% DISCOUNT</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={`row pb-1 ${this.state.isSubscription ? "" : "d-none"}`}>
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="d-flex">
                              <span className="text-secondary text-uppercase mx-2 my-auto">Per</span>
                              <input className="form-control rounded-0 mr-1" />
                              <select className="form-control rounded-0">
                                 <option value={0}>week</option>
                                 <option value={1}>month</option>
                                 <option value={2}>year</option>
                              </select>
                              <span className="text-secondary text-uppercase mx-2 my-auto">For</span>
                              <input className="form-control rounded-0" placeholder="Optional" />
                              <span className="text-secondary text-uppercase mx-2 my-auto">MONTHS</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={`row pb-1 ${this.state.isCostPriceMargin ? "" : "d-none"}`}>
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="row">
                              <div className="col-4">
                                 <input className="form-control border border-success rounded-0 mr-1" placeholder="-- Cost Price --" />
                              </div>
                              <span className="text-success text-uppercase mx-2 my-auto">20% MARGIN</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-4 pr-0">
                        <input type="text" id="unit" className="form-control rounded-0" />
                        <label htmlFor="unit" className="text-gray fa-xs text-uppercase">Unit Price</label>
                     </div>
                     <div className="col-4 pr-0">
                        <input type="text" id="quantity" className={`form-control rounded-0 ${this.state.isEditableQuantity ? "border-primary" : ""}`} />
                        <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">
                           <span className="text-primary">{this.state.isEditableQuantity ? "Editable " : ""}</span>
                                 Quantity
                              </label>
                     </div>
                     <div className="col-4">
                        <input type="text" id="total" className="form-control rounded-0" />
                        <label htmlFor="total" className="text-gray fa-xs text-uppercase">Item Total</label>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}