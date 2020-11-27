
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toFixedFloat } from '../util';
import axios from '../util/Api';

class PriceItemForm extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super(props);
      this.state = {
         uploading: false,
         isSettingOpen: false,
         isAddItemListOpen: false,

         // fileArray: [],
         // isOptional: false,
         // isOptionSelected: false,

         // isMultipleChoice: false,
         // isEditableQuantity: false,
         // isDiscount: false,
         // isSubscription: false,
         // isCostPriceMargin: false,
         // costPrice: 0,
         // margin: 20,

         // itemTotal: 0,  // it should be state
      }
      this.hiddenFileInput = React.createRef();
      this.settingContainter = React.createRef();
      this.addItemOptionContainer = React.createRef();
      this.optionalItemRef = React.createRef();
      this.multipleChoiceRef = React.createRef();
   }
   removeImageItem = (url) => {
      const newFileArray = this.props.priceItem.files.filter(item => item !== url);
      const newItem = {
         category: "priceItem",
         priceItem: { ... this.props.priceItem, files: newFileArray }
      };
      this.props.updateItem(this.props.index, newItem);
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   uploadMultipleFiles = async (e) => {
      this.fileObj = [];
      this.fileObj.push(e.target.files);
      this.setState({ uploading: true });
      for (let i = 0; i < this.fileObj[0].length; i++) {
         const formData = new FormData();
         const selectedFile = this.fileObj[0][i];
         formData.append(
            "image",
            selectedFile
         );
         const res = await axios.post("/service/upload-file", formData);
         this.fileArray.push(res.data.image);
      }
      this.setState({ uploading: false });

      const newItem = {
         category: "priceItem",
         priceItem: { ... this.props.priceItem, files: this.fileArray }
      };
      this.props.updateItem(this.props.index, newItem);
   }
   onClickOutsideHandle = (ev) => {
      if (this.state.isSettingOpen && !this.settingContainter.current.contains(ev.target)) this.setState({ isSettingOpen: false });
      if (this.state.isAddItemListOpen && !this.addItemOptionContainer.current.contains(ev.target)) this.setState({ isAddItemListOpen: false });
   }
   componentDidUpdate() {
      this.fileArray = this.props.priceItem.files;
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandle);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandle);
   }

   render() {
      console.log(" priceitem props ===== ", this.props);
      const { salesCatgories, salesTaxes } = this.props;
      return (
         <React.Fragment>
            {/* ToolWrapper */}
            <div className="row pb-1">
               <div className="col-sm-12">
                  {
                     this.props.priceItem.isOptional &&
                     <div className="form-check form-check-inline toolWrapper">
                        <input type="checkbox"
                           className="form-check-input"
                           name="option-checkbox"
                           checked={this.state.isOptionSelected}
                           onChange={() => this.setState({ isOptionSelected: !this.state.isOptionSelected })}
                        />
                        <label className="form-check-label">
                           Option {this.state.isOptionSelected ? "Selected" : ""}
                        </label>
                     </div>
                  }
                  {
                     this.props.priceItem.isMultipleChoice &&
                     <div className="form-check toolWrapper">
                        <input type="radio"
                           className="form-check-input"
                           name={`multipleChoiceGroup-${this.props.priceItem.title}`}
                           checked={this.props.priceItem.isChoiceSelected}
                           onChange={() => {
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: {
                                    ... this.props.priceItem,
                                    isChoiceSelected: !this.props.priceItem.isChoiceSelected
                                 }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}
                        />
                        <label className="form-check-label">1 of 1 Selected</label>
                     </div>
                  }
                  <div className="row no-gutters w-100 justify-content-center">
                     <input type="file"
                        ref={this.hiddenFileInput}
                        onChange={this.uploadMultipleFiles}
                        className="d-none"
                        multiple
                     />
                     <button className="btn btn-light mr-1"
                        onClick={this.handleClickFileOpen}
                        disabled={this.props.isPaperClipDisabled}
                     >
                        <i className="fa fa-paperclip"></i>
                     </button>
                     <div style={{ position: "relative" }} ref={this.settingContainter}>
                        <button className="btn btn-light mr-1"
                           onClick={() => this.setState({ isSettingOpen: !this.state.isSettingOpen })}
                           disabled={this.props.isSettingDisabled}
                        >
                           <i className="fa fa-cogs"></i>
                        </button>
                        <div className={`bg-light-gray border rounded p-3 animation ${this.state.isSettingOpen ? "" : "d-none"}`}
                           style={{
                              position: "absolute",
                              zIndex: 99,
                              width: "240px",
                              height: "220px"
                           }}>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 ref={this.optionalItemRef}
                                 checked={this.props.priceItem.isOptional}
                                 onChange={() => {
                                    if (this.props.priceItem.isMultipleChoice === true && this.props.priceItem.isOptional === false) this.multipleChoiceRef.current.click();
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: {
                                          ... this.props.priceItem,
                                          isOptional: !this.props.priceItem.isOptional,
                                          isMultipleChoice: false
                                       }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="optional" name="optional" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="optional">Optional Item</label>
                           </div>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 ref={this.multipleChoiceRef}
                                 checked={this.props.priceItem.isMultipleChoice}
                                 onChange={() => {
                                    if (this.props.priceItem.isOptional === true && this.props.priceItem.isMultipleChoice === false) this.optionalItemRef.current.click();
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: {
                                          ... this.props.priceItem,
                                          isMultipleChoice: !this.props.priceItem.isMultipleChoice,
                                          isOptional: false
                                       }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="multiple" name="multiple" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="multiple">Multiple Choice</label>
                           </div>
                           <div role="separator" className="dropdown-divider pb-1"></div>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 checked={this.props.priceItem.isEditableQuantity}
                                 onChange={() => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, isEditableQuantity: !this.props.priceItem.isEditableQuantity }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="editable-quantity" name="editable-quantity" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="editable-quantity">Editable Quantity</label>
                           </div>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 checked={this.props.priceItem.isDiscount}
                                 onChange={() => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, isDiscount: !this.props.priceItem.isDiscount }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="discount-percent" name="discount-percent" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="discount-percent">Discount %</label>
                           </div>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 checked={this.props.priceItem.isSubscription}
                                 onChange={() => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, isSubscription: !this.props.priceItem.isSubscription }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="subscription" name="subscription" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="subscription">Subscription - Repeating Cost</label>
                           </div>
                           <div className="form-check pb-1">
                              <input className="form-check-input"
                                 type="checkbox"
                                 checked={this.props.priceItem.isCostPriceMargin}
                                 onChange={() => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, isCostPriceMargin: !this.props.priceItem.isCostPriceMargin }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                                 id="cost-margin" name="cost-margin" />
                              <label className="form-check-label font-w400 font-size-sm" htmlFor="cost-margin">Cost Price & Margin</label>
                           </div>
                        </div>
                     </div>
                     <div style={{ position: "relative" }} ref={this.addItemOptionContainer}>
                        <button className="btn btn-light mr-1"
                           onClick={() => this.setState({ isAddItemListOpen: !this.state.isAddItemListOpen })}
                           disabled={this.props.isAddItemDisabled}>
                           <i className="fa fa-plus"></i>
                        </button>
                        <div className={`bg-light-gray border rounded p-3 animation ${this.state.isAddItemListOpen ? "" : "d-none"}`}
                           style={{
                              position: "absolute",
                              zIndex: 99,
                              width: "150px",
                              height: "155px"
                           }}>
                           <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.props.addItem(this.props.index, "subTotal")}>
                              <i className="fa fa-plus mr-2"></i>
                              <span className="font-w400 font-size-sm" htmlFor="optional">Subtotal</span>
                           </button>
                           <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.props.addItem(this.props.index, "priceItem")}>
                              <i className="fa fa-plus mr-2"></i>
                              <span className="font-w400 font-size-sm" htmlFor="optional">Price Item</span>
                           </button>
                           <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.props.addItem(this.props.index, "textItem")}>
                              <i className="fa fa-plus mr-2"></i>
                              <span className="font-w400 font-size-sm" htmlFor="optional">Text Item</span>
                           </button>
                        </div>
                     </div>
                     <button className="btn btn-light mr-1" disabled={this.props.isOrderUpDisabled} onClick={() => this.props.orderUpItem(this.props.index)}>
                        <i className="fa fa-long-arrow-alt-up"></i>
                     </button>
                     <button className="btn btn-light mr-1" disabled={this.props.isOrderDownDisabled} onClick={() => this.props.orderDownItem(this.props.index)}>
                        <i className="fa fa-long-arrow-alt-down"></i>
                     </button>
                     <button className="btn btn-light mr-1" disabled={this.props.isRemoveDisabled} onClick={() => this.props.removeItem(this.props.index)}>
                        <i className="fa fa-trash-alt"></i>
                     </button>
                     {
                        this.props.isViewOnly &&
                        <button className="btn btn-light mr-1" onClick={() => this.props.history.push({
                           pathname: `/app/content/item-price/view/${this.props.priceItem._id}`,
                           state: {
                              from: this.props.location.pathname
                           }
                        })}>
                           <span className="text-primary"><i className="fa fa-pen"></i> Edit</span>
                        </button>
                     }
                  </div>
               </div>
            </div>
            {/* End ToolWrapper */}

            {/* Textarea section */}
            <div className="row">
               <div className="col-sm-6 pr-0">
                  <div className={`w-100 border p-2 mb-2 ${this.props.isViewOnly ? "bg-disabled" : ""}`}>
                     <input className="form-control border-0 rounded-0 p-2 mb-1"
                        disabled={!!this.props.isViewOnly}
                        placeholder="Item Code / ID (optional)"
                        value={this.props.priceItem.itemCode}
                        onChange={(ev) => {
                           const newItem = {
                              category: "priceItem",
                              priceItem: { ... this.props.priceItem, itemCode: ev.target.value }
                           };
                           this.props.updateItem(this.props.index, newItem);
                        }}
                     />
                     <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2"
                        rows={1} placeholder="Product or Service Heading"
                        disabled={!!this.props.isViewOnly}
                        value={this.props.priceItem.productHeading}
                        onChange={(ev) => {
                           const newItem = {
                              category: "priceItem",
                              priceItem: { ... this.props.priceItem, productHeading: ev.target.value }
                           };
                           this.props.updateItem(this.props.index, newItem);
                        }}
                     >
                     </textarea>
                     <textarea className="form-control border-0 rounded-0 mt-1 p-2" rows={1} placeholder="Long description"
                        disabled={!!this.props.isViewOnly}
                        value={this.props.priceItem.longDescription}
                        onChange={(ev) => {
                           const newItem = {
                              category: "priceItem",
                              priceItem: { ... this.props.priceItem, longDescription: ev.target.value }
                           };
                           this.props.updateItem(this.props.index, newItem);
                        }}
                     >
                     </textarea>

                     {/* Images preview section */}
                     <div className={`row no-gutters ${this.props.isViewOnly ? "bg-disabled" : ""}`}>
                        {this.state.uploading && <div className="p-2 text-success font-w700">Uploading...</div>}
                        {(this.props.priceItem.files || []).map((url, index) => (
                           <div className="p-1" key={index}>
                              <img src={url} className="mr-2 image-preview-size" alt="..." />
                              {
                                 !this.props.isViewOnly &&
                                 <button className="btn btn-sm btn-light"
                                    onClick={() => this.removeImageItem(url)}>
                                    <i className="fa fa-times-circle"></i>
                                 </button>
                              }
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="col-sm-6 pl-1">
                  <div className="row pb-1">
                     <div className="col-6 pr-0">
                        <select className="custom-select rounded-0"
                           disabled={!!this.props.isViewOnly}
                           value={this.props.priceItem.itemCategory}
                           onChange={(ev) => {
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: { ... this.props.priceItem, itemCategory: ev.target.value }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}>
                           {
                              salesCatgories.map(salesCategory => <option value={salesCategory._id} key={salesCategory._id}>{salesCategory.categoryName}</option>)
                           }

                        </select>
                     </div>
                     <div className="col-6 pl-1">
                        <select className="custom-select rounded-0"
                           disabled={!!this.props.isViewOnly}
                           value={this.props.priceItem.tax}
                           onChange={(ev) => {
                              const tax = ev.target.value === "" ? 0 : ev.target.value;
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: { ... this.props.priceItem, tax }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}>
                           {
                              salesTaxes.map(salesTax => (<option value={salesTax._id} key={salesTax._id}>{salesTax.taxName}</option>))
                           }
                        </select>
                     </div>
                  </div>
                  <div className={`row pb-1 ${this.props.priceItem.isDiscount ? "" : "d-none"}`}>
                     {/* <div className={`row pb-1`}> */}
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="row">
                              <div className="col-4 pr-0">
                                 <input
                                    type="number"
                                    className="form-control rounded-0"
                                    disabled={!!this.props.isViewOnly}
                                    value={this.props.priceItem.discount == 0 ? "" : this.props.priceItem.discount}
                                    onChange={(ev) => {
                                       const discount = ev.target.value === "" ? 0 : ev.target.value;
                                       const newItem = {
                                          category: "priceItem",
                                          priceItem: {
                                             ... this.props.priceItem,
                                             discount: discount,
                                             itemTotal: this.props.priceItem.itemTotal * (100 - discount) / 100
                                          }
                                       };
                                       this.props.updateItem(this.props.index, newItem);
                                    }}
                                 />
                              </div>
                              <span className="text-secondary text-uppercase mx-2 my-auto">% DISCOUNT</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={`row pb-1 ${this.props.priceItem.isSubscription ? "" : "d-none"}`}>
                     {/* <div className={`row pb-1`}> */}
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="d-flex">
                              <span className="text-secondary text-uppercase mx-2 my-auto">Per</span>
                              <input type="number"
                                 className="form-control rounded-0 mr-1"
                                 disabled={!!this.props.isViewOnly}
                                 value={this.props.priceItem.per == 0 ? "" : this.props.priceItem.per}
                                 onChange={(ev) => {
                                    const per = ev.target.value === "" ? 1 : ev.target.value;
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, per }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                              />
                              <select className="form-control rounded-0"
                                 disabled={!!this.props.isViewOnly}
                                 value={this.props.priceItem.every}
                                 onChange={(ev) => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, every: ev.target.value }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}>
                                 <option value={`week`}>week</option>
                                 <option value={`month`}>month</option>
                                 <option value={`year`}>year</option>
                              </select>
                              <span className="text-secondary text-uppercase mx-2 my-auto">For</span>
                              <input type="number"
                                 className="form-control rounded-0"
                                 placeholder="Optional"
                                 disabled={!!this.props.isViewOnly}
                                 value={this.props.priceItem.period == 0 ? "" : this.props.priceItem.period}
                                 onChange={(ev) => {
                                    const newItem = {
                                       category: "priceItem",
                                       priceItem: { ... this.props.priceItem, period: ev.target.value }
                                    };
                                    this.props.updateItem(this.props.index, newItem);
                                 }}
                              />
                              <span className="text-secondary text-uppercase mx-2 my-auto">{this.props.priceItem.every}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={`row pb-1 ${this.props.priceItem.isCostPriceMargin ? "" : "d-none"}`}>
                     {/* <div className={`row pb-1`}> */}
                     <div className="col-12">
                        <div className="bg-light-gray border p-1">
                           <div className="row">
                              <div className="col-4">
                                 <input className="form-control border border-success rounded-0 mr-1"
                                    type="number"
                                    placeholder="-- Cost Price --"
                                    disabled={!!this.props.isViewOnly}
                                    value={this.props.priceItem.costPrice == 0 ? "" : this.props.priceItem.costPrice}
                                    onChange={(ev) => {
                                       const costPrice = ev.target.value == 0 ? 0 : ev.target.value;
                                       const newItem = {
                                          category: "priceItem",
                                          priceItem: {
                                             ... this.props.priceItem,
                                             costPrice: costPrice,
                                             unitPrice: costPrice == 0 ? this.props.priceItem.unitPrice : costPrice / (100 - this.props.priceItem.margin) * 100,
                                             itemTotal: costPrice == 0 ?
                                                this.props.priceItem.unitPrice * this.props.priceItem.quantity * (100 - this.props.priceItem.discount) / 100
                                                : costPrice / (100 - this.props.priceItem.margin) * this.props.priceItem.quantity * (100 - this.props.priceItem.discount)
                                          }
                                       };
                                       this.props.updateItem(this.props.index, newItem);
                                    }}
                                 />
                              </div>
                              <span className={`${this.props.priceItem.margin < 0 ? "text-danger" : "text-success"} mx-2 my-auto`}>{toFixedFloat(this.props.priceItem.margin)}% MARGIN</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-4 pr-0">
                        <input
                           type="number"
                           id="unit" className="form-control rounded-0"
                           disabled={!!this.props.isViewOnly}
                           value={this.props.priceItem.unitPrice == 0 ? "" : this.props.priceItem.unitPrice}
                           onChange={(ev) => {
                              const unitPrice = ev.target.value == 0 ? 0 : ev.target.value;
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: {
                                    ... this.props.priceItem,
                                    unitPrice: unitPrice,
                                    margin: unitPrice == 0 ? 0
                                       : this.props.priceItem.costPrice == 0 ? this.props.priceItem.margin
                                          : (unitPrice - this.props.priceItem.costPrice) / unitPrice * 100,
                                    itemTotal: unitPrice * this.props.priceItem.quantity * (100 - this.props.priceItem.discount) / 100
                                 }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}
                        />
                        <label htmlFor="unit" className="text-gray fa-xs text-uppercase">Unit Price</label>
                     </div>
                     <div className="col-4 pl-1 pr-0">
                        <input type="number" id="quantity" className={`form-control rounded-0 ${this.state.isEditableQuantity ? "border-primary" : ""}`}
                           disabled={!!this.props.isViewOnly}
                           value={this.props.priceItem.quantity == 0 ? "" : this.props.priceItem.quantity}
                           onChange={(ev) => {
                              const quantity = ev.target.value === "" ? 0 : ev.target.value;
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: {
                                    ...this.props.priceItem,
                                    quantity: quantity,
                                    itemTotal: this.props.priceItem.unitPrice * quantity * (100 - this.props.priceItem.discount) / 100
                                 }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}
                        />
                        <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">
                           <span className="text-primary">{this.props.priceItem.isEditableQuantity ? "Editable " : ""}</span>
                           Quantity
                        </label>
                     </div>
                     <div className="col-4 pl-1">
                        <input type="number" id="total" className="form-control rounded-0"
                           disabled={!!this.props.isViewOnly}
                           value={this.props.priceItem.itemTotal == 0 ? "" : this.props.priceItem.itemTotal}
                           onChange={(ev) => {
                              const itemTotal = ev.target.value === "" ? 0 : ev.target.value;
                              const newItem = {
                                 category: "priceItem",
                                 priceItem: {
                                    ... this.props.priceItem,
                                    itemTotal: itemTotal,
                                    unitPrice: this.props.priceItem.quantity !== "0" ? itemTotal / this.props.priceItem.quantity : this.props.priceItem.quantity
                                 }
                              };
                              this.props.updateItem(this.props.index, newItem);
                           }}
                        />
                        <label htmlFor="total" className="text-gray fa-xs text-uppercase">Item Total</label>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = ({ settings }) => {
   const { salesCatgories, salesTaxes } = settings;
   return { salesCatgories, salesTaxes };

};
export default connect(mapStateToProps)(withRouter(PriceItemForm));