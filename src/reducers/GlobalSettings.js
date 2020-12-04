import {
   QUOTE_DEFAULTS,
   GET_SALES_CATEGORIES,
   GET_SALES_TAXES,
   GET_DEFAULT_SALES_CATEGORY,
   GET_DEFAULT_SALES_TAX
} from '../constants/ActionTypes';

const initialSettings = {
   quoteDefaults: null,
   salesCatgories: [],
   salesTaxes: [],
   defaultSalesCategory: "",
   defaultSalesTax: "",
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case QUOTE_DEFAULTS:
         return {
            ...state,
            quoteDefaults: action.payload
         };
      case GET_SALES_CATEGORIES:
         return {
            ...state,
            salesCatgories: action.payload
         };
      case GET_SALES_TAXES:
         return {
            ...state,
            salesTaxes: action.payload
         };
      case GET_DEFAULT_SALES_CATEGORY:
         return {
            ...state,
            defaultSalesCategory: action.payload
         };
      case GET_DEFAULT_SALES_TAX:
         return {
            ...state,
            defaultSalesTax: action.payload
         };
      default:
         return state;
   }
};