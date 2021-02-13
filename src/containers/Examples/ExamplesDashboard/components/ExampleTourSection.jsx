import React from 'react'
import { Link } from 'react-router-dom';

export default function ExampleTourSection(props) {
   const { imgSrc, text, pathTo } = props.example;
   return (
      <section className="tourF-section">
         <Link data-sheet="ignore" to={pathTo}>
            <img className="examples-image" src={imgSrc} alt="/feature-florist.jpg preview" />
         </Link>
         <div className="examples-text">
            <h3>{text}</h3>
            <p>
               <Link className="btn btn-outline-dark rounded-0" data-sheet="ignore" to={pathTo}>View Quote Example</Link>
            </p>
         </div>
      </section>
   )
}
