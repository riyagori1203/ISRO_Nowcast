const gif_images = {};
function importAll(r) {
  r.keys().forEach((key) => (gif_images[key] = r(key)));
}
importAll(require.context('./assets/gif_frames/', false, /\.(png|jpe?g|svg)$/));
export default gif_images;

