import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_TEAMMATES
} from '../constants/ActionTypes';

export const getTeamMembers = () => {
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