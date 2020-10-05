import React from 'react';

export const toastrDefaultConfig = {
   timeOut: 5000,
   newestOnTop: true,
   preventDuplicates: false,
   position: 'top-right',
   transitionIn: 'fadeIn',
   transitionOut: 'fadeOut',
   progressBar: false,
   closeOnToastrClick: true,
};

export const toastrInfoConfig = {
   timeOut: 5000,
   newestOnTop: true,
   preventDuplicates: false,
   position: 'top-right',
   transitionIn: 'bounceIn',
   transitionOut: 'bounceOut',
   progressBar: true,
   closeOnToastrClick: true,
};

export const toastrSuccessConfig = {
   timeOut: 5000,
   newestOnTop: true,
   preventDuplicates: false,
   position: 'top-right',
   transitionIn: 'bounceIn',
   transitionOut: 'bounceOut',
   progressBar: true,
   closeOnToastrClick: true,
};

export const toastrWarningConfig = {
   timeOut: 10000,
   newestOnTop: true,
   preventDuplicates: false,
   position: 'top-right',
   transitionIn: 'fadeIn',
   transitionOut: 'fadeOut',
   progressBar: true,
   closeOnToastrClick: true,
};

export const toastrErrorConfig = {
   timeOut: 10000,
   newestOnTop: true,
   preventDuplicates: false,
   position: 'bottom-right',
   transitionIn: 'fadeIn',
   transitionOut: 'fadeOut',
   progressBar: true,
   closeOnToastrClick: true,
};



export const toastrMessageOptions = {
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

