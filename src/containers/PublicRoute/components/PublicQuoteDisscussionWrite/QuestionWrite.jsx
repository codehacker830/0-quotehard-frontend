import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import axios from '../../../../util/Api';
import { toastSuccessConfig, toastWarningConfig } from '../../../../util/toastrConfig';

class QuestionWrite extends Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fileArray: [],
            questionContent: ""
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


    onSubmitQuestion = () => {
        const { questionContent } = this.state;
        console.log('Question and answer write props ===>', this.props);
        const { entoken } = this.props.match.params;
        if (questionContent === "") {
            toast.warn("Answer content should not be empty.", toastWarningConfig);
            return;
        }
        this.setState({ loading: true });
        axios.post('/quotes/ask-question', { content: questionContent, files: this.fileArray, entoken })
            .then(({ data }) => {
                console.log(" question and answer submit response ==> ", data)
                toast.success("Question was Submitted.", toastSuccessConfig);
                this.setState({
                    loading: false,
                    questionContent: ""
                });
                this.props.onClickCancel();
                this.props.updateQuoteDiscussions(data.discussions);
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit question ==>", err);
            });
    }
    render() {
        const { questionSectionShow } = this.props;
        return (
            <div className={`discuss-row discuss-form ${questionSectionShow ? "" : "d-none"}`}>
                <TextareaAutosize
                    className="form-control mb-2"
                    name="example-textarea-input"
                    rows={4}
                    value={this.state.questionContent}
                    onChange={(ev) => this.setState({ questionContent: ev.target.value })} />

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
                    <button className="btn btn-secondary mr-2" disabled={this.state.loading} onClick={this.onSubmitQuestion}>
                        {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                        Submit Question</button>
                    <button className="btn btn-alt-secondary" onClick={this.props.onClickCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ }) => {

}

const mapDispatchToProps = {
    updateQuoteDiscussions
}
export default connect(() => ({}), mapDispatchToProps) (withRouter(QuestionWrite));
