import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDateTime } from '../../../../util';
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
        const { entoken } = this.props.match.params;
        this.setState({ loading: true });
        if (!this.state.isAgree) { toast.success("Check the agree box to accept."); return; }
        axios.post('/quotes/accept', { entoken: entoken })
            .then(({ data }) => {
                console.log("========== res =========", data);
                this.setState({ loading: false });
                toast.success('Quote was Accepted,', toastSuccessConfig);
                this.props.history.push(`/q/${entoken}/accepted`);
            })
            .catch(err => {
                console.error(" ========== checking public draft error =========", err);
                this.setState({ loading: false });
                toast.error('Failed during quote acception request.,', toastErrorConfig);
            });
    }
    onClickDecline = () => {
        const { entoken } = this.props.match.params;
        this.props.history.push(`/q/${entoken}/decline`);
    }
    render() {
        const { person, quote } = this.props;
        const personFullName = person ? person.firstName + " " + person.lastName : "";
        return (
            <React.Fragment>
                {/* Accept Box */}
                <div className="acceptBox no_print" style={{ backgroundColor: "#e9f1f9" }}>
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
                        <button className="btn btn-save btnAccept quote-btn-lg" onClick={this.onClickAccept}>Accept on behalf</button>
                        <span className="quote-box-decline-wrap">
                            <button className="btn btn-lg btn-lg-skinny" onClick={this.onClickDecline}>Cancel</button>
                        </span>
                    </div>
                </div>




                {/* Accepted Show Box */}
                <div className="acceptBox no_print" style={{ backgroundColor: "#e9f1f9" }}>
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
    }
}

const mapStateToProps = ({ auth, mainData }) => {
    const { person } = auth;
    const { quote } = mainData;
    return { person, quote };
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptBox));
