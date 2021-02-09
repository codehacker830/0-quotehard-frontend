import React from 'react';
import { useSelector } from 'react-redux';
import { calculateQuoteTotal, toFixedFloat } from '../../util';

export default function SummaryQuoteTotal() {
   const quote = useSelector(state => state.mainData.quote);
   return <span className="summaryPartTotal">{toFixedFloat(calculateQuoteTotal(quote))}</span>;
}
