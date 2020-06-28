import { cursorCoordinateHelper } from "./cursor";
import "./index.scss";

window.addEventListener("load", () => {
  const imageContainerElement = document.body.querySelector(".image-content");
  const actualImageElement = imageContainerElement.querySelector("img");
  // const backgroundElement = document.body.querySelector(".body-content");

  let myCoordsObject = cursorCoordinateHelper();

  // set max width of image overlay
  const imageSizes = { width: actualImageElement.width, height: actualImageElement.height };

  // This is after I solved x + y = 675 (an example half width of image)
  // where y = x/4
  const maxWidthOfOverlay = Math.floor(0.8 * imageSizes.width);
  imageContainerElement.style.setProperty(
    "--overlay-width",
    `${maxWidthOfOverlay}px`
  );
  const maxHeightOfOverlay = Math.floor(0.8 * imageSizes.height);
  imageContainerElement.style.setProperty(
    "--overlay-height",
    `${maxHeightOfOverlay}px`
  );


  // Quadratic soltution, not finalised
  // const offSetCalculation = (mouseCoordinate) => {
  //   if (mouseCoordinate > 0) {
  //     return Math.floor(Math.pow(mouseCoordinate / 40, 2) - 100);
  //   }
  //   return Math.floor(-Math.pow(mouseCoordinate / 40, 2) + 100);
  // };

  // Simple linear based solution
  const offSetCalculation = (mouseCoordinate) => {
    return -(mouseCoordinate / 4);
  };

  // middle point
  console.log(Math.floor(imageContainerElement.offsetWidth / 2));
  console.log(Math.floor(imageContainerElement.offsetHeight / 2));

  imageContainerElement.addEventListener("mouseenter", (event) => {
    actualImageElement.style.removeProperty("transition");
    myCoordsObject.init(
      0,
      0,
      imageContainerElement.offsetTop,
      imageContainerElement.offsetLeft,
      imageContainerElement.offsetHeight,
      imageContainerElement.offsetWidth
    );
  });

  imageContainerElement.addEventListener("mousemove", (event) => {
    myCoordsObject.update(event.clientX, event.clientY);
    const currentCoordinates = myCoordsObject.getCoordinates();

    actualImageElement.style.setProperty(
      "--x-offset",
      `${offSetCalculation(currentCoordinates.x)}px`
    );

    actualImageElement.style.setProperty(
      "--y-offset",
      `${offSetCalculation(currentCoordinates.y)}px`
    );

    // const colourChangeHex = colourChange(currentCoordinates);
    // console.log(colourChangeHex);
    // backgroundElement.style.background = `#${colourChangeHex}`;
  });

  // reset the image 
  imageContainerElement.addEventListener("mouseleave", () => {
    actualImageElement.style.setProperty("--x-offset", "0");
    actualImageElement.style.setProperty("--y-offset", "0");
    actualImageElement.style.setProperty("transition", "all 0.5s ease-out");
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
