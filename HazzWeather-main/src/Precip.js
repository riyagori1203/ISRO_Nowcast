import React from 'react';
import './Precip.css';
import images from './precip_images';

function Precip() {
  return (
    <div>
      <h2>Generated Plots of Precip Field Frames</h2>
      <div class='info'>
        These plots represent precipitation fields that are estimated by a precipitation nowcasting algorithm. They provide a visual representation of the estimated precipitation intensity for a particular location and time. The colors on the plot indicate the intensity of precipitation in units of mm/h, where lighter colors represent lower precipitation intensities, and darker colors represent higher precipitation intensities. The actual precipitation values can be obtained by consulting the color scale bar that is typically included in the plot. The output signifies the spatial distribution of precipitation at the time of the radar scan. The precipitation field can be used to estimate the rainfall rate and to track the movement of precipitation systems.
      </div>
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
