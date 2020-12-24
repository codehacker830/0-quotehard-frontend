import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/AppearanceSetting'

class Appearance_CompanyInformation extends Component {
   render() {

      const { appearanceSetting } = this.props;
      console.log('appearanceSetting __', appearanceSetting)
      const {
         companyDisplayName,
         address,
         website,
         phone
      } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Company Information</h4>
            <div className="ml-3 mb-4">
               <div className="maxWidth-550 mb-2">
                  <label htmlFor="pLayout[_s][comp_name]">Company or Organization</label>
                  <input type="text" className="form-control rounded-0" id="pLayout[_s][comp_name]" name="pLayout[_s][comp_name]" placeholder="ACME Corp."
                     value={companyDisplayName}
                     onChange={(ev) => this.props.updateAppearanceSetting({
                        ...appearanceSetting,
                        companyDisplayName: ev.target.value
                     })}
                  />
               </div>
               <div className="maxWidth-550 mb-2">
                  <label htmlFor="pLayout__s_comp_address">Address</label>
                  <TextareaAutosize type="text" className="form-control rounded-0" id="pLayout__s_comp_address" name="pLayout__s_comp_address" rows={3} placeholder="Postal and Physical address"
                     value={address}
                     onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, address: ev.target.value })}
                  />
               </div>
               <div className="maxWidth-550 mb-2">
                  <label htmlFor="pLayout__s_comp_website">Website</label>
                  <input type="text" className="form-control rounded-0" id="pLayout__s_comp_website" name="pLayout__s_comp_website" placeholder="www.example.com"
                     value={website}
                     onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, website: ev.target.value })}
                  />
               </div>
               <div className="maxWidth-550 mb-2">
                  <label htmlFor="pLayout__s_comp_phone">Phone</label>
                  <input type="text" className="form-control rounded-0" id="pLayout__s_comp_phone" name="pLayout__s_comp_phone" placeholder=""
                     value={phone}
                     onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, phone: ev.target.value })}
                  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_CompanyInformation)
