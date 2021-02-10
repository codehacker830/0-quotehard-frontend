import clsx from 'clsx';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import { formatDateTime } from '../../../../util';
import axios from '../../../../util/Api';
import { toastSuccessConfig, toastWarningConfig } from '../../../../util/toastrConfig';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

class QuestionAndAnswer extends Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            fileArray: [],
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


    submitAnswer = (qaId) => {
        const { answerContent } = this.state;
        const { entoken } = this.props.match.params;
        if (answerContent === "") {
            toast.warn("Answer content should not be empty.", toastWarningConfig);
            return;
        }
        this.setState({ loading: true });
        axios.post('/quotes/answer-question', { content: answerContent, files: this.fileArray, entoken, qaId })
            .then(({ data }) => {
                toast.success("Answer submitted.", toastSuccessConfig);
                this.setState({
                    loading: false,
                    answerContent: ""
                });
                this.props.updateQuoteDiscussions(data.discussions);
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit answer ==>", err);
            });
    }
    submitDismiss = (qaId) => {
        const { entoken } = this.props.match.params;
        this.setState({ loading: true });
        axios.post('/quotes/dismiss', { entoken, qaId })
            .then(({ data }) => {
                toast.success("Answer dismissed.", toastSuccessConfig);
                this.setState({
                    loading: false,
                    answerContent: ""
                });
                this.props.updateQuoteDiscussions(data.discussions);
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit dismiss ==>", err);
            });
    }
    render() {
        const { discussion } = this.props;
        const { authUser, quote } = this.props;
        const isAnswerAbleUser = authUser && quote && (authUser._id === quote.author._id);
        return (
            <React.Fragment>
                <div className="discuss-row">
                    <div className="discuss-bubble">
                        <div className="bubble-left avatar-48"
                            style={{ backgroundImage: `url(${discussion.questionAndAnswer.question.author.image || "https://secure.gravatar.com/avatar/5b790291599408b1b231ae1cf4c7a07a?r=g&s=64&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png"})` }}>
                        </div>
                        <div className="bubble-right">
                            <div className="discuss-title">
                                <strong className="util-no-wrap">
                                    {discussion.questionAndAnswer.question.author.firstName + " " + discussion.questionAndAnswer.question.author.lastName}&nbsp;
                                </strong>
                                <span className="lighter">
                                    <span className="util-no-wrap">
                                        <span className="dt-time">{formatDateTime(discussion.questionAndAnswer.question.createdAt)}</span></span>&nbsp;
                                </span>
                            </div>
                            <div className="clear" />
                            <div className="discuss-message">
                                <p>{discussion.questionAndAnswer.question.content}</p>
                                <AttachedFilesShowCase files={discussion.questionAndAnswer.question.files} />
                            </div>
                        </div>
                    </div>
                </div>
                { discussion.questionAndAnswer.answer.status === "dismissed" && null}
                {
                    discussion.questionAndAnswer.answer.status === "answered" &&
                    <div className="discuss-row">
                        <div className="discuss-bubble">
                            <div className="bubble-left avatar-48"
                                style={{ backgroundImage: `url(${discussion.questionAndAnswer.answer.author.image || "https://secure.gravatar.com/avatar/5b790291599408b1b231ae1cf4c7a07a?r=g&s=64&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png"})` }}>
                            </div>
                            <div className="bubble-right">
                                <div className="discuss-title">
                                    <strong className="util-no-wrap">{discussion.questionAndAnswer.answer.author.firstName + " " +
                                        discussion.questionAndAnswer.answer.author.lastName}&nbsp;</strong>
                                    <span className="lighter">
                                        <span className="util-no-wrap">
                                            <span className="dt-time">{formatDateTime(discussion.questionAndAnswer.answer.createdAt)}</span></span>&nbsp;
                                            <span className={clsx("dt-time", discussion.questionAndAnswer.answer.createdAt === discussion.questionAndAnswer.answer.updatedAt ? "d-none" : "")}> – modified {formatDateTime(discussion.questionAndAnswer.answer.updatedAt)}</span>
                                            <span className="discuss-edit-a">Edit</span>&nbsp;
                                        </span>
                                </div>
                                <div className="clear" />
                                <div className="discuss-message">
                                    <p>{discussion.questionAndAnswer.answer.content}</p>
                                    <AttachedFilesShowCase files={discussion.questionAndAnswer.answer.files} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    discussion.questionAndAnswer.answer.status === "pending" && isAnswerAbleUser &&
                    <div className="discuss-row discuss-form">
                        <textarea
                            className="form-control mb-2"
                            name="example-textarea-input"
                            rows={4}
                            state={this.state.answerContent}
                            onChange={(ev) => this.setState({ answerContent: ev.target.value })} />

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
                            onClick={this.handleClickFileOpen}
                        >
                            <i className="si si-paper-clip fa-fw mr-1"></i>
                            Add Image or File
                        </button>
                        <div className="row no-gutters mt-3">
                            <button className="btn btn-secondary mr-2" disabled={this.state.loading} onClick={() => this.submitAnswer(discussion._id)}>
                                {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                                Answer Question
                            </button>
                            <button className="btn btn-alt-secondary" disabled={this.state.loading} onClick={() => this.submitDismiss(discussion._id)}>
                                {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                                Dismiss
                            </button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ auth, mainData }) => {
    const { authUser } = auth;
    const { quote } = mainData;
    return { authUser, quote }
};
const mapDispatchToProps = {
    updateQuoteDiscussions
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionAndAnswer))