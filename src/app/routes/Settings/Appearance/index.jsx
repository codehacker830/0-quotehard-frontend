import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Appearance extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fileBlob: "",
         heightWeight: "bold",
         isPrintEnabled: false,
      };
      this.hiddenFileInput = React.createRef();
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   uploadFile = (e) => {
      console.log("e.target.files ==>", e.target.files);
      if (e.target.files[0]) this.setState({ fileBlob: URL.createObjectURL(e.target.files[0]) });
   }

   removeImageItem = () => {
      this.setState({ fileBlob: "" });
   }
   onChangeHeightWeight = (ev) => {
      this.setState({ heightWeight: ev.target.value });
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Layout, Style and Company Information</h2>
               <div className="row mb-5">
                  <div className="col-sm-7 border-right pr-4">
                     <h4 className="mb-2">Logo</h4>
                     <div className="ml-3 mb-4">
                        <input type="file"
                           ref={this.hiddenFileInput}
                           onChange={this.uploadFile}
                           className="d-none"
                        />

                        {
                           this.state.fileBlob !== "" ?
                              <div className="row justify-content-center" style={{ position: "relative" }}>
                                 <img src={this.state.fileBlob} className="mr-2 image-preview-size" alt="..." />
                                 <button className="btn btn-sm btn-light" onClick={this.removeImageItem} style={{ position: "absolute", top: 5, right: 5 }}>
                                    <i className="fa fa-times-circle"></i>
                                 </button>
                              </div>
                              :
                              <div className="">
                                 <button className="btn btn-square btn-outline-secondary"
                                    onClick={this.handleClickFileOpen}
                                 ><i className="si si-paper-clip fa-fw mr-1" />Choose logo</button>
                              </div>
                        }
                     </div>

                     <h4 className="mb-2">Colors</h4>
                     <div className="ml-3 mb-4">

                     </div>

                     <h4 className="mb-2">Contact Detail</h4>
                     <div className="ml-3 mb-4">
                        <div className="row mb-2">
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-0" name="pLayout[_s][contact_format]" />
                           Columns
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-columns-02.png" alt="Left" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-1" name="pLayout[_s][contact_format]" />
                           In-line
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-inline-02.png" alt="Centered" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-2" name="pLayout[_s][contact_format]" />
                           Right Column
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-right-02.png" alt="Right" />
                           </label>
                        </div>


                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" id="pLayout__s_contact_inc_details" name="pLayout__s_contact_inc_details" />
                           <label className="form-check-label" htmlFor="pLayout__s_contact_inc_details">Display full customer detail (phone, address and email)</label>
                        </div>
                     </div>

                     <h4 className="mb-2">Contact Detail</h4>
                     <div className="ml-3 mb-4">
                        <div className="row from-group">
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-0" name="pLayout[_s][layout_align_x]" />
                              Left
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-left-02.png" alt="Left" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-1" name="pLayout[_s][layout_align_x]" />
                              Centered
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-center-02.png" alt="Centered" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-2" name="pLayout[_s][layout_align_x]" />
                              Right
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-right-02.png" alt="Right" />
                           </label>
                        </div>
                     </div>

                     <h4 className="mb-2">Text Styles</h4>
                     <div className="row ml-3">
                        <div className="col-sm-3">
                           <div className="form-group">
                              <label>Heading Font</label>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-0" name="pLayout[_s][font_heading]" />
                                 <label className={`form-check-label ${this.state.heightWeight === "bold" ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading-0">Helvetica</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-1" name="pLayout[_s][font_heading]" />
                                 <label className={`form-check-label ${this.state.heightWeight === "bold" ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_heading-1">Tahoma</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-2" name="pLayout[_s][font_heading]" />
                                 <label className={`form-check-label ${this.state.heightWeight === "bold" ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_heading-2">Georgia</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-3" name="pLayout[_s][font_heading]" />
                                 <label className={`form-check-label ${this.state.heightWeight === "bold" ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Times" }} htmlFor="pLayout__s_font_heading-3">Times</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-sm-3">
                           <div className="form-group">
                              <label>Body Text</label>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-0" name="pLayout[_s][font_body]" />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_body-0">Helvetica</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-1" name="pLayout[_s][font_body]" />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_body-1">Tahoma</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-2" name="pLayout[_s][font_body]" />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_body-2">Georgia</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-3" name="pLayout[_s][font_body]" />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Times" }} htmlFor="pLayout__s_font_body-3">Times</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-sm-3">
                           <div className="form-group">
                              <label>Heading Weight</label>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading_weight-0" name="pLayout[_s][font_heading_weight]"
                                    value="bold"
                                    checked={this.state.heightWeight === "bold"}
                                    onChange={this.onChangeHeightWeight}
                                 />
                                 <label className="form-check-label font-w700" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading_weight-0">Bold headings</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading_weight-1" name="pLayout[_s][font_heading_weight]"
                                    value="regular"
                                    checked={this.state.heightWeight === "regular"}
                                    onChange={this.onChangeHeightWeight}
                                 />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_heading_weight-1">Regular</label>
                              </div>
                           </div>
                        </div>
                     </div>

                     <h4 className="mb-2">Pricing Format</h4>
                     <div className="ml-3 mb-4">
                        <div className="form-group">
                           <label>Describe Tax as:</label>
                           <select className="form-control rounded-0 maxWidth-180 mb-3" name="account[tax_word_id]" id="account_tax_word_id" defaultValue={4}>
                              <option value={1}>GST</option>
                              <option value={2}>HST</option>
                              <option value={7}>IVA</option>
                              <option value={4}>Tax</option>
                              <option value={5}>VAT</option>
                              <option value={6}>VAT/NHIL</option>
                           </select>
                        </div>
                        <div className="form-group">
                           <label>Display in Total:</label>
                           <div className="ml-3">
                              <div className="form-check">
                                 <input className="form-check-input" type="checkbox" id="account_show_currency_symbol" name="account_show_currency_symbol" />
                                 <label className="form-check-label" htmlFor="account_show_currency_symbol">Currency Symbol</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="checkbox" id="account_show_currency_code" name="account_show_currency_code" />
                                 <label className="form-check-label" htmlFor="account_show_currency_code">Currency Code</label>
                              </div>
                           </div>
                        </div>
                     </div>

                     <h4 className="mb-2">Print PDF</h4>
                     <div className="ml-3 mb-4">
                        <div className="form-check">
                           <input className="form-check-input" type="checkbox"
                              id="pLayout__s_pdf_show" name="pLayout__s_pdf_show"
                              checked={this.state.isPrintEnabled}
                              onChange={() => this.setState({ isPrintEnabled: !this.state.isPrintEnabled })}
                           />
                           <label className="form-check-label mb-2" htmlFor="pLayout__s_pdf_show">Enable Print PDF downloads</label>
                           <div className={`form-group ${this.state.isPrintEnabled ? "" : "d-none"}`}>
                              <label>Page Size</label>
                              <select className="form-control rounded-0 maxWidth-180 mb-3" name="pLayout[_s][pdf_page_size]" id="pLayout__s_pdf_page_size" defaultValue={0}>
                                 <option value="0">A4</option>
                                 <option value="1">US Letter</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <h4 className="mb-2">Company Information</h4>
                     <div className="ml-3 mb-4">
                        <div className="form-group maxWidth-550">
                           <label htmlFor="pLayout[_s][comp_name]">Company or Organization</label>
                           <input type="text" className="form-control rounded-0" id="pLayout[_s][comp_name]" name="pLayout[_s][comp_name]" placeholder="ACME Corp." />
                        </div>
                        <div className="form-group maxWidth-550">
                           <label htmlFor="pLayout__s_comp_address">Address</label>
                           <TextareaAutosize type="text" className="form-control rounded-0" id="pLayout__s_comp_address" name="pLayout__s_comp_address" rows={3} placeholder="Postal and Physical address" />
                        </div>
                        <div className="form-group maxWidth-550">
                           <label htmlFor="pLayout__s_comp_website">Website</label>
                           <input type="text" className="form-control rounded-0" id="pLayout__s_comp_website" name="pLayout__s_comp_website" placeholder="www.example.com" />
                        </div>
                        <div className="form-group maxWidth-550">
                           <label htmlFor="pLayout__s_comp_phone">Phone</label>
                           <input type="text" className="form-control rounded-0" id="pLayout__s_comp_phone" name="pLayout__s_comp_phone" placeholder="" />
                        </div>
                     </div>
                  </div>


                  <div className="col-sm-5 p-0">
                     <div className="contact-example-bord" style={{ top: "30%", position: "sticky" }}>
                        <div className="contact-example" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                           <div className="inner">
                              <div className="example-left">
                                 <div className="example-block example-hide">
                                    <img className="example-logo example-logo-top" src="https://asset.quotientapp.com/file-s/1/logo-v3/39310/a269ba8815ec54d524fa8d8b51e491f4" alt="Example logo" style={{ marginLeft: 0 }} />
                                 </div>
                                 <img className="example-block example-hide example-contact " src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-center-01.png" alt="Example contact details" />
                                 <img className="example-block example-contact" src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-left-01.png" alt="Example contact details" />
                                 <img className="example-block example-contact   example-hide" src="https://asset.quotientapp.com/image/app-layout-example/contact-column-01.png" alt="Example contact details" />
                                 <div className="example-block example-title" style={{ fontFamily: 'Helvetica', fontWeight: 'normal', marginLeft: 0 }}>Your Quote</div>
                                 {/* <div className="clear" /> */}
                                 <div className="example-block example-lines-wrap example-lines-left">
                                    <img className="example-lines" src="https://asset.quotientapp.com/image/app-layout-example/lines-a-01.png" alt="Example lines" />
                                    <img className="example-lines-bg" src="https://asset.quotientapp.com/image/app-layout-example/lines-a-01.png" alt="Example lines" style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
                                 </div>
                                 <div className="example-block example-lines-wrap example-lines-right example-hide">
                                    <img className="example-lines" src="https://asset.quotientapp.com/image/app-layout-example/lines-r-a-01.png" alt="Example lines" />
                                    <img className="example-lines-bg" src="https://asset.quotientapp.com/image/app-layout-example/lines-r-b-01.png" alt="Example lines" style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
                                 </div>
                                 <div className="example-block example-accept-block" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                                    <img className="example-tick example-tick-left" src="https://asset.quotientapp.com/image/app-layout-example/tick-02.png" alt="Example accept line" />
                                    <img className="example-tick example-tick-right isHidden" src="https://asset.quotientapp.com/image/app-layout-example/tick-r-02.png" alt="Example accept line" />
                                    <div className="example-accept" style={{ backgroundColor: 'rgb(33, 118, 199)', marginLeft: 0 }}>Accept</div>
                                 </div>
                                 {/* <div className="clear" /> */}
                              </div>
                              <div className="example-right">
                                 <div className="example-block example-block-logo example-hide">
                                    <img className="example-logo example-logo-right" src="https://asset.quotientapp.com/file-s/1/logo-v3/39310/a269ba8815ec54d524fa8d8b51e491f4" alt="Example logo" />
                                 </div>
                                 <img className="example-block example-contact   example-hide" src="https://asset.quotientapp.com/image/app-layout-example/contact-right-01.png" alt="Contact format right" />
                              </div>
                              {/* <div className="clear" /> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings">Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}