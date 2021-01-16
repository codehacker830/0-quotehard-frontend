import React, { useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from '../../../../util/Api';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

export const TextItemsCSVLink = (props) => {
   const headers = [
      { label: "Item ID", key: "_id" },
      { label: "Text heading", key: "textHeading" },
      { label: "Long description", key: "longDescription" },
      { label: "Last changed", key: "updatedAt" }
   ];
   const [csvData, setCsvData] = useState([]);
   const csvLinkRef = useRef();

   const onClickDownload = () => {
      axios.get('/templates/textitem/status/current')
         .then(({ data }) => {
            console.log(" ++++++++++ textItems data ++++++++ ", data);
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
      <React.Fragment>
         <button type="button" className={props.cssClassName} onClick={onClickDownload}>{props.showIcon && <i className="fa fa-fw fa-download" />} {props.linkName}</button>
         <CSVLink
            ref={csvLinkRef}
            data={csvData}
            headers={headers}
            filename={"QuoteHard - Text Items.csv"}
            className="btn btn-sm btn-alt-dark mr-2"
            style={{ display: 'none' }}
         ></CSVLink>
      </React.Fragment>
   );
}
export default function TextItemsData() {

   return (
      <div className="mb-3">
         <strong>Text Items</strong>
         <div className="row no-gutters">
            <TextItemsCSVLink cssClassName="btn btn-sm btn-alt-dark mr-2" linkName="Download CSV" showIcon={true} />
            <Link to="/app/settings/your-data/import/text-items" className="btn btn-sm btn-alt-info">Import...</Link>
         </div>
      </div>
   )
}
