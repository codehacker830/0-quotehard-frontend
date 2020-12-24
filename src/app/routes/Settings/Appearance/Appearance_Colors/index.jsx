import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/AppearanceSetting'

export class Appearance_Colors extends Component {
   render() {
      return (
         <React.Fragment>
            <h4 className="mb-2">Colors</h4>
            <div className="ml-3 mb-4">

            </div>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting })

const mapDispatchToProps = {
   updateAppearanceSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_Colors)
