import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkIfTeamMember, formatDateTime } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

class PrivateNote extends Component {
    render() {
        const { discussion } = this.props;
        const { authUser, teamMembers } = this.props;
        if (checkIfTeamMember(authUser, teamMembers)) return (
            <div className="discuss-row discuss-row-private">
                <div className="discuss-bubble">
                    <div className="bubble-left avatar-48"
                        style={{ backgroundImage: `url(${discussion.privateNote.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"})` }}> </div>
                    <div className="bubble-right">
                        <div className="discuss-title">
                            <span className="label label-green">Private</span>&nbsp; <strong className="util-no-wrap">{discussion.privateNote.author.firstName + " " + discussion.privateNote.author.lastName}&nbsp;</strong>
                            <span className="lighter">
                                <span className="util-no-wrap">
                                    <span className="dt-time">{formatDateTime(discussion.privateNote.updatedAt)}</span></span>&nbsp;
                                {/* <a className="discuss-edit-a">Edit</a>&nbsp; */}
                            </span>
                        </div>
                        <div className="clear" />
                        <div className="discuss-message">
                            <p>{discussion.privateNote.content}</p>
                            <AttachedFilesShowCase files={discussion.privateNote.files} />
                        </div>
                    </div>
                </div>
            </div>
        );
        else return null;
    }
}
const mapStateToProps = ({ auth, teamSetting }) => {
    const { authUser } = auth;
    const { teamMembers } = teamSetting;
    return { authUser, teamMembers }
};
export default connect(mapStateToProps)(PrivateNote)