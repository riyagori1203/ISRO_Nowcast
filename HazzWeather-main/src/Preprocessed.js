import React from 'react';
import './Precip.css';
import preprocessed_images from './preprocessed_images';

function Preprocessed() {
  return (
    <div>
      <h2>Preprocessed Frames</h2>
      <div class='info'>
        Radar images are preprocessed to remove various types of noise and artifacts that can occur during data acquisition, processing, and transmission. These noise and artifacts can be caused by a variety of factors, including radar hardware and electronics, atmospheric conditions, and signal processing algorithms. Preprocessing methods are applied to radar images to remove these errors and artifacts and to ensure that the resulting precipitation estimates are as accurate as possible. This improves the quality of the data and makes it more useful for nowcasting.
      </div>
        <div className="image-grid">
        <img src={preprocessed_images['./AQC161932100V_00005.801.jpg']} class='gif' alt="Image 1" />
        <img src={preprocessed_images['./AQC161932105V_00005.801.jpg']} class='gif' alt="Image 2" />
        <img src={preprocessed_images['./AQC161932110V_00005.801.jpg']} class='gif' alt="Image 3" />
        <img src={preprocessed_images['./AQC161932115V_00005.801.jpg']} class='gif' alt="Image 4" />
        <img src={preprocessed_images['./AQC161932120V_00005.801.jpg']} class='gif' alt="Image 5" />
        <img src={preprocessed_images['./AQC161932125V_00005.801.jpg']} class='gif' alt="Image 6" />
        <img src={preprocessed_images['./AQC161932130V_00005.801.jpg']} class='gif' alt="Image 7" />
        <img src={preprocessed_images['./AQC161932135V_00005.801.jpg']} class='gif' alt="Image 8" />
        <img src={preprocessed_images['./AQC161932140V_00005.801.jpg']} class='gif' alt="Image 9" />
        <img src={preprocessed_images['./AQC161932145V_00005.801.jpg']} class='gif' alt="Image 10" />
        <img src={preprocessed_images['./AQC161932150V_00005.801.jpg']} class='gif' alt="Image 11" />
        <img src={preprocessed_images['./AQC161932155V_00005.801.jpg']} class='gif' alt="Image 12" />
        <img src={preprocessed_images['./AQC161932200V_00005.801.jpg']} class='gif' alt="Image 13" />
        <img src={preprocessed_images['./AQC161932205V_00005.801.jpg']} class='gif' alt="Image 14" />
        <img src={preprocessed_images['./AQC161932210V_00005.801.jpg']} class='gif' alt="Image 15" />
        <img src={preprocessed_images['./AQC161932215V_00005.801.jpg']} class='gif' alt="Image 16" />
        <img src={preprocessed_images['./AQC161932220V_00005.801.jpg']} class='gif' alt="Image 17" />
        <img src={preprocessed_images['./AQC161932225V_00005.801.jpg']} class='gif' alt="Image 18" />
        <img src={preprocessed_images['./AQC161932230V_00005.801.jpg']} class='gif' alt="Image 19" />
        </div>
    </div>
  );
}

export default Preprocessed;