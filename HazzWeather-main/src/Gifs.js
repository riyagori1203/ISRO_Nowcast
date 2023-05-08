import React from 'react';
import './Precip.css';
import gif_images from './gif_images';

function Gifs() {
  return (
    <div>
        <h2>Static Frames of Uploaded GIF</h2>
        <div className="image-grid">
        <img src={gif_images['./frame_0.jpg']} class='gif' alt="Image 1" />
        <img src={gif_images['./frame_1.jpg']} class='gif' alt="Image 2" />
        <img src={gif_images['./frame_2.jpg']} class='gif' alt="Image 3" />
        <img src={gif_images['./frame_3.jpg']} class='gif' alt="Image 4" />
        <img src={gif_images['./frame_4.jpg']} class='gif' alt="Image 5" />
        <img src={gif_images['./frame_5.jpg']} class='gif' alt="Image 6" />
        <img src={gif_images['./frame_6.jpg']} class='gif' alt="Image 7" />
        <img src={gif_images['./frame_7.jpg']} class='gif' alt="Image 8" />
        <img src={gif_images['./frame_8.jpg']} class='gif' alt="Image 9" />
        <img src={gif_images['./frame_9.jpg']} class='gif' alt="Image 10" />
        <img src={gif_images['./frame_10.jpg']} class='gif' alt="Image 11" />
        <img src={gif_images['./frame_11.jpg']} class='gif' alt="Image 12" />
        <img src={gif_images['./frame_12.jpg']} class='gif' alt="Image 13" />
        <img src={gif_images['./frame_13.jpg']} class='gif' alt="Image 14" />
        <img src={gif_images['./frame_14.jpg']} class='gif' alt="Image 15" />
        <img src={gif_images['./frame_15.jpg']} class='gif' alt="Image 16" />
        <img src={gif_images['./frame_16.jpg']} class='gif' alt="Image 17" />
        <img src={gif_images['./frame_17.jpg']} class='gif' alt="Image 18" />
        <img src={gif_images['./frame_18.jpg']} class='gif' alt="Image 19" />
        </div>
    </div>
  );
}

export default Gifs;
