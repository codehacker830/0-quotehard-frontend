import React from 'react'
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';
import { personData, companyData, recentActivities } from "../../../constants/Dump";
import AddressesShow from './AddressesShow';
import AvatarImg from './AvatarImg';
import CompanyPeopleList from './CompanyPeopleList';
import ContactName from './ContactName';
import EditContactBtn from './EditContactBtn';
import PersonCompany from './PersonCompany';
import PhonesShow from './PhonesShow';

export const ViewContact = (props) => {
   const [showActivity, setShowActivity] = React.useState(false);

   const [contact, setContact] = React.useState({});

   const [type, setType] = React.useState("");
   // const [firstName, setFirstName] = React.useState("");
   // const [lastName, setLastName] = React.useState("");
   // const [email, setEmail] = React.useState("");
   // const [companyName, setCompanyName] = React.useState("");
   // const [phones, setPhones] = React.useState([]);
   // const [addresses, setAddresses] = React.useState([]);

   console.error("view contact props => ", props);


   React.useEffect(() => {
      const { match } = props;

      // Get API response from id
      let res = personData;
      if (match.params.id === "2222") res = companyData;

      console.error("API RESPNSE =>", res);

      setContact(res);
      // setType(res.category);
      // setFirstName(res.firstName);
      // setLastName(res.lastName);
      // setEmail(res.email);
      // setCompanyName(res.companyName);
      // setPhones(res.phones);
      // setAddresses(res.addresses);
   }, [props.match.id]);

   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/c/contacts`}>
            Contacts
         </NavCrump>
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content p-5">
                  <ContactName contact={contact} />
                  <div className="row">
                     <div className="col-md-6 col-sm-12">
                        <div className="d-flex">
                           <AvatarImg contact={contact} />
                           <div className="d-block">
                              <PersonCompany contact={contact} />
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
                                 <a className="d-block" href={`mailto:${contact.email}`}>{contact.email}</a>
                              </div>

                              <div className="form-group">
                                 <PhonesShow phones={contact && (contact.phones || [])} />
                                 <AddressesShow addresses={contact && (contact.addresses || [])} />
                              </div>
                              <EditContactBtn contact={contact} />
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6 col-sm-12">
                        {
                           contact.category === "company" &&
                           <CompanyPeopleList contact={contact} />
                        }
                     </div>


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
                                 recentActivities.map((item, index) => {
                                    return (
                                       <tr key={index}>
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