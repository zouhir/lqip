<p align="center">
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/logo.png" width="508">
</p>

<h4 align="center">LQIP: Low Quality Images Placeholder</h4>
<p align="center">
  <a align="center" href="https://lqip-loader.firebaseapp.com/">demo</a>
</p>

<br />
<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/installation.png" width="100%">
</p>

```
npm install --save lqip
```

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/example.png" width="100%" />
</p>

Generating Base64 from an image:

```js
const lqip = require('lqip');

const file = `./dest/to/file/zouhir-riding-a-bike.jpg`;

lqip.base64(file).then(res => {
  console.log(res); // "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY.....
});

```

Generating colour palette from an image:

```js
const lqip = require('lqip');

const file = `./dest/to/file/zouhir-riding-a-bike.jpg`;

lqip.palette(file).then(res => {
  // the response will be sorted from most dominant colour to least
  console.log(res); //  [ '#628792', '#bed4d5', '#5d4340', '#ba454d', '#c5dce4', '#551f24' ] 
});

```
<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/api.png" width="100%" />
</p>

##### `lqip.base64(filePath: string)`

This method accepts an image file path, the file has to be one of those formats ['jpeg', 'jpg', 'png'] and returns a Base64 
image string with a valid format and ready to be used in web applications such as in <img /> tags source or in CSS properties URLs. 

##### `lqip.palette(filePath: string)`

This method accepts an image file path, and returns an colour palette as an array of HEX colour values. The array that is returned
is sorted from the most to the least dominant colour.  

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/inspo.png" width="100%" />
</p>

- [Medium web app](https://medium.com/cucumbertown-magazine/the-beginners-guide-to-composition-in-food-photography-how-to-transform-your-food-photos-from-good-39613ab78bf2)
- [Instagram native mobile app](https://www.instagram.com/)
- [Polymer shop project](https://shop.polymer-project.org/)

<br />
<p>
  <img src="https://github.com/zouhir/lqip/blob/master/_github/mentions.png" width="100%" />
</p>

- Essential Image Optimization, An eBook by Addy Osmany [link](https://images.guide/)

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/creds.png" width="100%" />
</p>

Related projects to this would be [lqip-loader for webpack](https://github.com/zouhir/lqip-loader) as well as [lqip-cli](https://github.com/zouhir/lqip-cli).

Thanks to contributors and [Colin van Eenige](https://twitter.com/cvaneenige) for his reviews and early testing.

MIT - [Zouhir Chahoud](https://zouhir.org/)
