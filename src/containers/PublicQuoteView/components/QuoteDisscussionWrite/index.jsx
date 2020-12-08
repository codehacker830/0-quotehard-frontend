import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import axios from '../../../../util/Api';
import { toastErrorConfig, toastSuccessConfig, toastWarningConfig } from '../../../../util/toastrConfig';
import CommentWrite from './CommentWrite';
import PrivateNoteWrite from './PrivateNoteWrite';
import QuestionWrite from './QuestionWrite';

class QuoteDisscussionWrite extends Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
            privateNoteShow: false,
            questionSectionShow: false,

            fileArray: [],
        };
        this.hiddenFileInput = React.createRef();
    }

    handleClickFileOpen = () => {
        this.hiddenFileInput.current.click();
    }
    uploadMultipleFiles = (e) => {
        console.log("uploadMultipleFiles ==>", e.target.files);
        this.fileObj = [];
        this.fileObj.push(e.target.files);
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ fileArray: this.fileArray });
    }

    removeImageItem = (url) => {
        const newFileArray = this.state.fileArray.filter(item => item !== url);
        this.setState({ fileArray: newFileArray });
    }

    onClickDecline = () => {
        const { entoken } = this.props.match.params;
        axios.post('/quotes/decline', { entoken: entoken })
            .then(({ data }) => {
                console.log("========== res =========", data);
                toast.success('Quote was Declined,', toastSuccessConfig);
            })
            .catch(err => {
                console.error(" ========== checking public draft error =========", err);
                this.setState({ loading: false });
                toast.error('Failed during quote decline request.,', toastErrorConfig);
            });
    }

    onSubmitQuestion = () => {
        const { questionContent } = this.state;
        const { entoken } = this.props.match.params;
        if (questionContent === "") {
            toast.warn("Answer content should not be empty.", toastWarningConfig);
            return;
        }
        this.setState({ loading: true });
        axios.post('/quotes/ask-question', { questionContent, entoken })
            .then(({ data }) => {
                toast.success("Question was Submitted.", toastSuccessConfig);
                this.setState({
                    loading: false,
                    discussions: data.discussions,
                    questionContent: ""
                });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit question ==>", err);
            });
    }
    submitAnswer = (qaId) => {
        const { answerContent } = this.state;
        const { entoken } = this.props.match.params;
        if (answerContent === "") {
            toast.warn("Answer content should not be empty.");
            return;
        }
        this.setState({ loading: true });
        axios.post('/quotes/answer-question', { answerContent, entoken, qaId })
            .then(({ data }) => {
                toast.success("Answer was Submitted.", toastSuccessConfig);
                this.setState({
                    loading: false,
                    discussions: data.discussions,
                    answerContent: ""
                });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit answer ==>", err);
            });
    }
    render() {
        const { quote } = this.props;
        return (
            <div className="no_print u-section-2">
                <div className="discuss-wrap">
                    {/* controller button wrapper  */}
                    <div className={`discuss-button-wrap ${this.state.commentShow || this.state.privateNoteShow ? "isHidden" : ""}`}>
                        {
                            quote.status === "awaiting" &&
                            <button className="btn btn-sm btn-dark font-size-sm px-2 py-1 mr-2" onClick={() => this.setState({ commentShow: true })}>Comment</button>
                        }
                        <button className="btn btn-sm btn-success font-size-sm px-2 py-1" onClick={() => this.setState({ privateNoteShow: true })}>Private Note</button>
                    </div>

                    {/* ------------------- comment wraper ----------------------- */}
                    <CommentWrite commentShow={this.state.commentShow} onClickCancel={() => this.setState({ commentShow: false, privateNoteShow: false })} />

                    {/* --------------------- private note wraper --------------------------- */}
                    <PrivateNoteWrite privateNoteShow={this.state.privateNoteShow} onClickCancel={() => this.setState({ commentShow: false, privateNoteShow: false })} />



                    {/* question button wrapper  */}
                    <div className={`discuss-button-wrap ${this.state.questionSectionShow ? "d-none" : ""}`}>
                        <button className="btn btn-hero-lg btn-outline-primary mr-1 mb-3" onClick={() => this.setState({ questionSectionShow: true })}>Ask a Question</button>
                    </div>

                    {/* --------------------- question section wraper ------------------------ */}
                    <QuestionWrite questionSectionShow={this.state.questionSectionShow} onClickCancel={() => this.setState({ questionSectionShow: false })} />
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
export default connect(mapStateToProps, mapDispatchToProps)(QuoteDisscussionWrite)