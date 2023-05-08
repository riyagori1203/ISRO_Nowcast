const preprocessed_images = {};
function importAll(r) {
  r.keys().forEach((key) => (preprocessed_images[key] = r(key)));
}
importAll(require.context('./assets/preprocessing/', false, /\.(png|jpe?g|svg)$/));
export default preprocessed_images;