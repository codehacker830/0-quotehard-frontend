import React from 'react';

export const toastDefaultConfig = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastInfoConfig = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastSuccessConfig = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastWarningConfig = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastErrorConfig = {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastSuccessCenterConfig = {
   className: "toast-center",
   position: "top-center",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
}

export const toastMessageOptions = {
   timeOut: 3000, // Default value is 0
   onShowComplete: () => console.log('SHOW: toastr error show is done'),
   onHideComplete: () => console.log('HIDE: toastr error hide is done'),
   removeOnHover: false, // Default value is false
   removeOnHoverTimeOut: 1000, // Default value is 1000
   component: React.Component
}

export const toastrConfirmOptions = {
   onOk: () => console.log('OK: clicked'),
   onCancel: () => console.log('CANCEL: clicked')
};

