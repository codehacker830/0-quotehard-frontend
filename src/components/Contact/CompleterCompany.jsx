import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONTACT, UPDATE_CONTACT_COMPANYID, UPDATE_CONTACT_COMPANYNAME } from '../../constants/ActionTypes';
import axios from '../../util/Api';

export const CompleterCompany = (props) => {
   const dispatch = useDispatch();
   const contactData = useSelector(state => state.contactData);
   const { companyName, companyId } = contactData;
   const [list, setList] = useState([]);
   const [show, setShow] = useState(false);
   const companyContainer = useRef(null);

   useEffect(() => {
      console.log(" companyName => ", companyName);
      if (companyName !== "") {
         axios.get(`/contacts/company/search/${companyName}`).then(({ data }) => {
            console.log("search results =>", data);
            setList(data.contacts);
         }).catch(err => {
            console.error(" Error during fetch company search result form companName.", err);
            setList([]);
         });
      }
   }, [companyName]);
   useEffect(() => {
      window.addEventListener('click', onClickOutsideHandler);
      return () => {
         window.removeEventListener('click', onClickOutsideHandler);
      }
   }, []);
   const onClickOutsideHandler = (ev) => {
      console.log("  companyContainer == ", companyContainer)
      if (!companyContainer.current.contains(ev.target)) setShow(false);
   }
   const setCompany = (contact) => {
      dispatch({
         type: SET_CONTACT, payload: {
            ...contactData,
            companyName: contact.companyName,
            companyId: contact._id,
         }
      });
      setShow(false);
   }
   return (
      <div className="form-group" style={{ position: "relative" }}>
         <label htmlFor="personOfCompany">Company</label>
         <div ref={companyContainer}>
            <input
               type="text"
               className="form-control rounded-0"
               id="personOfCompany" name="personOfCompany"
               placeholder="New, or lookup existing..."
               autoComplete="off"
               value={companyName}
               onChange={ev => {
                  setShow(true);
                  dispatch({ type: UPDATE_CONTACT_COMPANYNAME, payload: ev.target.value });
                  dispatch({ type: UPDATE_CONTACT_COMPANYID, payload: "" });
               }} />
            <ul className={clsx("completer-ui completer-new-contact", list.length !== 0 && show ? "" : "d-none", companyName === "" && "d-none")} style={{ left: 0, top: 68 }}>
               {
                  list.map((contact, index) =>
                     <li key={index} className="border-top" onClick={() => setCompany(contact)}>
                        <div className="u-ellipsis">
                           <strong> {contact.companyName}</strong>
                        </div>
                     </li>
                  )
               }
            </ul >
         </div>
      </div>
   );
}

export default CompleterCompany