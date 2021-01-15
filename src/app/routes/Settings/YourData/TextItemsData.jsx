import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from '../../../../util/Api';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const headers = [
   { label: "Item ID", key: "_id" },
   { label: "Text heading", key: "textHeading" },
   { label: "Long Description", key: "longDescription" },
   { label: "Last changed", key: "updatedAt" }
];

export default function TextItemsData() {
   const [csvData, setCsvData] = useState([]);
   const csvLinkRef = useRef();
   const onClickDownload = () => {
      axios.get('/templates/textitem/status/current')
         .then(({ data }) => {
            console.log(" ++++++++++ contacts data ++++++++ ", data);
            const { textItems } = data;
            const arrData = textItems.map(item => {
               return {
                  _id: item._id,
                  textHeading: item.textHeading,
                  longDescription: item.longDescription,
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
         <strong>Text Items</strong>
         <div className="row no-gutters">
            <button type="button" className="btn btn-sm btn-alt-dark mr-2" onClick={onClickDownload}><i className="fa fa-fw fa-download" /> Download CSV</button>
            <CSVLink
               ref={csvLinkRef}
               data={csvData}
               headers={headers}
               filename={"QuoteHard - Text Items.csv"}
               className="btn btn-sm btn-alt-dark mr-2"
               style={{ display: 'none' }}
            ></CSVLink>
            <Link to="/app/settings/your-data/import/price-items" className="btn btn-sm btn-alt-info">Import...</Link>
         </div>
      </div>
   )
}
