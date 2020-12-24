import React, { Component, createRef } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AddNoteBtn from '../../../../components/AddNoteBtn';
import NavCrump from '../../../../components/NavCrump';
import QuoteTotal from '../../../../components/QuoteTotal';
import SubTotal from '../../../../components/SubTotal';
import TemplateSettings from '../../../../components/TemplateSettings';
import axios from '../../../../util/Api';
import AddPriceItemBtn from '../../../../components/AddPriceItemBtn';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../../actions/GlobalSetting';
import { getContentTemplateById, getDuplicateTemplateById, getQuoteDataById, updateQuote, updateQuoteStatus } from '../../../../actions/Data';
import { connect } from 'react-redux';
import {
   CONTENT_TEMPLATES_PATH, CONTENT_TEMPLATE_BY_ID_PATH,
   CONTENT_TEMPLATE_DUPLICATE_PATH,
   CONTENT_TEMPLATE_GET_PATH,
   CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH
} from '../../../../constants/PathNames';
import NotesSection from '../../GetQuote/components/NotesSection';
import ItemsSection from '../../GetQuote/components/ItemsSection';
import { QuoteTitle } from '../../GetQuote/components/QuoteTitle';
import NavCrumpLeft from '../../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../../components/NavCrump/NavCrumpRight';

