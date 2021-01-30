import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { acceptOnBehalfQuote } from '../../../../actions/Data';
import { checkIfTeamMember, formatDateTime } from '../../../../util';
import axios from '../../../../util/Api';
import { AcceptSummary } from './AcceptSummary';
import AdditionalComments from './AdditionalComments';
import OrderReferenceNumber from './OrderReferenceNumber';
import AcceptedOrderReferenceNumber from './AcceptedOrderReferenceNumber';
import AcceptedAdditionalComments from './AcceptedAdditionalComments';
import clsx from 'clsx';
import _ from 'lodash';
import AcceptOnBehalfBox from './AcceptOnBehalfBox.jsx';

class AcceptBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAgree: false,
            onBehalfOfPersonId: null,
            isAcceptEmailNotify: false
        };

    }
    onClickAccept = () => {
        if (!this.state.isAgree) { toast.success("Check the agree box to accept."); return; }
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        if (isPreviewMode) {
            toast.warn("This is just a preview.");
            return;
        }
        const { entoken } = this.props.match.params;
        const { orderReferenceNumber, additionalComment } = this.props.quote;

        this.setState({ loading: true });
        axios.post('/quotes/accept', { entoken, orderReferenceNumber, additionalComment })
            .then(() => {
                this.setState({ loading: false });
                toast.success('Quote was Accepted, Thank you.');
                this.props.history.push(`/q/${entoken}/accepted`);
            })
            .catch(err => {
                this.setState({ loading: false });
                toast.error('Failed during quote acception request.,');
            });
    }
    onClickDecline = () => {
        const isPreviewMode = (this.props.match.path === "/q/:entoken/preview");
        if (isPreviewMode) {
            toast.warn("This is just a preview.");
            return;
        }
        const { entoken } = this.props.match.params;
        this.props.history.push(`/q/${entoken}/decline`);
    }

    render() {
        const { person, quote, teamMembers, colors } = this.props;
        const customerFullName = person ? person.firstName + " " + person.lastName : "";
        const isMember = checkIfTeamMember(quote.author, teamMembers);
        const isPreviewMode = (this.props.match.path === "/q/:entoken/preview");
        if (this.props.isAcceptOnBehalfBoxShow) return <AcceptOnBehalfBox />;
        else if ((!isMember && quote.status === "awaiting") || isPreviewMode) return (
            <div className="acceptBox no_print" style={{ backgroundColor: `${colors.highlights}` }}>
                <h3 className="quote-box-h3-accept">{quote.title}</h3>

                <AcceptSummary />
                <AdditionalComments />
                <OrderReferenceNumber />
                {/* acceptCb */}
                <div className="form-group-half">
                    <div className="acceptCb">
                        <div className="acceptCb-left">
                            <label className="acceptCb-label-box" htmlFor="accept__confirm">
                                <input className="quote-accept-checkbox" name="accept[_confirm]" type="checkbox" id="accept__confirm"
                                    checked={this.state.isAgree}
                                    onChange={() => this.setState({ isAgree: !this.state.isAgree })}
                                />
                            </label>
                        </div>
                        <div className="acceptCb-right">
                            <label className="acceptCb-label" htmlFor="accept__confirm">
                                Yes, I {customerFullName} agree to and accept this quote
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
                    <button className="btn btn-save btnAccept btn-lg" disabled={this.state.loading} onClick={this.onClickAccept}>
                        {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                    Accept
                </button>
                    <span className="quote-box-decline-wrap">
                        <button className="btn btn-lg btn-lg-skinny" onClick={this.onClickDecline}>Decline</button>
                    </span>
                </div>
            </div>
        );
        else if (quote.status === "accepted") return (
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
                <AcceptedAdditionalComments />
                <AcceptedOrderReferenceNumber />
                {/* acceptCb */}
                <div className="form-group-half">
                    <div className="acceptCb">
                        <div className="acceptCb-left">
                            <label className="acceptCb-label-box">
                                <input disabled="disabled" name="dummy-not-used" defaultChecked="checked" type="checkbox" id="dummy-not-used" /></label>
                        </div>
                        <div className="acceptCb-right">
                            <label className="acceptCb-label-done">
                                Yes, I {customerFullName} agree to and accept this quote{quote.acceptedAt ? <>, on <span className="dt-time">{formatDateTime(quote.acceptedAt)}</span>.</> : null}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
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
    acceptOnBehalfQuote
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptBox));
