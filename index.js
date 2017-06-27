const path = require("path");
const sharp = require("sharp");
const version = require("./package.json").version;

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

module.exports = file => {
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
        resolve(toBase64(extension, data));
      })
      .catch(err => {
        reject(err);
      });
  });
};
