import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_TEAMMATES
} from '../constants/ActionTypes';
import { setInitUrl, userSignOut } from './Auth';

export const getTeamMembers = () => {
   const entoken = localStorage.getItem('entoken');
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/team-members').then(({ data }) => {
         console.log("team-members response : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_TEAMMATES, payload: data.teamMembers });
      }).catch((err) => {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
         dispatch(setInitUrl(`/q/${entoken}`));
         dispatch(userSignOut());
      });


      // axios.get('/team-members').then((res) => {
      //    console.log("get team-members api response ============>", res.data.teamMembers)
      //    this.setState({ teamMembers: res.data.teamMembers });
      // }).catch(err => {
      //    console.error("error during get teamMembers ==>", err);
      //    this.props.setInitUrl(`/q/${entoken}`);
      //    this.props.userSignOut;
      // });

   }
}
