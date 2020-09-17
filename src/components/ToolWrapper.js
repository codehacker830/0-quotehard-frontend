import React, { Component } from 'react';

export default class ToolWrapper extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super();
      this.state = {
         isSettingOpen: false,
         isAddItemListOpen: false,
      };
      this.hiddenFileInput = React.createRef();
      this.settingContainter = React.createRef();
      this.addItemOptionContainer = React.createRef();
   }
   componentDidUpdate() {
      this.fileArray = this.props.fileArray;
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   uploadMultipleFiles = (e) => {
      console.log("uploadMultipleFiles ==>", e.target.files);
      this.fileObj = [];
      this.fileObj.push(e.target.files);
      console.log("this.fileObj ==", this.fileObj);
      for (let i = 0; i < this.fileObj[0].length; i++) {
         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      }
      this.props.updateFileArray(this.fileArray);
      console.log("this.fileArray ==>", this.fileArray);
   }
   onClickOutsideHandle = (ev) => {
      if (this.state.isSettingOpen && !this.settingContainter.current.contains(ev.target)) this.setState({ isSettingOpen: false });
      if (this.state.isAddItemListOpen && !this.addItemOptionContainer.current.contains(ev.target)) this.setState({ isAddItemListOpen: false });
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandle);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandle);
   }
   render() {
      return (
         <div className="row justify-content-center pb-1">
            <input type="file"
               ref={this.hiddenFileInput}
               onChange={this.uploadMultipleFiles}
               style={{ display: 'none' }}
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
                        value={this.props.isEditableQuantity}
                        onChange={() => this.setState({ isEditableQuantity: !this.props.isEditableQuantity })}
                        id="optional" name="optional" />
                     <label className="form-check-label font-w400 font-size-sm" htmlFor="optional">Optional Item</label>
                  </div>
                  <div className="form-check pb-1">
                     <input className="form-check-input"
                        type="checkbox"
                        value={this.state.isEditableQuantity}
                        onChange={() => this.setState({ isEditableQuantity: !this.state.isEditableQuantity })}
                        id="multiple" name="multiple" />
                     <label className="form-check-label font-w400 font-size-sm" htmlFor="multiple">Multiple Choice</label>
                  </div>
                  <div role="separator" className="dropdown-divider pb-1"></div>
                  <div className="form-check pb-1">
                     <input className="form-check-input"
                        type="checkbox"
                        value={this.props.isEditableQuantity}
                        onChange={() => this.props.updateEditableQuantityShow(!this.props.isEditableQuantity)}
                        id="editable-quantity" name="editable-quantity" />
                     <label className="form-check-label font-w400 font-size-sm" htmlFor="editable-quantity">Editable Quantity</label>
                  </div>
                  <div className="form-check pb-1">
                     <input className="form-check-input"
                        type="checkbox"
                        value={this.props.isDiscount}
                        onChange={() => this.props.updateDiscountShow(!this.props.isDiscount)}
                        id="discount-percent" name="discount-percent" />
                     <label className="form-check-label font-w400 font-size-sm" htmlFor="discount-percent">Discount %</label>
                  </div>
                  <div className="form-check pb-1">
                     <input className="form-check-input"
                        type="checkbox"
                        value={this.props.isSubscription}
                        onChange={() => this.props.updateSubscriptionShow(!this.props.isSubscription)}
                        id="subscription" name="subscription" />
                     <label className="form-check-label font-w400 font-size-sm" htmlFor="subscription">Subscription - Repeating Cost</label>
                  </div>
                  <div className="form-check pb-1">
                     <input className="form-check-input"
                        type="checkbox"
                        value={this.props.isCostPriceMargin}
                        onChange={() => this.props.updateCostPriceMarginShow(!this.props.isCostPriceMargin)}
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
                  <button className="btn btn-light width-115 text-left mb-1">
                     <i className="fa fa-plus mr-2"></i>
                     <span className="font-w400 font-size-sm" htmlFor="optional">Subtotal</span>
                  </button>
                  <button className="btn btn-light width-115 text-left mb-1">
                     <i className="fa fa-plus mr-2"></i>
                     <span className="font-w400 font-size-sm" htmlFor="optional">Price Item</span>
                  </button>
                  <button className="btn btn-light width-115 text-left mb-1">
                     <i className="fa fa-plus mr-2"></i>
                     <span className="font-w400 font-size-sm" htmlFor="optional">Text Item</span>
                  </button>
               </div>
            </div>
            <button className="btn btn-light mr-1" disabled={this.props.isOrderUpDisabled}>
               <i className="fa fa-long-arrow-alt-up"></i>
            </button>
            <button className="btn btn-light mr-1" disabled={this.props.isOrderDownDisabled}>
               <i className="fa fa-long-arrow-alt-down"></i>
            </button>
            <button className="btn btn-light" disabled={this.props.isRemoveDisabled}>
               <i className="fa fa-trash-alt"></i>
            </button>
         </div >
      );
   }
}