import { filter } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../../../components/NavCrump'
import axios from '../../../../../util/Api';

const WillCreateStatement = (props) => {
   const { availableRows } = props;
   if (availableRows && availableRows.length) return (
      <li><span className="u-bold">{availableRows.length}</span>{availableRows.length > 1 ? " contacts" : " contact"} will be <strong>created</strong></li>
   );
   else return null;
}
const WillSkipStatementByExist = (props) => {
   const { exisitNum } = props;
   if (exisitNum) {
      return <li><span className="u-bold">{exisitNum}</span>{exisitNum > 1 ? " contacts" : " contact"} will be <strong>skipped</strong>{exisitNum > 1 ? " as they already exist." : " as it already exist."}</li>;
   }
   else return null;
}
const WillSkipStatementByError = (props) => {
   const { errorNum, errorMessages } = props;
   if (errorNum) return (
      <li>
         <span className="u-bold">{errorNum}</span>{errorNum > 1 ? " contacts" : " contact"} will be <strong>skipped</strong> because of{errorNum > 1 ? " an error" : " errors"}:
         {
            errorMessages && errorMessages.length &&
            <ul>
               {
                  errorMessages.map((item, index) => {
                     return <li key={index}><span className="import-row-num">Row {item.rowIndex}</span> {item.message}</li>
                  })
               }
            </ul>
         }
      </li>
   );
   else return null;
}
const Statement = (props) => {
   const { availableRows } = props;
   if (availableRows && availableRows.length) return <li className="pt-3"><strong>There is no undo.</strong></li>;
   else return <li><strong>There is no undo.</strong></li>;
}

export default function ImportContactsConfirm() {
   const { state } = useLocation();
   const history = useHistory();

   const [errorNum, setErrorNum] = useState(null);
   const [exisitNum, setExisitNum] = useState(null);
   const [availableRows, setAvailableRows] = useState([]);
   const [errorMessages, setErrorMessages] = useState([]);
   const [csvArrData, setCsvArrData] = useState([]);
   useEffect(() => {
      console.log(" Import Contacts state ==> ", state)
      if (state && state.data) {
         // const {
         //    errorNum,
         //    exisitNum,
         //    availableRows,
         //    errorMessages,
         //    csvArrData
         // } = state.data;
         setErrorNum(state.data.errorNum);
         setExisitNum(state.data.exisitNum);
         setAvailableRows(state.data.availableRows);
         setErrorMessages(state.data.errorMessages);
         setCsvArrData(state.data.csvArrData);
      } else history.push('/app/settings/your-data');
   }, []);

   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/your-data`}>
            Import / Export
         </NavCrump>
         <div className="content">
            <h3 className="my-4">The following changes will be made:</h3>
            <div className="mb-4">
               <ul className="import-ul">
                  <WillCreateStatement availableRows={availableRows} />
                  <WillSkipStatementByExist exisitNum={exisitNum} />
                  <WillSkipStatementByError errorNum={errorNum} errorMessages={errorMessages} />
                  <Statement availableRows={availableRows} />
               </ul>
            </div>
            <FooterActions availableRows={availableRows} csvArrData={csvArrData} />
         </div>
      </React.Fragment>
   )
}

const FooterActions = (props) => {
   const { availableRows, csvArrData } = props;
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const onClickConfirmChanges = () => {
      if (!csvArrData) { toast.success("Data was not defined."); return; }
      setLoading(true);
      console.log(" _______ csvArrData _________", csvArrData);
      axios.post('/contacts/import/create', { csvArrData })
         .then(({ data }) => {
            history.push('/app/c/contacts');
            setLoading(false);
         })
         .catch(error => {
            setLoading(false);
         });
   }
   return (
      <div className="mx-3">
         {/* use label to trigger manually input of CSVReader  */}
         {
            availableRows && availableRows.length ?
               <button className="btn btn-primary mr-2" onClick={onClickConfirmChanges} disabled={isLoading}>
                  {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                  &nbsp;Confirm Changes
               </button>
               : null
         }
         {
            availableRows && availableRows.length ?
               <Link to="/app/settings/your-data/import/contacts" className="btn btn-secondary">
                  &nbsp;Cancel, go back
               </Link>
               : <Link className="btn btn-default" to="/app/settings/your-data/import/contacts">Go back</Link>
         }
      </div>
   );
}
