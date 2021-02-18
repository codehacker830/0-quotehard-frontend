import clsx from 'clsx';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkIfTeamMember, formatDateTime } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';
import PrivateNoteEdit from './PrivateNoteEdit';

class PrivateNote extends Component {
    state = {
        isEditMode: false
    }
    render() {
        const { discussion } = this.props;
        const { author, teamMembers } = this.props;
        console.log(" quote author ========= ", author)
        if (checkIfTeamMember(author, teamMembers)) return (
            <div className="discuss-row discuss-row-private">
                <div className="discuss-bubble">
                    <div className="bubble-left avatar-48"
                        style={{
                            backgroundImage: `url(${discussion.privateNote.author.image || "https://static.productionready.io/images/smiley-cyrus.jpg"})`,
                            display: this.state.isEditMode ? "none" : "block"
                        }}>
                    </div>
                    <div className="bubble-right">
                        <div className="discuss-title">
                            <span className="label label-green">Private</span>&nbsp;
                            <strong className="util-no-wrap">{discussion.privateNote.author.firstName + " " + discussion.privateNote.author.lastName}</strong>&nbsp;
                            <span className="lighter">
                                <span className="util-no-wrap">
                                    <span className="dt-time">{formatDateTime(discussion.privateNote.createdAt)}</span>&nbsp;
                                </span>
                                <span className={clsx("dt-time", discussion.privateNote.createdAt === discussion.privateNote.updatedAt ? "d-none" : "")}>– modified {formatDateTime(discussion.privateNote.updatedAt)}</span>&nbsp;
                                <span className={clsx("discuss-edit-a", this.state.isEditMode && "isHidden", this.props.authUser ? "" : "d-none")} onClick={() => this.setState({ isEditMode: true })}>Edit</span>&nbsp;
                            </span>
                        </div>
                        <div className="clear" />
                        <div className={clsx("discuss-message", this.state.isEditMode && "isHidden")}>
                            <p>{discussion.privateNote.content}</p>
                            <AttachedFilesShowCase files={discussion.privateNote.files} />
                        </div>
                        <PrivateNoteEdit privateNote={discussion.privateNote} isEditMode={this.state.isEditMode} onCancelEdit={() => this.setState({ isEditMode: false })} />
                    </div>
                </div>
            </div>
        );
        else return null;
    }
}
const mapStateToProps = ({ auth, mainData, teamSetting }) => {
    const { authUser } = auth;
    const { author } = mainData.quote;
    const { teamMembers } = teamSetting;
    return { authUser, author, teamMembers }
};
export default connect(mapStateToProps)(PrivateNote)