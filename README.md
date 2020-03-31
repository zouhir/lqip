![LQIP: Low Quality Images](https://raw.githubusercontent.com/mole-inc/lqip/master/.github/logo.png)

# LQIP: Low Quality Images Placeholder

## Installation

```
npm install --save lqip
```

## Usage Example

Generating Base64 from an image:

```js
const lqip = require('lqip');

const file = `./dest/to/file/riding-a-bike.jpg`;

lqip.base64(file).then(res => {
  console.log(res); // "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY.....
});

```

Generating colour palette from an image:

```js
const lqip = require('lqip');

const file = `./dest/to/file/riding-a-bike.jpg`;

lqip.palette(file).then(res => {
  // the response will be sorted from most dominant colour to least
  console.log(res); //  [ '#628792', '#bed4d5', '#5d4340', '#ba454d', '#c5dce4', '#551f24' ] 
});

```

## API Documentation

#### `lqip.base64(filePath: string)`

This method accepts an image file path, the file has to be one of those formats ['jpeg', 'jpg', 'png'] and returns a Base64 
image string with a valid format and ready to be used in web applications such as in <img /> tags source or in CSS properties URLs. 

#### `lqip.palette(filePath: string)`

This method accepts an image file path, and returns an colour palette as an array of HEX colour values. The array that is returned
is sorted from the most to the least dominant colour.  

## Inspired by

- [Medium web app](https://medium.com/cucumbertown-magazine/the-beginners-guide-to-composition-in-food-photography-how-to-transform-your-food-photos-from-good-39613ab78bf2)
- [Instagram native mobile app](https://www.instagram.com/)
- [Polymer shop project](https://shop.polymer-project.org/)

## Remarkable Mentions

- Essential Image Optimization, An eBook by Addy Osmani [link](https://images.guide/)

## Notes, Credits & License

This is a maintained fork of [zouhir/lqip](https://github.com/zouhir/lqip).  
Original [lqip](https://github.com/zouhir/lqip) is released under The MIT License by [Zouhir Chahoud](https://zouhir.org/).

Please see LICENSE file
