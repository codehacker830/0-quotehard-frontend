import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/AppearanceSetting';
import { switchHeadingFont } from '../../../../../util';

class ExampleBoard extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const {
         logo,
         colors,
         contactDetailLayout,
         layout,

         headingFont,
         headingWeight,
      } = appearanceSetting;
      return (
         <div className="contact-example-bord" style={{ top: "30%", position: "sticky" }}>
            <div className={`contact-example ${contactDetailLayout == 2 ? "example-isRight" : ""}`} style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
               <div className="inner">
                  <div className="example-left">
                     {
                        logo ?
                           <div className={`example-block ${contactDetailLayout == 2 ? "example-hide" : ""}`}>
                              <img className="example-logo example-logo-top" src={logo} alt="Example logo" style={{ marginLeft: layout * 60 }} />
                           </div>
                           : null
                     }
                     <img className={`example-block example-hide example-contact`} src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-center-01.png" alt="Example contact details" />
                     <img className={`example-block example-contact ${contactDetailLayout == 0 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-column-01.png" alt="Example contact details" />
                     <img className={`example-block example-contact ${contactDetailLayout == 1 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-inline-left-01.png" alt="Example contact details" />
                     <div className={`example-block example-title`} style={{
                        fontFamily: switchHeadingFont(headingFont),
                        fontWeight: headingWeight == 0 ? "bold" : "normal",
                        marginLeft: layout == 1 ? 39 : 0
                     }}>Your Quote</div>
                     {/* <div className="clear" /> */}
                     <div className={`example-block example-lines-wrap example-lines-left ${contactDetailLayout == 2 ? "example-hide" : ""}`}>
                        <img className="example-lines" src="https://asset.quotientapp.com/image/app-layout-example/lines-a-01.png" alt="Example lines" />
                        <img className="example-lines-bg" src="https://asset.quotientapp.com/image/app-layout-example/lines-b-01.png" alt="Example lines" style={{ backgroundColor: 'rgb(233, 241, 249)' }} />
                     </div>
                     <div className={`example-block example-lines-wrap example-lines-right ${contactDetailLayout == 2 ? "" : "example-hide"}`}>
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
                        logo ?
                           <div className={`example-block example-block-logo ${contactDetailLayout == 2 ? "" : "example-hide"}`}>
                              {/* <div className="example-block example-block-logo example-hide"> */}
                              <img className="example-logo example-logo-right" src={logo} alt="Example logo" />
                           </div>
                           : null
                     }
                     <img className={`example-block example-contact ${contactDetailLayout == 2 ? "" : "example-hide"}`} src="https://asset.quotientapp.com/image/app-layout-example/contact-right-01.png" alt="Contact format right" />
                  </div>
                  {/* <div className="clear" /> */}
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting })

const mapDispatchToProps = {
   updateAppearanceSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleBoard)
