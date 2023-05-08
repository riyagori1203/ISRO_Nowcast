import React from 'react';
import './About.css';
import nowcast from './nowcast.gif';
import { NavLink } from 'react-router-dom';

function About() {
  document.body.classList.add('About');
  return (
    <div class='gif-container'>
      <h2>Generated Nowcast</h2>
      {<img src={nowcast} class='gif' />}

      <div className="button-grid">
        <button className="button">
          <NavLink to='/upload-page' activeClassName='active'>
            Uploaded GIF
          </NavLink>
        </button>
        <button className="button">
          <NavLink to='/gif-page' activeClassName='active'>
            Static GIF Frames
          </NavLink>
        </button>
        <button className="button">
          <NavLink to='/preprocessed-page' activeClassName='active'>
            Preprocessed Frames
          </NavLink>
        </button>
        <button className="button">
          <NavLink to='/precip-page' activeClassName='active'>
            Precipitation Frames
          </NavLink>
        </button>
        {/* <button className="button">
          <NavLink to='/precip-page' activeClassName='active'>
            Nowcast Frames
          </NavLink>
        </button> */}
      </div>

      {/* <button className='u-icon'>
        <NavLink to='/precip-page' activeClassName='active'>
          Precip
        </NavLink>
      </button> */}
    </div>
  );
}

export default About;
