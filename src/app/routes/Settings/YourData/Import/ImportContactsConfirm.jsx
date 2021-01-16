import { filter } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../../../components/NavCrump'
import axios from '../../../../../util/Api';

const WillCreateStatement = (props) => {
   const { createAvailableData } = props;
   if (Array.isArray(createAvailableData) && createAvailableData.length) return (
      <li><span className="u-bold">{createAvailableData.length}</span>{createAvailableData.length > 1 ? " contacts" : " contact"} will be <strong>created</strong></li>
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
   if (Array.isArray(errorMessages) && errorMessages.length) return (
      <li>
         <span className="u-bold">{errorMessages.length}</span>{errorMessages.length > 1 ? " contacts" : " contact"} will be <strong>skipped</strong> because of{errorMessages.length > 1 ? " an error" : " errors"}:
         <ul>
            {
               errorMessages.map((item, index) => {
                  return <li key={index}><span className="import-row-num">Row {item.rowIndex + 1}</span> {item.message}</li>
               })
            }
         </ul>
      </li>
   );
   else return null;
}
const Statement = (props) => {
   const { createAvailableData } = props;
   if (Array.isArray(createAvailableData) && createAvailableData.length) return <li className="pt-3"><strong>There is no undo.</strong></li>;
   else return <li><strong>There is nothing to do.</strong></li>;
}

export default function ImportContactsConfirm() {
   const { state } = useLocation();
   const history = useHistory();

   const [skipNum, setSkipNum] = useState(null);
   const [errorMessages, setErrorMessages] = useState([]);
   const [createAvailableData, setCreateAvailableData] = useState([]);
   useEffect(() => {
      if (state && state.data) {
         // const {
         //    skipNum,
         //    createAvailableData,
         //    errorMessages,
         // } = state.data;
         setSkipNum(state.data.skipNum);
         setCreateAvailableData(state.data.createAvailableData);
         setErrorMessages(state.data.errorMessages);
      } else history.push('/app/settings/your-data');
   }, []);

   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/your-data`}>
            Import / Export
         </NavCrump>
         <div className="content">

            <TopStatement createAvailableData={createAvailableData} />
            <div className="mb-4">
               <ul className="import-ul">
                  <WillCreateStatement createAvailableData={createAvailableData} />
                  <WillSkipStatementByExist skipNum={skipNum} />
                  <WillSkipStatementByError errorMessages={errorMessages} />
                  <Statement createAvailableData={createAvailableData} />
               </ul>
            </div>
            <FooterActions createAvailableData={createAvailableData} />
         </div>
      </React.Fragment>
   )
}
const TopStatement = (props) => {
   const { createAvailableData } = props;
   if (createAvailableData && createAvailableData.length) return (<h3 className="my-4">The following changes will be made:</h3>);
   else return (<h3 className="my-4">No changes to be made.</h3>);
}

const FooterActions = (props) => {
   const { createAvailableData } = props;
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const onClickConfirmChanges = () => {
      if (!createAvailableData || !Array.isArray(createAvailableData)) { toast.success("Data was not defined."); return; }
      setLoading(true);
      axios.post('/contacts/import/create', { csvArrData: createAvailableData })
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
            createAvailableData && createAvailableData.length ?
               <button className="btn btn-primary mr-2" onClick={onClickConfirmChanges} disabled={isLoading}>
                  {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                  &nbsp;Confirm Changes
               </button>
               : null
         }
         {
            createAvailableData && createAvailableData.length ?
               <Link to="/app/settings/your-data/import/contacts" className="btn btn-secondary">
                  &nbsp;Cancel, go back
               </Link>
               : <Link className="btn btn-default" to="/app/settings/your-data/import/contacts">Go back</Link>
         }
      </div>
   );
}
