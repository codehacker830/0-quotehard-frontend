export const initQuoteSettings = {
   validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 365),
   sentAt: new Date(),
   userFrom: {
      _id: "5f7b39e8f1f85766fc60d8d3",
      firstName: "A",
      lastName: "Devom",
      email: "honestypasion0615@gmail.com",
      companyName: "AllOver",
      location: "232",
   },

   discount: 50,
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
   period: 1,

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