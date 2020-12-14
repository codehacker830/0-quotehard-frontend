import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { uploadLogo, removeLogo, getAppearanceSetting, publishAppearanceSettings } from '../../../../actions/Appearance';
import NavCrump from '../../../../components/NavCrump';
import { switchHeadingFont } from '../../../../util';
import { Appearance_Colors } from './Appearance_Colors';
import Appearance_CompanyInformation from './Appearance_CompanyInformation';
import Appearance_ContactDetail from './Appearance_ContactDetail';
import Appearance_Layout from './Appearance_Layout';
import Appearance_Logo from './Appearance_Logo';
import Appearance_PricingFormat from './Appearance_PricingFormat';
import Appearance_TextStyles from './Appearance_TextStyles';
import ExampleBoard from './ExampleBoard';

class Appearance extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false
      };

   }
   onClickSaveAndPublish = async () => {
      this.setState({ loading: true });
      try {
         await this.props.publishAppearanceSettings({ ...this.props.appearanceSetting });
         this.setState({ loading: false });
         this.props.history.push("/app/settings");
      } catch (err) {
         console.error("err during publish appearanceSetting ", err);
         this.setState({ loading: false });
      }
   }

   componentDidMount() {
      this.props.getAppearanceSetting();
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
                     <Appearance_Logo />

                     {/* <Appearance_Colors /> */}
                     <Appearance_ContactDetail />

                     <Appearance_Layout />

                     <Appearance_TextStyles />

                     <Appearance_PricingFormat />

                     <Appearance_CompanyInformation />

                  </div>


                  <div className="col-sm-5 p-0">
                     <ExampleBoard />
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1"
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

const mapStateToProps = ({ appearanceSetting }) => {
   return { appearanceSetting };
};

const mapDispatchToProps = { getAppearanceSetting, publishAppearanceSettings };
export default connect(mapStateToProps, mapDispatchToProps)(Appearance);