import React from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useDispatch, useSelector } from 'react-redux'
import { updateQuoteTitle } from '../../../../actions/Data';

export const QuoteTitle = () => {
    const title = useSelector(state => state.mainData.quote.title);
    const dispatch = useDispatch();
    return (
        <div className="row">
            <div className="col-12">
                <TextareaAutosize
                    className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4"
                    rows={1}
                    placeholder="Title of Quote"
                    value={title}
                    onChange={(ev) => dispatch(updateQuoteTitle(ev.target.value))}
                ></TextareaAutosize>
            </div>
        </div>
    )
}

export default QuoteTitle;
