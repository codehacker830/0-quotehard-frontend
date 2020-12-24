import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeLogo, uploadLogo } from '../../../../../actions/AppearanceSetting';
import { LOGO_URL } from '../../../../../constants/ActionTypes'

class Appearance_Logo extends Component {
   constructor(props) {
      super(props);
      this.hiddenFileInput = React.createRef();
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   render() {
      const { logo } = this.props;
      return (
         <React.Fragment>
            <h4 className="mb-2">Logo</h4>
            <div className="ml-3 mb-4">
               <input type="file"
                  ref={this.hiddenFileInput}
                  onChange={this.props.uploadLogo}
                  className="d-none"
               />

               {
                  logo ?
                     <div className="row justify-content-center" style={{ position: "relative" }}>
                        <img src={logo} className="mr-2 image-preview-size" alt="..." />
                        <button className="btn btn-sm btn-light" onClick={() => this.props.removeLogo(logo)} style={{ position: "absolute", top: 5, right: 5 }}>
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
         </React.Fragment>
      )
   }
}

const mapStateToProps = ({ appearanceSetting, commonData }) => {
   const { logo } = appearanceSetting;
   return { logo, commonData };
}

const mapDispatchToProps = {
   uploadLogo, removeLogo
}

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_Logo)
