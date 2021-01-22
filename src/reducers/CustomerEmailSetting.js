import {
   GET_ACCEPTEDQUOTE_CUSTOMEREMAIL_SETTING,
   GET_CUSTOMEREMAIL_SETTING,
   GET_FIRSTFOLLOWUP_CUSTOMEREMAIL_SETTING,
   GET_NEWQUOTE_CUSTOMEREMAIL_SETTING,
   GET_SECONDFOLLOWUP_CUSTOMEREMAIL_SETTING,
   GET_ASKFORREVIEW_CUSTOMEREMAIL_SETTING
} from "../constants/ActionTypes";

const initialState = {
   newQuote: {
      subject: "",
      msgHeader: "",
      msgFooter: "",
   },
   acceptedQuote: {
      subject: "",
      msgHeader: "",
      msgFooter: "",
   },
   firstFollowup: {
      subject: "",
      msgHeader: "",
      msgFooter: "",
   },
   secondFollowup: {
      subject: "",
      msgHeader: "",
      msgFooter: "",
   },
   askForReview: {
      subject: "",
      msgHeader: "",
      msgFooter: "",
   }
};

export default (state = initialState,
   action) => {
   switch (action.type) {
      case GET_CUSTOMEREMAIL_SETTING:
         const { newQuote, acceptedQuote, firstFollowup, secondFollowup, askForReview } = action.payload;
         return { newQuote, acceptedQuote, firstFollowup, secondFollowup, askForReview };
      case GET_NEWQUOTE_CUSTOMEREMAIL_SETTING:
         return {
            ...state,
            newQuote: action.payload
         };
      case GET_ACCEPTEDQUOTE_CUSTOMEREMAIL_SETTING:
         return {
            ...state,
            acceptedQuote: action.payload
         };
      case GET_FIRSTFOLLOWUP_CUSTOMEREMAIL_SETTING:
         return {
            ...state,
            firstFollowup: action.payload
         };
      case GET_SECONDFOLLOWUP_CUSTOMEREMAIL_SETTING:
         return {
            ...state,
            secondFollowup: action.payload
         };
      case GET_ASKFORREVIEW_CUSTOMEREMAIL_SETTING:
         return {
            ...state,
            askForReview: action.payload
         };
      default:
         return state;
   }
};