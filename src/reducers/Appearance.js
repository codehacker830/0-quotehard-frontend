import { APPEARANCE_SETTINGS, LOGO_URL } from "../constants/ActionTypes";

const initialState = {
   logo: "",

   contactDetailLayout: 0,
   isDisplayFullCustomerDetail: false,
   layout: 0,

   headingFont: 0,
   bodyText: 0,
   headingWeight: 0,

   describeTaxAs: 4,
   displayCurrencySymbolInTotal: true,
   displayCurrencyCodeInTotal: false,

   isEnabledPrintPDF: false,
   pdfPageSize: 1,

   companyName: "",
   companyAddress: "",
   companyWebsite: "",
   companyPhone: ""
};

export default (state = initialState, action) => {
   switch (action.type) {
      case LOGO_URL:
         return {
            ...state,
            logo: action.payload
         };
      case APPEARANCE_SETTINGS:
         return {
            ...state,
            ...action.payload
         }
      default:
         return state;
   }
};