import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuoteTotal from '../../../../components/QuoteTotal';

class PublicQuoteViewTotalWrap extends Component {
   render() {
      const { quote } = this.props;
      const { settings, items } = quote;
      return (
         <React.Fragment>
            <div className="PublicQuoteViewTotalWrap PublicQuoteViewTotalWrap-client">
               <QuoteTotal settings={settings} items={items} />
            </div>

            {/* <div className="PublicQuoteViewTotalWrap PublicQuoteViewTotalWrap-server isHidden">
               <QuoteTotal settings={settings} items={items} />
            </div> */}
         </React.Fragment>

      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};
export default connect(mapStateToProps)(PublicQuoteViewTotalWrap);