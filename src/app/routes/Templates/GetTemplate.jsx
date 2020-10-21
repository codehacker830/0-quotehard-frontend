import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import AddItemBtn from '../../../components/AddItemBtn';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import QuoteItemTotal from '../../../components/QuoteItemTotal';
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
import { toastrErrorConfig, toastrSuccessConfig } from '../../../util/toastrConfig';

export default class GetTemplate extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fileArray: [],

         title: "",
         settings: initTemplateSettings,
         items: [
            {
               category: "priceItem",
               priceItem: initPriceItem,
            }
         ],
         notes: [
            {
               category: "textItem",
               textItem: initTextItem
            }
         ]
      }
   }
   onClickCreate = () => {
      const { title, settings, items, notes } = this.state;
      if (title === "") { toastr.info("Required", "You are missing a Template Title.", toastrInfoConfig); return; }
      const data = {
         title,
         settings,
         items,
         notes
      };
      axios.post('/templates', data)
         .then(({ data }) => {
            console.log("res data ---------------->", data);
            toastr.success(
               "Success",
               "New Template was created.",
               toastrSuccessConfig
            );
            // this.props.history.push("/app/content/templates")
         })
         .catch(err => {
            console.error(" error ===>", err);
            toastr.error("Error", "Template failed to create", toastrErrorConfig);
         });
   }
   onClickUpdate = () => {
      const { title, settings, items, notes } = this.state;
      if (title === "") { toastr.info("Required", "Missing a Template Title.", toastrInfoConfig); return; }
      const data = {
         title,
         settings,
         items,
         notes
      };
      axios.put('/templates', data)
         .then(({ data }) => {
            console.log("res data ---------------->", data);
            toastr.success(
               "Success",
               "Template was updated.",
               toastrSuccessConfig
            );
            // this.props.history.push("/app/content/templates")
         })
         .catch(err => {
            console.error(" error ===>", err);
            toastr.error("Error", "Template failed to update", toastrErrorConfig);
         });
   }
   onClickCancel = () => {
      this.props.history.push("/app/content/templates");
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
      // console.log("adfasdf ", ind, item);
      let newItems = [...this.state.items];
      newItems[ind] = item;
      console.log("adfasdf ", ind, newItems);
      this.setState({ items: newItems });
   }
   addItem = (ind, category) => {
      let newItems = [...this.state.items];
      if (category === "priceItem") newItems.splice(ind + 1, 0, {
         category: category,
         priceItem: initPriceItem,
      });
      else if (category === "textItem") newItems.splice(ind + 1, 0, {
         category: category,
         textItem: initTextItem,
      });
      else newItems.splice(ind + 1, 0, {
         category: category,
         subTotal: null
      });
      this.setState({ items: newItems });
   }
   orderUpItem = (ind) => {
      let newItems = [...this.state.items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.max(ind - 1, 0), 0, dIt);
      this.setState({ items: newItems });
   }
   orderDownItem = (ind) => {
      let newItems = [...this.state.items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.min(ind + 1, this.state.items.length), 0, dIt);
      this.setState({ items: newItems });
   }
   removeItem = (ind) => {
      let newItems = [...this.state.items];
      if (newItems.length > 2) {
         newItems.splice(ind, 1);
         this.setState({ items: newItems });
      } else if (newItems.length === 2) {
         newItems.splice(ind, 1);
         if (newItems[0].category === "subTotal") this.setState({
            items: [
               {
                  category: "priceItem",
                  priceItem: initPriceItem,
               },
            ]
         });
         else this.setState({ items: newItems });
      } else this.setState({
         items: [
            {
               category: "priceItem",
               priceItem: initPriceItem,
            },
         ]
      });
   }
   updateNote = (ind, note) => {
      let newNotes = [...this.state.notes];
      newNotes[ind] = note;
      this.setState({ notes: newNotes });
   }
   addNote = (ind, category) => {
      let newNotes = [...this.state.notes];
      newNotes.splice(ind + 1, 0, {
         category: "textItem",
         textItem: initTextItem,
      });
      this.setState({ notes: newNotes });
   }
   orderUpNote = (ind) => {
      console.log("index  ===", ind)
      let newNotes = [...this.state.notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.max(ind - 1, 0), 0, dIt);

      this.setState({ notes: newNotes });
   }
   orderDownNote = (ind) => {
      let newNotes = [...this.state.notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.min(ind + 1, this.state.notes.length), 0, dIt);
      this.setState({ notes: newNotes });
   }
   removeNote = (ind) => {
      let newNotes = [...this.state.notes];
      if (newNotes.length > 1) {
         newNotes.splice(ind, 1);
         this.setState({ notes: newNotes });
      }
      else this.setState({ notes: [initTextItem] })
   }

   componentDidMount() {
      console.log("----------this.props.match.params.id----------------", this.props.match.params.id);
      axios.get(`/templates/${this.props.match.params.id}`).then(({ data }) => {
         console.log("response to get template by id ===>", data);
         const { title, settings, items, notes } = data.template;
         this.setState({
            title,
            settings,
            items,
            notes
         });
      }).catch(err => {
         console.error("Error during get template by id.");
      });
   }
   render() {
      console.log(" Get Template state  ===>", this.state)
      console.log(" Get Template props  ===>", this.props)
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/content/templates">
               Templates
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <div className="row">
                     <div className="col-sm-6">
                     </div>
                     <TemplateSettings
                        {...this.state.settings}
                        updateSettings={(settings) => this.setState({ settings: settings })}
                     />
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4"
                           rows={1} placeholder="Title of Template"
                           value={this.state.title}
                           onChange={(ev) => this.setState({ title: ev.target.value })}
                        >
                        </textarea>
                     </div>
                  </div>

                  {/* items */}
                  {
                     this.state.items.map((item, index) => {
                        if (item.category === "priceItem") return <PriceItemForm
                           key={index}
                           index={index}
                           isPaperClipDisabled={false}
                           isSettingDisabled={false}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           updateItem={this.updateItem}
                           addItem={this.addItem}
                           orderUpItem={this.orderUpItem}
                           orderDownItem={this.orderDownItem}
                           removeItem={this.removeItem}
                        />
                        else if (item.category === "textItem") return <TextItemForm
                           key={index}
                           index={index}
                           isNote={false}
                           isPaperClipDisabled={false}
                           isSettingDisabled={false}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           updateItem={this.updateItem}
                           addItem={this.addItem}
                           orderUpItem={this.orderUpItem}
                           orderDownItem={this.orderDownItem}
                           removeItem={this.removeItem}
                        />
                        else return <SubTotal
                           key={index}
                           index={index}
                           removeItem={this.removeItem}
                        />
                     })
                  }

                  <AddItemBtn onClickAdd={() => {
                     const newItem = {
                        category: "priceItem",
                        priceItem: initPriceItem
                     }
                     this.setState({ items: [...this.state.items, newItem] })
                  }} />

                  {/* Quote item total show */}
                  <QuoteItemTotal settings={this.state.settings} items={this.state.items} />

                  {/* Here is notes */}
                  {
                     this.state.notes.map((item, index) => {
                        return <TextItemForm
                           key={index}
                           index={index}
                           isNote={true}
                           isPaperClipDisabled={false}
                           // isSettingDisabled={true}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           updateItem={this.updateNote}
                           addItem={this.addNote}
                           orderUpItem={this.orderUpNote}
                           orderDownItem={this.orderDownNote}
                           removeItem={this.removeNote}
                        />
                     })
                  }

                  <AddItemBtn onClickAdd={() => this.setState({ notes: [...this.state.notes, { category: "textItem", textItem: initTextItem }] })} />

                  {/* Footer action button group */}
                  <div className="row p-3">
                     {
                        this.props.match.path === "/app/content/template/:id" &&
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-3" onClick={this.onClickUpdate}>Update</button>

                     }
                     {
                        this.props.match.path === "/app/content/template/get" &&
                        <button className="btn btn-lg btn-rounded btn-hero-primary mr-3" onClick={this.onClickCreate}>Create</button>
                     }
                     <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={this.onClickCancel}>Cancel</button>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}