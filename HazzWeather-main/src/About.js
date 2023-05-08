import React from 'react';
import './About.css';
import nowcast from './nowcast.gif';
function About() {
  return <div class='container'>{<img src={nowcast} class='gif' />}</div>;
}

export default About;
