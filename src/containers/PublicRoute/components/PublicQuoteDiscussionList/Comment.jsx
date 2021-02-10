import clsx from 'clsx';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatDateTime } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

class Comment extends Component {
   render() {
      const { discussion } = this.props;
      console.log(" discussion === ", discussion)
      const authorFullName = discussion.comment.author.firstName + " " + discussion.comment.author.lastName;
      return (
         <React.Fragment>
            <div className="discuss-row">
               <div className="discuss-bubble">
                  <div className="bubble-left avatar-48"
                     style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}> </div>
                  <div className="bubble-right">
                     <div className="discuss-title">
                        <strong className="util-no-wrap">{authorFullName}</strong>&nbsp;
                        <span className="lighter">
                           <span className="util-no-wrap">
                              <span className="dt-time">{formatDateTime(discussion.comment.createdAt)}</span>
                              <span className={clsx("dt-time", discussion.comment.createdAt === discussion.comment.updatedAt ? "d-none" : "")}> – modified {formatDateTime(discussion.comment.updatedAt)}</span>
                           </span>&nbsp;
                           <span className="discuss-edit-a">Edit</span>&nbsp;
                        </span>
                     </div>
                     <div className="clear" />
                     <div className="discuss-message">
                        <p>{discussion.comment.content}</p>
                        <AttachedFilesShowCase files={discussion.comment.files} />
                     </div>
                  </div >
               </div >
            </div >
         </React.Fragment >
      )
   }
}

const mapStateToProps = ({ auth, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   return { authUser, quote }
};
export default connect(mapStateToProps)(Comment)