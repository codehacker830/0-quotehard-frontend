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
            templates: [],
        };
        this.dropdownContainer = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
        // get all quotes and templates
        axios.get('/templates/current').then(({ data }) => {
            this.setState({
                loading: false,
                templates: data.templates
            })
        }).catch(err => {
            this.setState({ loading: false });
            console.error("  get current template error ===>", err);
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
                            <div className="p-2">
                                {
                                    this.state.templates.map((template, index) => {
                                        return (
                                            <Link className="dropdown-item" to={`/app/quote/get/from-template/${template._id}`} key={index}>{template.title}</Link>
                                        );
                                    })
                                }
                                <div role="separator" className="dropdown-divider" />
                                <Link className="dropdown-item" to={{
                                    pathname: QUOTE_GET_PATH,
                                    state: {
                                        from: this.props.location.pathname
                                    }
                                }}>
                                    New Quote, without Template
                           </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NewQuoteBtn);
