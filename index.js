const path = require("path");
const sharp = require("sharp");
const version = require("./package.json").version;
const Vibrant = require("node-vibrant");

const ERROR_EXT = `Error: Input file is missing or of an unsupported image format lqip v${version}`;

// supported images \ mimetypes
const SUPPORTED_MIMES = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png"
};

// extension: file extension
// data: image file Buffer after resize
const toBase64 = (extension, data) => {
  return `data:${SUPPORTED_MIMES[extension]};base64,${data.toString("base64")}`;
};

const toPalette = swatch => {
  let palette = Object.keys(swatch).map(key => {
    return {
      name: key,
      popularity: swatch[key].getPopulation(),
      hex: swatch[key].getHex()
    };
  });
  let dominant = palette[0];
  palette.forEach(color => {
    if (color.popularity > dominant.popularity) dominant = color;
  });
  return {
    palette,
    dominant
  };
};

const base64 = file => {
  return new Promise((resolve, reject) => {
    let extension = path.extname(file) || "";
    extension = extension.split(".").pop();
    if (!SUPPORTED_MIMES[extension]) {
      return reject(ERROR_EXT);
    }
    return sharp(file)
      .resize(14) // resize to 14px width and auto height
      .toBuffer() // converts to buffer for Base64 conversion
      .then(data => {
        if (data) {
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
    let vibrant = new Vibrant(file, {
      /* no special options for now */
    });
    vibrant
      .getPalette()
      .then(palette => {
        if (palette) {
          return resolve(toPalette(palette));
        }
        return reject(
          new Error("Unhandled promise rejection in colorPalette", data)
        );
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports = {
  base64,
  palette
};
