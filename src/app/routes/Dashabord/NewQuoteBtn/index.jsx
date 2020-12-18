import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { QUOTE_GET_PATH } from '../../../../constants/PathNames';
import axios from '../../../../util/Api';

class NewQuoteBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dropdownOpen: false,
            defaultTemplateId: null,
            templates: [],
        };
        this.dropdownContainer = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);

        // get all current templates and default ID
        const Promise1 = axios.get('/templates/status/current');
        const Promise2 = axios.get('/templates/defaultId');
        Promise.all([Promise1, Promise2]).then((values) => {
            const { defaultTemplateId } = values[1].data;
            console.log('defaultTemplateId', values)
            this.setState({
                loading: false,
                templates: values[0].data.templates,
                defaultTemplateId
            })
        }).catch(err => {
            this.setState({ loading: false });
            console.error(" error ===>", err);
        });
    }
    onClickOutsideHandler = (ev) => {
        if (this.state.dropdownOpen && !this.dropdownContainer.current.contains(ev.target)) {
            this.setState({ dropdownOpen: false });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }
    render() {

        return (
            <div className="col-md-6">
                <div className="form-group">
                    <div style={{ position: "relative", width: "fit-content" }} ref={this.dropdownContainer}>
                        <button className="btn btn-success"
                            onClick={() => {
                                if (this.state.templates.length === 0) {
                                    this.props.history.push({
                                        pathname: QUOTE_GET_PATH,
                                        state: {
                                            from: this.props.location.pathname
                                        }
                                    });
                                } else this.setState({ dropdownOpen: !this.state.dropdownOpen })
                            }}>
                            <span>New Quote</span>
                            {
                                this.state.templates.length !== 0 &&
                                <i className={`fa fa-fw fa-angle-down ml-1 `} />
                            }
                        </button>
                        <div className={`dropdown-menu dropdown-menu-left p-0 border ${this.state.dropdownOpen ? "show" : ""}`}>
                            <ul className="choices" data-tg-control="QuoteNew">
                                {
                                    this.state.templates.map((template, index) => {
                                        if (template._id === this.state.defaultTemplateId) return (
                                            <React.Fragment key={index}>
                                                <li key={index}>
                                                    {/* <Link to={`/app/quote/get/from-template/${template._id}`} className="btn-in-action">
                                                        <span className="icon-wrapper"><i className="fa fa-fw fa-star" /></span>&nbsp;
                                                        <span>{template.title}</span>
                                                    </Link> */}
                                                    <button className="btn-in-action" onClick={() => this.props.history.push(`/app/quote/get/from-template/${template._id}`)}>
                                                        <div className="icon-wrapper">
                                                            <i className="fa fa-fw fa-star" />
                                                        </div>
                                                        <div className="media-body font-size-sm pr-2">
                                                            <span>{template.title}</span>
                                                        </div>
                                                    </button>
                                                </li>
                                                <li className="choices-break" />
                                            </React.Fragment>
                                        );
                                        else return (
                                            <li key={index}>
                                                <button className="btn-in-action" onClick={() => this.props.history.push(`/app/quote/get/from-template/${template._id}`)}>
                                                    <div className="icon-wrapper" />
                                                    <div className="media-body font-size-sm pr-2">
                                                        <span>{template.title}</span>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })
                                }
                                <li className="choices-break" />
                                <li>
                                    <button className="btn-in-action" onClick={() => this.props.history.push({
                                        pathname: QUOTE_GET_PATH,
                                        state: {
                                            from: this.props.location.pathname
                                        }
                                    })}>
                                        <div className="icon-wrapper" />
                                        <div className="media-body font-size-sm pr-2">
                                            <span>New Quote, without Template</span>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NewQuoteBtn);
