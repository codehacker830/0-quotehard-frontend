import React from 'react'
import { useSelector } from 'react-redux'
import { allCurrencyArrData } from '../../constants/Dump';


export default function CurrencyCode() {
   const quote = useSelector(state => state.mainData.quote);
   const displayCurrencyCodeInTotal = useSelector(state => state.appearanceSetting.displayCurrencyCodeInTotal);
   if (displayCurrencyCodeInTotal) return allCurrencyArrData[quote.settings.currency - 1];
   else return null;
}
