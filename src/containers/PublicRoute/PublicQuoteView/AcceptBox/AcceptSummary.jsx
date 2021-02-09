import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';
import React from 'react'
import { useSelector } from 'react-redux'
import { allDescribeTaxAsNameArrData, allCurrencyArrData } from '../../../../constants/Dump';
import { calculateQuoteTotal, toFixedFloat } from '../../../../util';

export const TaxModeDes = () => {
    const quote = useSelector(state => state.mainData.quote);
    const describeTaxAs = useSelector(state => state.appearanceSetting.describeTaxAs);

    switch (quote.settings.taxMode) {
        case "exclusive_including": return `including ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
        case "exclusive_excluding": return `excluding ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
        case "inclusive": return `including ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
        case "no_tax": return "";
        default: return "";
    }
}
export const CurrencyCode = () => {
    const quote = useSelector(state => state.mainData.quote);
    const displayCurrencyCodeInTotal = useSelector(state => state.appearanceSetting.displayCurrencyCodeInTotal);
    if (displayCurrencyCodeInTotal) return allCurrencyArrData[quote.settings.currency - 1];
    else return null;
}
export const CurrencySymbol = () => {
    const quote = useSelector(state => state.mainData.quote);
    const displayCurrencySymbolInTotal = useSelector(state => state.appearanceSetting.displayCurrencySymbolInTotal);
    if (displayCurrencySymbolInTotal) return getSymbolFromCurrency(allCurrencyArrData[quote.settings.currency - 1]);
    else return null;
}
export const SummaryQuoteTotal = () => {
    const quote = useSelector(state => state.mainData.quote);
    return <span className="summaryPartTotal">{toFixedFloat(calculateQuoteTotal(quote))}</span>
}
export default function AcceptSummary() {
    const quote = useSelector(state => state.mainData.quote);
    console.log("------------ quote ", quote)
    const onClickFingerDetail = () => {
        // setFingerDetailShow(!isFingerDetailShow);
    }
    return (
        <div className="acceptSummary">
            {/* <p className="summaryWrap hasTerm">
                    Total USD including TAX $<span className="summaryPartTotal">XXX</span> per month
                </p> */}
            {/* <p className="summaryWrap hasTerm">
                    Total USD including TAX $<span className="summaryPartTotal">148.50</span> per month (for 6 months) (<span className="summaryPartOption">1 of 1</span> options selected)
                </p> */}
            {/* <p className="summaryWrapzFixedCost">
                    Total USD including TAX $<span className="summaryPartTotal">330.00</span> (<span className="summaryPartOption">0 of 2</span> options selected)
                </p> */}
            <p className="summaryWrapzFixedCost">
                Total <CurrencyCode /> <TaxModeDes /> <CurrencySymbol /> <SummaryQuoteTotal />
            </p>
            <div className="acceptBox-right no_print">
                <a className={clsx("acceptBox-fingerLink", quote.acceptedBy ? "" : "d-none")} onClick={onClickFingerDetail}>Digital Fingerprint…</a>
                <span className="label acceptBox-label">Accepted</span>
            </div>
            <div className="clear" />
        </div>
    )
}
