const path = require("path");
const sharp = require("sharp");
const { version } = require("./package.json");
const Vibrant = require("node-vibrant");

const ERROR_EXT = `Error: Input file is missing or of an unsupported image format lqip v${version}`;

// supported images aka mimetypes
const SUPPORTED_MIMES = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png"
};

/**
 * toBase64
 * @description it returns a Base64 image string with required formatting
 * to work on the web (<img src=".." /> or in CSS url('..'))
 *
 * @param extension: image file extension
 * @param data: base64 string
 * @returns {string}
 */
const toBase64 = (extension, data) => {
  return `data:${SUPPORTED_MIMES[extension]};base64,${data.toString("base64")}`;
};

/**
 * toPalette
 * @description takes a color swatch object, converts it to an array & returns
 * only hex color
 *
 * @param swatch
 * @returns {{palette: Array}}
 */
const toPalette = swatch => (
  // get an array with relevant information
  // out of swatch object
  Object.keys(swatch).map(key => ({
    popularity: swatch[key].getPopulation(),
    hex: swatch[key].getHex()
  }))
  // discard falsy values
  .filter(Boolean)
  // sort by least to most popular color
  .sort((a, b) => a.popularity <= b.popularity)
  .map(color => color.hex)
)

const base64 = file => {
  return new Promise((resolve, reject) => {
    // get the extension of the chosen file
    let extension = path.extname(file) || "";
    extension = extension.split(".").pop();

    // supported files for now are ['jpg', 'jpeg', 'png']
    if (!SUPPORTED_MIMES[extension]) {
      return reject(ERROR_EXT);
    }

    // process the image
    // `sharp` library has been chosen since
    // it performed better than alternatives.
    return sharp(file)
      .resize(14) // resize to 14px width and auto height
      .toBuffer() // converts to buffer for Base64 conversion
      .then(data => {
        if (data) {
          // valid image Base64 string, ready to go as src or CSS background
          return resolve(toBase64(extension, data));
        }
        return reject(
          new Error("Unhandled promise rejection in base64 promise")
        );
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const palette = file => {
  return new Promise((resolve, reject) => {
    // vibrant library was about 10-15% slower than
    // get-image-colors npm module but provided better
    // and more needed information
    let vibrant = new Vibrant(file, {
      // no special options for now
    });
    vibrant
      .getPalette()
      .then(palette => {
        if (palette) {
          return resolve(toPalette(palette));
        }
        return reject(
          new Error("Unhandled promise rejection in colorPalette", palette)
        );
      })
      .catch(err => {
        return reject(err);
      });
  });
};
process.on("unhandledRejection", up => {
  throw up;
});

module.exports = {
  base64,
  palette
};
