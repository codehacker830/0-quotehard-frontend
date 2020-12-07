import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AddNoteBtn from '../../../components/AddNoteBtn';
import NavCrump from '../../../components/NavCrump';
import QuoteTotal from '../../../components/QuoteTotal';
import SubTotal from '../../../components/SubTotal';
import TemplateSettings from '../../../components/TemplateSettings';
import axios from '../../../util/Api';
import { toastErrorConfig } from '../../../util/toastrConfig';
import AddPriceItemBtn from '../../../components/AddPriceItemBtn';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../actions/GlobalSettings';
import { getContentTemplateById, getDuplicateTemplateById, updateQuote, updateQuoteStatus } from '../../../actions/Data';
import { connect } from 'react-redux';
import { CONTENT_TEMPLATES_PATH, CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_DUPLICATE_PATH, CONTENT_TEMPLATE_GET_PATH } from '../../../constants/PathNames';
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
      const { title, items, notes } = this.props.quote;
      const {
         discount,
         currency,
         taxMode,
         pricingDisplayLevel,
         displayItemCode
      } = this.props.quote.settings;
      const settings = {
         discount,
         currency,
         taxMode,
         pricingDisplayLevel,
         displayItemCode
      };
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
            toast.success("New Template was created.");
            this.props.history.push(CONTENT_TEMPLATES_PATH)
         })
         .catch(err => {
            console.error(" error ===>", err);
            toast.error("Template failed to create");
         });
   }
   onClickUpdate = () => {
      const { title, settings, items, notes } = this.state;
      if (title === "") { toast.info("Missing a Template Title."); return; }
      const data = {
         title,
         settings
      };
      axios.put(`/templates/id/${this.props.match.params.id}`, data)
         .then(({ data }) => {
            console.log("res data ---------------->", data);
            toast.success("Template was updated.");
            this.props.history.push(CONTENT_TEMPLATES_PATH)
         })
         .catch(err => {
            console.error(" error ===>", err);
            toast.error("Template failed to update");
         });
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
   async componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      if (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH) {
         this.props.getContentTemplateById(this.props.match.params.id);
         axios.get(`/templates/default/${this.props.match.params.id}`).then(({ data }) => {
            const { isDefault } = data;
            this.setState({ isDefault });
         });
      }
      if (this.props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH) {
         this.props.getDuplicateTemplateById(this.props.match.params.id);
         this.setState({ isDefault: false });
      }
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   onClickArchive = () => {
      axios.put(`/templates/archive/${this.props.match.params.id}`).then(async ({ data }) => {
         await this.props.updateQuoteStatus("archived");
         toast.success("Content template archived.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error("Failed to archive template ", err);
      });
   }
   onClickUnArchive = () => {
      axios.put(`/templates/un-archive/${this.props.match.params.id}`).then(async ({ data }) => {
         await this.props.updateQuoteStatus("current");
         toast.success("Content template was unarchived.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error("Failed to un-archive template ", err);
      });
   }
   onClickDefault = () => {
      axios.put(`/templates/default/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to make tempalte as a default", data);
         toast.success("Content template - default.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to make template as a default ", err);
      });
   }
   onClickUndoDefault = () => {
      axios.put(`/templates/undo-default/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to undo tempalte as a default", data);
         toast.success("Content template - no default set.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to undo template from default ", err);
      });
   }
   onClickCopy = () => {
      toast.success('This is a copy.');
      this.props.history.push(`/app/content/template/get/duplicate/${this.props.match.params.id}`)
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
                           <ul className="choices" style={{ left: 30, top: 10 }}>
                              {
                                 this.props.quote.status === "current" &&
                                 <li>
                                    <button className="btn-in-action" onClick={this.onClickArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm font-w600 pr-2">
                                          <span>Archive</span>
                                       </div>
                                    </button>
                                 </li>
                              }
                              {
                                 this.props.quote.status === "archived" &&
                                 <li>
                                    <button className="btn-in-action" onClick={this.onClickUnArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm font-w600 pr-2">
                                          <span>Archived<span className="choices-undo"> ← undo</span></span>
                                       </div>
                                    </button>
                                 </li>
                              }
                              {
                                 this.state.isDefault ?
                                    <li>
                                       <button className="btn-in-action" onClick={this.onClickUndoDefault}>
                                          <div className="mx-3">
                                             <i className="fa fa-fw fa-star text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm font-w600 pr-2">
                                             <span>Make default<span className="choices-undo"> ← undo</span></span>
                                          </div>
                                       </button>
                                    </li>
                                    : <li>
                                       <button className="btn-in-action" onClick={this.onClickDefault}>
                                          <div className="mx-3">
                                             <i className="fa fa-fw fa-star text-secondary" />
                                          </div>
                                          <div className="media-body font-size-sm font-w600 pr-2">
                                             <span>Make default</span>
                                          </div>
                                       </button>
                                    </li>
                              }


                              <li>
                                 <button className="btn-in-action" onClick={this.onClickCopy}>
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-copy text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm font-w600 pr-2">
                                       <span>Copy</span>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="btn-in-action" onClick={this.onClickDelete}>
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-trash-alt text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm font-w600 pr-2">
                                       <span>Delete</span>
                                    </div>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <TemplateSettings isDefault={this.state.isDefault} />

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
                     <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={CONTENT_TEMPLATES_PATH}>Cancel</Link>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}

const mapStateToProps = ({ auth, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   return { authUser, quote }
}

const mapDispatchToProps = {
   updateQuote,
   updateQuoteStatus,
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
   getContentTemplateById,
   getDuplicateTemplateById
};
export default connect(mapStateToProps, mapDispatchToProps)(GetTemplate);
