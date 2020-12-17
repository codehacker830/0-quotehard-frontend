import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';

class Tr_Contact extends Component {
   constructor(props) {
      super(props);

      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      // this.search = queryObj.search ? queryObj.search : "";
      // this.category = queryObj.category ? queryObj.category : "peopleAndCompanies";
      // this.status = queryObj.status ? queryObj.status : "current";
      this.merge_loser = queryObj.merge_loser ? queryObj.merge_loser : "";
   }
   render() {
      const { contact } = this.props;
      const isLoser = this.merge_loser === contact._id;
      console.log("TABLE ROW CONTACT INFO ===>", contact)
      console.log("isLoser :", isLoser)
      console.log("this.merge_loser :", this.merge_loser)
      return (
         <tr className={`${isLoser ? "rowClick-disable" : ""}`} onClick={() => {
            if (isLoser) return;
            if (this.merge_loser) this.props.history.push(`/app/c/contacts/view/${contact._id}?merge_loser=${this.merge_loser}`);
            else this.props.history.push(`/app/c/contacts/view/${contact._id}`);
         }}>
            <td>
               {
                  contact.category === "person" ?
                     <div className="d-flex">
                        <img className="avatar-36 mr-2 my-auto" src="/assets/media/avatars/person1.png" alt="person avatar" />
                        <div className="u-ellipsis">
                           <span>{contact.firstName} {contact.lastName}</span>&nbsp;
                           {isLoser && <span className="label label-success">Loser</span>}
                           <br />
                           <small className="text-gray font-size-sm">{contact.company && contact.company.companyName}</small>
                        </div>
                     </div>
                     :
                     <div className="d-flex">
                        <img className="avatar-36 mr-2 my-auto" src="/assets/media/avatars/company1.png" alt="company avatar" />
                        <div className="u-ellipsis">
                           <span>{contact.companyName}</span>&nbsp;
                           {isLoser && <span className="label label-success">Loser</span>}
                           <br />
                        </div>
                     </div>

               }
            </td>
         </tr>
      );
   }
}

export default withRouter(Tr_Contact);