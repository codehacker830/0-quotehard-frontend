import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from '../../../../util/Api';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const headers = [
   { label: "Item ID", key: "_id" },
   { label: "Item code", key: "itemCode" },
   { label: "Item title", key: "productHeading" },
   { label: "Long description", key: "longDescription" },
   { label: "Cost price", key: "costPrice" },
   { label: "Unit price", key: "unitPrice" },
   { label: "Quantity", key: "quantity" },
   { label: "Discount", key: "discount" },
   { label: "Item total", key: "itemTotal" },
   { label: "Sales category", key: "salesCategory" },
   { label: "Tax rate", key: "taxRate" },
   { label: "Subscription", key: "subscription" },
   { label: "Editable quantity", key: "editableQuantity" },
   { label: "Optional", key: "optional" },
   { label: "Last changed", key: "updatedAt" }
];

export default function PriceItemsData() {
   const [csvData, setCsvData] = useState([]);
   const csvLinkRef = useRef();
   const { salesCatgories, salesTaxes } = useSelector(state => state.globalSetting);
   const decryptSalesCategoryDes = (item) => {
      let salesCategoryDes = "";
      if (item.salesCategory) {
         const iSC = salesCatgories.find(it => it._id === item.salesCategory);
         if (iSC) salesCategoryDes = iSC.description;
      }
      return salesCategoryDes;
   }
   const decryptSalesTaxName = (item) => {
      let salesTaxName = "";
      if (item.salesTax) {
         const iST = salesTaxes.find(it => it._id === item.salesTax);
         if (iST) salesTaxName = iST.taxName;
      }
      return salesTaxName;
   }
   const decryptSubscription = (item) => {
      let DSString = "";
      const { isSubscription, every, per, period } = item;
      if (isSubscription) {
         DSString = `${every}${per ? `, ${per}` : ""}${period ? `, ${period}` : ""}`;
      }
      return DSString;
   }
   const decryptEditableQuantity = (item) => {
      let DEString = "";
      const { isEditableQuantity } = item;
      DEString = `${isEditableQuantity ? "editable" : ""}`;
      return DEString;
   }
   const decryptOptional = (item) => {
      let DOString = "";
      const { isOptional, isOptionSelected } = item;
      if (isOptional) {
         DOString = `Optional${isOptionSelected ? ", selected" : ""}`
      }
      return DOString;
   }
   const onClickDownload = () => {
      axios.get('/templates/priceitem/status/current')
         .then(({ data }) => {
            console.log(" ++++++++++ contacts data ++++++++ ", data);
            const { priceItems } = data;
            const arrData = priceItems.map(item => {
               return {
                  _id: item._id,
                  itemCode: item.itemCode,
                  productHeading: item.productHeading,
                  longDescription: item.longDescription,
                  costPrice: item.costPrice,
                  unitPrice: item.unitPrice,
                  quantity: item.quantity,
                  discount: item.discount,
                  itemTotal: item.itemTotal,
                  salesCategory: decryptSalesCategoryDes(item),
                  taxRate: decryptSalesTaxName(item),
                  subscription: decryptSubscription(item),
                  editableQuantity: decryptEditableQuantity(item),
                  optional: decryptOptional(item),
                  updatedAt: dateFormat(new Date(item.updatedAt), "mm/dd/yyyy HH:MM"),
               }
            });
            console.log("arrData ==>", arrData)
            setCsvData(arrData);
            csvLinkRef.current.link.click();
         })
         .catch(error => {
            console.log("error: ", error)
         });
   }
   return (
      <div className="mb-3">
         <strong>Price Items</strong>
         <div className="row no-gutters">
            <button type="button" className="btn btn-sm btn-alt-dark mr-2" onClick={onClickDownload}><i className="fa fa-fw fa-download" /> Download CSV</button>
            <CSVLink
               ref={csvLinkRef}
               data={csvData}
               headers={headers}
               filename={"HardQuote - Price Items.csv"}
               className="btn btn-sm btn-alt-dark mr-2"
               style={{ display: 'none' }}
            ></CSVLink>
            <Link to="/app/settings/your-data/import/price-items" className="btn btn-sm btn-alt-info">Import...</Link>
         </div>
      </div>
   )
}
