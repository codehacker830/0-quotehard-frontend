import React from 'react'
import { Link } from 'react-router-dom'
import '../../examples.scoped.css';

export default function ExampleNavbar() {
   const exampleTitle = "Cake Decorating Quote Template";
   const exampleSlug = "cake-decorating-quote-template";
   return (
      <nav className="n2-wrap n2-wrap-sales n2-wrap-white n2-wrap-examples">
         <div className="container">
            <div className="n2-a">
               <Link to="/examples" />←<span className="hidden-xs"> All Examples</span>
            </div>
            {/* <span className="n2-title">{exampleTitle}</span> */}
            
            <div className="n2-ul n2-ul-right n2-show-small">
               <Link rel="nofollow" className="n2-a n2-a-outline" to={`/app/quote/get?example=${exampleSlug}`}>Use this example</Link>
            </div>
         </div>
      </nav>
   )
}
