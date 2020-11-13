import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class ReviewConfig extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayOnAllNewQuotesChecked: true,
      }
   }
   onHandleSubmit = () => {
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/add-ons/leads`}>
               Leads
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Feature Reviews on Quotes</h2>
               <div className="mb-5">
                  <h4>As you collect new Reviews:</h4>
                  <div className="form-group maxWidth-800 ml-2">
                     <ul className="fa-ul">
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-check" />
                           </span>	You select the best to Feature
                        </li>
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-check" />
                           </span>	You need <strong>3 or more</strong> Featured Reviews, to display on new Quotes
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="mb-5">
                  <h4>When editing a Quote:</h4>
                  <div className="form-group maxWidth-800 ml-2">
                     <ul className="fa-ul">
                        <li>
                           <span className="fa-li">
                              <i className="fa fa-check" />
                           </span>	Let me choose when to display Reviews
                        </li>
                     </ul>
                     <div className="form-check ml-3">
                        <input className="form-check-input" type="checkbox" id="isDisplayOnAllNewQuotesChecked" name="isDisplayOnAllNewQuotesChecked"
                           checked={this.state.isDisplayOnAllNewQuotesChecked}
                           onChange={() => this.setState({ isDisplayOnAllNewQuotesChecked: !this.state.isDisplayOnAllNewQuotesChecked })}
                        />
                        <label className="form-check-label" htmlFor="isDisplayOnAllNewQuotesChecked">Display Reviews on all new Quotes, by default</label>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onHandleSubmit}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`/app/add-ons/reviews`}>Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}