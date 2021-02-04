import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs';

class ContactsPanel extends Component {
   constructor(props) {
      super(props);
      this.state = {
         search: ""
      };

      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.search = queryObj.search ? queryObj.search : "";
      this.category = queryObj.category ? queryObj.category : "peopleAndCompanies";
      this.status = queryObj.status ? queryObj.status : "current";
      this.merge_loser = queryObj.merge_loser ? queryObj.merge_loser : "";
   }
   componentDidMount() {
      this.setState({ search: this.search });
   }
   onChangeCategory = (ev) => {
      this.category = ev.target.value;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/c/contacts",
         search: query
      })
   }
   onChangeStatus = (ev) => {
      this.status = ev.target.value;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/c/contacts",
         search: query
      })
   }
   onHandleKeyDown = (ev) => {
      if(ev.keyCode === 13) {
         // event when enter was clicked
         this.onClickSearch();
      }
   }
   onClickSearch = () => {
      this.search = this.state.search;
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/c/contacts",
         search: query
      })
   }
   onClickCancelSearch = () => {
      this.search = "";
      this.category = "peopleAndCompanies";
      this.status = "current";
      const query = this.makeQuery();

      this.props.history.push({
         pathname: "/app/c/contacts",
         search: query
      })
   }
   makeQuery = () => {
      let queryObj = {};
      if (this.search) queryObj = { ...queryObj, search: this.search };
      if (this.category !== "peopleAndCompanies") queryObj = { ...queryObj, category: this.category };
      if (this.status !== "current") queryObj = { ...queryObj, status: this.status };
      return qs.stringify(queryObj);
   }
   render() {
      const isCancelButtonShow = this.search || this.category !== "peopleAndCompanies" || this.status !== "current";
      return (
         <div className="block block-rounded">
            <div className="block-content">
               <div className="row p-3">
                  <div className="col-md-6">
                     <div className="form-group px-1">
                        <div className="input-group">
                           <input type="text" className="form-control mr-1" placeholder="Search by Company, Person or Email..."
                              onKeyDown={this.onHandleKeyDown}
                              value={this.state.search}
                              onChange={(ev) => this.setState({ search: ev.target.value })}
                           />
                           <div className="input-group-append">
                              <button type="button" className="btn btn-alt-dark mr-1" onClick={this.onClickSearch}><i className="fa fa-fw fa-search" /></button>
                              {
                                 isCancelButtonShow &&
                                 <button type="button" className="btn btn-alt-dark" onClick={this.onClickCancelSearch}><i className="fa fa-fw fa-times" /></button>
                              }
                           </div>
                        </div>
                     </div>
                     <div className="row no-gutters">
                        <div className="col-sm-6 px-1">
                           <div className="form-group">
                              <select className="form-control"
                                 id="filter_category" name="filter_category"
                                 value={this.category}
                                 onChange={this.onChangeCategory} >
                                 <optgroup label="---------------------------"></optgroup>
                                 <option value="peopleAndCompanies">People &amp; Companies</option>
                                 <optgroup label="---------------------------"></optgroup>
                                 <option value="person">People</option>
                                 <option value="company">Companies</option>
                              </select>
                           </div>
                        </div>
                        <div className="col-sm-6 px-1">
                           <div className="form-group">
                              <select className="form-control"
                                 id="filter_status" name="filter_status"
                                 value={this.status}
                                 onChange={this.onChangeStatus}
                              >
                                 <option value="current">Current</option>
                                 <option value="archived">Archived</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
                  {
                     this.merge_loser ?
                        null
                        :
                        <div className="col-md-6">
                           <div className="row no-gutters mb-2 px-1">
                              <Link to="/app/c/contacts/create/person" className="btn btn-success ml-auto">New Contact</Link>
                           </div>
                        </div>
                  }
               </div>
            </div>
         </div>
      )
   }
}

export default withRouter(ContactsPanel);