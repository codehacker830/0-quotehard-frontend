import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   FOLLOW_UP_SETTING
} from "../constants/ActionTypes";
import axios from '../util/Api'

export const updateFollowUpSetting = (payload) => {
   return async (dispatch) => {
      dispatch({ type: FOLLOW_UP_SETTING, payload: payload });
   }
}