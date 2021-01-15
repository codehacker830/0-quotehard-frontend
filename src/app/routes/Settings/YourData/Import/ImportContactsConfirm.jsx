import { filter } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../../../components/NavCrump'
import axios from '../../../../../util/Api';

const WillCreateStatement = (props) => {
   const { createAvailableRows } = props;
   if (createAvailableRows && createAvailableRows.length) return (
      <li><span className="u-bold">{createAvailableRows.length}</span>{createAvailableRows.length > 1 ? " contacts" : " contact"} will be <strong>created</strong></li>
   );
   else return null;
}
const WillSkipStatementByExist = (props) => {
   const { skipNum } = props;
   if (skipNum) {
      return <li><span className="u-bold">{skipNum}</span>{skipNum > 1 ? " contacts" : " contact"} will be <strong>skipped</strong>{skipNum > 1 ? " as they already exist." : " as it already exist."}</li>;
   }
   else return null;
}
const WillSkipStatementByError = (props) => {
   const { errorMessages } = props;
   if (errorMessages && errorMessages.length) return (
      <li>
         <span className="u-bold">{errorMessages.length}</span>{errorMessages.length > 1 ? " contacts" : " contact"} will be <strong>skipped</strong> because of{errorMessages.length > 1 ? " an error" : " errors"}:
         {
            errorMessages && errorMessages.length &&
            <ul>
               {
                  errorMessages.map((item, index) => {
                     return <li key={index}><span className="import-row-num">Row {item.rowIndex + 1}</span> {item.message}</li>
                  })
               }
            </ul>
         }
      </li>
   );
   else return null;
}
const Statement = (props) => {
   const { createAvailableRows } = props;
   if (createAvailableRows && createAvailableRows.length) return <li className="pt-3"><strong>There is no undo.</strong></li>;
   else return <li><strong>There is no undo.</strong></li>;
}

export default function ImportContactsConfirm() {
   const { state } = useLocation();
   const history = useHistory();

   const [skipNum, setSkipNum] = useState(null);
   const [createAvailableRows, setAvailableRows] = useState([]);
   const [errorMessages, setErrorMessages] = useState([]);
   const [csvArrData, setCsvArrData] = useState([]);
   useEffect(() => {
      if (state && state.data) {
         // const {
         //    skipNum,
         //    createAvailableRows,
         //    errorMessages,
         //    csvArrData
         // } = state.data;
         setSkipNum(state.data.skipNum);
         setAvailableRows(state.data.createAvailableRows);
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

            <TopStatement createAvailableRows={createAvailableRows} />
            <div className="mb-4">
               <ul className="import-ul">
                  <WillCreateStatement createAvailableRows={createAvailableRows} />
                  <WillSkipStatementByExist skipNum={skipNum} />
                  <WillSkipStatementByError errorMessages={errorMessages} />
                  <Statement createAvailableRows={createAvailableRows} />
               </ul>
            </div>
            <FooterActions createAvailableRows={createAvailableRows} csvArrData={csvArrData} />
         </div>
      </React.Fragment>
   )
}
const TopStatement = (props) => {
   const { createAvailableRows } = props;
   if (createAvailableRows && createAvailableRows.length) return (<h3 className="my-4">The following changes will be made:</h3>);
   else return (<h3 className="my-4">No changes to be made.</h3>);
}

const FooterActions = (props) => {
   const { createAvailableRows, csvArrData } = props;
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const onClickConfirmChanges = () => {
      if (!csvArrData) { toast.success("Data was not defined."); return; }
      setLoading(true);
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
            createAvailableRows && createAvailableRows.length ?
               <button className="btn btn-primary mr-2" onClick={onClickConfirmChanges} disabled={isLoading}>
                  {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                  &nbsp;Confirm Changes
               </button>
               : null
         }
         {
            createAvailableRows && createAvailableRows.length ?
               <Link to="/app/settings/your-data/import/contacts" className="btn btn-secondary">
                  &nbsp;Cancel, go back
               </Link>
               : <Link className="btn btn-default" to="/app/settings/your-data/import/contacts">Go back</Link>
         }
      </div>
   );
}
