import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import NavCrump from '../../../components/NavCrump';
import TextItemForm from '../../../components/TextItemForm';
import { initTextItem } from '../../../constants/InitState';
import axios from '../../../util/Api';
import { toastrErrorConfig, toastrInfoConfig, toastrSuccessConfig } from '../../../util/toastrConfig';

export default class CreateTextItem extends Component {
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super();
      this.state = {
         file: [null],
         textItem: initTextItem
      };
      this.hiddenFileInput = React.createRef();
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }

   updateItem = (ind, item) => {
      console.log("55555555555555555 ", ind, item);
      // let newItems = [...this.state.items];
      // newItems[ind] = item;
      // console.log("adfasdf ", ind, newItems);
      // this.setState({ items: newItems });
      this.setState({ textItem: item.textItem });
   }
   onClickCreate = () => {
      const { textHeading, longDescription, files } = this.state.textItem;
      if (textHeading === "") { toastr.info("Required", "You are missing a Title.", toastrInfoConfig); return; }
      const payload = { textHeading, longDescription, files };
      if (this.props.location.pathname === '/app/content/item-text/create-new') {
         axios.post('/templates/create-textitem', payload).then(({ data }) => {
            console.log(" create textitem res =>", data);
            toastr.success(
               "Success",
               "New TextItem template was created.",
               toastrSuccessConfig
            );
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toastr.error("Error", "TextItem failed to create.", toastrErrorConfig);
         });
      } else if (this.props.match.path === '/app/content/item-text/view/:id') {
         const textItemId = this.props.match.params.id;
         axios.post(`/templates/update-textitem-by-id/${textItemId}`, payload).then(({ data }) => {
            console.log(" create textitem res =>", data);
            toastr.success(
               "Success",
               "TextItem template was updated.",
               toastrSuccessConfig
            );
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toastr.error("Error", "TextItem failed to update.", toastrErrorConfig);
         });
      }
   }
   componentDidMount() {
      if (this.props.location.pathname !== '/app/content/item-text/create-new' && this.props.match.params) {
         // Get textItem details with textItem ID
         axios.get(`/templates/textitem-by-id/${this.props.match.params.id}`).then(({ data }) => {
            console.log(" res ^^^^^^^^^^^^^^^^^^^^^^^^^^^ =>", data);
            const { textItem } = data;
            this.setState({
               textItem: textItem
            });
         }).catch(err => {
            console.error("get textItem detail api error =>", err);
            toastr.error("Error", "TextItem was not found", toastrErrorConfig);
         });
      }
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/content/item-text/browse">
               Items
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <TextItemForm
                     index={0}
                     isPaperClipDisabled={false}
                     isSettingDisabled={true}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                     textItem={this.state.textItem}
                     updateItem={this.updateItem}
                  />
               </div>

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickCreate}>
                     {this.props.location.pathname === '/app/content/item-text/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-text/view/:id' && "Update"}
                  </button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}