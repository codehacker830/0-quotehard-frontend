import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteSettings } from '../../../../../actions/Data';

export default function Discount() {
    const settings = useSelector(state => state.mainData.quote.settings);
    const discount = settings.discount;

    const dispatch = useDispatch();
    return (
        <div className="pb-2">
            <label htmlFor="quote_discount_overall" className="text-gray fa-xs text-uppercase">DISCOUNT %</label>
            <input type="number"
                id="quote_discount_overall"
                className="form-control rounded-0 maxWidth-180"
                value={discount}
                onChange={(ev) => {
                    const newDiscount = ev.target.value === "" ? 0 : ev.target.value;
                    dispatch(updateQuoteSettings({ ...settings, discount: newDiscount }));
                }}
            />
        </div>
    )
}
