import React from 'react'
import { useSelector } from 'react-redux'
import getSymbolFromCurrency from 'currency-symbol-map';
import { allCurrencyArrData } from '../../constants/Dump';

export default function CurrencySymbol() {
   const quote = useSelector(state => state.mainData.quote);
   const displayCurrencySymbolInTotal = useSelector(state => state.appearanceSetting.displayCurrencySymbolInTotal);
   if (displayCurrencySymbolInTotal) return getSymbolFromCurrency(allCurrencyArrData[quote.settings.currency - 1]);
   else return null;
}