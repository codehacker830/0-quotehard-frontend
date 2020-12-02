import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuoteSubTotal extends Component {
   render() {
      const { quote, index } = this.props;
      return (
         <React.Fragment>
            <div className="tItem vSubTotal">
               <div className="tItem-desc">
                  <p>
                     <span className="quote-text-sm">Options selected</span>
                     <br />
                     Subtotal
                  </p>
               </div>
               <div className="tItem-price">
                  <p>
                     <span className="quote-text-sm">1 of 1</span><br />
                     <span>200.00</span>
                  </p>
               </div>
            </div>
            {/* <div className="tItem vSubTotal tItemId-43717163">
               <div className="tItem-desc">
                  <p>Subtotal</p>
               </div>
               <div className="tItem-price">
                  <p>
                     <span className="itemPartSubTotal">300.00</span>
                  </p>
               </div>
               <div className="clear"> </div>
            </div> */}
         </React.Fragment>
      );
   }
}

const mapStateToProps = ({ quoteData }) => {
   const { quote } = quoteData;
   return { quote };
};
export default connect(mapStateToProps)(QuoteSubTotal);