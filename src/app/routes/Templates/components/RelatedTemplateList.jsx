import React, { Component } from 'react'
import { connect } from 'react-redux'

class RelatedTemplateList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowTemplates: false
      }
   }
   render() {
      const { templates } = this.props;
      const templatesLength = templates.length;
      if (!templatesLength) return null;
      else return (
         <div className="pop_set" data-tg-click="root_pop">
            <p className={`pop_default ${this.state.isShowTemplates ? "isHidden" : ""}`}>
               <strong>Changes will be applied to
                  <button className="pop_trigger buttonLink" onClick={() => this.setState({ isShowTemplates: !this.state.isShowTemplates })}>
                        {templatesLength} template{templatesLength > 1 ? "s" : ""}…
                  </button>
               </strong>
            </p>
            <p className={`mb-2 ${this.state.isShowTemplates ? "" : "isHidden"}`}>
               <strong>Changes will be applied to:</strong>
            </p>
            <ul className={`pop_slideDown ${this.state.isShowTemplates ? "" : "isHidden"}`}>
               {
                  templates.map((template, index) => (
                     <li key={index}>{template.title}</li>
                  ))
               }
            </ul>
         </div>
      )
   }
}

const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
}

export default connect(mapStateToProps)(RelatedTemplateList)
