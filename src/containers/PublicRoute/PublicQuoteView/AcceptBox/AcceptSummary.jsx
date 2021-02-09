import clsx from 'clsx';
import React from 'react'
import { useSelector } from 'react-redux'
import CurrencyCode from '../../../../components/shared/CurrencyCode';
import TaxModeDesAs from '../../../../components/shared/TaxModeDesAs';
import CurrencySymbol from '../../../../components/shared/CurrencySymbol';
import SummaryQuoteTotal from '../../../../components/shared/SummaryQuoteTotal';

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
                Total <CurrencyCode /> <TaxModeDesAs /> <CurrencySymbol /> <SummaryQuoteTotal />
            </p>
            <div className="acceptBox-right no_print">
                <a className={clsx("acceptBox-fingerLink", quote.acceptedBy ? "" : "d-none")} onClick={onClickFingerDetail}>Digital Fingerprint…</a>
                <span className="label acceptBox-label">Accepted</span>
            </div>
            <div className="clear" />
        </div>
    )
}
