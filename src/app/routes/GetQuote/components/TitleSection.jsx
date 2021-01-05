import React from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { updateQuoteTitle } from '../../../../actions/Data';

export const TitleSection = (props) => {
    const title = useSelector(state => state.mainData.quote.title);
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(" location ==> ", location);
    let placeHolder = "";
    switch (location.pathname) {
        case "/app/content/template/get":
            placeHolder = "Title of Template";
            break;
        default:
            placeHolder = "Title of Quote";
            break;
    }
    const { isValidWarning } = props;
    return (
        <div className="row">
            <div className="col-12">
                <TextareaAutosize
                    className={`form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4 ${isValidWarning ? "validWarning" : ""}`}
                    rows={1}
                    placeholder={placeHolder}
                    value={title}
                    onChange={(ev) => {
                        props.updateValidWarning();
                        dispatch(updateQuoteTitle(ev.target.value));
                    }}
                ></TextareaAutosize>
            </div>
        </div>
    )
}

export default TitleSection;
