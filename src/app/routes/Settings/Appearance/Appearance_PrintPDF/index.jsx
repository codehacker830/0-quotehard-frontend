import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/Appearance'

class Appearance_PrintPDF extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const { isEnabledPrintPDF, pdfPageSize } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Print PDF</h4>
            <div className="ml-3 mb-4">
               <div className="form-check">
                  <input className="form-check-input" type="checkbox"
                     id="pLayout__s_pdf_show" name="pLayout__s_pdf_show"
                     checked={isEnabledPrintPDF}
                     onChange={() => this.props.updateAppearanceSetting({ ...appearanceSetting, isEnabledPrintPDF: !isEnabledPrintPDF })}
                  />
                  <label className="form-check-label mb-2" htmlFor="pLayout__s_pdf_show">Enable Print PDF downloads</label>
                  <div className={`form-group ${isEnabledPrintPDF ? "" : "d-none"}`}>
                     <label>Page Size</label>
                     <select className="form-control rounded-0 maxWidth-180 mb-3" name="pLayout[_s][pdf_page_size]" id="pLayout__s_pdf_page_size"
                        value={pdfPageSize}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, pdfPageSize: ev.target.value })}>
                        <option value={0}>A4</option>
                        <option value={1}>US Letter</option>
                     </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_PrintPDF)
