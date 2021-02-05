import React, { Component } from 'react'
import qs from 'qs';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
    state = {
        search: ""
    };
    onHandleKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            // event when enter was clicked
            this.onClickSearch();
        }
    }
    onClickSearch = () => {
        this.search = this.state.search;
        let queryObj = {};
        if (this.search) queryObj = { ...queryObj, search: this.search };
        const query = qs.stringify(queryObj);

        this.props.history.push({
            pathname: "/app/quotes",
            search: query
        })
    }
    render() {
        return (
            <div className="col-md-6">
                <div className="form-group">
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Search by Quote Title, Number or Contact..."
                            onKeyDown={this.onHandleKeyDown}
                            value={this.state.search}
                            onChange={ev => this.setState({ search: ev.target.value })}
                        />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-default" onClick={this.onClickSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar);