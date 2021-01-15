import { filter } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../../../components/NavCrump'
import axios from '../../../../../util/Api';

const WillUpdateStatement = (props) => {
   const { updateAvailableData } = props;
   if (updateAvailableData && updateAvailableData.length) return (
      <li><span className="u-bold">{updateAvailableData.length}</span>{updateAvailableData.length > 1 ? " items" : " item"} will be <strong>updated</strong></li>
   );
   else return null;
}
const WillCreateStatement = (props) => {
   const { createAvailableData } = props;
   if (createAvailableData && createAvailableData.length) return (
      <li><span className="u-bold">{createAvailableData.length}</span>{createAvailableData.length > 1 ? " items" : " item"} will be <strong>created</strong></li>
   );
   else return null;
}
const WillSkipStatementByExist = (props) => {
   const { skipNum } = props;
   if (skipNum) {
      return <li><span className="u-bold">{skipNum}</span>{skipNum > 1 ? " contacts" : " contact"} will be <strong>skipped</strong>{skipNum > 1 ? " as they have not changed." : " as it have not changed."}</li>;
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
   const { createAvailableData } = props;
   if (createAvailableData && createAvailableData.length) return <li className="pt-3"><strong>There is no undo.</strong></li>;
   else return <li><strong>There is no undo.</strong></li>;
}

export default function ImportPriceItemsConfirm() {
   const { state } = useLocation();
   const history = useHistory();

   const [skipNum, setSkipNum] = useState(null);
   const [errorMessages, setErrorMessages] = useState([]);
   const [createAvailableData, setCreateAvaialbleData] = useState([]);
   const [updateAvailableData, setUpdateAvailableData] = useState([]);

   useEffect(() => {
      if (state && state.data) {
         // const {
         //    skipNum,
         //    errorMessages,
         //    createAvailableData
         //    updateAvailableData
         // } = state.data;
         setSkipNum(state.data.skipNum);
         setErrorMessages(state.data.errorMessages);
         setCreateAvaialbleData(state.data.createAvailableData);
         setUpdateAvailableData(state.data.updateAvailableData);
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
                  <WillUpdateStatement updateAvailableData={updateAvailableData} />
                  <WillCreateStatement createAvailableData={createAvailableData} />
                  <WillSkipStatementByExist skipNum={skipNum} />
                  <WillSkipStatementByError errorMessages={errorMessages} />
                  <Statement createAvailableData={createAvailableData} />
               </ul>
            </div>
            <FooterActions createAvailableData={createAvailableData} updateAvailableData={updateAvailableData} />
         </div>
      </React.Fragment>
   )
}

const FooterActions = (props) => {
   const { createAvailableData, updateAvailableData } = props;
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const onClickConfirmChanges = () => {
      if (!createAvailableData && !updateAvailableData) { toast.success("Data was not defined."); return; }
      if (!Array.isArray(createAvailableData) || !Array.isArray(updateAvailableData)) { toast.success("Data is invalid."); return; }
      console.log(" createAvailableData : ", createAvailableData)
      console.log(" updateAvailableData : ", updateAvailableData)
      setLoading(true);
      axios.post('/templates/priceitem/import/create', { createAvailableData, updateAvailableData })
         .then(({ data }) => {
            history.push('/app/content/item-price/browse');
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
               <Link to="/app/settings/your-data/import/price-items" className="btn btn-secondary">
                  &nbsp;Cancel, go back
               </Link>
               : <Link className="btn btn-default" to="/app/settings/your-data/import/price-items">Go back</Link>
         }
      </div>
   );
}
