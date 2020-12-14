import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class PreviewBanner extends Component {
   render() {
      const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
      const { entoken } = this.props.match.params;
      if (isPreviewMode) return (
         <div className="offlineBanner no_print">
            <div className="container">
               <p className="u-larger u-pad-top4 u-section text-center">
                  This is what your Quote looks like to a Customer.
                  <br />
                  <Link to={`/q/${entoken}`}>Switch back to your view</Link> to manage this Quote.
               </p>
            </div>
         </div>
      );
      else return null;
   }
}

export default withRouter(PreviewBanner);
