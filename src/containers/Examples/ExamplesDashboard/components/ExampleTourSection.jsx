import React from 'react'
import { Link } from 'react-router-dom';
import '../../examples.scoped.css';

export default function ExampleTourSection(props) {
   const { imgSrc, text, pathTo } = props.example;
   return (
      <section className="tourF-section">
         <a data-sheet="ignore" href="examples/florist-quote-template.html">
            <img className="examples-image" src={imgSrc} alt="/feature-florist.jpg preview" />
         </a>
         <div className="examples-text">
            <h3>{text}</h3>
            <p>
               <Link className="btn btn-outline-black" data-sheet="ignore" to={pathTo}>View Quote Example</Link>
            </p>
         </div>
      </section>
   )
}
