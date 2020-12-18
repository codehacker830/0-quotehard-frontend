import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIfTeamMember, formatDateTime } from '../../../../util';
import axios from '../../../../util/Api';
import { toastErrorConfig, toastSuccessConfig } from '../../../../util/toastrConfig';
import { AcceptSummary } from './AcceptSummary';

class AcceptBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orderReferenceNumber: "",
            acceptedComment: "",
            isAgree: false
        };

    }
    onClickAccept = () => {
        if (!this.state.isAgree) { toast.success("Check the agree box to accept."); return; }
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        if (isPreviewMode) {
            toast.warn("This is just a preview.");
            return;
        }
        if (this.props.isManualAcceptBoxShow) {
            const quoteId = this.props.quote._id;
            axios.put(`/quotes/status/${quoteId}`, { status: "accepted" }).then(({ data }) => {
                toast.success('Quote accpeted.');
                this.props.history.push(`/q/${data.entoken}`);
            }).catch(err => {
                console.error("Error during update status :", err)
            });

            return;
        }
        const { entoken } = this.props.match.params;
        const { orderReferenceNumber, acceptedComment } = this.state;
        this.setState({ loading: true });
        axios.post('/quotes/accept', { entoken, orderReferenceNumber, acceptedComment })
            .then(() => {
                this.setState({ loading: false });
                toast.success('Quote was Accepted, Thank you.', toastSuccessConfig);
                this.props.history.push(`/q/${entoken}/accepted`);
            })
            .catch(err => {
                this.setState({ loading: false });
                toast.error('Failed during quote acception request.,', toastErrorConfig);
            });
    }
    onClickDecline = () => {
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        if (isPreviewMode) {
            toast.warn("This is just a preview.");
            return;
        }
        const { entoken } = this.props.match.params;
        this.props.history.push(`/q/${entoken}/decline`);
    }
    render() {
        const { person, quote, teamMembers } = this.props;
        const colors = { ...this.props.colors };
        const personFullName = person ? person.firstName + " " + person.lastName : "";
        const isMember = checkIfTeamMember(quote.author, teamMembers);
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        if ((!isMember && quote.status === "awaiting") || isPreviewMode || this.props.isManualAcceptBoxShow) return (
            <React.Fragment>
                {/* Accept Box */}
                <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
                    <h3 className="quote-box-h3-accept">{quote.title}</h3>

                    <AcceptSummary />
                    {/* Additional Comments */}
                    <div className="form-group-half">
                        <label className="label-light" htmlFor="accept_comment">Additional comments</label>
                        <TextareaAutosize className="form-control" rows={5} placeholder="Optional" name="accept[comment]" id="accept_comment"
                            value={this.state.acceptedComment}
                            onChange={ev => this.setState({ acceptedComment: ev.target.value })} />
                    </div>
                    {/* Order/Reference Number */}
                    <div className="form-group-half">
                        <label className="label-light" htmlFor="accept_reference">Your order/reference number</label>
                        <input className="form-control" placeholder="Optional" name="accept[reference]" type="text"
                            id="accept_reference"
                            value={this.state.orderReferenceNumber}
                            onChange={ev => this.setState({ orderReferenceNumber: ev.target.value })} />
                    </div>
                    {/* acceptCb */}
                    <div className="form-group-half">
                        <div className="acceptCb">
                            <div className="acceptCb-left">
                                <label className="acceptCb-label-box" htmlFor="accept__confirm">
                                    <input className="quote-accept-checkbox" name="accept[_confirm]" type="checkbox" id="accept__confirm"
                                        value={this.state.isAgree}
                                        onChange={() => this.setState({ isAgree: !this.state.isAgree })}
                                    />
                                </label>
                            </div>
                            <div className="acceptCb-right">
                                <label className="acceptCb-label" htmlFor="accept__confirm">
                                    Yes, I {personFullName} agree to and accept this quote
                                    {
                                        quote.acceptedAt ?
                                            <>, on <span className="dt-time">{formatDateTime(quote.acceptedAt)}</span>.</>
                                            : null
                                    }
                                </label>
                                <div className="acceptCb-prompt isHidden">
                                    <span className="glyphicon glyphicon-arrow-up" /> Check the box to accept.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="clear" />

                    {/* accept button box */}
                    <div className="quote-box-accept">
                        <button className="btn btn-save btnAccept quote-btn-lg" disabled={this.state.loading} onClick={this.onClickAccept}>
                            {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                            Accept
                        </button>
                        <span className="quote-box-decline-wrap">
                            <button className="btn btn-lg btn-lg-skinny" onClick={this.onClickDecline}>Decline</button>
                        </span>
                    </div>
                </div>
            </React.Fragment>
        )
        else if (quote.status === "accepted") return (
            <React.Fragment>
                {/* Accepted Show Box */}
                <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
                    <h3 className="quote-box-h3-accept">{quote.title}</h3>
                    <AcceptSummary />

                    <div className="fingerDetail isHidden">
                        <div className="fingerDetail-table">
                            <div className="fingerDetail-left isImage">
                                <img src="https://asset.quotientapp.com/image/app/accept-fingerprint.jpg" alt="Accept fingerprint mark" />
                            </div>
                            <div className="fingerDetail-left">
                                <h3 className="u-pad-top-5">Digital Fingerprint</h3>
                                <div className="u-section-4">
                                    <strong>Timestamp:</strong>
                                    <div>Tuesday 8th of December 2020 04:31:35 AM UTC </div>
                                </div>
                                <div className="u-section-4">
                                    <strong>IP Address:</strong>
                                    <div>89.187.161.220 </div>
                                </div>
                                <div><strong>Device information:</strong></div>
                                <div><small>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 </small></div>
                            </div>
                        </div>
                    </div>
                    {/* Additional Comments */}
                    <div className="form-group-half">
                        <label className="label-light">Additional comments</label>
                        <div className="accept-input-submitted">
                            <p>{quote.acceptedComment}&nbsp;</p>
                        </div>
                    </div>
                    {/* Order/Reference Number */}
                    <div className="form-group">
                        <label className="label-light">Order/reference number</label>
                        <div className="accept-input-submitted">
                            <p>{quote.orderReferenceNumber} &nbsp;</p>
                        </div>
                    </div>
                    {/* acceptCb */}
                    <div className="form-group-half">
                        <div className="acceptCb">
                            <div className="acceptCb-left">
                                <label className="acceptCb-label-box">
                                    <input disabled="disabled" name="dummy-not-used" defaultChecked="checked" defaultValue={1} type="checkbox" id="dummy-not-used" /></label>
                            </div>
                            <div className="acceptCb-right">
                                <label className="acceptCb-label-done">
                                    Yes, I {personFullName} agree to and accept this quote
                                    {
                                        quote.acceptedAt ?
                                            <>, on <span className="dt-time">{formatDateTime(quote.acceptedAt)}</span>.</>
                                            : null
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        else return null;
    }
}

const mapStateToProps = ({ auth, mainData, teamSetting, appearanceSetting }) => {
    const { colors } = appearanceSetting;
    const { teamMembers } = teamSetting;
    const { authUser, person } = auth;
    const { quote } = mainData;
    return { colors, authUser, person, quote, teamMembers };
}

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptBox));
