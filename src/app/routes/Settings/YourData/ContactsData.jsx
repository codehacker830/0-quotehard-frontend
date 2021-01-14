import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import axios from '../../../../util/Api';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
const headers = [
   { label: "Contact ID", key: "_id" },
   { label: "First name", key: "firstName" },
   { label: "Last name", key: "lastName" },
   { label: "Company name", key: "companyName" },
   { label: "Email", key: "email" },
   { label: "Phone", key: "phone" },
   { label: "Address", key: "address" },
   { label: "City", key: "city" },
   { label: "State", key: "state" },
   { label: "Zip", key: "postCode" },
   { label: "Country", key: "country" },
   { label: "Last changed", key: "updatedAt" }
];

export default function ContactsData() {
   const [csvData, setCsvData] = useState([]);
   const csvLinkRef = useRef();
   const onClickDownload = () => {
      axios.get('/contacts/status/current')
         .then(({ data }) => {
            console.log(" ++++++++++ contacts data ++++++++ ", data);
            console.log("csvLinkRef ", csvLinkRef)
            const { contacts } = data;
            const arrData = contacts.map(contact => {
               return {
                  _id: contact._id,
                  firstName: contact.firstName ? contact.firstName : "",
                  lastName: contact.lastName ? contact.lastName : "",
                  companyName: contact.companyName ? contact.companyName : "",
                  email: contact.email,
                  phone: contact.phones.length > 0 ? contact.phones[0]["content"] : "",
                  address: contact.addresses.length > 0 ? contact.addresses[0]["street"] : "",
                  city: contact.addresses.length > 0 ? contact.addresses[0]["city"] : "",
                  state: contact.addresses.length > 0 ? contact.addresses[0]["stateOrRegion"] : "",
                  postCode: contact.addresses.length > 0 ? contact.addresses[0]["postCode"] : "",
                  country: contact.addresses.length > 0 ? contact.addresses[0]["country"] : "",
                  updatedAt: dateFormat(new Date(contact.updatedAt), "mm/dd/yyyy HH:MM") ,
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
         <strong>Contacts</strong>
         <div className="row no-gutters">
            <button type="button" className="btn btn-sm btn-alt-dark mr-2" onClick={onClickDownload}><i className="fa fa-fw fa-download" /> Download CSV</button>
            <CSVLink
               ref={csvLinkRef}
               data={csvData}
               headers={headers}
               filename={"HardQuote - Contacts.csv"}
               className="btn btn-sm btn-alt-dark mr-2"
               style={{ display: 'none' }}
            ></CSVLink>
            <Link to="/app/settings/your-data/import/contacts" className="btn btn-sm btn-alt-info">Import...</Link>
         </div>
      </div>
   )
}
