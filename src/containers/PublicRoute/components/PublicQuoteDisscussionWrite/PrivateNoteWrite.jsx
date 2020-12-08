import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteDiscussions } from '../../../../actions/Data';
import axios from '../../../../util/Api';
import { toastSuccessConfig, toastWarningConfig } from '../../../../util/toastrConfig';

class PrivateNoteWrite extends Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            fileArray: [],
            toMateAccountId: "",
            privateNoteContent: ""
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


    onClickAddPrivateNote = () => {
        const { privateNoteContent, toMateAccountId } = this.state;
        const { entoken } = this.props.match.params;
        if (privateNoteContent === "") {
            toast.warn("Private note should not be empty.", toastWarningConfig);
            return;
        }
        this.setState({ loading: true });
        axios.post('/quotes/private-note', { content: privateNoteContent, files: this.fileArray, toMateAccountId, entoken })
            .then(({ data }) => {
                toast.success("Private note submitted.", toastSuccessConfig);
                console.log(" Private note submit response ==> ", data)
                this.setState({
                    loading: false,
                    privateNoteContent: "",
                });
                this.props.onClickCancel();
                this.props.updateQuoteDiscussions(data.discussions);
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error("error during submit private note ==>", err);
            });
    }
    render() {
        const { privateNoteShow } = this.props;
        const { teamMembers, authUser } = this.props;
        return (
            <div className={`discuss-row discuss-form ${privateNoteShow ? "" : "isHidden"}`}>
                <h3>Private Note</h3>
                <div className="form-group">
                    <label htmlFor="sendMode">Send to:</label>
                    <select className="form-control" id="sendMode" name="sendMode"
                        value={this.state.toMateAccountId}
                        onChange={(ev) => this.setState({ toMateAccountId: ev.target.value })}
                    >
                        <option value={""}>Add as Private Note only</option>
                        {
                            teamMembers.length ?
                                <optgroup label="Send email to:">
                                    {
                                        teamMembers.map((mate, index) => {
                                            const mateFullName = mate.firstName + " " + mate.lastName;
                                            const isMe = mate._id === authUser._id;
                                            return (<option value={mate._id} key={index}>{mateFullName} {isMe ? "- note to self" : ""}</option>);
                                        })
                                    }
                                </optgroup>
                                : null
                        }

                    </select>
                </div>
                <TextareaAutosize
                    className="form-control mb-2"
                    name="example-textarea-input"
                    rows={4}
                    placeholder="Write private note..."
                    value={this.state.privateNoteContent}
                    onChange={(ev) => this.setState({ privateNoteContent: ev.target.value })}
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
                    onClick={this.handleClickFileOpen}
                >
                    <i className="si si-paper-clip fa-fw mr-1"></i>
                    Add Image or File
                </button>

                <div className="row no-gutters my-3">
                    <button className="btn btn-success mr-2" disabled={this.state.loading} onClick={this.onClickAddPrivateNote}>
                        {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}Add Private Note
                    </button>
                    <button className="btn btn-alt-secondary" onClick={this.props.onClickCancel}>Cancel</button>
                </div>
                <div className="row no-gutters">
                    <p>Customers will <strong>not</strong> see Private Notes on Quotes.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, teamSetting }) => {
    const { authUser } = auth;
    const { teamMembers } = teamSetting;
    return { authUser, teamMembers };
}

const mapDispatchToProps = {
    updateQuoteDiscussions
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateNoteWrite))
