import React, { Component } from 'react';
import NavCrump from './NavCrump';

export default class TextItemForm extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super(props);
      this.state = {
         file: [],
         isAddItemListOpen: false,
      };
      this.hiddenFileInput = React.createRef();
      this.addItemOptionContainer = React.createRef();
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
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
      this.setState({ fileArray: this.fileArray })
      console.log("this.fileArray ==>", this.fileArray);
   }
   onClickOutsideHandle = (ev) => {
      if (this.state.isAddItemListOpen && !this.addItemOptionContainer.current.contains(ev.target)) this.setState({ isAddItemListOpen: false });
   }
   componentDidUpdate() {
      this.fileArray = this.state.fileArray;
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandle);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandle);
   }
   render() {
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
                        disabled={this.props.isPaperClipDisabled}
                     >
                        <i className="fa fa-paperclip"></i>
                     </button>
                     <div style={{ position: "relative" }}>
                        <button className="btn btn-light mr-1" disabled={true}>
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
                              width: "150px",
                              height: this.props.isNote ? 70 : 155
                           }}>
                           {
                              !this.props.isNote &&
                              <>
                                 <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.props.addItem(this.props.index, "subTotal")}>
                                    <i className="fa fa-plus mr-2"></i>
                                    <span className="font-w400 font-size-sm" htmlFor="optional">Subtotal</span>
                                 </button>
                                 <button className="btn btn-light width-115 text-left mb-1" onClick={() => this.props.addItem(this.props.index, "priceItem")}>
                                    <i className="fa fa-plus mr-2"></i>
                                    <span className="font-w400 font-size-sm" htmlFor="optional">Price Item</span>
                                 </button>
                              </>
                           }
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
                     <button className="btn btn-light" disabled={this.props.isRemoveDisabled} onClick={() => this.props.removeItem(this.props.index)}>
                        <i className="fa fa-trash-alt"></i>
                     </button>
                  </div>
               </div>
            </div>
            {/* End ToolWrapper */}

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