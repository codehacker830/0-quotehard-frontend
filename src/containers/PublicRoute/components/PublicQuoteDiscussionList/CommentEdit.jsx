import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import axios from '../../../../util/Api';
import _ from 'lodash';
import clsx from 'clsx';

class CommentEdit extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         uploading: false,
         fileArray: [],
         commentContent: "",
      };
      this.hiddenFileInput = React.createRef();
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
      this.setState({
         uploading: false,
         fileArray: this.fileArray
      });
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }

   onUpdateComment = () => {
      const { commentContent } = this.state;
      const { comment } = this.props;
      const { entoken } = this.props.match.params;
      if (commentContent === "") {
         toast.warn("Could not find anything to edit");
         return;
      }
      this.setState({ loading: true });
      axios.put(`/quotes/comment/${comment._id}`, { content: commentContent, files: this.fileArray, entoken })
         .then(({ data }) => {
            this.setState({
               loading: false
            });
            this.props.onCancelEdit();
            this.props.updateQuoteDiscussions(data.discussions);
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during submit comment ==>", err);
         });
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevProps.isEditMode !== this.props.isEditMode) this.setState({
         fileArray: this.props.comment.files || [],
         commentContent: this.props.comment.content,
      });
   }
   render() {
      const { comment, isEditMode } = this.props;
      const { quote } = this.props;
      console.log(" dddddddddddd this.prosp === ", comment)
      return (
         <div className={clsx("discussIsEdit", isEditMode ? "" : "isHidden")}>
            <TextareaAutosize
               className="form-control mb-2"
               name="comment-content-input"
               rows={4}
               placeholder=""
               value={this.state.commentContent}
               onChange={(ev) => this.setState({ commentContent: ev.target.value })}
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
            {this.state.uploading && <div className="p-2 text-success font-w700">Uploading...</div>}
            {/* <ProgressBar percentage={75} /> */}
            <input type="file"
               ref={this.hiddenFileInput}
               onChange={this.uploadMultipleFiles}
               className="d-none"
               multiple
            />
            <button className="btn btn-hero-sm btn-square btn-outline-warning w-100 p-3"
               onClick={this.handleClickFileOpen}>
               <i className="si si-paper-clip fa-fw mr-1" />Add Image or File
            </button>
            <div className="row no-gutters mt-3">
               <button className="btn btn-secondary mr-2"
                  disabled={this.state.loading}
                  onClick={this.onUpdateComment}>
                  {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}Save
               </button>
               <button className="btn btn-alt-secondary" onClick={this.props.onCancelEdit}>Cancel</button>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
}
const mapDispatchToProps = {
   updateQuoteDiscussions
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentEdit))
