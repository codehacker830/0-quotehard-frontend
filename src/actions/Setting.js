import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   USER_SETTINGS,


   THEME_COLOR,
   QUOTE_DEFAULTS,
   GET_TEAMMATES
} from '../constants/ActionTypes';

export function setThemeColor(color) {
   return { type: THEME_COLOR, color };
}

export const getSettings = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/settings').then(({ data }) => {
         console.log("user Settings : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: USER_SETTINGS, payload: data.user });
      }).catch(function (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      });
   }
};

export const getTeammates = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/team-members').then(({ data }) => {
         console.log("team-members response : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_TEAMMATES, payload: data.teamMembers });
      }).catch((err) => {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      })
   }
}