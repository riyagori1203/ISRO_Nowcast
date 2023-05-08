import React from 'react';
import './Precip.css';
import images from './precip_images';

function Precip() {
  return (
    <div>
        <h2>Generated Plots of Precip Field Frames</h2>
        <div className="image-grid">
        <img src={images['./plot0.png']} class='gif' alt="Image 1" />
        <img src={images['./plot1.png']} class='gif' alt="Image 2" />
        <img src={images['./plot2.png']} class='gif' alt="Image 3" />
        <img src={images['./plot3.png']} class='gif' alt="Image 4" />
        <img src={images['./plot4.png']} class='gif' alt="Image 5" />
        <img src={images['./plot5.png']} class='gif' alt="Image 6" />
        <img src={images['./plot6.png']} class='gif' alt="Image 7" />
        <img src={images['./plot7.png']} class='gif' alt="Image 8" />
        <img src={images['./plot8.png']} class='gif' alt="Image 9" />
        <img src={images['./plot9.png']} class='gif' alt="Image 10" />
        <img src={images['./plot10.png']} class='gif' alt="Image 11" />
        <img src={images['./plot11.png']} class='gif' alt="Image 12" />
        <img src={images['./plot12.png']} class='gif' alt="Image 13" />
        <img src={images['./plot13.png']} class='gif' alt="Image 14" />
        <img src={images['./plot14.png']} class='gif' alt="Image 15" />
        <img src={images['./plot15.png']} class='gif' alt="Image 16" />
        <img src={images['./plot16.png']} class='gif' alt="Image 17" />
        <img src={images['./plot17.png']} class='gif' alt="Image 18" />
        <img src={images['./plot18.png']} class='gif' alt="Image 19" />
        </div>
    </div>
  );
}

export default Precip;
