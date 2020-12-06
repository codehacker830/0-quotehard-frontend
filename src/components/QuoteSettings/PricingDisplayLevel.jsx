import { set } from 'lodash';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteSettings } from '../../actions/Data';

export default function PricingDisplayLevel() {
    const settings = useSelector(state => state.mainData.quote.settings);
    const pricingDisplayLevel = settings.pricingDisplayLevel;
    const displayItemCode = settings.displayItemCode;

    const dispatch = useDispatch();
    return (
        <div className="pb-2">
            <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">PRICING DISPLAY LEVEL</label>
            <p className="text-secondary fa-xs">Choose the level of pricing details to present to your customer.</p>
            <div className="custom-control custom-radio custom-control-primary mb-1">
                <input type="radio"
                    className="custom-control-input"
                    id="pricing-display-level1"
                    name="pricing-display-level"
                    value="itemQuantityAndTotal"
                    checked={pricingDisplayLevel === "itemQuantityAndTotal"}
                    onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, pricingDisplayLevel: ev.target.value }))}
                />
                <label className="custom-control-label" htmlFor="pricing-display-level1">Item Quantity & Total</label>
            </div>
            <div className="custom-control custom-radio custom-control-primary mb-1">
                <input type="radio"
                    className="custom-control-input"
                    id="price-display-level2"
                    name="pricing-display-level"
                    value="itemQuantity"
                    checked={pricingDisplayLevel === "itemQuantity"}
                    onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, pricingDisplayLevel: ev.target.value }))}
                />
                <label className="custom-control-label" htmlFor="price-display-level2">Item Quantity</label>
            </div>
            <div className="custom-control custom-radio custom-control-primary mb-1">
                <input type="radio"
                    className="custom-control-input"
                    id="pricing-display-level3"
                    name="pricing-display-level"
                    value="itemTotal"
                    checked={pricingDisplayLevel === "itemTotal"}
                    onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, pricingDisplayLevel: ev.target.value }))}
                />
                <label className="custom-control-label" htmlFor="pricing-display-level3">Item Total</label>
            </div>
            <div className="custom-control custom-radio custom-control-primary mb-1">
                <input type="radio"
                    className="custom-control-input"
                    id="pricing-display-level4"
                    name="pricing-display-level"
                    value="hideAll"
                    checked={pricingDisplayLevel === "hideAll"}
                    onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, pricingDisplayLevel: ev.target.value }))}
                />
                <label className="custom-control-label" htmlFor="pricing-display-level4">Hide All</label>
            </div>
            <hr />
            <div className="custom-control custom-checkbox custom-control-primary mb-1">
                <input type="checkbox"
                    id="display-item-code"
                    className="custom-control-input"
                    name="display-item-code"
                    checked={displayItemCode}
                    onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, displayItemCode: !displayItemCode }))}
                />
                <label className="custom-control-label" htmlFor="display-item-code">Display Item Code Always</label>
            </div>
        </div>
    )
}
