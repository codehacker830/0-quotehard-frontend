import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../components/InlineHelp';
import axios from '../../util/Api';

export default class Contacts extends Component {
   state = {
      isLoading: true,
   };

   componentDidMount() {
      axios.get('/contacts').then(({ data }) => {
         console.error("data =", data);
         this.setState({ isLoading: false });
      });
   }
   render() {
      const { history } = this.props;
      return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="row p-3">
                     <div className="col-md-6">
                        <div className="form-group px-1">
                           <div className="input-group">
                              <input type="email" className="form-control" placeholder="Search by Quote Title, Number or Contact..." />
                              <div className="input-group-append">
                                 <button type="button" className="btn btn-alt-dark">Search</button>
                              </div>
                           </div>
                        </div>
                        <div className="row no-gutters">
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="author" name="author">
                                    <optgroup label="---------------------------"></optgroup>
                                    <option value="PeopleAndCompanies" defaultValue>People &amp; Companies</option>
                                    <optgroup label="---------------------------"></optgroup>
                                    <option value="People">People</option>
                                    <option value="Companies">Companies</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="filter_from" name="filter_from">
                                    <option value="Current" defaultValue>Current</option>
                                    <option value="Archived">Archived</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="row no-gutters mb-2 px-1">
                           <Link to="/app/c/contacts/create/person" className="btn btn-success ml-auto">New Contact</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  <InlineHelp>
                     People & Companies will be added here automatically when you create and send quotes.
                  </InlineHelp>
                  <table className="quotient-table">
                     <tbody className="rowClick">
                        <tr onClick={() => history.push(`/app/c/contacts/view/2222`)}>
                           <td>
                              <div className="d-flex">
                                 <img className="avatar-36 mr-2 my-auto"
                                    src="/assets/media/avatars/company1.png"
                                    alt="..." />
                                 <div className="u-ellipsis">
                                    <Link to="/app/c/contacts/view/4128663">ITGLOBAL</Link>
                                    <br />
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr onClick={() => history.push(`/app/c/contacts/view/4143284`)}>
                           <td>
                              <div className="d-flex">
                                 <img className="avatar-36 mr-2 my-auto"
                                    src="/assets/media/avatars/person1.png"
                                    alt="..." />
                                 <div className="u-ellipsis">
                                    <Link to="/app/c/contacts/view/4143284">Raffale Cantatore</Link>
                                    <br />
                                    <small className="text-gray font-size-sm">Raff_Company</small>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  <div className="p-4">
                     <span>Total 2</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}