import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { QUOTE_GET_FROM_TEMPLATE_PATH, QUOTE_GET_PATH } from '../../constants/PathNames';
import { parseDate, parseTime } from '../../util';

class ValidUntil extends Component {
   constructor(props) {
      super(props);
      this.state = {
         validDate: parseDate(this.props.settings.validUntil),
         validTime: parseTime(this.props.settings.validUntil),
      };
   }
   updateValidDate = (ev) => this.setState({ validDate: ev.target.value });
   updateValidTime = (ev) => this.setState({ validTime: ev.target.value });

   componentDidUpdate(prevProps, prevState) {
      // update validUntil state according to props
      if (prevProps.settings.validUntil !== this.props.settings.validUntil) {
         this.setState({
            validDate: parseDate(this.props.settings.validUntil),
            validTime: parseTime(this.props.settings.validUntil)
         });
      }
   }
   render() {
      console.log("this.props.quoteDefaultSetting _________", this.props.quoteDefaultSetting)
      return (
         <div className="pb-2">
            <label htmlFor="_expiry_date_date" className="text-gray fa-xs text-uppercase">Valid Until</label>
            <div className="d-flex">
               <div className="w-75 pr-2">
                  <input type="text"
                     id="_expiry_date_date"
                     className="form-control mr-2 rounded-0"
                     value={this.state.validDate}
                     onChange={this.updateValidDate}
                  />
                  <label htmlFor="_expiry_date_date" className="text-info fa-xs">YYYY/MM/DD</label>
               </div>
               <div>
                  <input type="text"
                     id="_expiry_date_time"
                     className="form-control rounded-0"
                     value={this.state.validTime}
                     onChange={this.updateValidTime}
                  />
                  <label htmlFor="_expiry_date_time" className="text-info fa-xs">HH:mm</label>
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ mainData, quoteDefaultSetting }) => {
   const { settings } = mainData.quote;
   return { settings, quoteDefaultSetting };
};
export default connect(mapStateToProps)(withRouter(ValidUntil));
