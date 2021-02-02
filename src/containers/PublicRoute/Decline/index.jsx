import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib'
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../../../util/Api'
import { toastErrorConfig } from '../../../util/toastrConfig'

class Decline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            declinedComment: ""
        }
    }
    onClickDecline = () => {
        const { entoken } = this.props.match.params;
        this.setState({ loading: true });
        axios.post('/quotes/decline', { entoken: entoken, declinedComment: this.state.declinedComment })
            .then(({ data }) => {
                toast.success('Quote declined, thanks for your feedback.');
                this.setState({ loading: false });
                this.props.history.push(`/q/${entoken}`);
            })
            .catch(err => {
                this.setState({ loading: false });
                toast.error('Failed during quote decline request.', toastErrorConfig);
            });
    }
    render() {
        const { entoken } = this.props.match.params;
        return (
            <main id="main-container">
                <div className="row no-gutters">
                    {/* Main Section */}
                    <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                        <div className="container p-3 w-100">
                            <div className="row no-gutters justify-content-center">
                                <div className="col-sm-8 col-xl-6">
                                    <div className="py-3">
                                        <div className="content">
                                            <h1 className="font-w700">Please provide us a little feedback?</h1>
                                            <TextareaAutosize rows={5} className="form-control rounded-0 mb-2"
                                                value={this.state.declinedComment}
                                                onChange={(ev) => this.setState({ declinedComment: ev.target.value })} />
                                            <div className="form-group-half">
                                                <button className="btn btn-default btn-lg mr-2" disabled={this.state.loading} onClick={this.onClickDecline}>
                                                    {this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                                                    Decline quote
                                                </button>
                                                <Link className="btn btn-lg btn-lg-skinny" disabled={this.state.loading} to={`/q/${entoken}`}>Cancel</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END Main Section */}
                </div>
            </main>
        )
    }
}

export default withRouter(Decline);