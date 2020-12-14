import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/Appearance';

class Appearance_TextStyles extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const { headingFont, bodyText, headingWeight } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Text Styles</h4>
            <div className="row ml-3">
               <div className="col-sm-3">
                  <div className="form-group">
                     <label>Heading Font</label>
                     <div className="form-check pb-2">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_heading-0" name="pLayout[_s][font_heading]"
                           value={0}
                           checked={headingFont == 0}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, headingFont: ev.target.value })}
                        />
                        <label className={`form-check-label ${headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading-0">Helvetica</label>
                     </div>
                     <div className="form-check pb-2">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_heading-1" name="pLayout[_s][font_heading]"
                           value={1}
                           checked={headingFont == 1}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, headingFont: ev.target.value })}
                        />
                        <label className={`form-check-label ${headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_heading-1">Tahoma</label>
                     </div>
                     <div className="form-check pb-2">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_heading-2" name="pLayout[_s][font_heading]"
                           value={2}
                           checked={headingFont == 2}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, headingFont: ev.target.value })}
                        />
                        <label className={`form-check-label ${headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_heading-2">Georgia</label>
                     </div>
                     <div className="form-check pb-2">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_heading-3" name="pLayout[_s][font_heading]"
                           value={3}
                           checked={headingFont == 3}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, headingFont: ev.target.value })}
                        />
                        <label className={`form-check-label ${headingWeight == 0 ? "font-w700" : "font-w400"}`} style={{ fontFamily: "Times" }} htmlFor="pLayout__s_font_heading-3">Times</label>
                     </div>
                  </div>
               </div>
               <div className="col-sm-3">
                  <div className="form-group">
                     <label>Body Text</label>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_body-0" name="pLayout[_s][font_body]"
                           value={0}
                           checked={bodyText == 0}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, bodyText: ev.target.value })}
                        />
                        <label className="form-check-label font-w400" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_body-0">Helvetica</label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_body-1" name="pLayout[_s][font_body]"
                           value={1}
                           checked={bodyText == 1}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, bodyText: ev.target.value })}
                        />
                        <label className="form-check-label font-w400" style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_body-1">Tahoma</label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_body-2" name="pLayout[_s][font_body]"
                           value={2}
                           checked={bodyText == 2}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, bodyText: ev.target.value })}
                        />
                        <label className="form-check-label font-w400" style={{ fontFamily: "Georgia" }} htmlFor="pLayout__s_font_body-2">Georgia</label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_body-3" name="pLayout[_s][font_body]"
                           value={3}
                           checked={bodyText == 3}
                           onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, bodyText: ev.target.value })}
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
                           defaultValue={0}
                           checked={headingWeight == 0}
                           onChange={(ev) => this.props.updateAppearanceSetting({
                              ...this.props.appearanceSetting,
                              headingWeight: ev.target.value
                           })}
                        />
                        <label className="form-check-label font-w700" style={{ fontFamily: "Helvetica" }} htmlFor="pLayout__s_font_heading_weight-0">Bold headings</label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="radio" id="pLayout__s_font_heading_weight-1" name="pLayout[_s][font_heading_weight]"
                           defaultValue={1}
                           checked={headingWeight == 1}
                           onChange={(ev) => this.props.updateAppearanceSetting({
                              ...this.props.appearanceSetting,
                              headingWeight: ev.target.value
                           })}
                        />
                        <label className="form-check-label font-w400" style={{ fontFamily: "Tahoma" }} htmlFor="pLayout__s_font_heading_weight-1">Regular</label>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting })

const mapDispatchToProps = {
   updateAppearanceSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_TextStyles)
