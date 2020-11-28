import {
   GET_TEAMMEMBERS
} from '../constants/ActionTypes';

const initialSettings = {
   teamMembers: []
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case GET_TEAMMEMBERS:
         return {
            ...state,
            teamMembers: action.payload
         };
      default:
         return state;
   }
};