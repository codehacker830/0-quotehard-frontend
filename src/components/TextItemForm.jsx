import React, { Component } from 'react';
import NavCrump from './NavCrump';
import ToolWrapper from './ToolWrapper';

export default class TextItemForm extends Component {
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super();
      this.state = {
         file: [null]
      };
      this.hiddenFileInput = React.createRef();
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

            // isEditableQuantity={this.state.isEditableQuantity}
            // isDiscount={this.state.isDiscount}
            // isSubscription={this.state.isSubscription}
            // isCostPriceMargin={this.state.isCostPriceMargin}

            // updateEditableQuantityShow={(show) => this.setState({ isEditableQuantity: show })}
            // updateDiscountShow={(show) => this.setState({ isDiscount: show })}
            // updateSubscriptionShow={(show) => this.setState({ isSubscription: show })}
            // updateCostPriceMarginShow={(show) => this.setState({ isCostPriceMargin: show })}
            />
            {/* Textarea section */}
            <div className="row">
               <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className="w-100 border p-2 mb-2">
                     <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2" rows={1} placeholder="Text Heading">
                     </textarea>
                     <textarea className="form-control border-0 rounded-0 mt-1 p-2" rows={1} placeholder="Long description, terms of trade or compelling sales text">
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
            </div>
         </React.Fragment>
      );
   }
}