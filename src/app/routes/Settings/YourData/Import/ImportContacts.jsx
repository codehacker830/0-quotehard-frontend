import React, { useRef, useState } from 'react'
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavCrump from '../../../../../components/NavCrump';
import axios from '../../../../../util/Api';

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

const papaparseOptions = {
   header: true,
   dynamicTyping: false,
   skipEmptyLines: true,
   transformHeader: header => {
      switch (header) {
         case "Contact ÏĐ": return "_id";
         case "Contact ID": return "_id";
         case "First name": return "firstName";
         case "Last name": return "lastName";
         case "Company name": return "companyName";
         case "Email": return "email";
         case "Phone": return "phone";
         case "Address": return "street";
         case "City": return "city";
         case "State": return "state";
         case "Zip": return "postCode";
         case "Country": return "country";
         case "Last changed": return "updatedAt";
         default: return header;
      }
   }
};
export default function ImportContacts() {
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const onFileLoaded = (dataArr, fileInfo) => {
      console.log("dataArr : ", dataArr);
      console.log("file info: ", fileInfo);
      if (dataArr.length > 1000) {
         toast.success('A maximum of 1,000 contacts can be imported at a time.');
         return;
      }
      setLoading(true);
      axios.post('/contacts/import/check', { csvArrData: dataArr }).then(({ data }) => {
         console.log(" CHECKED DATA : ", data);
         const {
            errorNum,
            exisitNum,
            availableRows,
            errorMessages
         } = data;
         const filteredArr = dataArr.filter((item, index) => {
            return availableRows.includes(index);
         });
         history.push({
            pathname: '/app/settings/your-data/import/contacts/confirm',
            state: {
               data: {
                  errorNum,
                  exisitNum,
                  availableRows,
                  errorMessages,
                  csvArrData: filteredArr
               }
            }
         });
         // setLoading(false);
      }).catch(error => {
         setLoading(false);
      });
   }
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/your-data`}>
            Import / Export
         </NavCrump>
         <div className="content">
            <h3 className="my-4">Import Contacts</h3>

            <div className="mb-4">
               <ol className="import-info-ul">
                  <li>
                     Download a CSV file.
                     <ul>
                        <li>Start from <CSVLink
                           data={[]}
                           headers={headers}
                           filename={"Example Contacts.csv"}
                           className="buttonLink"
                        >an empty template</CSVLink>
                        </li>
                     </ul>
                  </li>
                  <li>
                     Use a spreadsheet to copy contacts.
                     <ul>
                        <li>
                           Leave the first row of field names untouched, as this is needed to import.
                        </li>
                        <li>
                           Contacts will NEVER be deleted.
                        </li>
                        <li>
                           A maximum of 1,000 contacts can be imported at a time.
                           <br />
                           (a limit of 5,000 contacts in total are supported in Quotient)
                        </li>
                     </ul>
                  </li>
                  <li>
                     Select your updated file and confirm…
                  </li>
               </ol>
            </div>

            <div className="mx-3">
               {/* use label to trigger manually input of CSVReader  */}
               <label htmlFor="react-csv-reader-input" className="btn btn-primary">
                  {
                     isLoading ? <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                        : <i className="fa fa-fw fa-paperclip mr-1" />
                  }
                  &nbsp;Choose CSV file
               </label>
               <CSVReader
                  cssClass="d-none"
                  onFileLoaded={onFileLoaded}
                  // onError={handleDarkSideForce}
                  disabled={isLoading}
                  parserOptions={papaparseOptions}
               />
            </div>
         </div>
      </React.Fragment>
   )
}
