import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from '../../../../util/Api';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';

const headers = [
   { label: "Quote number", key: "number" },
   { label: "Quote title", key: "title" },
   { label: "From name", key: "userFrom" },
   { label: "For name", key: "contactNameTo" },
   { label: "Total value", key: "quoteTotal" },
   { label: "Currency", key: "currency" },
   { label: "Amounts entered", key: "taxMode" },
   { label: "Overall discount", key: "discount" },
   { label: "Quote status", key: "status" },
   { label: "Last status change", key: "updatedAt" },
   { label: "Sent when", key: "sentAt" },
   { label: "Expiry date", key: "validUntil" },
];
const decryptStatus = (quote) => {
   switch (quote.status) {
      case "draft": return "Draft";
      case "editing": return "Editing";
      case "sent": return "Accept sent";
      case "accepted": return "Accepted";
      case "declined": return "Declined";
      case "withdrawn": return "Withdrawn";
      default: return quote.status;
   }
}
const decryptTaxMode = (quote) => {
   switch (quote.settings.taxMode) {
      case "exclusive_including": return "Tax Exclusive (Inclusive Total)";
      case "exclusive_excluding": return "Tax Exclusive";
      case "inclusive": return "Tax Inclusive";
      case "no_tax": return "No Tax";
      default: return quote.settings.taxMode;
   }
}

export default function QuotesData() {
   const [csvData, setCsvData] = useState([]);
   const csvLinkRef = useRef();
   const onClickDownload = () => {
      axios.get('/quotes/state/current')
         .then(({ data }) => {
            console.log(" ++++++++++ quote data ++++++++ ", data);
            const { quotes } = data;
            const arrData = quotes.map(quote => {
               return {
                  number: quote.number,
                  title: quote.title,
                  userFrom: quote.userFrom,
                  contactNameTo: quote.contactNameTo,
                  quoteTotal: quote.quoteTotal,
                  currency: quote.settings.currency,
                  taxMode: decryptTaxMode(quote),
                  discount: quote.settings.discount,
                  status: decryptStatus(quote),
                  sentAt: quote.settings.sentAt ? dateFormat(new Date(quote.settings.sentAt), "yyyy mm dd HH:MM:ss") : "0000 00 00 00:00:00",
                  validUntil: dateFormat(new Date(quote.settings.validUntil), "mm/dd/yyyy HH:MM"),
                  updatedAt: dateFormat(new Date(quote.updatedAt), "mm/dd/yyyy HH:MM"),
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
         <label htmlFor="downloadType">What to download</label>
         <div className="input-group">
            <select className="form-control rounded-0 maxWidth-300 mr-1"
               id="downloadType"
               name="downloadType">
               <option value="quotes">Quotes</option>
               <option value="quotesAndPriceItems">Quotes, Price Items</option>
            </select>
            <div className="input-group-append">
               <button type="button" className="btn btn-sm btn-alt-dark mr-2" onClick={onClickDownload}><i className="fa fa-fw fa-download" /> Download CSV</button>
               <CSVLink
                  ref={csvLinkRef}
                  data={csvData}
                  headers={headers}
                  filename={"QuoteHard - Quotes.csv"}
                  className="btn btn-sm btn-alt-dark mr-2"
                  style={{ display: 'none' }}
               ></CSVLink>
            </div>
         </div>
      </div>
   )
}