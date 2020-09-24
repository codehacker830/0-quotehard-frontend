import React from 'react'
import { Link } from 'react-router-dom';
import NavCrump from '../../components/NavCrump';
import { personData, companyData, peopleContacts, recentActivities } from "../../constants/Dump";
import { alterTypeVariableStr } from '../../util';

export const ViewContact = (props) => {
   const [showActivity, setShowActivity] = React.useState(false);

   const [type, setType] = React.useState("");
   const [firstName, setFirstName] = React.useState("");
   const [lastName, setLastName] = React.useState("");
   const [emailAddress, setEmailAddress] = React.useState("");
   const [companyName, setCompanyName] = React.useState("");
   const [addressSetArray, setAddressSetArray] = React.useState([]);
   const [addressDataArray, setAddressDataArray] = React.useState([]);
   const [peopleContactList, setPeopleContactArray] = React.useState([]);

   console.error("view contact props => ", props);


   React.useEffect(() => {
      const { match } = props;

      // Get API response from id
      let res = personData;
      if (match.params.id === "2222") res = companyData;

      console.error("API RESPNSE =>", res);
      setType(res.type);
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setEmailAddress(res.emailAddress);
      setCompanyName(res.companyName);
      setAddressSetArray(res.addressSetArray);
      setAddressDataArray(res.addressDataArray);
      setPeopleContactArray(peopleContacts);
   });

   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/c/contacts`}>
            Contacts
         </NavCrump>
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content p-5">
                  <div className="row no-gutters">
                     {
                        type === "person" &&
                        <h3>{firstName} {lastName}</h3>
                     }
                     {
                        type === "company" &&
                        <h3>{companyName}</h3>
                     }

                  </div>
                  <div className="row">
                     <div className="col-md-6 col-sm-12">
                        <div className="d-flex">
                           {
                              type === "company" &&
                              <img className="avatar-64 mr-3"
                                 src="/assets/media/avatars/company1.png"
                                 alt="..." />
                           }
                           {
                              type === "person" &&
                              <img className="avatar-64 mr-3"
                                 src="/assets/media/avatars/person1.png"
                                 alt="..." />
                           }
                           <div className="d-block">
                              {
                                 (type === "person" && companyData) &&
                                 <div className="form-group">
                                    <span className="text-gray fa-xs text-uppercase">Company</span>
                                    <Link className="d-block" to={`/app/c/contacts/view/2222`}>{companyName}</Link>
                                 </div>
                              }
                              <div className="form-group">
                                 <span className="text-gray fa-xs text-uppercase">Quotes</span>
                                 <Link className="d-block" to={{
                                    pathname: "/app/quotes",
                                    state: {
                                       companyId: "4128663"
                                    }
                                 }}>View quotes</Link>
                              </div>
                              <div className="form-group">
                                 <span className="text-gray fa-xs text-uppercase">Email</span>
                                 <a className="d-block" href={`mailto:${emailAddress}`}>{emailAddress}</a>
                              </div>

                              <div className="form-group">
                                 {
                                    addressSetArray.map((item, index) => {
                                       return (
                                          <div className="mb-1" key={index}>
                                             <span className="text-gray fa-xs text-uppercase">{alterTypeVariableStr(item.type)}</span>
                                             <span className="d-block text-black">{item.content}</span>
                                          </div>
                                       );
                                    })
                                 }
                                 {
                                    addressDataArray.map((item, index) => {
                                       return (
                                          <div className="mb-1" key={index}>
                                             <span className="text-gray fa-xs text-uppercase">{alterTypeVariableStr(item.type)}</span>
                                             <span className="d-block text-black">
                                                {item.street}, {item.stateOrRegion}, {item.city} {item.postCode}, {item.country}
                                             </span>
                                          </div>
                                       );
                                    })
                                 }

                              </div>
                              <div className="form-group">
                                 <Link className="btn btn-outline-dark font-size-sm" to={`/app/c/contacts/edit/4128664`}>Edit Company</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                     {
                        type === "company" &&
                        <div className="col-md-6 col-sm-12">
                           <h4>{peopleContactList.length} people</h4>
                           {
                              peopleContactList.map((item, ind) => {
                                 return (
                                    <div className="d-flex mb-2" key={ind}>
                                       <img className="avatar-36 mr-2 my-auto"
                                          src="/assets/media/avatars/person1.png"
                                          alt="Danil Zolouthin" />
                                       <div className="u-ellipsis">
                                          <Link to="/app/c/contacts/view/4143284">{item.name}</Link>
                                          <br />
                                          <small className="text-gray font-size-sm">{item.company}</small>
                                       </div>
                                    </div>
                                 );
                              })
                           }
                           <Link className="btn btn-outline-dark font-size-sm mt-4"
                              to={{
                                 pathname: `/app/c/contacts/edit/new-person`,
                                 state: { company: "Allover" }
                              }}>Add Person</Link>
                        </div>
                     }

                  </div>
                  {/* Recent Activity */}
                  <div className="row no-gutters mb-1">
                     <div className="w-100 font-size-sm mb-1">
                        <i className="far fa-xs fa-clock mr-1"></i>
                        Recent Activity
                        <button className={`btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2 ${showActivity ? "" : "d-none"}`} onClick={() => setShowActivity(false)}>Hide</button>
                     </div>
                     <div className={`w-100 mb-1 ${showActivity ? "d-none" : ""}`}>
                        <span className="w-100 text-gray font-size-sm mb-1">Edited by A Devom  –  September 21, 2020 at 11:26AM</span>
                        <button className="btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2" onClick={() => setShowActivity(true)}>All Activity</button>
                     </div>
                     <div className={`w-100 mt-2 ${showActivity ? "" : "d-none"}`}>
                        <table className="table table-sm table-vcenter">
                           <tbody>
                              {
                                 recentActivities.map((item, ind) => {
                                    return (
                                       <tr key={ind}>
                                          <td className="bg-light-gray font-size-sm p-2" style={{ width: "30%" }}>{item.date}</td>
                                          <td className="font-size-sm p-2">{item.content}</td>
                                       </tr>
                                    );
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default ViewContact;