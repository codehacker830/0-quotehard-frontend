import {
   GET_TEAMMATES
} from '../constants/ActionTypes';

const initialSettings = {
   teamMembers: []
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case GET_TEAMMATES:
         return {
            ...state,
            teamMembers: action.payload
         };
      default:
         return state;
   }
};