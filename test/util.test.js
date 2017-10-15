const chai = require("chai");
const mockFiles = require("mock-fs");

const Vibrant = require("node-vibrant");

const { toPalette, toBase64 } = require("../util");

const expect = chai.expect;

describe("toBae64 utility function", () => {
  it("should return a properly formatted Base64 image string", () => {
    const expected = "data:image/jpeg;base64,hello world";
    let mockedMimeType = "image/jpeg";
    let mockedBase64Data = "hello world";
    expect(toBase64(mockedMimeType, mockedBase64Data)).to.equal(expected);
  });
});

describe("toPalette utility function", () => {
  let correctTestSwatch = null;
  let testSwatchWithNull = null;
  before(done => {
    // we need a valid swatch object first!
    const file = `${__dirname}/img/riding-a-bike.jpg`;
    let vibrant = new Vibrant(file, {
      // no special options for now
    });
    vibrant.getPalette().then(palette => {
      correctTestSwatch = Object.assign({}, palette);
      // setting up a usecase
      testSwatchWithNull = Object.assign({}, palette);
      testSwatchWithNull.Vibrant = null;
      done();
    });
  });
  it("should return 6 hex colours sorted by popularity", () => {
    expect(toPalette(correctTestSwatch)).to.have.lengthOf(6);
  });

  it("should return 5 hex colours with no errors in a palette was less than 6", () => {
    expect(toPalette(testSwatchWithNull)).to.have.lengthOf(5);
  });
});
