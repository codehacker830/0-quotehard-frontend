export const initQuoteSettings = {
   validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 60),
   sentAt: new Date(),
   userFrom: "",
   discount: 0,
   currency: "156",
   taxMode: "exclusive_including",
   pricingDisplayLevel: "itemQuantityAndTotal",
   displayItemCode: true,
};

export const initTemplateSettings = {
   discount: 0,
   currency: "156",
   taxMode: "exclusive_including",
   pricingDisplayLevel: "itemQuantityAndTotal",
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
   every: "month",
   period: 0,

   isCostPriceMargin: false,
   costPrice: 0,
   margin: 20,

   _id: "",
   itemCode: "",
   productHeading: "",
   longDescription: "",
   files: [],
   salesCategory: "",
   salesTax: "",

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


console.log('~~~~~~~~~~~~~~~~ initPriceItem ~~~~~~~~~~~~~~~~', initPriceItem)