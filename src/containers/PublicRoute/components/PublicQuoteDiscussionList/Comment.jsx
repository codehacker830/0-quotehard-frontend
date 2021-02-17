import clsx from 'clsx';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatDateTime } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';
import CommentEdit from './CommentEdit';

class Comment extends Component {
   state = {
      isEditMode: false
   };
   render() {
      const { discussion } = this.props;
      console.log(" discussion === ", discussion)
      const authorFullName = discussion.comment.author.firstName + " " + discussion.comment.author.lastName;
      return (
         <React.Fragment>
            <div className="discuss-row">
               <div className="discuss-bubble">
                  <div className="bubble-left avatar-48"
                     style={{
                        backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")',
                        display: this.state.isEditMode ? "none" : "block"
                     }}>
                  </div>
                  <div className="bubble-right">
                     <div className="discuss-title">
                        <strong className="util-no-wrap">{authorFullName}</strong>&nbsp;
                        <span className="lighter">
                           <span className="util-no-wrap">
                              <span className="dt-time">{formatDateTime(discussion.comment.createdAt)}</span>&nbsp;
                           </span>
                           <span className={clsx("dt-time", discussion.comment.createdAt === discussion.comment.updatedAt ? "d-none" : "")}>– modified {formatDateTime(discussion.comment.updatedAt)}</span>&nbsp;
                           <span className={clsx("discuss-edit-a", this.state.isEditMode && "isHidden", this.props.authUser ? "" : "d-none")} onClick={() => this.setState({ isEditMode: true })}>Edit</span>&nbsp;
                        </span>
                     </div>
                     <div className="clear" />
                     <div className={clsx("discuss-message", this.state.isEditMode && "isHidden")}>
                        <p>{discussion.comment.content}</p>
                        <AttachedFilesShowCase files={discussion.comment.files} />
                     </div>
                     <CommentEdit comment={discussion.comment} isEditMode={this.state.isEditMode} onCancelEdit={() => this.setState({ isEditMode: false })} />
                  </div >
               </div >
            </div >
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser }
};
export default connect(mapStateToProps)(Comment)