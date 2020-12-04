import { APPEARANCE_SETTINGS, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, LOGO_URL } from "../constants/ActionTypes"
import axios from "../util/Api";


export const setlogoURL = (url) => {
   return {
      type: LOGO_URL,
      payload: url
   };
};
export const uploadLogo = (e) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: LOGO_URL });
      const formData = new FormData();
      const selectedFile = e.target.files[0];
      formData.append(
         "image",
         selectedFile
      );
      console.log("selectedFile --->", selectedFile);
      console.log("formData --->", formData);

      axios.post("/service/upload-file", formData)
         .then(({ data }) => {
            console.log(" image upload response -->", data);
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: LOGO_URL, payload: data.image });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
            console.log(" image upload err -->", err);
         });
   }
}
export const removeLogo = (image) => {
   console.log("______ logo _______", image);
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: LOGO_URL });
      axios.post("/service/remove-image", { image: image })
         .then(() => {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: LOGO_URL, payload: null });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
         })
   }
}

export const getAppearanceSetting = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START, payload: APPEARANCE_SETTINGS });
      try {
         const { data } = await axios.get("/settings/appearance");
         console.log('get appearance setting data', data)
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: APPEARANCE_SETTINGS, payload: data.appearanceSetting });
      } catch (err) {
         dispatch({ type: FETCH_ERROR });
      }
   }
}

export const getPublicAppearanceWithEntoken = () => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.post('/quotes/view-public/appearance', { entoken });
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: APPEARANCE_SETTINGS, payload: data.appearanceSetting });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}

export const updateAppearanceSetting = (setting) => {
   return (dispatch) => dispatch({ type: APPEARANCE_SETTINGS, payload: setting });
}

export const publishAppearanceSettings = (setting) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put("/settings/appearance", { setting });
         console.log('publish response appearanceSetting data :', data)
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: APPEARANCE_SETTINGS, payload: data.appearanceSetting });
      } catch (err) {
         console.error("err during publish appearanceSetting.")
         dispatch({ type: FETCH_ERROR });
      }
   }
}