import { cursorCoordinateHelper } from "./cursor";
import "./global.scss";
import "./image.scss";

const setImageOverlayDimensions = (imageContainer, { width, height }) => {
  // This is after I solved x + y = 675 (an example half width of image)
  // where y = x/4
  const maxWidthOfOverlay = Math.floor(0.8 * width);
  imageContainer.style.setProperty("--overlay-width", `${maxWidthOfOverlay}px`);
  const maxHeightOfOverlay = Math.floor(0.8 * height);
  imageContainer.style.setProperty(
    "--overlay-height",
    `${maxHeightOfOverlay}px`
  );
};

// Simple linear based solution
const offSetCalculation = (mouseCoordinate) => {
  return -(mouseCoordinate / 4);
};

window.addEventListener("load", () => {
  const imageContainer = document.body.querySelector(".image-content");
  const image = imageContainer.querySelector("img");
  // const backgroundElement = document.body.querySelector(".body-content");

  let myCoordsObject = cursorCoordinateHelper();
  setImageOverlayDimensions(imageContainer, {
    width: image.width,
    height: image.height,
  });

  // Quadratic soltution, not finalised
  // const offSetCalculation = (mouseCoordinate) => {
  //   if (mouseCoordinate > 0) {
  //     return Math.floor(Math.pow(mouseCoordinate / 40, 2) - 100);
  //   }
  //   return Math.floor(-Math.pow(mouseCoordinate / 40, 2) + 100);
  // };

  imageContainer.addEventListener("mouseenter", (event) => {
    image.style.removeProperty("transition");
    myCoordsObject.init(
      0,
      0,
      imageContainer.offsetTop,
      imageContainer.offsetLeft,
      imageContainer.offsetHeight,
      imageContainer.offsetWidth
    );
  });

  imageContainer.addEventListener("mousemove", (event) => {
    myCoordsObject.update(event.clientX, event.clientY);
    const currentCoordinates = myCoordsObject.getCoordinates();

    image.style.setProperty(
      "--x-offset",
      `${offSetCalculation(currentCoordinates.x)}px`
    );

    image.style.setProperty(
      "--y-offset",
      `${offSetCalculation(currentCoordinates.y)}px`
    );

    // const colourChangeHex = colourChange(currentCoordinates);
    // console.log(colourChangeHex);
    // backgroundElement.style.background = `#${colourChangeHex}`;
  });

  // reset the image
  imageContainer.addEventListener("mouseleave", () => {
    image.style.setProperty("--x-offset", "0");
    image.style.setProperty("--y-offset", "0");
    image.style.setProperty("transition", "transform 0.3s ease-out");
  });
});

const colourChange = ({ x, y }) => {
  // get cursor number x, y
  // find percentage of (x + 400) + (y + 400) / (width + height)
  // use percentage to and find %/100 *  255 + 255 + 255
  // convert to hex and set colour
  const percentage = (x + y + 800) / 1600;
  const colourKey = Math.floor(percentage * (255 + 255 + 255));
  let colourKeyString = colourKey.toString(16);
  // console.log(colourKeyString)
  // colourKeyString.length < 3 ? colourKeyString
  if (colourKeyString.length < 3) {
    colourKeyString += "0";
  }
  colourKeyString.padEnd(3 - colourKeyString, "0");
  return colourKeyString;
  // return getHexValue(colourKeyString);
};
