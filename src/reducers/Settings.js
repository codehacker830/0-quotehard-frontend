import {
   QUOTE_DEFAULTS,
   GET_TEAMMATES
} from '../constants/ActionTypes';

const initialSettings = {
   quoteDefaults: null,
   teammates: []
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
            teammates: action.payload
         };
      default:
         return state;
   }
};