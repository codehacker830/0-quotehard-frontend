import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwitchLogoLayoutClass } from '../../../util';


class QuoteLogo extends Component {
   render() {
      const { appearanceSetting } = this.props;
      if (!appearanceSetting.logo) return null;
      else return (
         <div className={`${SwitchLogoLayoutClass(appearanceSetting.contactDetailLayout, appearanceSetting.layout)}`}>
            <img title={`${appearanceSetting.companyDisplayName}-logo`} alt={`${appearanceSetting.companyDisplayName}-logo`}
               src={appearanceSetting.logo} />
         </div>
      );
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting });
export default connect(mapStateToProps)(QuoteLogo)