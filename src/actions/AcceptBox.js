import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_CUSTOMEREMAIL_SETTING
} from '../constants/ActionTypes';

export const getCustomerEmailSetting = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/settings/customer-email');
         console.log(" customer email api res : ", data);
         dispatch({ type: GET_CUSTOMEREMAIL_SETTING, payload: data });
         dispatch({ type: FETCH_SUCCESS });
      } catch (error) {
         console.log("Error****:", error.message);
         dispatch({ type: FETCH_ERROR, payload: error.message });
      }
   }
}