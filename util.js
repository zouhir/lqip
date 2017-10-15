var sortBy = require("lodash.sortby");

/**
 * toBase64
 * @description it returns a Base64 image string with required formatting
 * to work on the web (<img src=".." /> or in CSS url('..'))
 *
 * @param extension: image file extension
 * @param data: base64 string
 * @returns {string}
 */
const toBase64 = (extMimeType, data) => {
  return `data:${extMimeType};base64,${data.toString("base64")}`;
};

/**
 * toPalette
 * @description takes a color swatch object, converts it to an array & returns
 * only hex color
 *
 * @param swatch
 * @returns {{palette: Array}}
 */
const toPalette = swatch => {
  // get an array with relevant information
  // out of swatch object
  let palette = Object.keys(swatch).reduce((result, key) => {
    if (swatch[key] !== null) {
      result.push({
        popularity: swatch[key].getPopulation(),
        hex: swatch[key].getHex()
      });
    }
    return result;
  }, []);
  // sort by least to most popular color
  // sortBy docs: https://lodash.com/docs/4.17.4#sortBy
  palette = sortBy(palette, ["popularity"]);
  // we done with the popularity attribute
  // remove it with map & reverse the order
  // so it becomes from most to least popular
  palette = palette.map(color => color.hex).reverse();
  return palette;
};

module.exports = {
  toBase64,
  toPalette
};
