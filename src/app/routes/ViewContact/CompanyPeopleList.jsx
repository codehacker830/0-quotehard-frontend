import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from '../../../util/Api';

const CompanyPeopleList = (props) => {
   const [peopleContactList, setPeopleContactArray] = useState([]);
   React.useEffect(() => {
      console.log("Company Props =>", props.contact);

      // get poeple contact list with company contact _id
      axios.get(`/contacts/people-by-companyid/${props.contact._id}`).then(({ data }) => {
         console.log("api response =", data);
         setPeopleContactArray(data.contacts);
      });
   }, [props]);

   console.log(" PROPS  ---- ", props);
   return (
      <React.Fragment>
         {
            peopleContactList.length ?
               <h4 className="mb-0">{peopleContactList.length} people</h4>
               : <h4 className="mb-0">No people here</h4>
         }
         {
            peopleContactList.map((item, ind) => {
               return (
                  <div className="d-flex mt-3" key={ind}>
                     <img className="avatar-36 mr-2 my-auto"
                        src="/assets/media/avatars/person1.png"
                        alt="Danil Zolouthin" />
                     <div className="u-ellipsis">
                        <Link to={`/app/c/contacts/view/${item._id}`}>{item.firstName} {item.lastName}</Link>
                        <br />
                        <small className="text-gray font-size-sm">{item.companyName}</small>
                     </div>
                  </div>
               );
            })
         }
         <Link className="btn btn-outline-dark font-size-sm mt-4"
            to={{
               pathname: `/app/c/contacts/create/person`,
               state: {
                  from: `${props.location.pathname || "/app/c/contacts"}`,
                  companyId: `${props.contact._id}`,
                  companyName: `${props.contact.companyName}`
               }
            }}>Add Person</Link>
      </React.Fragment>
   )
}

export default withRouter(CompanyPeopleList);