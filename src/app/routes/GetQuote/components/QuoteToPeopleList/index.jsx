import React, { Component } from 'react'
import CompleterContact from './CompleterContact';
import { LableFor } from './LableFor';
import QuoteToContactsShow from './QuoteToContactsShow';

class QuoteToPeopleList extends Component {
    render() {
        return (
            <div className="col-sm-6">
                <div className="d-flex">
                    <div className="p-1 font-w700">To</div>
                    <div className="p-1 w-100 maxWidth-550">
                        <div className="row no-gutters">
                            <QuoteToContactsShow />
                        </div>
                        <div className="row no-gutters"
                            style={{ position: "relative" }}
                        >
                            <CompleterContact />
                            <LableFor />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default QuoteToPeopleList;