class GetTemplate extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         type: "",

         show: false,
         fileArray: [],

         status: "",
         isDefault: false,
         isDeleteAlertOpen: false,

      }
   }
   onClickSaveAndUpdate = () => {
      if (this.props.quote.title === "") {
         toast.info("Missing a Template Title.");
         this.setState({ isValidWarning: true });
         return;
      }

      this.setState({ loading: true, type: "SAVEANDUPDATE" });
      if (this.props.match.path === CONTENT_TEMPLATE_GET_PATH
         || this.props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH
         || this.props.match.path === CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH) {
         this.onClickCreate().then(() => {
            this.props.history.push(CONTENT_TEMPLATES_PATH);
         }).catch(err => {
            console.error("error during create template: ", err)
         });
      }

      if (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH) {
         this.onClickUpdate().then(() => {
            this.props.history.push(CONTENT_TEMPLATES_PATH);
         }).catch(err => {
            console.error("error during update template: ", err)
         });
      }
   }
   onClickSave = () => {
      if (this.props.quote.title === "") {
         toast.info("Missing a Template Title.");
         this.setState({ isValidWarning: true });
         return;
      }

      this.setState({ loading: true, type: "SAVE" });
      if (this.props.match.path === CONTENT_TEMPLATE_GET_PATH
         || this.props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH
         || this.props.match.path === CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH) {
         this.onClickCreate().then(() => {
            this.setState({ loading: false, type: "" });
         }).catch(err => {
            this.setState({ loading: false, type: "" });
         });
      }

      if (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH) {
         this.onClickUpdate().then(() => {
            this.setState({ loading: false, type: "" });
         }).catch(err => {
            this.setState({ loading: false, type: "" });
         });
      }
   }
   onClickCreate = async () => {
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
      const payload = {
         title,
         settings,
         items,
         notes
      };
      try {
         const { data } = await axios.post('/templates', payload);
         toast.success("New Template was created.");
      } catch (err) {
         console.error(" error ===>", err);
         toast.error("Template failed to create");
      }
   }
   onClickUpdate = async () => {
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
      const payload = {
         title,
         settings,
         items,
         notes
      };
      try {
         const { data } = await axios.put(`/templates/id/${this.props.match.params.id}`, payload);
         console.log("templates update res data ---------------->", data);
         const { template } = data;
         this.props.updateQuote(template);
         toast.success("Template saved.");
      } catch (err) {
         console.error(" error ===>", err);
         toast.error("Template failed to save");
      };
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }

   onClickArchive = () => {
      const templateId = this.props.match.params.id;
      axios.put(`/templates/archive/${templateId}`).then(async ({ data }) => {
         await this.props.updateQuoteStatus("archived");
         toast.success("Content template archived.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error("Failed to archive template ", err);
      });
   }
   onClickUnArchive = () => {
      const templateId = this.props.match.params.id;
      axios.put(`/templates/un-archive/${templateId}`).then(async ({ data }) => {
         await this.props.updateQuoteStatus("current");
         toast.success("Content template unarchived.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error("Failed to un-archive template ", err);
      });
   }
   onClickDefault = () => {
      const templateId = this.props.match.params.id;
      axios.put(`/templates/default/${templateId}`).then(({ data }) => {
         console.log(" success to make tempalte as a default", data);
         toast.success("Content template - default.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to make template as a default ", err);
      });
   }
   onClickUndoDefault = () => {
      const templateId = this.props.match.params.id;
      axios.put(`/templates/undo-default/${templateId}`).then(({ data }) => {
         console.log(" success to undo tempalte as a default", data);
         toast.success("Content template - no default set.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         console.error(" failed to undo template from default ", err);
      });
   }
   onClickCopy = () => {
      const templateId = this.props.match.params.id;
      toast.success('This is a copy.');
      this.props.history.push(`/app/content/template/get/duplicate/${templateId}`)
   }
   onClickDelete = () => {
      const templateId = this.props.match.params.id;
      axios.delete(`/templates/id/${templateId}`).then(() => {
         toast.success("Content template - deleted.");
         this.props.history.push(CONTENT_TEMPLATES_PATH);
      }).catch((err) => {
         this.setState({ isDeleteAlertOpen: false });
         console.error("Content template failed to delete. ", err);
      });
   }
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      if (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH) {
         const templateId = this.props.match.params.id;
         this.props.getContentTemplateById(templateId);
         axios.get(`/templates/default/${templateId}`).then(({ data }) => {
            const { isDefault } = data;
            this.setState({ isDefault });
         });
      } else if (this.props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH) {
         const templateId = this.props.match.params.id;
         this.props.getDuplicateTemplateById(templateId);
         this.setState({ isDefault: false });
      } else if (this.props.match.path === CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH) {
         const quoteId = this.props.match.params.id;
         await this.props.getQuoteDataById(quoteId);
         this.setState({ isDefault: false });
      }
   }
   render() {
      const linkTo = CONTENT_TEMPLATES_PATH;
      const linkName = "Templates";
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={linkTo}>
                  {linkName}
               </NavCrumpLeft>
               {
                  this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH &&
                  <NavCrumpRight>
                     <ul className="choices" style={{ left: 45, top: 10 }}>
                        <li>
                           <button className="btn-in-action" onClick={() => {
                              if (this.props.quote.status === "current") this.onClickArchive();
                              else if (this.props.quote.status === "archived") this.onClickUnArchive();
                           }}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-archive text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 {this.props.quote.status === "current" && <span>Archive</span>}
                                 {this.props.quote.status === "archived" && <span>Archived<span className="choices-undo"> ← undo</span></span>}
                              </div>
                           </button>
                        </li>
                        {
                           this.state.isDefault ?
                              <li>
                                 <button className="btn-in-action" onClick={this.onClickUndoDefault}>
                                    <div className="icon-wrapper">
                                       <i className="fa fa-fw fa-star text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <span>Make default<span className="choices-undo"> ← undo</span></span>
                                    </div>
                                 </button>
                              </li>
                              : <li>
                                 <button className="btn-in-action" onClick={this.onClickDefault}>
                                    <div className="icon-wrapper">
                                       <i className="fa fa-fw fa-star text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <span>Make default</span>
                                    </div>
                                 </button>
                              </li>
                        }


                        <li>
                           <button className="btn-in-action" onClick={this.onClickCopy}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-copy text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Copy</span>
                              </div>
                           </button>
                        </li>
                        <li>
                           <button className="btn-in-action" onClick={() => this.setState({ isDeleteAlertOpen: true })}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-trash-alt text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Delete</span>
                              </div>
                           </button>
                        </li>
                     </ul>
                  </NavCrumpRight>
               }
            </NavCrump>
            {/* <div id="AlerterPage" className="">
               <div className="alertBar alertBar-general">
                  <div className="container">
                     <div className="alertBar-content">
                        <ul className="alertBar-ul">
                           <li><i className="fa fa-fw fa-star mr-2" />You are missing a Quote Title.</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div> */}
            <div id="AlerterPage" style={{}}>
               {
                  this.state.isDeleteAlertOpen ?
                     <div className="alertBar alertBar-prompt">
                        <div className="container">
                           <h4>Please confirm:</h4>
                           <div className="btnSet">
                              <button className="btn btn-secondary mr-2" onClick={this.onClickDelete}>Delete</button>
                              <button className="btn" onClick={() => this.setState({ isDeleteAlertOpen: false })}>Cancel</button>
                           </div>
                        </div>
                     </div>
                     : null
               }
            </div>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <TemplateSettings isDefault={this.state.isDefault} />

                  {/* Template Title */}
                  <QuoteTitle isValidWarning={this.state.isValidWarning} updateValidWarning={() => this.setState({ isValidWarning: false })} />

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
                     <React.Fragment>
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" disabled={this.state.loading && this.state.type === "SAVEANDUPDATE"} onClick={this.onClickSaveAndUpdate}>
                           {this.state.loading && this.state.type === "SAVEANDUPDATE" && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                           Save &amp; Finish
                        </button>
                        <button className="btn btn-lg btn-rounded btn-hero-secondary mr-1" disabled={this.state.loading && this.state.type === "SAVE"} onClick={this.onClickSave}>
                           {this.state.loading && this.state.type === "SAVE" && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
                           Save
                        </button>
                     </React.Fragment>
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
   getDuplicateTemplateById,
   getQuoteDataById
};
export default connect(mapStateToProps, mapDispatchToProps)(GetTemplate);
