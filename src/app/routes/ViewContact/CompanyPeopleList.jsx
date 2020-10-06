import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { peopleContacts } from "../../../constants/Dump";

const CompanyPeopleList = (props) => {
   let from = "/app/c/contacts";
   let companyName = "";
   const [peopleContactList, setPeopleContactArray] = React.useState([]);

   React.useEffect(() => {
      console.log("Company Props =>", props);

      // get poeple contact list with company contact _id
      from = props.location.pathname;
      companyName = props.contact.companyName;
      console.log("from", from);
      setPeopleContactArray(peopleContacts);
   }, [props]);

   return (
      <>
         {
            peopleContactList.length ?
               <h4>{peopleContactList.length} people</h4>
               : <h4>No people here</h4>
         }
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
               pathname: `/app/c/contacts/create/person`,
               state: {
                  from: `${from}`,
                  company: `${companyName}`
               }
            }}>Add Person</Link>
      </>
   )
}

export default withRouter(CompanyPeopleList);