import {
   SHOW_EXAMPLE_IGNORE_MESSAGE,
   HIDE_EXAMPLE_IGNORE_MESSAGE
} from '../constants/ActionTypes';

const initialSettings = {
   isExampleIgnoreMessageShow: false
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case SHOW_EXAMPLE_IGNORE_MESSAGE:
         return {
            ...state,
            isExampleIgnoreMessageShow: true
         };
      case HIDE_EXAMPLE_IGNORE_MESSAGE:
         return {
            ...state,
            isExampleIgnoreMessageShow: false
         };
      default:
         return state;
   }
};