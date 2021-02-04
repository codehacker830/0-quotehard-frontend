import { APPEARANCE_SETTING, COMPANY_DISPLAY_NAME, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, LOGO_URL } from "../constants/ActionTypes"
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
      dispatch({ type: FETCH_START, payload: APPEARANCE_SETTING });
      try {
         const { data } = await axios.get("/settings/appearance");
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: APPEARANCE_SETTING, payload: data.appearanceSetting });
      } catch (err) {
         dispatch({ type: FETCH_ERROR });
      }
   }
}

export const updateAppearanceSetting = (setting) => {
   return (dispatch) => dispatch({ type: APPEARANCE_SETTING, payload: setting });
}

export const publishAppearanceSetting = (setting) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put("/settings/appearance", { setting });
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: APPEARANCE_SETTING, payload: data.appearanceSetting });
         dispatch({ type: COMPANY_DISPLAY_NAME, payload: data.appearanceSetting.companyDisplayName });
      } catch (err) {
         console.error("err during publish appearanceSetting.")
         dispatch({ type: FETCH_ERROR });
      }
   }
}