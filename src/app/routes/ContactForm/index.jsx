import clsx from 'clsx';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddAddressBtn from '../../../components/Contact/AddAddressBtn';
import AddPhoneBtn from '../../../components/Contact/AddPhoneBtn';
import AddressForm from '../../../components/Contact/AddressForm';
import CompleterCompany from '../../../components/Contact/CompleterCompany';
import NavCrump from '../../../components/NavCrump';
import { SET_CONTACT, UPDATE_CONTACT_ADDRESSES, UPDATE_CONTACT_COMPANYID, UPDATE_CONTACT_COMPANYNAME, UPDATE_CONTACT_EMAIL, UPDATE_CONTACT_FIRSTNAME, UPDATE_CONTACT_LASTNAME, UPDATE_CONTACT_PHONES } from '../../../constants/ActionTypes';
import { CONTACTS_PAGE_PATH, CONTACT_CREATE_PATH, CONTACT_EDIT_PATH } from '../../../constants/PathNames';
import { ToastErrorNotification } from '../../../util';
import axios from '../../../util/Api';

export default function ContactForm(props) {
   const match = useRouteMatch();
   const location = useLocation();
   const history = useHistory();
   const dispatch = useDispatch();
   const contactData = useSelector(state => state.contactData);
   const isContactEditPath = match.path === CONTACT_EDIT_PATH;
   const isContactCreatePath = match.path === CONTACT_CREATE_PATH;
   const {
      category,
      firstName,
      lastName,
      companyName,
      companyId,
      email,
      phones,
      addresses
   } = contactData;
   let goTo = CONTACTS_PAGE_PATH;

   useEffect(() => {
      if (location.state && location.state.from) goTo = location.state.from;
      if (match.path === CONTACT_CREATE_PATH) {
         if (match.params.category !== "person" && match.params.category !== "company") history.push(goTo);
         const payload = {
            category: match.params.category,
            firstName: "",
            lastName: "",
            email: "",
            companyId: "",
            companyName: "",
            phones: [],
            addresses: []
         };
         dispatch({ type: SET_CONTACT, payload });
         if (location.state && location.state.companyId) dispatch({ type: UPDATE_CONTACT_COMPANYID, payload: location.state.companyId });
         if (location.state && location.state.companyName) dispatch({ type: UPDATE_CONTACT_COMPANYNAME, payload: location.state.companyName });
      } else if (match.path === CONTACT_EDIT_PATH) {
         const contactID = match.params.id;
         axios.get(`/contacts/id/${contactID}`).then(({ data }) => {
            console.log("get contact api res =>", data);
            const { contact } = data;
            const payload = {
               category: contact.category,
               firstName: contact.firstName,
               lastName: contact.lastName,
               email: contact.email,
               companyId: contact.category === "person" ? (contact.company ? contact.company._id : "") : "",
               companyName: contact.category === "person" ? (contact.company ? contact.company.companyName : "") : (contact.companyName ? contact.companyName : ""),
               phones: contact.phones,
               addresses: contact.addresses
            };
            dispatch({ type: SET_CONTACT, payload });
         }).catch((err) => {
            console.error("get contact api error ==>", err);
            history.push(goTo);
         })
      } else history.push(goTo);
   }, []);

   const onHandleSubmit = () => {
      // API request to create contact
      if (category === "person" && (firstName === "" || email === "")) {
         toast.warn('First Name and Email Address are required fields.');
         return;
      }
      if (category === "company" && companyName === "" && email === "") {
         toast.warn('You need to enter a company name or email.');
         return;
      }
      const data = {
         category,
         firstName,
         lastName,
         companyName,
         companyId,
         email,
         phones,
         addresses
      }
      console.log("request payload ===>", data);
      if (isContactCreatePath) {
         axios.post(`/contacts/${match.params.category}`, data).then(({ data }) => {
            toast.success("Contact was created successfully.");
            console.log("create contact api resopnse ==>", data);
            history.push(`/app/c/contacts/view/${data.contact._id}`);
         }).catch(err => {
            console.error("create contact api error ==>", err.response.data);
            toast.error("Failed to create contact.");
            history.push(`/app/c/contacts`);
         });
      } else if (isContactEditPath) {
         const contactId = match.params.id;
         axios.put(`/contacts/${data.category}/id/${contactId}`, data).then((res) => {
            console.log("api resopnse = >", res);
            toast.success("Contact was updated successfully.");
            history.push(goTo);
         }).catch(err => {
            history.push(goTo);
            const { errors } = err.response.data;
            ToastErrorNotification(errors);
         });
      }
   }
   return (
      <React.Fragment>
         <NavCrump linkTo={goTo}>
            Previous
      </NavCrump>
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="maxWidth-800 p-4">
                     {/* Person Data */}
                     <div className={category === "person" ? "" : "d-none"}>
                        <div className="form-group">
                           <div className="row">
                              <div className="col-md-6 col-sm-12">
                                 <label htmlFor="firstName">First Name</label>
                                 <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="firstName" name="firstName"
                                    placeholder=""
                                    value={firstName}
                                    onChange={(ev) => dispatch({ type: UPDATE_CONTACT_FIRSTNAME, payload: ev.target.value })} />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                 <div className="d-flex">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Link className={clsx("ml-auto", isContactEditPath && "d-none")} to="/app/c/contacts/create/company">Switch to a Company?</Link>
                                 </div>
                                 <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="lastName" name="lastName"
                                    placeholder=""
                                    value={lastName}
                                    onChange={(ev) => dispatch({ type: UPDATE_CONTACT_LASTNAME, payload: ev.target.value })} />
                              </div>
                           </div>
                        </div>
                        {/* Email Address */}
                        <div className="form-group">
                           <label htmlFor="personEmail">Email Address<span className="text-danger fa-fx font-w600 ml-1">required</span></label>
                           <input
                              type="text"
                              className="form-control rounded-0"
                              id="personEmail" name="personEmail"
                              placeholder=""
                              value={email}
                              onChange={(ev) => dispatch({ type: UPDATE_CONTACT_EMAIL, payload: ev.target.value })} />
                        </div>
                        {/* Company Name */}
                        <CompleterCompany />
                     </div>

                     {/* Company Data */}
                     <div className={category === "company" ? "" : "d-none"}>
                        <div className="form-group">
                           <div className="d-flex">
                              <label htmlFor="companyName">Company</label>
                              <Link className={clsx("ml-auto", isContactEditPath && "d-none")} to="/app/c/contacts/create/person">Switch to person</Link>
                           </div>
                           <input
                              type="text"
                              className="form-control rounded-0"
                              id="companyName" name="companyName"
                              placeholder=""
                              value={companyName}
                              onChange={ev => dispatch({ type: UPDATE_CONTACT_COMPANYNAME, payload: ev.target.value })} />
                        </div>
                        {/* Email Address */}
                        <div className="form-group">
                           <label htmlFor="email">Email Address</label>
                           <input
                              type="text"
                              className="form-control rounded-0"
                              id="email" name="email"
                              placeholder=""
                              value={email}
                              onChange={ev => dispatch({ type: UPDATE_CONTACT_EMAIL, payload: ev.target.value })} />
                        </div>
                     </div>

                     {/* Address Set FromInColumns */}
                     {
                        phones && phones.map((item, index) => {
                           return (
                              <div className="form-group" key={index}>
                                 <div className="d-flex mb-1">
                                    <div className="w-50">
                                       <select
                                          className="form-control rounded-0"
                                          id="phone" name="phone"
                                          value={item.category}
                                          defaultValue={`primaryPhone`}
                                          onChange={(ev) => {
                                             let newPhoneDataArray = [...phones];
                                             newPhoneDataArray[index].category = ev.target.value;
                                             dispatch({ type: UPDATE_CONTACT_PHONES, payload: newPhoneDataArray });
                                          }}
                                       >
                                          <optgroup label="Phone">
                                             <option value="primaryPhone">Primary Phone</option>
                                             <option value="workPhone">Work Phone</option>
                                             <option value="mobile">Mobile</option>
                                             <option value="homePhone">Home Phone</option>
                                          </optgroup>
                                          <optgroup label="website &amp; Social">
                                             <option value="website">Website</option>
                                             <option value="skype">Skype</option>
                                             <option value="twitter">Twitter</option>
                                          </optgroup>
                                          <optgroup label="Desperate methods">
                                             <option value="fax">Fax</option>
                                          </optgroup>
                                       </select>
                                    </div>
                                    <div className="w-50">
                                       <button type="button" className="btn close" onClick={() => {
                                          const filtered = phones.filter((item, itemIndex) => itemIndex !== index);
                                          dispatch({ type: UPDATE_CONTACT_PHONES, payload: filtered });
                                       }}>
                                          <span>×</span>
                                       </button>
                                    </div>
                                 </div>
                                 <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="phone" name="phone"
                                    placeholder=""
                                    value={item.content}
                                    onChange={(ev) => {
                                       let newPhoneDataArray = [...phones];
                                       newPhoneDataArray[index].content = ev.target.value;
                                       dispatch({ type: UPDATE_CONTACT_PHONES, payload: newPhoneDataArray });
                                    }}
                                 />
                              </div>
                           );
                        })
                     }


                     {/* Add Phone Button */}
                     <AddPhoneBtn />

                     {/* Address Form */}
                     {
                        addresses.map((item, index) =>
                           <AddressForm
                              key={index}
                              index={index}
                              item={item}
                           />)
                     }

                     {/* Add Address Button */}
                     <AddAddressBtn />

                     <div className="form-group py-3">
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onHandleSubmit}>
                           {
                              isContactCreatePath ? "Create Contact" : "Update Contact"
                           }
                        </button>
                        <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={goTo}>Cancel</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment >
   )
}
