import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatDateTime } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

class Comment extends Component {
   render() {
      const { discussion } = this.props;
      return (
         <React.Fragment>
            <div className="discuss-row">
               <div className="discuss-bubble">
                  <div className="bubble-left avatar-48"
                     style={{ backgroundImage: 'url("https://asset.quotientapp.com/file-s/1/avatar-v2/128")' }}> </div>
                  <div className="bubble-right">
                     <div className="discuss-title">
                        <strong className="util-no-wrap">{discussion.comment.author.firstName + " " + discussion.comment.author.lastName}&nbsp;</strong>
                        <span className="lighter">
                           <span className="util-no-wrap"><span className="dt-time">{formatDateTime(discussion.comment.updatedAt)}</span></span>&nbsp;
                                 {/* <a className="discuss-edit-a">Edit</a>&nbsp; */}
                        </span>
                     </div >
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