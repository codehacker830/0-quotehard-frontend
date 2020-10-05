import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   USER_SETTINGS,


   THEME_COLOR,
   QUOTE_DEFAULTS
} from '../constants/ActionTypes';

export function setThemeColor(color) {
   return { type: THEME_COLOR, color };
}

export const getSettings = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('settings',
      ).then(({ data }) => {
         console.log("user Settings: ", data);
         if (data.result) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_SETTINGS, payload: data.user });
         } else {
            dispatch({ type: FETCH_ERROR, payload: data.error });
         }
      }).catch(function (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      });
   }
};