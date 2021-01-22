import { settings } from 'nprogress';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { swichDescribeTaxAs, switchAmountAreDes, showCurrencyCode, calculateSubTotal, calculateQuoteTotal } from '../../../util'

const showSymbol = (displayCurrencySymbolInTotal, currencyCode) => {
    if (displayCurrencySymbolInTotal) return currencyCode + "$";
    else return "";
}
class Tr_TotalUSD extends Component {
    render() {
        const { items, settings } = this.props;
        const {
            describeTaxAs,
            displayCurrencySymbolInTotal,
            displayCurrencyCodeInTotal,
            salesTaxes
        } = this.props;
        console.log('Tr_TotalUSD.props -------------------->', this.props)
        console.log('displayCurrencyCodeInTotal', displayCurrencyCodeInTotal)
        const currencyCode = showCurrencyCode(displayCurrencyCodeInTotal, settings.currency);
        const amountAre = switchAmountAreDes(settings.taxMode);
        const describeTax = swichDescribeTaxAs(describeTaxAs);
        const currencySymbol = showSymbol(displayCurrencySymbolInTotal, currencyCode);
        console.log('currencyCode', currencyCode)
        return (
            <tr className="total">
                <td className="total-desc">
                    <span className="quoteTotal-gDesc">
                        Total {currencyCode} {amountAre} {describeTax}</span>
                </td>
                <td className="total-price">
                    <span className="quoteTotal-gTotal" style={{}}>
                        {currencySymbol} {calculateQuoteTotal(items, settings, salesTaxes)}
                    </span>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = ({ appearanceSetting, salesSetting }) => {
    const {
        describeTaxAs,
        displayCurrencySymbolInTotal,
        displayCurrencyCodeInTotal
    } = appearanceSetting;
    const { salesTaxes } = salesSetting;
    return {
        describeTaxAs,
        displayCurrencySymbolInTotal,
        displayCurrencyCodeInTotal,
        salesTaxes
    };
};

export default connect(mapStateToProps)(Tr_TotalUSD);
