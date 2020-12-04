import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { updateQuoteTitle } from '../../../../actions/Data';

export const QuoteTitle = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <TextareaAutosize
                    className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4"
                    rows={1}
                    placeholder="Title of Quote"
                    value={props.title}
                    onChange={(ev) => props.updateQuoteTitle(ev.target.value)}
                ></TextareaAutosize>
            </div>
        </div>
    )
}

const mapStateToProps = ({ mainData }) => {
    const { title } = mainData.quote;
    return { title };
};

const mapDispatchToProps = {
    updateQuoteTitle
};
export default connect(mapStateToProps, mapDispatchToProps)(QuoteTitle);
