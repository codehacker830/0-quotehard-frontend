import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteNotes } from '../../../actions/Data';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../actions/GlobalSettings';
import NavCrump from '../../../components/NavCrump';
import TextItemForm from '../../../components/TextItemForm';
import { initTextItem } from '../../../constants/InitState';
import axios from '../../../util/Api';
import { toastErrorConfig, toastInfoConfig, toastSuccessConfig } from '../../../util/toastrConfig';

class CreateTextItem extends Component {
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super(props);
      this.state = {
         file: [null],
         textItem: { ...initTextItem }
      };
   }
   onClickCreate = () => {
      const { textHeading, longDescription, files } = this.props.quote.notes[0].textItem;
      if (textHeading === "") { toast.info("You are missing a Title.", toastInfoConfig); return; }
      const payload = { textHeading, longDescription, files };
      if (this.props.location.pathname === '/app/content/item-text/create-new') {
         axios.post('/templates/textitem/create', payload).then(({ data }) => {
            toast.success("New TextItem template was created.", toastSuccessConfig);
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toast.error("TextItem failed to create.");
         });
      } else if (this.props.match.path === '/app/content/item-text/view/:id') {
         const textItemId = this.props.match.params.id;
         axios.put(`/templates/textitem/update/${textItemId}`, payload).then(({ data }) => {
            toast.success("TextItem template was updated.", toastSuccessConfig);
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toast.error("TextItem failed to update.");
         });
      }
   }
   updateItem = (ind, item) => {
      // console.log("adfasdf ", ind, item);
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      newNotes[ind] = item;
      this.props.updateQuoteNotes(newNotes);
   }
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      if (this.props.match.path === '/app/content/item-text/view/:id') {
         // Get textItem details with textItem ID
         axios.get(`/templates/textitem/id/${this.props.match.params.id}`).then(({ data }) => {
            console.log(" r################", data);
            const { textItem } = data;
            const newItem = {
               category: "textItem",
               textItem
            };
            this.updateItem(0, newItem);
         }).catch(err => {
            console.error("get textItem detail api error =>", err);
         });
      }
   }
   render() {
      const linkTo = this.props.location.state ? this.props.location.state.from : "/app/content/item-text/browse";
      const linkName = this.props.location.state && this.props.location.state.from.includes("/app/content/template/") ? "Edit Template" : "Items";
      const { textItem } = this.props.quote.notes[0];
      return (
         <React.Fragment>
            <NavCrump linkTo={linkTo}>
               {linkName}
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <TextItemForm
                     index={0}
                     isNote={true}
                     isPaperClipDisabled={false}
                     isSettingDisabled={true}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                     textItem={textItem}
                  />
               </div>

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickCreate}>
                     {this.props.match.path === '/app/content/item-text/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-text/view/:id' && "Update"}
                  </button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};
const mapDispatchToProps = {
   updateQuoteNotes,
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTextItem)