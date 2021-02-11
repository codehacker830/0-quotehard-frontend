import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateQuoteItems, updateQuoteNotes } from '../actions/Data';
import { initPriceItem, initTextItem } from '../constants/InitState';
import { CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_DUPLICATE_PATH } from '../constants/PathNames';
import axios from '../util/Api';
import ReactTooltip from 'react-tooltip';

class TextItemForm extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super(props);
      this.state = {
         uploading: false,
         isAddItemListOpen: false,
         isConfirmingDelete: false
      };
      this.hiddenFileInput = React.createRef();
      this.addItemOptionContainer = React.createRef();
   }
   removeImageItem = (url) => {
      const newFileArray = this.props.textItem.files.filter(item => item !== url);
      const newItem = {
         category: "textItem",
         textItem: { ... this.props.textItem, files: newFileArray }
      };
      this.updateItem(this.props.index, newItem);
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
         category: "textItem",
         textItem: { ... this.props.textItem, files: this.fileArray }
      };
      this.updateItem(this.props.index, newItem);
   }
   onClickOutsideHandle = (ev) => {
      if (this.state.isAddItemListOpen && !this.addItemOptionContainer.current.contains(ev.target)) this.setState({ isAddItemListOpen: false });
   }
   componentDidUpdate() {
      this.fileArray = this.props.textItem.files;
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandle);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandle);
   }

   updateItem = (ind, item) => {
      console.log("note text item -------------------> ", ind, item);
      if (this.props.isNote) {
         const { notes } = this.props.quote;
         let newNotes = [...notes];
         newNotes[ind] = item;
         this.props.updateQuoteNotes(newNotes);
      } else {
         const { items } = this.props.quote;
         let newItems = [...items];
         newItems[ind] = item;
         this.props.updateQuoteItems(newItems);
      }
   }

   addItem = (ind, category) => {
      if (this.props.isNote) {
         const { notes } = this.props.quote;
         let newNotes = [...notes];
         newNotes.splice(ind + 1, 0, {
            category: "textItem",
            textItem: {
               ...initTextItem,
               files: []
            }
         });
         this.props.updateQuoteNotes(newNotes);
      }
      else {
         const { items } = this.props.quote;
         let newItems = [...items];
         if (category === "priceItem") newItems.splice(ind + 1, 0, {
            category: category,
            priceItem: {
               ...initPriceItem,
               salesCategory: this.props.defaultSalesCategory,
               salesTax: this.props.defaultSalesTax,
               files: []
            },
         });
         else if (category === "textItem") newItems.splice(ind + 1, 0, {
            category: category,
            textItem: {
               ...initTextItem,
               files: []
            },
         });
         else newItems.splice(ind + 1, 0, {
            category: category,
            subTotal: null
         });
         this.props.updateQuoteItems(newItems);
      }
   }

   orderUpItem = (ind) => {
      if (this.props.isNote) {
         const { notes } = this.props.quote;
         let newNotes = [...notes];
         const [dIt,] = newNotes.splice(ind, 1);
         newNotes.splice(Math.max(ind - 1, 0), 0, dIt);
         this.props.updateQuoteNotes(newNotes);
      } else {
         const { items } = this.props.quote;
         let newItems = [...items];
         const [dIt,] = newItems.splice(ind, 1);
         newItems.splice(Math.max(ind - 1, 0), 0, dIt);
         this.props.updateQuoteItems(newItems);
      }
   }

   orderDownItem = (ind) => {
      if (this.props.isNote) {
         const { notes } = this.props.quote;
         let newNotes = [...notes];
         const [dIt,] = newNotes.splice(ind, 1);
         newNotes.splice(Math.min(ind + 1, notes.length), 0, dIt);
         this.props.updateQuoteNotes(newNotes);
      } else {
         const { items } = this.props.quote;
         let newItems = [...items];
         const [dIt,] = newItems.splice(ind, 1);
         newItems.splice(Math.min(ind + 1, items.length), 0, dIt);
         this.props.updateQuoteItems(newItems);
      }
   }

   removeItem = (ind) => {
      if (this.props.isNote) {
         const { notes } = this.props.quote;
         let newNotes = [...notes];
         if (newNotes.length > 1) {
            newNotes.splice(ind, 1);
            this.props.updateQuoteNotes(newNotes);
         }
         else this.props.updateQuoteNotes([{
            category: "textItem",
            textItem: { ...initTextItem }
         }]);
      } else {
         const { items } = this.props.quote;
         let newItems = [...items];
         if (newItems.length > 2) {
            newItems.splice(ind, 1);
            this.props.updateQuoteItems(newItems);
         } else if (newItems.length === 2) {
            newItems.splice(ind, 1);
            if (newItems[0].category === "subTotal") this.props.updateQuoteItems([
               {
                  category: "priceItem",
                  priceItem: initPriceItem,
               },
            ]);
            else this.props.updateQuoteItems(newItems);
         } else this.props.updateQuoteItems([
            {
               category: "priceItem",
               priceItem: initPriceItem,
            },
         ]);
      }
      this.setState({ isConfirmingDelete: false });
   }
   render() {
      const { isViewOnly } = this.props;
      const {
         _id,
         textHeading,
         longDescription,
         files,
      } = this.props.textItem;
      return (
         <React.Fragment>
            {/* ToolWrapper */}
            <div className="row pb-1">
               <div className="col-sm-12">
                  <div className="row no-gutters justify-content-center">
                     <input type="file"
                        ref={this.hiddenFileInput}
                        onChange={this.uploadMultipleFiles}
                        className="d-none"
                        multiple
                     />
                     <button className="btn btn-light mr-1"
                        onClick={this.handleClickFileOpen}
                        disabled={this.props.isPaperClipDisabled || isViewOnly}
                     >
                        <i className="fa fa-paperclip"></i>
                     </button>
                     <div style={{ position: "relative" }}>
                        <button className="btn btn-light mr-1" disabled={this.props.isSettingDisabled || isViewOnly}>
                           <i className="fa fa-cogs"></i>
                        </button>
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
                              width: 150,
                              height: this.props.isNote ? 70 : 155
                           }}>
                           {
                              !this.props.isNote &&
                              <>
                                 <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.addItem(this.props.index, "subTotal")}>
                                    <i className="fa fa-plus mr-2"></i>
                                    <span className="font-w400 font-size-sm" htmlFor="optional">Subtotal</span>
                                 </button>
                                 <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.addItem(this.props.index, "priceItem")}>
                                    <i className="fa fa-plus mr-2"></i>
                                    <span className="font-w400 font-size-sm" htmlFor="optional">Price Item</span>
                                 </button>
                              </>
                           }
                           <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.addItem(this.props.index, "textItem")}>
                              <i className="fa fa-plus mr-2"></i>
                              <span className="font-w400 font-size-sm" htmlFor="optional">Text Item</span>
                           </button>
                        </div>
                     </div>
                     <ReactTooltip
                        id="registerTip"
                        place="top"
                        type="dark"
                        effect="solid"
                        delayShow={600}
                     />
                     <span
                        onMouseEnter={() => { ReactTooltip.show() }}
                        onMouseLeave={() => { ReactTooltip.hide() }}
                        data-tip="Move item up"
                        data-for="registerTip"
                     >
                        <button className="btn btn-light mr-1" disabled={this.props.isOrderUpDisabled} onClick={() => this.orderUpItem(this.props.index)}>
                           <i className="fa fa-long-arrow-alt-up"></i>
                        </button>
                     </span>
                     <span
                        onMouseEnter={() => { ReactTooltip.show() }}
                        onMouseLeave={() => { ReactTooltip.hide() }}
                        data-tip="Move item up"
                        data-for="registerTip"
                     >
                        <button className="btn btn-light mr-1" disabled={this.props.isOrderDownDisabled} onClick={() => this.orderDownItem(this.props.index)}>
                           <i className="fa fa-long-arrow-alt-down"></i>
                        </button>
                     </span>
                     {
                        this.state.isConfirmingDelete ?
                           <button className="btn btn-sm btn-danger" onClick={() => this.removeItem(this.props.index)}>Remove?</button>
                           :
                           <button className="btn btn-light mr-1" disabled={this.props.isRemoveDisabled} onClick={() => this.setState({ isConfirmingDelete: true })}>
                              <i className="fa fa-trash-alt"></i>
                           </button>
                     }
                     {
                        isViewOnly &&
                        <button className="btn btn-light mr-1" onClick={() => this.props.history.push({
                           pathname: `/app/content/item-text/view/${_id}`,
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
               <div className="col-sm-12 col-md-10 col-lg-8">
                  <div className={`w-100 border p-2 mb-2 ${isViewOnly ? "bg-disabled" : ""}`}>
                     <TextareaAutosize className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2"
                        rows={1} placeholder="Text Heading"
                        disabled={isViewOnly}
                        value={textHeading}
                        onChange={(ev) => {
                           const newItem = {
                              category: "textItem",
                              textItem: { ... this.props.textItem, textHeading: ev.target.value }
                           };
                           this.updateItem(this.props.index, newItem);
                        }}
                     >
                     </TextareaAutosize>
                     <TextareaAutosize className="form-control border-0 rounded-0 mt-1 p-2"
                        rows={1} placeholder="Long description, terms of trade or compelling sales text"
                        value={longDescription}
                        disabled={isViewOnly}
                        onChange={(ev) => {
                           const newItem = {
                              category: "textItem",
                              textItem: { ... this.props.textItem, longDescription: ev.target.value }
                           };
                           this.updateItem(this.props.index, newItem);
                        }}
                     >
                     </TextareaAutosize>

                     {/* Images preview section */}
                     <div className="row m-1">
                        {this.state.uploading && <div className="p-2 text-success font-w700">Uploading...</div>}
                        {(files || []).map((url, index) => (
                           <div className="p-1" key={index}>
                              <img src={url} className="mr-2 image-preview-size" alt="..." />
                              {
                                 !isViewOnly &&
                                 <button className="btn btn-sm btn-light" onClick={() => this.removeImageItem(url)}>
                                    <i className="fa fa-times-circle"></i>
                                 </button>
                              }
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
const mapStateToProps = ({ mainData, salesSetting }) => {
   const {
      defaultSalesCategory,
      defaultSalesTax
   } = salesSetting;
   const { quote } = mainData;
   return { quote, defaultSalesCategory, defaultSalesTax }
};
const mapDispatchToProps = {
   updateQuoteItems,
   updateQuoteNotes
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TextItemForm));