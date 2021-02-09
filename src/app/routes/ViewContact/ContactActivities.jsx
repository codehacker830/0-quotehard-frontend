import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { formatDateTime } from '../../../util';
import axios from '../../../util/Api';

class ContactActivities extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: false,
         showActivity: false,
         activities: []
      }
   }
   componentDidUpdate(prevProps, prevState) {
      const { contact } = this.props;
      const contactId = this.props.match.params.id;
      if (prevState.showActivity !== this.state.showActivity && this.state.showActivity === true) {
         if (contact.category === "person") {
            this.setState({ isLoading: true });
            axios.get(`/contacts/person/activities/${contactId}`).then(({ data }) => {
               this.setState({
                  isLoading: false,
                  activities: data.activities
               });
            }).catch(err => {
               console.error("err during get contact activities");
               this.setState({ isLoading: false });
            });
         }
         else {
            this.setState({ isLoading: true });
            axios.get(`/contacts/company/activities/${contactId}`).then(({ data }) => {
               this.setState({
                  isLoading: false,
                  activities: data.activities
               });
            }).catch(err => {
               console.error("err during get contact activities");
               this.setState({ isLoading: false });
            });
         }
      }
   }
   render() {
      return (
         <div className="row no-gutters mb-1">
            <div className="w-100 font-size-sm mb-1">
               <i className="far fa-xs fa-clock mr-1" />Recent Activity
               <button className={`btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2 ${this.state.showActivity ? "" : "d-none"}`} onClick={() => this.setState({ showActivity: false })}>Hide</button>
            </div>
            <div className={`w-100 mb-1 ${this.state.showActivity ? "d-none" : ""}`}>
               <span className="w-100 text-gray font-size-sm mb-1">Edited by A Devom  –  September 21, 2020 at 11:26AM</span>
               <button className="btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2" onClick={() => this.setState({ showActivity: true })}>All Activity</button>
            </div>
            <div className={`w-100 mt-2 ${this.state.showActivity ? "" : "d-none"}`}>
               {
                  this.state.isLoading ?
                     <div className="spinner-border spinner-border-sm text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                     </div>
                     :
                     <table className="table table-sm table-vcenter">
                        <tbody>
                           {
                              this.state.activities.map((activity, index) => {
                                 return (
                                    <tr key={index}>
                                       <td className="bg-light-gray font-size-sm p-2" style={{ width: "30%" }}>{formatDateTime(activity.at)}</td>
                                       <td className="font-size-sm p-2">
                                          {
                                             this.props.contact.category === "person" ?
                                                personActivityContent(activity)
                                                : companyActivityContent(activity)
                                          }
                                       </td>
                                    </tr>
                                 );
                              })
                           }
                        </tbody>
                     </table>
               }

            </div>
         </div>
      )
   }
}

const personActivityContent = (activity) => {
   switch (activity.category) {
      case "created":
         return <span>Created by {activity.by}</span>;
      case "edited":
         return <span>Edited by {activity.by}</span>;
      case "merged":
         return <span>Merged by {activity.by}, loser of merge "{activity.loserOfMergeTitle}"</span>;
      case "archived":
         return <span>Archived by {activity.by}</span>;
      case "unarchived":
         return <span>Unarchived by {activity.by}</span>;
      case "companyAdded":
         return <span>Added to company: <Link to={`/app/c/contacts/view/${activity.editedCompany._id}`}>{activity.editedCompany.companyName}</Link></span>;
      case "companyChanged":
         return <span>Changed company, previous company: <Link to={`/app/c/contacts/view/${activity.editedCompany._id}`}>{activity.editedCompany.companyName}</Link></span>;
      case "companyRemoved":
         return <span>Company removed: <Link to={`/app/c/contacts/view/${activity.editedCompany._id}`}>{activity.editedCompany.companyName}</Link></span>;
      default:
         break;
   }
}
const companyActivityContent = (activity) => {
   switch (activity.category) {
      case "created":
         return <span>Created by {activity.by}</span>
      case "edited":
         return <span>Edited by {activity.by}, {activity.editedField} changed from: {activity.editedFrom}</span>
      case "merged":
         return <span>Merged by {activity.by}, loser of merge "{activity.loserOfMergeTitle}"</span>
      case "archived":
         return <span>Archived by {activity.by}</span>;
      case "unarchived":
         return <span>Unarchived by {activity.by}</span>;
      case "personAdded":
         return <span>Person added: <Link to={`/app/c/contacts/view/${activity.editedPerson._id}`}>{activity.editedPerson.firstName + " " + activity.editedPerson.lastName}</Link> by Harry Potter</span>
      case "personRemoved":
         return <span>Person removed: <Link to={`/app/c/contacts/view/${activity.editedPerson._id}`}>{activity.editedPerson.firstName + " " + activity.editedPerson.lastName}</Link> by Harry Potter</span>
      default:
         break;
   }
}

export default withRouter(ContactActivities);