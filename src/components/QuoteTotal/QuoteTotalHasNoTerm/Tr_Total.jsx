import React, { Component } from 'react'
import { connect } from 'react-redux'
import { swichDescribeTaxAs, calculateSubTotal, checkOutQuoteTotal } from '../../../util';
import { allCurrencyArrData } from '../../../constants/Dump';
import getSymbolFromCurrency from 'currency-symbol-map'

const displayCurrencyCode = (displayCurrencyCodeInTotal, currencyInd) => {
    if (displayCurrencyCodeInTotal) return allCurrencyArrData[currencyInd - 1];
    else return "";
}

const displayCurrencySymbol = (displayCurrencySymbolInTotal, currencyInd) => {
    if (displayCurrencySymbolInTotal) return getSymbolFromCurrency(allCurrencyArrData[currencyInd - 1]);
    else return "";
}
const switchTaxInvolveModeStr = (str) => {
    switch (str) {
        case "exclusive_excluding":
            return "excluding"
        default:
            return "including"
    }
}
class Tr_Total extends Component {
    render() {
        const { items, settings } = this.props;
        const {
            describeTaxAs,
            displayCurrencySymbolInTotal,
            displayCurrencyCodeInTotal,
            salesTaxes
        } = this.props;
        console.log('settings -------------------->', settings)
        console.log('Tr_Total.props -------------------->', this.props)
        console.log('displayCurrencySymbolInTotal ----------->', displayCurrencySymbolInTotal)
        console.log('displayCurrencyCodeInTotal ----------->', displayCurrencyCodeInTotal)
        const currencyCode = displayCurrencyCode(displayCurrencyCodeInTotal, settings.currency);
        const amountAre = switchTaxInvolveModeStr(settings.taxMode);
        const describeTax = swichDescribeTaxAs(describeTaxAs);
        const currencySymbol = displayCurrencySymbol(displayCurrencySymbolInTotal, settings.currency);
        console.log('currencyCode ---------->', currencyCode)
        console.log('currencySymbol ---------->', currencySymbol)
        return (
            <tr className="total">
                <td className="total-desc">
                    <span className="quoteTotal-gDesc">
                        Total {currencyCode} {amountAre} {describeTax}</span>
                </td>
                <td className="total-price">
                    <span className="quoteTotal-gTotal">
                        {currencySymbol} {checkOutQuoteTotal({ items, settings }, salesTaxes)}
                    </span>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = ({ mainData, appearanceSetting, salesSetting }) => {
    const { settings } = mainData.quote;
    const {
        describeTaxAs,
        displayCurrencySymbolInTotal,
        displayCurrencyCodeInTotal
    } = appearanceSetting;
    const { salesTaxes } = salesSetting;
    return {
        settings,
        describeTaxAs,
        displayCurrencySymbolInTotal,
        displayCurrencyCodeInTotal,
        salesTaxes
    };
};

export default connect(mapStateToProps)(Tr_Total);
