import React, { Component } from 'react'

export default class SearchBar extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="form-group">
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Search by Quote Title, Number or Contact..." />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-alt-dark">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
