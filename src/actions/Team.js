import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_TEAMMEMBERS
} from '../constants/ActionTypes';
import { setInitUrl, userSignOut } from './Auth';

export const getTeamMembers = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/settings/team/real-members').then(({ data }) => {
         console.log("team-members response : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_TEAMMEMBERS, payload: data.members });
      }).catch((err) => {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      });
   }
}
