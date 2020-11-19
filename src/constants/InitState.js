export const initQuoteSettings = {
   validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 60),
   sentAt: null,
   userFrom: "",
   // userFrom: {
   //    _id: "",
   //    firstName: "",
   //    lastName: "",
   //    email: "",
   //    companyName: "",
   //    location: "",
   // },

   discount: 0,
   currency: "156",
   taxMode: "no_tax",
   priceDisplayLevel: "itemQuantityAndTotal",
   displayItemCode: true,
};

export const initTemplateSettings = {
   discount: 0,
   currency: "156",
   taxMode: "no_tax",
   priceDisplayLevel: "itemQuantityAndTotal",
   displayItemCode: true,
};

export const initPriceItem = {
   isOptional: false,
   isOptionSelected: false,
   isMultipleChoice: false,
   isChoiceSelected: false,
   isEditableQuantity: false,

   isDiscount: false,
   discount: 0,

   isSubscription: false,

   per: 1,
   every: "week",
   period: 0,

   isCostPriceMargin: false,
   costPrice: 0,
   margin: 20,

   _id: "",
   itemCode: "",
   productHeading: "",
   longDescription: "",
   files: [],
   itemCategory: "sales",
   tax: 10,

   unitPrice: 0,
   quantity: 0,
   itemTotal: 0,
};
export const initTextItem = {
   // _id: "",
   textHeading: "",
   longDescription: "",
   files: [],
};
export const initSubTotal = {
   subTotal: null,
};
