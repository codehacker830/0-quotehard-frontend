import React from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalComment } from '../../../../actions/Data';

export default function AdditionalComments() {
   const quote = useSelector(state => state.mainData.quote);
   const dispatch = useDispatch();
   const onHandleChange = (val) => {
      dispatch(updateAdditionalComment(val));
   }
   return (
      <div className="form-group-half">
         <label className="label-light" htmlFor="accept_comment">Additional comments</label>
         <TextareaAutosize className="form-control rounded-0" rows={5} placeholder="Optional" name="accept[comment]" id="accept_comment"
            value={quote.additionalComment}
            onChange={ev => onHandleChange(ev.target.value)} />
      </div>
   )
}
