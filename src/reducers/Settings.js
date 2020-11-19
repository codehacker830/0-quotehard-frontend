import {
   QUOTE_DEFAULTS,
   GET_TEAMMATES
} from '../constants/ActionTypes';

const initialSettings = {
   quoteDefaults: null,
   teamMembers: []
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case QUOTE_DEFAULTS:
         return {
            ...state,
            quoteDefaults: action.payload
         };
      case GET_TEAMMATES:
         return {
            ...state,
            teamMembers: action.payload
         };
      default:
         return state;
   }
};