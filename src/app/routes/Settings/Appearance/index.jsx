import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { uploadLogo, removeLogo, getAppearanceSettings } from '../../../../actions/Appearance';
import NavCrump from '../../../../components/NavCrump';
import { LOGO_URL } from '../../../../constants/ActionTypes';
import { switchHeadingFont } from '../../../../util';

class Appearance extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,

         logo: "",
         contactDetailLayout: 0,
         isDisplayFullCustomerDetail: false,
         layout: 0,

         headingFont: 0,
         bodyText: 0,
         headingWeight: 0,

         describeTaxAs: 4,
         displayCurrencySymbolInTotal: true,
         displayCurrencyCodeInTotal: false,

         isEnabledPrintPDF: false,
         pdfPageSize: 1,

         companyDisplayName: "",
         address: "",
         website: "",
         phone: ""
      };
      this.hiddenFileInput = React.createRef();
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   onChangeHeightWeight = (ev) => {
      this.setState({ headingWeight: ev.target.value });
   }
   onClickSaveAndPublish = () => {
      this.setState({ loading: true });
      setTimeout(() => {
         this.setState({ loading: false });
         this.props.history.push("/app/settings");
      }, 2000)
   }
   componentDidMount() {
      this.props.getAppearanceSettings();
   }
   render() {
      console.log("Appearanc state __", this.state);
      console.log("Appearanc props __", this.props);
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Layout, Style and Company Information</h2>
               <div className="row mb-4">
                  <div className="col-sm-7 border-right pr-4">
                     <h4 className="mb-2">Logo</h4>
                     <div className="ml-3 mb-4">
                        <input type="file"
                           ref={this.hiddenFileInput}
                           onChange={this.props.uploadLogo}
                           className="d-none"
                        />

                        {
                           this.props.appearanceSetting.logo ?
                              <div className="row justify-content-center" style={{ position: "relative" }}>
                                 <img src={this.props.appearanceSetting.logo} className="mr-2 image-preview-size" alt="..." />
                                 <button className="btn btn-sm btn-light" onClick={() => this.props.removeLogo(this.props.appearanceSetting.logo)} style={{ position: "absolute", top: 5, right: 5 }}>
                                    <i className="fa fa-times-circle"></i>
                                 </button>
                              </div>
                              :
                              <div className="p-2">
                                 <button className="btn btn-square btn-outline-secondary"
                                    onClick={this.handleClickFileOpen}
                                    disabled={this.props.commonData.loading}
                                 >
                                    {
                                       this.props.commonData.loading && this.props.commonData.type === LOGO_URL ?
                                          <div className="spinner-border spinner-border-sm text-secondary mr-1" role="status">
                                             <span className="sr-only">Loading...</span>
                                          </div>
                                          : <i className="si si-paper-clip fa-fw mr-1" />
                                    }
                                    Choose logo
                                    </button>
                              </div>
                        }
                     </div>

                     {/* <h4 className="mb-2">Colors</h4>
                     <div className="ml-3 mb-4">

                     </div> */}

                     <h4 className="mb-2">Contact Detail</h4>
                     <div className="ml-3 mb-4">
                        <div className="row mb-2">
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-0" name="pLayout[_s][contact_format]"
                                 value={0}
                                 checked={this.state.contactDetailLayout == 0}
                                 onChange={(ev) => this.setState({ contactDetailLayout: ev.target.value })}
                              />
                           Columns
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-columns-02.png" alt="Column" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-1" name="pLayout[_s][contact_format]"
                                 value={1}
                                 checked={this.state.contactDetailLayout == 1}
                                 onChange={(ev) => this.setState({ contactDetailLayout: ev.target.value })}
                              />
                           In-line
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-inline-02.png" alt="In-line" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_contact_format-2" name="pLayout[_s][contact_format]"
                                 value={2}
                                 checked={this.state.contactDetailLayout == 2}
                                 onChange={(ev) => this.setState({ contactDetailLayout: ev.target.value })}
                              />
                           Right Column
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-right-02.png" alt="Right" />
                           </label>
                        </div>


                        <div className="form-check">
                           <input className="form-check-input" type="checkbox" id="pLayout__s_contact_inc_details" name="pLayout__s_contact_inc_details" />
                           <label className="form-check-label" htmlFor="pLayout__s_contact_inc_details">Display full customer detail (phone, address and email)</label>
                        </div>
                     </div>

                     <h4 className="mb-2">Layout</h4>
                     <div className="ml-3 mb-4">
                        <div className="row from-group">
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-0" name="pLayout[_s][layout_align_x]"
                                 value={0}
                                 checked={this.state.layout == 0}
                                 onChange={(ev) => this.setState({ layout: ev.target.value })}
                              />
                              Left
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-left-02.png" alt="Left" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-1" name="pLayout[_s][layout_align_x]"
                                 value={1}
                                 checked={this.state.layout == 1}
                                 onChange={(ev) => this.setState({ layout: ev.target.value })}
                              />
                              Centered
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-center-02.png" alt="Centered" />
                           </label>
                           <label className="appear-check-3">
                              <input type="radio" id="pLayout__s_layout_align_x-2" name="pLayout[_s][layout_align_x]"
                                 value={2}
                                 checked={this.state.layout == 2}
                                 onChange={(ev) => this.setState({ layout: ev.target.value })}
                              />
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
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-0" name="pLayout[_s][font_heading]"
                                    value={0}
                                    checked={this.state.headingFont == 0}
                                    onChange={(ev) => this.setState({ headingFont: ev.target.value })}
                                 />
                                 <label className={`form-check-label ${this.state.headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading-0">Helvetica</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-1" name="pLayout[_s][font_heading]"
                                    value={1}
                                    checked={this.state.headingFont == 1}
                                    onChange={(ev) => this.setState({ headingFont: ev.target.value })}
                                 />
                                 <label className={`form-check-label ${this.state.headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_heading-1">Tahoma</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-2" name="pLayout[_s][font_heading]"
                                    value={2}
                                    checked={this.state.headingFont == 2}
                                    onChange={(ev) => this.setState({ headingFont: ev.target.value })}
                                 />
                                 <label className={`form-check-label ${this.state.headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_heading-2">Georgia</label>
                              </div>
                              <div className="form-check pb-2">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading-3" name="pLayout[_s][font_heading]"
                                    value={3}
                                    checked={this.state.headingFont == 3}
                                    onChange={(ev) => this.setState({ headingFont: ev.target.value })}
                                 />
                                 <label className={`form-check-label ${this.state.headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Times" }} htmlFor="pLayout__s_font_heading-3">Times</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-sm-3">
                           <div className="form-group">
                              <label>Body Text</label>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-0" name="pLayout[_s][font_body]"
                                    value={0}
                                    checked={this.state.bodyText == 0}
                                    onChange={(ev) => this.setState({ bodyText: ev.target.value })}
                                 />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_body-0">Helvetica</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-1" name="pLayout[_s][font_body]"
                                    value={1}
                                    checked={this.state.bodyText == 1}
                                    onChange={(ev) => this.setState({ bodyText: ev.target.value })}
                                 />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_body-1">Tahoma</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-2" name="pLayout[_s][font_body]"
                                    value={2}
                                    checked={this.state.bodyText == 2}
                                    onChange={(ev) => this.setState({ bodyText: ev.target.value })}
                                 />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_body-2">Georgia</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_body-3" name="pLayout[_s][font_body]"
                                    value={3}
                                    checked={this.state.bodyText == 3}
                                    onChange={(ev) => this.setState({ bodyText: ev.target.value })}
                                 />
                                 <label className="form-check-label font-w400" style={{ fontFamily: "Times" }} htmlFor="pLayout__s_font_body-3">Times</label>
                              </div>
                           </div>
                        </div>
                        <div className="col-sm-3">
                           <div className="form-group">
                              <label>Heading Weight</label>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading_weight-0" name="pLayout[_s][font_heading_weight]"
                                    value={0}
                                    checked={this.state.headingWeight == 0}
                                    onChange={this.onChangeHeightWeight}
                                 />
                                 <label className="form-check-label font-w700" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading_weight-0">Bold headings</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="radio" id="pLayout__s_font_heading_weight-1" name="pLayout[_s][font_heading_weight]"
                                    value={1}
                                    checked={this.state.headingWeight == 1}
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
                           <select className="form-control rounded-0 maxWidth-180 mb-3" name="account[tax_word_id]" id="account_tax_word_id"
                              value={this.state.describeTaxAs}
                              onChange={(ev) => this.setState({ describeTaxAs: ev.target.value })}
                           >
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
                                 <input className="form-check-input" type="checkbox" id="account_show_currency_symbol" name="account_show_currency_symbol"
                                    checked={this.state.displayCurrencySymbolInTotal}
                                    onChange={() => this.setState({ displayCurrencySymbolInTotal: !this.state.displayCurrencySymbolInTotal })}
                                 />
                                 <label className="form-check-label" htmlFor="account_show_currency_symbol">Currency Symbol</label>
                              </div>
                              <div className="form-check">
                                 <input className="form-check-input" type="checkbox" id="account_show_currency_code" name="account_show_currency_code"
                                    checked={this.state.displayCurrencyCodeInTotal}
                                    onChange={() => this.setState({ displayCurrencyCodeInTotal: !this.state.displayCurrencyCodeInTotal })}
                                 />
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
                              checked={this.state.isEnabledPrintPDF}
                              onChange={() => this.setState({ isEnabledPrintPDF: !this.state.isEnabledPrintPDF })}
                           />
                           <label className="form-check-label mb-2" htmlFor="pLayout__s_pdf_show">Enable Print PDF downloads</label>
                           <div className={`form-group ${this.state.isEnabledPrintPDF ? "" : "d-none"}`}>
                              <label>Page Size</label>
                              <select className="form-control rounded-0 maxWidth-180 mb-3" name="pLayout[_s][pdf_page_size]" id="pLayout__s_pdf_page_size"
                                 value={this.state.pdfPageSize}
                                 onChange={(ev) => this.setState({ pdfPageSize: ev.target.value })}>
                                 <option value={0}>A4</option>
                                 <option value={1}>US Letter</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <h4 className="mb-2">Company Information</h4>
                     <div className="ml-3 mb-4">
                        <div className="maxWidth-550 mb-2">
                           <label htmlFor="pLayout[_s][comp_name]">Company or Organization</label>
                           <input type="text" className="form-control rounded-0" id="pLayout[_s][comp_name]" name="pLayout[_s][comp_name]" placeholder="ACME Corp."
                              value={this.state.companyDisplayName}
                              onChange={(ev) => this.setState({ companyDisplayName: ev.target.value })}
                           />
                        </div>
                        <div className="maxWidth-550 mb-2">
                           <label htmlFor="pLayout__s_comp_address">Address</label>
                           <TextareaAutosize type="text" className="form-control rounded-0" id="pLayout__s_comp_address" name="pLayout__s_comp_address" rows={3} placeholder="Postal and Physical address"
                              value={this.state.address}
                              onChange={(ev) => this.setState({ address: ev.target.value })}
                           />
                        </div>
                        <div className="maxWidth-550 mb-2">
                           <label htmlFor="pLayout__s_comp_website">Website</label>
                           <input type="text" className="form-control rounded-0" id="pLayout__s_comp_website" name="pLayout__s_comp_website" placeholder="www.example.com"
                              value={this.state.website}
                              onChange={(ev) => this.setState({ website: ev.target.value })}
                           />
                        </div>
                        <div className="maxWidth-550 mb-2">
                           <label htmlFor="pLayout__s_comp_phone">Phone</label>
                           <input type="text" className="form-control rounded-0" id="pLayout__s_comp_phone" name="pLayout__s_comp_phone" placeholder=""
                              value={this.state.phone}
                              onChange={(ev) => this.setState({ phone: ev.target.value })}
                           />
                        </div>
                     </div>
                  </div>


                  <div className="col-sm-5 p-0">
                     <div className="contact-example-bord" style={{ top: "30%", position: "sticky" }}>
                        <div className={`contact-example ${this.state.contactDetailLayout == 2 ? "example-isRight" : ""}`} style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                           <div className="inner">
                              <div className="example-left">
                                 {
                                    this.props.appearanceSetting.logo ?
                                       <div className={`example-block ${this.state.contactDetailLayout == 2 ? "example-hide" : ""}`}>
                                          <img className="example-logo example-logo-top" src={this.props.appearanceSetting.logo} alt="Example logo" style={{ marginLeft: this.state.layout * 60 }} />
                                       </div>
                                       : null
                                 }
                                 <img className={`example-block example-hide example-contact`} src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-center-01.png" alt="Example contact details" />
                                 <img className={`example-block example-contact ${this.state.contactDetailLayout == 0 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-column-01.png" alt="Example contact details" />
                                 <img className={`example-block example-contact ${this.state.contactDetailLayout == 1 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-left-01.png" alt="Example contact details" />
                                 <div className={`example-block example-title`} style={{
                                    fontFamily: switchHeadingFont(this.state.headingFont),
                                    fontWeight: this.state.headingWeight == 0 ? "bold" : "normal",
                                    marginLeft: this.state.layout == 1 ? 39 : 0
                                 }}>Your Quote</div>
                                 {/* <div className="clear" /> */}
                                 <div className={`example-block example-lines-wrap example-lines-left ${this.state.contactDetailLayout == 2 ? "example-hide" : ""}`}>
                                    <img className="example-lines" src="https://asset.quotientapp.com/image/app-layout-example/lines-a-01.png" alt="Example lines" />
                                    <img className="example-lines-bg" src="https://asset.quotientapp.com/image/app-layout-example/lines-b-01.png" alt="Example lines" style={{ backgroundColor: 'rgb(233, 241, 249)' }} />
                                 </div>
                                 <div className={`example-block example-lines-wrap example-lines-right ${this.state.contactDetailLayout == 2 ? "" : "example-hide"}`}>
                                    <img className="example-lines" src="https://asset.quotientapp.com/image/app-layout-example/lines-r-a-01.png" alt="Example lines" />
                                    <img className="example-lines-bg" src="https://asset.quotientapp.com/image/app-layout-example/lines-r-b-01.png" alt="Example lines" style={{ backgroundColor: 'rgb(233, 241, 249)' }} />
                                 </div>
                                 <div className="example-block example-accept-block" style={{ backgroundColor: 'rgb(233, 241, 249)' }}>
                                    <img className="example-tick example-tick-left" src="https://asset.quotientapp.com/image/app-layout-example/tick-02.png" alt="Example accept line" />
                                    <img className="example-tick example-tick-right isHidden" src="https://asset.quotientapp.com/image/app-layout-example/tick-r-02.png" alt="Example accept line" />
                                    <div className="example-accept" style={{ backgroundColor: 'rgb(33, 118, 199)', marginLeft: 0 }}>Accept</div>
                                 </div>
                                 {/* <div className="clear" /> */}
                              </div>
                              <div className="example-right">
                                 {
                                    this.props.appearanceSetting.logo ?
                                       <div className={`example-block example-block-logo ${this.state.contactDetailLayout == 2 ? "" : "example-hide"}`}>
                                          {/* <div className="example-block example-block-logo example-hide"> */}
                                          <img className="example-logo example-logo-right" src={this.props.appearanceSetting.logo} alt="Example logo" />
                                       </div>
                                       : null
                                 }
                                 <img className={`example-block example-contact ${this.state.contactDetailLayout == 2 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-right-01.png" alt="Contact format right" />
                              </div>
                              {/* <div className="clear" /> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2"
                     onClick={this.onClickSaveAndPublish}
                     disabled={this.state.loading}
                  >
                     {
                        this.state.loading &&
                        <div className="spinner-border spinner-border-sm text-white mr-1" role="status">
                           <span className="sr-only">Loading...</span>
                        </div>
                     }
                     Save & Publish</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings">Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = ({ appearanceSetting, commonData }) => {
   return { appearanceSetting, commonData };
};
const mapDispatchToProps = { uploadLogo, removeLogo, getAppearanceSettings };
export default connect(mapStateToProps, mapDispatchToProps)(Appearance);