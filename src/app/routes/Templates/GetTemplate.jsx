import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AddNoteBtn from '../../../components/AddNoteBtn';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import QuoteTotal from '../../../components/QuoteTotal';
import SubTotal from '../../../components/SubTotal';
import TemplateSettings from '../../../components/TemplateSettings';
import TextItemForm from '../../../components/TextItemForm';
import {
   initTemplateSettings,
   initPriceItem,
   initTextItem,
   initSubTotal,
} from '../../../constants/InitState';
import axios from '../../../util/Api';
import { toastErrorConfig, toastSuccessConfig } from '../../../util/toastrConfig';
import AddPriceItemBtn from '../../../components/AddPriceItemBtn';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../actions/GlobalSettings';
import { getTemplateQuoteDataById } from '../../../actions/Data';
import { connect } from 'react-redux';
import { CONTENT_TEMPLATES_PATH, CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_GET_PATH } from '../../../constants/PathNames';
import NotesSection from '../GetQuote/components/NotesSection';
import ItemsSection from '../GetQuote/components/ItemsSection';
import { QuoteTitle } from '../GetQuote/components/QuoteTitle';

class GetTemplate extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         fileArray: [],

         status: "",
         isDefault: false,
      }
      this.actionsContainer = React.createRef();
   }
   onClickCreate = () => {
      const { title, settings, items, notes } = this.state;
      if (title === "") { toast.info("You are missing a Template Title."); return; }
      const data = {
         title,
         settings,
         items,
         notes
      };
      axios.post('/templates', data)
         .then(({ data }) => {
            console.log("res data ---------------->", data);
            toast.success("New Template was created.", toastSuccessConfig);
            this.props.history.push(CONTENT_TEMPLATES_PATH)
         })
         .catch(err => {
            console.error(" error ===>", err);
            toast.error("Template failed to create", toastErrorConfig);
         });
   }
   onClickUpdate = () => {
      const { title, settings, items, notes } = this.state;
      if (title === "") { toast.info("Missing a Template Title."); return; }
      const data = {
         title,
         settings
      };
      console.log("1111111111111111111111 data 1111111111111", data);
      // axios.put(`/templates/id/${this.props.match.params.id}`, data)
      //    .then(({ data }) => {
      //       console.log("res data ---------------->", data);
      //       toast.success("Template was updated.", toastSuccessConfig);
      //       this.props.history.push(CONTENT_TEMPLATES_PATH)
      //    })
      //    .catch(err => {
      //       console.error(" error ===>", err);
      //       toast.error("Template failed to update", toastErrorConfig);
      //    });
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }

   onClickOutsideHandler = (ev) => {
      if (!this.actionsContainer.current.contains(ev.target)) {
         this.setState({ show: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      if (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH) {
         console.log("---------- this.props.match.params.id ----------------", this.props.match.params.id);
         const Promise1 = axios.get(`/templates/id/${this.props.match.params.id}`)
         // .then(({ data }) => {
         //    console.log("response to get template by id ===>", data);
         //    const { status, title, settings, items, notes } = data.template;
         //    this.setState({
         //       status,
         //       title,
         //       settings,
         //       items,
         //       notes
         //    });
         // }).catch(err => {
         //    console.error("Error during get template by id.");
         // });

         const Promise2 = axios.get(`/templates/default/${this.props.match.params.id}`);
         Promise.all([Promise1, Promise2]).then((values) => {
            console.log("values ===>", values);
            const { status, title, settings, items, notes } = values[0].data.template;
            const { isDefault } = values[1].data;
            this.setState({
               isDefault,
               status,
               title,
               settings,
               items,
               notes
            });
         })
      }
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   onClickArchive = () => {
      axios.put(`/templates/archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive tempalte", data);
         toast.success("Template was Archived.", toastSuccessConfig);
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to archive template ", err);
      });
   }
   onClickUnArchive = () => {
      axios.put(`/templates/un-archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive tempalte", data);
         toast.success("Template was Undo-Archived.", toastSuccessConfig);
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to un-archive template ", err);
      });
   }
   onClickDefault = () => {
      axios.put(`/templates/default/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to make tempalte as a default", data);
         toast.success("Template was set as Default.", toastSuccessConfig);
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to make template as a default ", err);
      });
   }
   onClickUndoDefault = () => {
      axios.put(`/templates/undo-default/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to undo tempalte as a default", data);
         toast.success("Template was Undone as Default.", toastSuccessConfig);
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to undo template from default ", err);
      });
   }
   onClickCopy = () => {

   }
   onClickDelete = () => {

   }
   render() {
      const linkTo = CONTENT_TEMPLATES_PATH;
      const linkName = "Templates";
      return (
         <React.Fragment>
            <div className="bg-body-light border-top border-bottom">
               <div className="content content-full py-3">
                  <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                     <h1 className="flex-sm-fill font-size-sm text-uppercase font-w700 mt-2 mb-0 mb-sm-2">
                        <Link to={linkTo}>
                           <i className="fa fa-arrow-left fa-fw mr-2" />
                           <span className="text-primary">{linkName}</span>
                        </Link>
                     </h1>

                     <div className={`dropdown ${this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH ? "d-inline-block" : "d-none"}`} ref={this.actionsContainer}>
                        <button type="button" className="btn btn-dual" onClick={() => this.setState({ show: !this.state.show })}>
                           <span className="text-primary">Actions</span>
                           <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
                        </button>

                        <div className={`dropdown-menu dropdown-menu-right p-0 ${this.state.show ? "show" : ""}`} style={{ minWidth: 250 }}>
                           <ul className="nav-items my-0 p-1">
                              {
                                 this.state.status === "current" &&
                                 <li>
                                    <button className="dropdown-item media py-2" onClick={this.onClickArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm pr-2">
                                          <div className="font-w600">Archive</div>
                                       </div>
                                    </button>
                                 </li>
                              }
                              {
                                 this.state.status === "archived" &&
                                 <li>
                                    <button className="dropdown-item media py-2" onClick={this.onClickUnArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm pr-2">
                                          <div className="font-w600">Archived<i className="fa fa-fw fa-long-arrow-alt-left"></i> Undo</div>
                                       </div>
                                    </button>
                                 </li>
                              }
                              {
                                 this.state.isDefault ?
                                    <li>
                                       <button className="dropdown-item media py-2" onClick={this.onClickUndoDefault}>
                                          <div className="mx-3">
                                             <i className="fa fa-fw fa-star text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm pr-2">
                                             <div className="font-w600">Make default<i className="fa fa-fw fa-long-arrow-alt-left"></i> Undo</div>
                                          </div>
                                       </button>
                                    </li>
                                    : <li>
                                       <button className="dropdown-item media py-2" onClick={this.onClickDefault}>
                                          <div className="mx-3">
                                             <i className="fa fa-fw fa-star text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm pr-2">
                                             <div className="font-w600">Make default</div>
                                          </div>
                                       </button>
                                    </li>
                              }


                              <li>
                                 <button className="dropdown-item media py-2" onClick={this.onClickCopy}>
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-copy text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Copy</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item media py-2" onClick={this.onClickDelete}>
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-trash-alt text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Delete</div>
                                    </div>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <NavCrump linkTo=CONTENT_TEMPLATES_PATH>
               Templates
            </NavCrump> */}
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <TemplateSettings />

                  {/* Template Title */}
                  <QuoteTitle />

                  {/* Items */}
                  <ItemsSection />
                  <AddPriceItemBtn />

                  {/* Total */}
                  <QuoteTotal />

                  {/* notes */}
                  <NotesSection />
                  <AddNoteBtn />

                  {/* Footer action button group */}
                  <div className="row p-3">
                     {
                        this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH &&
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onClickUpdate}>Update</button>
                     }
                     {
                        this.props.match.path === CONTENT_TEMPLATE_GET_PATH &&
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onClickCreate}>Create</button>
                     }
                     <Link className="btn btn-lg btn-rounded btn-hero-secondary" to=CONTENT_TEMPLATES_PATH>Cancel</Link>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}

const mapStateToProps = ({ auth, globalSettings, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   const { defaultSalesTax, defaultSalesCategory } = globalSettings;
   return { authUser, quote, defaultSalesTax, defaultSalesCategory }
}

const mapDispatchToProps = { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes, getTemplateQuoteDataById };

export default connect(mapStateToProps, mapDispatchToProps)(GetTemplate);
