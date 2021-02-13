import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'

function exampleData(location) {
   let exampleTitle = "";
   let exampleSlug = "";
   switch (location.pathname) {
      case "/examples/cake-decorating-quote-template":
         exampleTitle = "Cake Decorating Quote Template";
         exampleSlug = "cake-decorating-quote-template";
         break;
      case "/examples/bookkeeping-quote-template":
         exampleTitle = "Bookkeeping Quote Template";
         exampleSlug = "bookkeeping-quote-template";
         break;
      case "/examples/corporate-promo-quote-template":
         exampleTitle = "Corporate Promo Quote Template";
         exampleSlug = "corporate-promo-quote-template";
         break;
      case "/examples/photography-quote-template":
         exampleTitle = "Photography Quote Template";
         exampleSlug = "photography-quote-template";
         break;
      case "/examples/catering-quote-template":
         exampleTitle = "Catering Quote Template";
         exampleSlug = "catering-quote-template";
         break;
      case "/examples/florist-quote-template":
         exampleTitle = "Florist Quote Template";
         exampleSlug = "florist-quote-template";
         break;
      default:
         break;
   }
   return { exampleTitle, exampleSlug };
}
export default function ExampleNavbar() {
   const location = useLocation();
   const { exampleTitle, exampleSlug } = exampleData(location);
   if (exampleTitle && exampleSlug) return (
      <nav className="n2-wrap n2-wrap-sales n2-wrap-white n2-wrap-examples">
         <div className="container">
            <div className="n2-a">
               <Link to="/examples">← All Examples</Link>
            </div>
            <span className="n2-title">{exampleTitle}</span>
            <div className="n2-ul float-right n2-show-small">
               <Link rel="nofollow" className="n2-a n2-a-outline" to={`/app/quote/get?example=${exampleSlug}`}>Use this example</Link>
            </div>
         </div>
      </nav>
   );
   else return <Redirect to="/examples" />
}
