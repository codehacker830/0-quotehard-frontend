import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';
import TextareaAutosize from 'react-autosize-textarea';

export default class CustomerEmailChange extends Component {
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <div className="mb-3">
                  <h3 className="mb-2">New Quote</h3>
                  <div className="maxWidth-800">
                     <div className="row no-gutters">
                        <select className="form-control rounded-0 ml-auto"
                           name="_new_quote_placeholders" id="_new_quote_placeholders"
                           style={{ width: 300 }}
                        >
                           <option value="" selected="selected">Insert Placeholder</option>
                           <optgroup label=" ––– You ––––––––– ">
                              <option value="[Your-name]">Your Name</option>
                              <option value="[Your-first-name]">Your First Name</option>
                              <option value="[Your-email]">Your Email Address</option>
                              <option value="[Your-company-name]">Your Company Name</option>
                           </optgroup>
                           <optgroup label=" ––– Customer ––––––––– ">
                              <option value="[Customer-given-names]">Customer Given Name(s)</option>
                              <option value="[Customer-company]">Customer Company</option>
                           </optgroup>
                           <optgroup label=" ––– Quote ––––––––– ">
                              <option value="[Quote-title]">Quote Title</option>
                              <option value="[Quote-number]">Quote Number</option>
                           </optgroup>
                        </select>
                     </div>

                     <div className="form-group">
                        <label htmlFor="input_custom_email_subject">Subject</label>
                        <TextareaAutosize className="form-control emailWording-subject rounded-0" id="input_custom_email_subject" name="input_custom_email_subject" >
                           New quote: [Quote-title]
                        </TextareaAutosize>
                        <div className="emailWording-body">
                           <TextareaAutosize className="form-control sendEmail-part1"
                              rows={3}
                              style={{ height: 90 }}>
                              Hi [Customer-given-names],
                              [Your-name] of [Your-company-name] has prepared the following quote for you:
                           </TextareaAutosize>
                           <div className="emailWording-nonEdit">
                              <button className="btn btn-primary">View Quote</button>
                              <br />
                              <br />
                              Captivating Title of Quote
                              <span className="emailWording-small">CompanyName #12345678</span>
                           </div>
                           <TextareaAutosize className="form-control sendEmail-part2"
                              rows={3}
                              style={{ height: 105 }}
                           />
                        </div>
                     </div>

                  </div>
               </div>
               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings/customer-emails">Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}