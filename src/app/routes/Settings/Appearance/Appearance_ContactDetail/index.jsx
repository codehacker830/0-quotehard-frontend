import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/Appearance';

class Appearance_ContactDetail extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const { contactDetailLayout, isDisplayFullCustomerDetail } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Contact Detail</h4>
            <div className="ml-3 mb-4">
               <div className="row mb-2">
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_contact_format-0" name="pLayout[_s][contact_format]"
                        value={0}
                        checked={contactDetailLayout == 0}
                        onChange={(ev) => this.props.updateAppearanceSetting({
                           ...appearanceSetting,
                           contactDetailLayout: ev.target.value
                        })}
                     />
                           Columns
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-columns-02.png" alt="Column" />
                  </label>
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_contact_format-1" name="pLayout[_s][contact_format]"
                        value={1}
                        checked={contactDetailLayout == 1}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, contactDetailLayout: ev.target.value })}
                     />
                           In-line
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-inline-02.png" alt="In-line" />
                  </label>
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_contact_format-2" name="pLayout[_s][contact_format]"
                        value={2}
                        checked={contactDetailLayout == 2}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, contactDetailLayout: ev.target.value })}
                     />
                           Right Column
                           <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/contact-format-right-02.png" alt="Right" />
                  </label>
               </div>


               <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="pLayout__s_contact_inc_details" name="pLayout__s_contact_inc_details"
                     checked={isDisplayFullCustomerDetail}
                     onChange={() => this.props.updateAppearanceSetting({ ...appearanceSetting, isDisplayFullCustomerDetail: !isDisplayFullCustomerDetail })}
                  />
                  <label className="form-check-label" htmlFor="pLayout__s_contact_inc_details">Display full customer detail (phone, address and email)</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_ContactDetail)
