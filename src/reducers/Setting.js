import {
   QUOTE_DEFAULTS
} from '../constants/ActionTypes';

const initialSettings = {

};

const settings = (state = initialSettings, action) => {
   switch (action.type) {
      case QUOTE_DEFAULTS:
         return {
            ...state,
            quoteDefaults: action.quoteDefaults
         };

      default:
         return state;
   }
};

export default settings;
