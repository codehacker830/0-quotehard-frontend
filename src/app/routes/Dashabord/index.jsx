import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../util/Api';
import QuoteTableShow from './QuoteTableShow';
import QuoteOverview from './QuoteOverview';
import { QUOTE_GET_PATH } from '../../../constants/PathNames';
import { initializeQuote } from '../../../actions/Data';
import { connect } from 'react-redux';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dropdownOpen: false,
         search: "",
         quotes: [],
         templates: []
      };
      this.dropdownContainer = React.createRef();
   }
   onClickOutsideHandler = (ev) => {
      if (this.state.dropdownOpen && !this.dropdownContainer.current.contains(ev.target)) {
         this.setState({ dropdownOpen: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      // Initiate mainData quote reducer
      this.props.initializeQuote();

      console.log("dddddddd ==========================>");


      // get all quotes and templates
      const Promise1 = axios.get('/quotes');
      const Promise2 = axios.get('/templates');
      Promise.all([Promise1, Promise2]).then((values) => {
         console.log("values ==========================>", values);
         this.setState({
            quotes: values[0].data.quotes,
            templates: values[1].data.templates
         })
      }).catch(err => {
         console.error("  Promise all error ===>", err);
      });
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }

   render() {
      const { search } = this.state;
      const { match } = this.props;

      const templateList = this.state.templates.filter((temp) => temp.status === "current");
      console.log(" templateLISt ---> ", templateList)
      return (
         <div className="content">
            <div className="row py-3">
               <div className="col-md-6">
                  <div className="form-group">
                     <div style={{ position: "relative", width: "fit-content" }} ref={this.dropdownContainer}>
                        <button className="btn btn-success"
                           onClick={() => {
                              if (templateList.length === 0) {
                                 this.props.history.push({
                                    pathname: QUOTE_GET_PATH,
                                    state: {
                                       from: this.props.location.pathname
                                    }
                                 });
                              } else this.setState({ dropdownOpen: !this.state.dropdownOpen })
                           }}>
                           <span>New Quote</span>
                           {
                              templateList.length !== 0 &&
                              <i className={`fa fa-fw fa-angle-down ml-1 `} />
                           }
                        </button>
                        <div className={`dropdown-menu dropdown-menu-left p-0 border ${this.state.dropdownOpen ? "show" : ""}`}>
                           <div className="p-2">
                              {
                                 templateList.map((template, index) => {
                                    return (
                                       <Link className="dropdown-item" to={`/app/quote/get/from-template/${template._id}`} key={index}>{template.title}</Link>
                                    );
                                 })
                              }
                              <div role="separator" className="dropdown-divider" />
                              <Link className="dropdown-item" to={{
                                 pathname: QUOTE_GET_PATH,
                                 state: {
                                    from: this.props.location.pathname
                                 }
                              }}>
                                 New Quote, without Template
                           </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <div className="input-group">
                        <input
                           type="email"
                           className="form-control"
                           placeholder="Search by Quote Title, Number or Contact..." />
                        <div className="input-group-append">
                           <button type="button" className="btn btn-alt-dark">Search</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <QuoteTableShow quotes={this.state.quotes} />
               <QuoteOverview quotes={this.state.quotes} />
            </div>
            <div className="row py-5 justify-content-center">
               <p className="text-center">
                  <strong>Your trial ends in <span className="badge badge-primary">11</span>
                  </strong>
                  <br />
                        To carry on beyond your trial, please
                        <Link to="/app/settings/payment-details">
                     add payment details</Link>
               </p>
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = {
   initializeQuote
}
export default connect(() => ({}), mapDispatchToProps)(Dashboard);