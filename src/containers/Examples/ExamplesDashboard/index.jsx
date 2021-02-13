import React from 'react'
import { Link } from 'react-router-dom';
import ExampleTourSection from './components/ExampleTourSection';
import '../examples.scoped.css';

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
               <a data-tg-click="clickBigNav" href="javascript:void(0)" className="n2-hamburger n2-hamburger-right n2-a js-loadHere"><span className="glyphicon glyphicon-menu-hamburger" /></a>
               <a data-tg-click="clickBigNav" href="javascript:void(0)" className="n2-hamburger n2-hamburger-right n2-hamburger-close n2-a js-loadHere"><span className="glyphicon glyphicon-remove" /></a>
               {/* <a className="n2-logo ignoreLoading" title="Quotient – easy to use Proposal and Estimation software" href="/"><img src="https://asset.quotientapp.com/image/quotient-logo-02.svg" alt="Quotient" /></a> */}
               <ul className="n2-ul" data-tg-control="PreloadPages">
                  <li><Link className="n2-a" to="/app">Dashboard</Link></li>
                  {/* <li className="active"><a className="n2-a" href="/examples">Examples</a></li>
                  <li><a className="n2-a" href="/pricing">Pricing</a></li>
                  <li><a className="n2-a" href="/help">Help &amp; Support</a></li> */}
               </ul>
               {/* <div className="n2-ul n2-ul-right" data-tg-control="SalesSignIn">
                  <div className="sales-dash-no isHidden">
                     <a className="n2-a" href="https://go.quotientapp.com/">Sign in</a>
                     <a className="n2-a n2-a-outline" href="https://go.quotientapp.com/new-account">Start Trial</a>
                  </div>
                  <div className="sales-dash-yes">
                     <a className="n2-a n2-a-outline" href="https://go.quotientapp.com/">Dashboard</a>
                  </div>
               </div> */}
            </nav>
         </header>
         <main>
            <section className="sales-body container u-center u-section-lg">
               <h1>
                  See what’s possible
            </h1>
               <p className="u-larger">
                  Use our examples for inspiration, then customize the quote layout and colors to <strong className="util-no-wrap">make it yours</strong>.
            </p>
            </section>
            {
               examplesArr.map((example, index) => <ExampleTourSection example={example} />)
            }
            {/* <section className="container u-center u-section-lg2 u-max-800">
            <h1 className="u-section-lg22 u-pad-top2">
               Explore by industry
            </h1>
            <h3 className="heading-decor u-section-lg22 color-medium weight-normal"><span>Creative &amp; Professional</span></h3>
            <p className="u-section-lg22">
               <a className="word-cloud-tag" style={{ border: '1px solid #DE5021', background: '#d0572f' }} data-sheet="ignore" href="/examples/accounting-onboarding-quote-template">
                  Accounting          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #47B893', background: '#4fb090' }} data-sheet="ignore" href="/examples/architect-quote-template">
                  Architecture          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #25B3FA', background: '#35aeea' }} data-sheet="ignore" href="/examples/bookkeeping-quote-template">
                  Bookkeeping          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #024576', background: '#0b446d' }} data-sheet="ignore" href="/examples/business-proposal-template">
                  Business          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #010101', background: '#010101' }} data-sheet="ignore" href="/examples/copywriting-quote-template">
                  Copywriting          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #2980A3', background: '#327c9a' }} data-sheet="ignore" href="/examples/corporate-promo-quote-template">
                  Corporate Promo          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #4E514B', background: '#4e514b' }} data-sheet="ignore" href="/examples/film-production-quote-template">
                  Film &amp; Video          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #35C1E0', background: '#42b9d3' }} data-sheet="ignore" href="/examples/graphic-design-quote-template">
                  Graphic Design          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #00A2D5', background: '#109ac5' }} data-sheet="ignore" href="/examples/it-services-quote-template">
                  IT Services          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #508AAF', background: '#5788a8' }} data-sheet="ignore" href="/examples/illustrator-quote-template">
                  Illustration          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #D1862E', background: '#c5853a' }} data-sheet="ignore" href="/examples/interior-decorating-quote-template">
                  Interior Decorating          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #6E8691', background: '#71858e' }} data-sheet="ignore" href="/examples/law-estate-planning-quote-template">
                  Lawyer          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #FF615A', background: '#f36c66' }} data-sheet="ignore" href="/examples/music-production-quote-template">
                  Music Production          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #555453', background: '#555453' }} data-sheet="ignore" href="/examples/photography-quote-template">
                  Photography          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #EA018B', background: '#d91288' }} data-sheet="ignore" href="/examples/printing-quote-template">
                  Printing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #734248', background: '#6f464b' }} data-sheet="ignore" href="/examples/sales-quote-template">
                  Sales          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #C63967', background: '#bb446b' }} data-sheet="ignore" href="/examples/apparel-screen-printing-quote-template">
                  Screen Printing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #CC821E', background: '#bf802b' }} data-sheet="ignore" href="/examples/signage-quote-template">
                  Signage          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #69297D', background: '#662f77' }} data-sheet="ignore" href="/examples/social-media-quote-template">
                  Social Media          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #D90E31', background: '#ca1d3b' }} data-sheet="ignore" href="/examples/web-design-quote-template">
                  Web Design          </a></p><h3 className="heading-decor u-section-lg22 color-medium weight-normal"><span>Service</span></h3>
            <p className="u-section-lg22">
               <a className="word-cloud-tag" style={{ border: '1px solid #ca4c60', background: '#c15566' }} data-sheet="ignore" href="/examples/cake-decorating-quote-template">
                  Cake Decorating          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #D41400', background: '#c42110' }} data-sheet="ignore" href="/examples/car-detailing-quote-template">
                  Car Detailing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #91278F', background: '#892f87' }} data-sheet="ignore" href="/examples/carpet-cleaning-quote-template">
                  Carpet Cleaning          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #29A39B', background: '#329a93' }} data-sheet="ignore" href="/examples/catering-quote-template">
                  Catering          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #27A8EC', background: '#36a3dd' }} data-sheet="ignore" href="/examples/commercial-cleaning-quote-template">
                  Commercial Cleaning          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #EB1457', background: '#db245d' }} data-sheet="ignore" href="/examples/dj-quote-template">
                  DJ          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #6C3E36', background: '#68413a' }} data-sheet="ignore" href="/examples/dog-sitting-quote-template">
                  Dog Sitting          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #865282', background: '#82567f' }} data-sheet="ignore" href="/examples/event-management-quote-template">
                  Event Management          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #F90621', background: '#e7182f' }} data-sheet="ignore" href="/examples/florist-quote-template">
                  Florist          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #27431A', background: '#28401d' }} data-sheet="ignore" href="/examples/framing-quote-template">
                  Framing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #E28301', background: '#d18012' }} data-sheet="ignore" href="/examples/hire-quote-template">
                  Hire          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #F05A29', background: '#e16238' }} data-sheet="ignore" href="/examples/hospitality-supplies-quote-template">
                  Hospitality          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #39b549', background: '#42ac50' }} data-sheet="ignore" href="/examples/house-cleaning-quote-template">
                  House Washing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #3F9A07', background: '#428f12' }} data-sheet="ignore" href="/examples/lawn-mowing-quote-template">
                  Lawn Mowing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #5F2B7E', background: '#5d3178' }} data-sheet="ignore" href="/examples/life-coaching-quote-template">
                  Life Coaching          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #2B699B', background: '#336893' }} data-sheet="ignore" href="/examples/movers-quote-template">
                  Movers          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #035896', background: '#0e568b' }} data-sheet="ignore" href="/examples/personal-trainer-quote-template">
                  Personal Trainer          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #FC032C', background: '#e91639' }} data-sheet="ignore" href="/examples/pest-control-quote-template">
                  Pest Control          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #1F76EB', background: '#2e78dc' }} data-sheet="ignore" href="/examples/pool-cleaners-quote-template">
                  Pool Cleaners          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #3D87C2', background: '#4786b8' }} data-sheet="ignore" href="/examples/private-jet-charter-quote-template">
                  Private Jet Charters          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #71A434', background: '#709c3c' }} data-sheet="ignore" href="/examples/rental-quote-template">
                  Rental          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #9A7665', background: '#967769' }} data-sheet="ignore" href="/examples/tour-quote-template">
                  Tourism          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #1A4E7F', background: '#224e77' }} data-sheet="ignore" href="/examples/translation-services-quote-template">
                  Translation Services          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #29A37F', background: '#329a7b' }} data-sheet="ignore" href="/examples/transportation-quote-template">
                  Transport          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #0757AF', background: '#1458a2' }} data-sheet="ignore" href="/examples/window-cleaners-quote-template">
                  Window Cleaning          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #D41400', background: '#c42110' }} data-sheet="ignore" href="/examples/window-tinting-quote-template">
                  Window Tinting          </a></p><h3 className="heading-decor u-section-lg22 color-medium weight-normal"><span>Construction &amp; Trades</span></h3>
            <p className="u-section-lg22">
               <a className="word-cloud-tag" style={{ border: '1px solid #3C87C3', background: '#4686b9' }} data-sheet="ignore" href="/examples/air-conditioning-quote-template">
                  Air Conditioning          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #437213', background: '#436b1a' }} data-sheet="ignore" href="/examples/arborist-quote-template">
                  Arborist          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #2176C7', background: '#2d76bb' }} data-sheet="ignore" href="/examples/audio-visual-quote-template">
                  Audio Visual          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #c32a30', background: '#b8353b' }} data-sheet="ignore" href="/examples/awnings-quote-template">
                  Awnings          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #002E63', background: '#072f5c' }} data-sheet="ignore" href="/examples/carpet-quote-template">
                  Carpet          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #927E5F', background: '#8e7d63' }} data-sheet="ignore" href="/examples/curtains-and-blinds-quote-templates">
                  Curtains &amp; Blinds          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #33C33B', background: '#3eb845' }} data-sheet="ignore" href="/examples/electrical-quote-template">
                  Electrical          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #6AA939', background: '#6ba141' }} data-sheet="ignore" href="/examples/fencing-quote-template">
                  Fencing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #574B42', background: '#554b44' }} data-sheet="ignore" href="/examples/floor-sanding-quote-template">
                  Floor Sanding          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #74432C', background: '#6f4531' }} data-sheet="ignore" href="/examples/flooring-quote-template">
                  Flooring          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #6E6E71', background: '#6e6e71' }} data-sheet="ignore" href="/examples/furniture-quote-template">
                  Furniture          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #567082', background: '#596f7f' }} data-sheet="ignore" href="/examples/garage-door-quote-template">
                  Garage Doors          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #4B4A4F', background: '#4b4a4f' }} data-sheet="ignore" href="/examples/handyman-services-quote-template">
                  Handyman Services          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #FF5D00', background: '#ec6213' }} data-sheet="ignore" href="/examples/heating-quote-template">
                  Heating          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #299CA3', background: '#32949a' }} data-sheet="ignore" href="/examples/home-security-quote-template">
                  Home Security          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #83B14E', background: '#82aa55' }} data-sheet="ignore" href="/examples/insulation-quote-template">
                  Insulation          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #7A857E', background: '#7b847e' }} data-sheet="ignore" href="/examples/kitchen-remodeling-quote-template">
                  Kitchen Remodeling          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #2F6D2C', background: '#336831' }} data-sheet="ignore" href="/examples/landscaping-quote-template">
                  Landscaping          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #DB6424', background: '#cd6832' }} data-sheet="ignore" href="/examples/painters-quote-template">
                  Painting &amp; Decorating          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #3ABAE1', background: '#47b3d4' }} data-sheet="ignore" href="/examples/plastering-quote-template">
                  Plastering          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #2D6C9F', background: '#366b96' }} data-sheet="ignore" href="/examples/plumbing-quote-template">
                  Plumbing          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #64849B', background: '#688397' }} data-sheet="ignore" href="/examples/refrigeration-quote-template">
                  Refrigeration          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #A37A29', background: '#9a7732' }} data-sheet="ignore" href="/examples/remodelling-and-construction-quote-template">
                  Remodeling &amp; Construction          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #1B84C0', background: '#2781b4' }} data-sheet="ignore" href="/examples/solar-energy-quote-template">
                  Solar          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #4A84B5', background: '#5283ad' }} data-sheet="ignore" href="/examples/sunshade-quote-template">
                  Sunshade          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #495E61', background: '#4b5d5f' }} data-sheet="ignore" href="/examples/tiling-quote-template">
                  Tiling          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #AF8650', background: '#a88557' }} data-sheet="ignore" href="/examples/upholstery-quote-template">
                  Upholstery          </a>
               <a className="word-cloud-tag" style={{ border: '1px solid #707B73', background: '#717a73' }} data-sheet="ignore" href="/examples/wallpapering-quote-template">
                  Wallpapering          </a></p>
         </section>
       */}
         </main>
      </React.Fragment>
   )
}
