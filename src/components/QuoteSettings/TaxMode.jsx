import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteSettings } from '../../actions/Data';

export default function TaxMode() {
    const settings = useSelector(state => state.mainData.quote.settings);
    const taxMode = settings.taxMode;

    const dispatch = useDispatch();
    return (
        <div className="pb-2">
            <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">AMOUNTS ARE</label>
            <select className="custom-select rounded-0"
                value={taxMode}
                onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, taxMode: ev.target.value }))}>
                <option value="exclusive_including">Tax Exclusive (Inclusive Total)</option>
                <option value="exclusive_excluding">Tax Exclusive</option>
                <option value="inclusive">Tax Inclusive</option>
                <option value="no_tax">No Tax</option>
            </select>
        </div>
    )
}
