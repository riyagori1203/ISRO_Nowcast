import React from 'react';
import './Precip.css';
import upload from './assets/uploads/upload.gif';

function Uploaded() {
  return (
    <div>
        <h2>Uploaded GIF</h2>
        <img src={upload} class='gif' alt="Image 1" />
    </div>
  );
}

export default Uploaded;
