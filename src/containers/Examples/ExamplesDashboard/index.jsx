import React from 'react'
import { Link } from 'react-router-dom';
import ExampleTourSection from './components/ExampleTourSection';

const examplesArr = [
   {
      imgSrc: "https://asset.quotientapp.com/image/quote-example/feature-cake-decorating.jpg",
      text: "Cake Decorating",
      pathTo: "/examples/cake-decorating-quote-template"
   },
   {
      imgSrc: "https://asset.quotientapp.com/image-c/quote-example/feature-florist.jpg",
      text: "Florist",
      pathTo: "/examples/florist-quote-template"
   },
   {
      imgSrc: "https://via.placeholder.com/800x525.png",
      text: "Bookkeeping",
      pathTo: "/examples/bookkeeping-quote-template"
   },
   {
      imgSrc: "https://via.placeholder.com/800x525.png",
      text: "Corporate Promo",
      pathTo: "/examples/corporate-promo-quote-template"
   },
   {
      imgSrc: "https://via.placeholder.com/800x525.png",
      text: "Photography",
      pathTo: "/examples/photography-quote-template"
   },
   {
      imgSrc: "https://via.placeholder.com/800x525.png",
      text: "Catering",
      pathTo: "/examples/catering-quote-template"
   },
];
export default function ExamplesDashabord() {
   return (
      <React.Fragment>
         <header className="n2-wrap n2-wrap-sales n2-wrap-white">
            <nav className="container">
               <ul className="n2-ul" data-tg-control="PreloadPages">
                  <li><span className="n2-a" to="/app">Examples</span></li>
                  {/* <li><a className="n2-a" href="/help">Help &amp; Support</a></li> */}
               </ul>
               <div className="n2-ul float-right">
                  <div className="sales-dash-yes">
                     <Link className="n2-a n2-a-outline" to="/app">Dashboard</Link>
                  </div>
               </div>
            </nav>
         </header>
         <main>
            <section className="sales-body container text-center u-section-lg">
               <h1>See what’s possible</h1>
               <p className="u-larger">
                  Use our examples for inspiration, then customize the quote layout and colors to <strong className="util-no-wrap">make it yours</strong>.
               </p>
            </section>
            {examplesArr.map((example, index) => <ExampleTourSection key={index} example={example} />)}
         </main>
      </React.Fragment>
   )
}
