import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { Link } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';

export default class EditLeadForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayLogoChecked: true,
         introductionHeading: "How can we help?",
         introductionDescription: "Enter your details below and we’ll reply back as soon as possible.",
         displaySubjectOptions: `I would like some more information
I would like to request a quote
Other - Just saying hello`,
         confirmMessageHeading: "Thank you",
         confirmMessageDescription: "We’ll reply back as soon as possible."
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
               <h2 className="my-4">Edit Lead Form</h2>

               {/* Introduction */}
               <div className="mb-5 maxWidth-800">
                  <h4>Introduction</h4>
                  <div className="form-check ml-3">
                     <input className="form-check-input"
                        type="checkbox"
                        id="displayLogo" name="displayLogo"
                        checked={this.state.isDisplayLogoChecked}
                        onChange={() => this.setState({ isDisplayLogoChecked: !this.state.isDisplayLogoChecked })}
                     />
                     <span className="form-check-label" htmlFor="displayLogo">Display Logo</span>
                     <div className="form-group mt-2">
                        <label>Heading and description</label>
                        <TextareaAutosize rows={5} className="form-control rounded-0 mb-2"
                           value={this.state.introductionHeading}
                           onChange={(ev) => this.setState({ introductionHeading: ev.target.value })} />
                        <TextareaAutosize rows={5} className="form-control rounded-0"
                           value={this.state.introductionDescription}
                           onChange={(ev) => this.setState({ introductionDescription: ev.target.value })} />
                     </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-5 maxWidth-800">
                     <h4>Subject</h4>
                     <div className="form-check ml-3">
                        <input className="form-check-input"
                           type="checkbox"
                           id="displaySubjectOptions" name="displaySubjectOptions"
                           checked={this.state.isDisplaySubjectOptionsChecked}
                           onChange={() => this.setState({ isDisplaySubjectOptionsChecked: !this.state.isDisplaySubjectOptionsChecked })}
                        />
                        <span className="form-check-label" htmlFor="displaySubjectOptions">Display Subject Options:</span>
                        <div className="form-group mt-2">
                           <TextareaAutosize rows={4} className="form-control rounded-0 mb-2" id="subjectOptions" name="subjectOptions"
                              value={this.state.displaySubjectOptions}
                              onChange={(ev) => this.setState({ displaySubjectOptions: ev.target.value })} />
                           <label htmlFor="subjectOptions" className="text-gray fa-xs">Place each option on a separate line. The first option will be the default selected</label>
                        </div>
                     </div>
                  </div>

                  {/* Also, include the following: */}
                  <div className="mb-5 maxWidth-800">
                     <h4>Also, include the following:</h4>
                     <div className="form-group ml-3">
                        <div className="form-check mb-2">
                           <input className="form-check-input" type="checkbox" id="fileUpload" name="fileUpload" />
                           <span className="form-check-label" htmlFor="fileUpload"><strong>File Upload</strong></span>
                        </div>
                        <div className="form-check mb-2">
                           <input className="form-check-input" type="checkbox" id="fieldForCompany" name="fieldForCompany" />
                           <span className="form-check-label" htmlFor="fieldForCompany">Field for<strong>Company</strong></span>
                        </div>
                        <div className="form-check mb-2">
                           <input className="form-check-input" type="checkbox" id="fieldForPhone" name="fieldForPhone" />
                           <span className="form-check-label" htmlFor="fieldForPhone">Field for<strong>Phone</strong></span>
                        </div>
                     </div>
                  </div>

                  {/* Confirmation Message */}
                  <div className="mb-5 maxWidth-800">
                     <h4>Confirmation Message</h4>
                     <div className="form-group ml-3">
                        <label>Heading and description</label>
                        <TextareaAutosize rows={1} className="form-control rounded-0 mb-2"
                           value={this.state.confirmMessageHeading}
                           onChange={(ev) => this.setState({ confirmMessageHeading: ev.target.value })} />
                        <TextareaAutosize rows={2} className="form-control rounded-0"
                           value={this.state.confirmMessageDescription}
                           onChange={(ev) => this.setState({ confirmMessageDescription: ev.target.value })} />
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="mb-5 maxWidth-800">
                     <h4>Footer</h4>
                     <p>The footer will display on the Lead Form and Confirmation Message.</p>
                     <div className="form-group ml-3">
                        <label htmlFor="footerText">Text</label>
                        <input type="text" className="form-control rounded-0" id="footerText" name="footerText" placeholder="My Company Website" />
                        <label htmlFor="footerText" className="text-gray fa-xs">This could simply be the name of your company.</label>
                     </div>
                     <div className="form-group ml-3">
                        <label htmlFor="footerLink">Link</label>
                        <input type="text" className="form-control rounded-0" id="footerLink" name="footerLink" placeholder="https://" />
                        <label htmlFor="footerLink" className="text-gray fa-xs">Provide a handy link back to your company’s website.</label>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onHandleSubmit}>Save & Preview</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`/app/add-ons/leads`}>Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}