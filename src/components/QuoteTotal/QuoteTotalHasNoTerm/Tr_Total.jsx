import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calculateSubTotal, checkOutQuoteTotal, toFixedFloat } from '../../../util';
import CurrencyCode from '../../../components/shared/CurrencyCode';
import CurrencySymbol from '../../../components/shared/CurrencySymbol';
import TaxModeDesAs from '../../../components/shared/TaxModeDesAs';

class Tr_Total extends Component {
    render() {
        const { items, settings, salesTaxes } = this.props;
        return (
            <tr className="total">
                <td className="total-desc">
                    <span className="quoteTotal-gDesc">
                        Total <CurrencyCode /> <TaxModeDesAs /> <CurrencySymbol />
                    </span>
                </td>
                <td className="total-price">
                    <span className="quoteTotal-gTotal">
                        <CurrencySymbol /> {toFixedFloat(checkOutQuoteTotal({ items, settings }, salesTaxes))}
                    </span>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = ({ mainData, appearanceSetting, salesSetting }) => {
    const { settings } = mainData.quote;
    const { salesTaxes } = salesSetting;
    return {
        settings,
        salesTaxes
    };
};

export default connect(mapStateToProps)(Tr_Total);
