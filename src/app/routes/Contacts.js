import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../components/InlineHelp';

export default class Contacts extends Component {
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
                                    <option value selected="selected">People &amp; Companies</option>
                                    <optgroup label="---------------------------">
                                       <option value="People">People</option>
                                       <option value="Companies">Companies</option>
                                    </optgroup>
                                 </select>
                              </div>
                           </div>
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="filter_from" name="filter_from">
                                    <option value="Current" selected="selected">Current</option>
                                    <option value="Archived">Archived</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="row mb-2">
                           <button className="btn btn-success ml-auto">New Quote</button>
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
                        <tr onClick={() => history.push(`/app/c/contacts/view/4128663`)}>
                           <td>
                              <div className="d-flex">
                                 <img className="avatar-32 mr-2"
                                    src="https://secure.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?r=g&s=64&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fcompany1.png"
                                    alt="Allover" />
                                 <div className="u-ellipsis">
                                    <Link to="/app/c/contacts/view/4128663">Allover</Link>
                                    <br />
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr onClick={() => history.push(`/app/c/contacts/view/4143284`)}>
                           <td>
                              <div className="d-flex">
                                 <img className="avatar-32 mr-2"
                                    src="https://secure.gravatar.com/avatar/5b790291599408b1b231ae1cf4c7a07a?r=g&s=64&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png"
                                    alt="Danil Zolouthin" />
                                 <div className="u-ellipsis">
                                    <Link to="/app/c/contacts/view/4143284">Danil Zolouthin</Link>
                                    <br />
                                    <small className="text-gray font-size-sm">DanilCompany</small>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  <div className="p-4">
                     <span>Total 4</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}