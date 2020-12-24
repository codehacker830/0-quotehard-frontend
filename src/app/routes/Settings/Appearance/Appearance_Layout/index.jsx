import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/AppearanceSetting';

class Appearance_Layout extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const { layout } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Layout</h4>
            <div className="ml-3 mb-4">
               <div className="row from-group">
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_layout_align_x-0" name="pLayout[_s][layout_align_x]"
                        value={0}
                        checked={layout == 0}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, layout: ev.target.value })}
                     />
                     Left
                     <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-left-02.png" alt="Left" />
                  </label>
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_layout_align_x-1" name="pLayout[_s][layout_align_x]"
                        value={1}
                        checked={layout == 1}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, layout: ev.target.value })}
                     />
                     Centered
                     <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-center-02.png" alt="Centered" />
                  </label>
                  <label className="appear-check-3">
                     <input type="radio" id="pLayout__s_layout_align_x-2" name="pLayout[_s][layout_align_x]"
                        value={2}
                        checked={layout == 2}
                        onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, layout: ev.target.value })}
                     />
                     Right
                     <img className="appear-check-3-img" src="https://asset.quotientapp.com/image/app-layout-example/layout-align-right-02.png" alt="Right" />
                  </label>
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
export default connect(mapStateToProps, mapDispatchToProps)(Appearance_Layout)
