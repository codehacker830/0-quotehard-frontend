import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../util/Api';
import { toastErrorConfig, toastSuccessConfig } from '../../../util/toastrConfig';
import { AcceptSummary } from './AcceptSummary';

class AcceptBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

    }
    onClickAccept = () => {
        const { entoken } = this.props.match.params;
        this.setState({ loading: true });
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
    render() {
        const { quote } = this.props;
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
                            value={""} />
                    </div>
                    {/* Order/Reference Number */}
                    <div className="form-group-half">
                        <label className="label-light" htmlFor="accept_reference">Your order/reference number</label>
                        <input className="form-control" placeholder="Optional" name="accept[reference]" defaultValue type="text"
                            id="accept_reference" />
                    </div>
                    {/* acceptCb */}
                    <div className="form-group-half">
                        <div className="acceptCb">
                            <div className="acceptCb-left">
                                <label className="acceptCb-label-box" htmlFor="accept__confirm">
                                    <input className="quote-accept-checkbox" name="accept[_confirm]" defaultValue="yes" type="checkbox" id="accept__confirm" />
                                </label>
                            </div>
                            <div className="acceptCb-right">
                                <label className="acceptCb-label" htmlFor="accept__confirm">
                                    Yes, I Money Owner agree to and accept this quote, on <span className="dt-time">December 8, 2020 at 12:08PM</span>.
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
                            <p>additional comments&nbsp;</p>
                        </div>
                    </div>
                    {/* Order/Reference Number */}
                    <div className="form-group">
                        <label className="label-light">Order/reference number</label>
                        <div className="accept-input-submitted">
                            <p>123 &nbsp;</p>
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
                                    Yes, I Money Owner agree to and accept this quote, on <span className="dt-time">December 8, 2020 at 12:31PM</span>.</label>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ mainData }) => {
    const { quote } = mainData;
    return { quote };
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptBox));
