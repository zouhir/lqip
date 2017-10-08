var lqip = require("./index");

const file = `./test/img/riding-a-bike.jpg`;

const paletteExtractor = swatch => {
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

lqip(file, { base64: true, colors: true }).then(resolve => {
  console.log(resolve);
});
