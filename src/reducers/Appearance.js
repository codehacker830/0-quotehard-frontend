import { APPEARANCE_SETTINGS, LOGO_URL } from "../constants/ActionTypes";

const initialState = {
   logo: null,

   colors: {
      buttonsAndLinks: "#2176C7",
      highlights: "#E9F1F9",
      background: "#fff1f5"
   },

   contactDetailLayout: 0,
   layout: 0,
   isDisplayFullCustomerDetail: true,

   headingFont: 0,
   bodyText: 0,
   headingWeight: 0,

   describeTaxAs: 4,
   displayCurrencySymbolInTotal: true,
   displayCurrencyCodeInTotal: true,

   isEnabledPrintPDF: false,
   pdfPageSize: 1,

   companyDisplayName: "",
   address: "",
   website: "",
   phone: "",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case LOGO_URL:
         return {
            ...state,
            logo: action.payload
         };
      case APPEARANCE_SETTINGS:
         return action.payload
      default:
         return state;
   }
};